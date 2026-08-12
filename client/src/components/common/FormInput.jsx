import React from 'react';

const FormInput = ({
  label,
  name,
  type = 'text',
  value,
  onChange,
  placeholder,
  required = false,
  error,
  options,
  rows,
  disabled = false,
}) => {
  return (
    <div className="space-y-1.5">
      {label && (
        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700">
          {label} {required && <span className="text-sky-600">*</span>}
        </label>
      )}

      {type === 'select' ? (
        <select
          name={name}
          value={value}
          onChange={onChange}
          disabled={disabled}
          required={required}
          className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 text-sm transition-all disabled:opacity-50"
        >
          {options?.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      ) : type === 'textarea' ? (
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          rows={rows || 3}
          disabled={disabled}
          required={required}
          className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 text-sm transition-all disabled:opacity-50 resize-none"
        />
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 text-sm transition-all disabled:opacity-50"
        />
      )}

      {error && <p className="text-xs text-rose-500 font-medium mt-1">{error}</p>}
    </div>
  );
};

export default FormInput;
