import http from "./http";
import config from "../config/default.json";
const logger = (data) => {
  const { numOfPeople, bill, __usedTipPercentage, totalAmountPerPerson } = data;

  let _bill = parseFloat(bill),
    _numOfPeople = parseInt(numOfPeople),
    _tipPercentage = parseFloat(__usedTipPercentage) / 100;

  const tip = {
    bill_amount: _bill,
    tip_percentage: _tipPercentage,
    tip_amount: (_bill * _tipPercentage).toFixed(4),
    num_of_people: _numOfPeople,
    per_person_amount: totalAmountPerPerson.toFixed(4),
    total_bill: (totalAmountPerPerson * _numOfPeople).toFixed(4),
  };

  http
    .post(config.tipsEndpoint, { tip })
    .catch((ex) => console.error("ERR_POST_TIPS: ", ex));
};

export default logger;
