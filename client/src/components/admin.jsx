import { useEffect, useState } from "react";
import http from "../services/http";
import config from "../config/default.json";
import TipTable from "./tips/index";
import { useNavigate } from "react-router-dom";

const Admin = () => {
  const [tips, setTips] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    http
      .get(config.tipsEndpoint)
      .then((res) => {
        console.log(res.data.tips);
        setTips(res.data.tips);
      })
      .catch((ex) => console.error(ex));
  }, []);

  useEffect(() => {
    console.log(tips);
  }, [tips]);

  const handleLogout = () => {
    window.localStorage.removeItem("_user");
    navigate("/", { replace: true });
  };

  return (
    <div className="container m-auto font-space-mono">
      <div className="py-10 text-center text-2xl flex justify-center gap-2">
        <h1>Admin Dashboard For Recent Tips Calculations</h1>
      </div>
      <div className="text-right">
        <button
          className="text- py-2 inline-block text-blue-500 hover:text-blue-600 hover:underline"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
      {tips.length > 0 ? (
        <TipTable tips={tips} />
      ) : (
        <p className="text-center text-sm"> Waiting for tips calculation</p>
      )}
    </div>
  );
};

export default Admin;
