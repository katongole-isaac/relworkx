const TipCal = ({ amount = 0, label = "" }) => {
  const _formattedAmount = new Intl.NumberFormat("en-US", {
    currency: "USD",
    style: "currency",
    minimumFractionDigits: 2,
  }).format(amount);

  return (
    <div className="flex justify-between items-center flex-wrap">
      <div className="flex flex-col gap-1">
        <span className="text-custom-white font-semibold">{label}</span>
        <span className="text-very-light-grayish-cyan/50 font-semibold">
          / person
        </span>
      </div>

      <div className="text-3xl text-strong-cyan font-semibold">
        <span>{_formattedAmount}</span>
      </div>
    </div>
  );
};

export default TipCal;
