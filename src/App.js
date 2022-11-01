import "./App.css";
import AppRoutes from "./routes/AppRoutes";
import { useState } from "react";
import { isEmpty } from "./helpers/string";

function App() {
  const [token, setToken] = useState("");
  const isActive = !isEmpty(token);
  return (
    <div className="App">
      <AppRoutes setToken={setToken} isActive={isActive} />
    </div>
  );
}

export default App;
