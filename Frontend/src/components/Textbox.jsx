import React from 'react';
import clsx from 'clsx';

const Textbox = React.forwardRef(
  ({ type, placeholder, label, className, register, name, error, readOnly }, ref) => {
    return (
      <div className="w-full flex flex-col gap-1">
        {label && <label htmlFor={name} className="text-slate-800">{label}</label>}

        <div>
          <input
            type={type}
            name={name}
            placeholder={placeholder}
            ref={ref}
            {...register}
            aria-invalid={error ? "true" : "false"}
            className={clsx(
              "bg-transparent px-3 py-2.5 2xl:py-3 border border-gray-300 placeholder-gray-400 text-gray-900 outline-none text-base focus:ring-2 ring-blue-300",
              className,
              { "cursor-not-allowed": readOnly } // Add cursor-not-allowed class when readOnly is true
            )}
            readOnly={readOnly} // Apply readOnly attribute conditionally
          />
        </div>
        {error && <span className="text-red-500 text-sm">{error}</span>}
      </div>
    );
  }
);

export default Textbox;
