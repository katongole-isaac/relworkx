import { Route, Routes } from "react-router-dom";

import App from "./App";
import Admin from "./components/admin";
import Protected from "./components/protectedRoute";
import Auth from "./components/auth";

export default function () {
  return (
    <Routes>
      <Route index element={<App />} />
      <Route path="/admin" element={<Auth />} />
      <Route
        path="/admin/dashboard"
        element={
          <Protected>
            <Admin />
          </Protected>
        }
      />
    </Routes>
  );
}
