const Input = ({ label = "", value = 0, name, prefix, error, onChange }) => {
  return (
    <div className="flex-1 min-w-full">
      <label
        htmlFor={label}
        className="flex mb-2 text-lg font-semibold text-grayish-cyan justify-between items-center"
      >
        {label}
        {error && <p className="text-rose-500/80 text-sm">{error}</p>}
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 start-0 top-0 flex items-center ps-3.5 pointer-events-none">
          {prefix}
        </div>
        <input
          type="number"
          id={label}
          value={value}
          name={name}
          onChange={(e) => onChange(e)}
          aria-describedby="helper-text-explanation"
          className={`bg-very-light-grayish-cyan border  text-dark-cyan rounded-lg focus:outline-none
            focus:ring-very-light-grayish-cyan 
            focus:ring-2 focus:border-strong-cyan  block w-full ps-10 p-2.5 text-right placeholder:font-semibold text-xl font-semibold `}
          placeholder="0"
          pattern="^\d+(\.\d+)?$"
          required
        />
      </div>
      {error && (
        <p
          id="helper-text-explanation"
          className="mt-2 text-sm text-gray-500 dark:text-gray-400"
        >
          Please select a 5 digit number from 0 to 9.
        </p>
      )}
    </div>
  );
};

export default Input;
