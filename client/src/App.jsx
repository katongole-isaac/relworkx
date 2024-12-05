import _ from "lodash";
import { useCallback, useEffect, useMemo, useState } from "react";

import "./App.css";
import TipCal from "./components/tipCal";
import Input from "./components/input";

import PersonIconSvg from "./assets/images/icon-person.svg";
import RadioInput from "./components/radio";
import Button from "./components/button";

import logger from "./services/logger";
import { Link } from "react-router-dom";

const App = () => {
  const [data, setData] = useState({
    numOfPeople: "",
    bill: "",
    tipPercentage: "",
    customTipPercentage: "",
    tipPerPerson: 0,
    totalAmountPerPerson: 0,
    __usedTipPercentage: "",
  });

  const [logs, setLogs] = useState([]);

  const [isInactive, setIsInactive] = useState(false);
  const inactivityDelay = 1500; // 5 seconds of inactivity

  let inactivityTimeout;

  // used on the radio
  // maps the custom inputs to radio btn
  const [activeId, setActiveId] = useState("");

  // As longer as we can derived this value,
  // no need of the state
  const [btnIsDisabled, setBtnIsDisabled] = useState(true);

  const calculateTip = useCallback(
    (data) => {
      const { bill, numOfPeople, customTipPercentage, tipPercentage } = data;

      let _tipPercentage,
        _bill,
        _numOfPeople,
        _totalAmountPerPerson = 0,
        _tipPerPerson = 0;

      // check whether we have these values

      if (!(bill && numOfPeople))
        return { _totalAmountPerPerson, _tipPerPerson };

      // It's not a must for one to pay a tip
      // in such a case set it to zero (0)
      if (!customTipPercentage && !tipPercentage) _tipPercentage = 0;
      else if (customTipPercentage) _tipPercentage = customTipPercentage;
      else _tipPercentage = tipPercentage;

      try {
        _bill = parseFloat(bill);
        _numOfPeople = parseInt(numOfPeople);
        _tipPercentage = parseFloat(_tipPercentage);

        if (
          !(
            !Number.isNaN(_bill) &&
            !Number.isNaN(_numOfPeople) &&
            !Number.isNaN(_tipPercentage)
          )
        )
          return { _totalAmountPerPerson, _tipPerPerson };

        // number of people must be above zero
        if (_numOfPeople <= 0) return { _totalAmountPerPerson, _tipPerPerson };

        // do clean calculations here

        _tipPerPerson = _bill * (_tipPercentage / 100);

        _totalAmountPerPerson = _bill / _numOfPeople;

        _totalAmountPerPerson += _tipPerPerson;

        // you can log here
        // only log when we have a tip

        setBtnIsDisabled(false);
        return {
          _totalAmountPerPerson,
          _tipPerPerson,
          __usedTipPercentage: _tipPercentage,
        };
      } catch (ex) {
        console.error("ERR_Calculating: ", ex);
        return;
      }
    },
    [data, btnIsDisabled]
  );

  /**
   *
   * @param {React.ChangeEvent<HTMLInputElement>} e
   */
  const handleOnChange = useCallback((e) => {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

    if (
      e.target.name === "customTipPercentage" ||
      e.target.name === "tipPercentage"
    )
      setActiveId(e.target.value);
  }, []);

  const handleReset = () => {
    setData({
      numOfPeople: "",
      bill: "",
      tipPercentage: "",
      customTipPercentage: "",
      tipPerPerson: 0,
      totalAmountPerPerson: 0,
    });
    setBtnIsDisabled(true);
  };

  const handleOnRadioClick = useCallback(
    (value) => {
      if (value !== parseFloat(data.customTipPercentage));
      setData((prev) => ({ ...prev, customTipPercentage: "" }));
    },
    [data]
  );

  const handleInactivity = useCallback(() => {
    setIsInactive(true);
    setLogs((prev) => [...prev, data]);
  }, [data]);

  const resetInactivityTimer = () => {
    clearTimeout(inactivityTimeout);
    inactivityTimeout = setTimeout(handleInactivity, inactivityDelay);
  };

  const _result = useMemo(() => calculateTip(data), [data]);

  useEffect(() => {
    if (_result) {
      // For preventing infinite loop cause by the setData (state update)
      if (
        _result._totalAmountPerPerson === data.totalAmountPerPerson &&
        _result._tipPerPerson === data.tipPerPerson
      )
        return;

      setData((prev) => ({
        ...prev,
        totalAmountPerPerson: _result._totalAmountPerPerson,
        tipPerPerson: _result._tipPerPerson,
        __usedTipPercentage: _result.__usedTipPercentage,
      }));
    }
  }, [_result, data]);

  useEffect(() => {
    // if we don't have the customPercentage
    // default back to the last click tipPercentage
    if (!data.customTipPercentage && data.tipPercentage)
      setActiveId(data.tipPercentage);
  }, [data]);

  useEffect(() => {
    const events = ["mousemove", "keydown", "click", "scroll", "focus"];

    events.forEach((event) => {
      window.addEventListener(event, resetInactivityTimer);
    });

    resetInactivityTimer();

    return () => {
      events.forEach((event) => {
        window.removeEventListener(event, resetInactivityTimer);
      });
      clearTimeout(inactivityTimeout);
    };
  }, [data]);

  useEffect(() => {
    if (logs.length > 0) {
      if (!data.numOfPeople && !data.bill && !data.__usedTipPercentage) return;
      logger(data);
      setLogs([]);
    }
  }, [logs]);

  return (
    <>
      <div className="container border border-gray-100 w-screen h-screen m-auto flex justify-center items-center font-space-mono flex-col gap-4">
        {/* card */}

        <div className="shadow-lg py-10 px-8 bg-custom-white border-gray-100 rounded-md border min-w-[800px] max-w-[900px] flex flex-wrap md:flex-nowrap gap-4 md:gap-8 ">
          <div className="flex-1">
            <div className="flex gap-6 flex-wrap ">
              <Input
                label="Bill"
                name={"bill"}
                value={data.bill}
                prefix={
                  <span className="text-[#9EBBBD] font-bold text-2xl"> $</span>
                }
                onChange={handleOnChange}
              />

              <div className="w-full min-w-full">
                <label
                  htmlFor="tip_percentage"
                  className="block mb-2 text-lg font-semibold text-grayish-cyan "
                >
                  Select Tip %
                </label>
                <div className="flex justify-center gap-3 flex-wrap">
                  <RadioInput
                    label="5%"
                    value={5}
                    name="tipPercentage"
                    onChange={handleOnChange}
                    onClick={handleOnRadioClick}
                    activeId={activeId}
                  />
                  <RadioInput
                    label="10%"
                    value={10}
                    name="tipPercentage"
                    onChange={handleOnChange}
                    onClick={handleOnRadioClick}
                    activeId={activeId}
                  />
                  <RadioInput
                    label="15%"
                    value={15}
                    name="tipPercentage"
                    onChange={handleOnChange}
                    onClick={handleOnRadioClick}
                    activeId={activeId}
                  />
                  <RadioInput
                    label="25%"
                    value={25}
                    name="tipPercentage"
                    onChange={handleOnChange}
                    onClick={handleOnRadioClick}
                    activeId={activeId}
                  />
                  <RadioInput
                    label="50%"
                    value={50}
                    name="tipPercentage"
                    onChange={handleOnChange}
                    onClick={handleOnRadioClick}
                    activeId={activeId}
                  />
                  <div className="flex-1">
                    <input
                      type="number"
                      id="tipPercentage"
                      value={data.customTipPercentage}
                      name="customTipPercentage"
                      onChange={(e) => handleOnChange(e)}
                      aria-describedby="helper-text-explanation"
                      className={`bg-very-light-grayish-cyan border  text-dark-cyan rounded-lg focus:outline-none
            focus:ring-very-light-grayish-cyan 
            focus:ring-2 focus:border-strong-cyan  inline-flex  ps-5 p-2.5 text-right placeholder:font-semibold text-xl font-semibold w-full `}
                      placeholder="Custom"
                      pattern="^\d+(\.\d+)?$"
                      required
                    />
                  </div>
                </div>
              </div>
              <Input
                label=" Number of People"
                prefix={<img src={PersonIconSvg} alt="person-icon-svg" />}
                name="numOfPeople"
                value={data.numOfPeople}
                onChange={(e) => handleOnChange(e)}
              />
            </div>
          </div>
          <div className=" flex-1 flex flex-col gap-10  px-8 py-8 rounded-lg bg-dark-cyan relative">
            <TipCal label="Tip Amount" amount={data.tipPerPerson} />
            <TipCal label="Total" amount={data.totalAmountPerPerson} />

            <div className="absolute bottom-5 w-full left-0 p-3 px-6">
              <Button disabled={btnIsDisabled} onClick={handleReset} />
            </div>
          </div>
        </div>

        <div className="">
          <Link className="hover:underline hover:text-blue-600" to="/admin">
            {" "}
            Go to Admin Dashboard
          </Link>
        </div>
      </div>
    </>
  );
};

export default App;
