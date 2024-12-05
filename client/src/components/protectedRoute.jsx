import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Protected = ({ children }) => {
  const navigate = useNavigate();
  useEffect(() => {
    if ("localStorage" in window) {
      const user = window.localStorage.getItem("_user");
      if (!user) navigate("/admin");

      try {
        const parsed = JSON.parse(user);
        if (
          !(
            Object.hasOwn(parsed, "username") &&
            Object.hasOwn(parsed, "password")
          )
        )
          navigate("/admin");
      } catch (ex) {
        return navigate("/admin");
      }
    }
  }, []);

  return <>{children}</>;
};

export default Protected;
