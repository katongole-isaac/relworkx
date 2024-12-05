/**
 *
 * @param {import("react").ButtonHTMLAttributes} props
 * @returns
 */
const Button = (props) => {
  return (
    <button
      className="px-2 py-2 w-full text-center uppercase rounded-md bg-strong-cyan text-dark-cyan font-bold text-xl tracking-wider hover:bg-light-grayish-cyan disabled:hover:bg-strong-cyan/15 
      disabled:bg-strong-cyan/15 
      disabled:text-grayish-cyan/35"
      {...props}
    >
      reset
    </button>
  );
};

export default Button;
