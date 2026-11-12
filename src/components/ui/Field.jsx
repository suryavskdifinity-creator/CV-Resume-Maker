import React from 'react';

export default function Field({
  label,
  value,
  onChange,
  placeholder = '',
  type = 'text',
}) {
  return (
    <div className="field">
      <label>{label}</label>
      {type === 'textarea' ? (
        <textarea
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={4}
        />
      ) : (
        <input
          type={type}
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
        />
      )}
    </div>
  );
}
