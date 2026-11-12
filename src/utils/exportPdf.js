/**
 * Export resume to PDF.
 * 1) Try html2canvas + jsPDF if installed
 * 2) Fallback to window.print() (Save as PDF)
 */

function safeFilename(name) {
  return (name || 'resume')
    .toString()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .slice(0, 40) || 'resume';
}

export async function exportResumePdf(element, personName = 'resume') {
  if (!element) {
    window.print();
    return { method: 'print' };
  }

  try {
    const html2canvas = (await import('html2canvas')).default;
    const { jsPDF } = await import('jspdf');

    // Temporarily show element for capture if hidden
    const prev = {
      display: element.style.display,
      position: element.style.position,
      left: element.style.left,
      top: element.style.top,
      visibility: element.style.visibility,
      zIndex: element.style.zIndex,
      width: element.style.width,
    };

    element.style.display = 'block';
    element.style.position = 'fixed';
    element.style.left = '-10000px';
    element.style.top = '0';
    element.style.visibility = 'visible';
    element.style.zIndex = '-1';
    element.style.width = '800px';

    const paper = element.querySelector('.resume-paper') || element;

    const canvas = await html2canvas(paper, {
      scale: 2,
      useCORS: true,
      backgroundColor: '#ffffff',
      logging: false,
      windowWidth: paper.scrollWidth,
    });

    // restore
    Object.assign(element.style, prev);

    const imgData = canvas.toDataURL('image/png', 1.0);
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const margin = 10;
    const maxW = pageWidth - margin * 2;
    const maxH = pageHeight - margin * 2;

    let w = maxW;
    let h = (canvas.height * w) / canvas.width;
    if (h > maxH) {
      h = maxH;
      w = (canvas.width * h) / canvas.height;
    }

    const x = (pageWidth - w) / 2;
    pdf.addImage(imgData, 'PNG', x, margin, w, h);
    pdf.save(`${safeFilename(personName)}-cv.pdf`);
    return { method: 'jspdf' };
  } catch {
    // Packages missing or capture failed → browser print
    window.print();
    return { method: 'print' };
  }
}
