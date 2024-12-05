const RadioInput = ({
  label = "",
  name,
  onChange,
  value = 0,
  activeId,
  onClick,
}) => {
  return (
    <div className="flex-1">
      <input
        type="radio"
        id={label}
        name={name}
        value={value}
        checked={value === parseInt(activeId)}
        onChange={(e) => onChange(e)}
        className="hidden peer"
        required
      />
      <label
        htmlFor={label}
        className="inline-flex items-center min-w-full py-2 px-8 bg-dark-cyan text-custom-white rounded-md cursor-pointer hover:bg-light-grayish-cyan hover:text-dark-cyan peer-checked:bg-strong-cyan peer-checked:text-dark-cyan"
        onClick={() => onClick(value)}
      >
        <div className="block w-full">
          <div className="w-full text-xl font-semibold text-center">
            {label}
          </div>
        </div>
      </label>
    </div>
  );
};

export default RadioInput;
