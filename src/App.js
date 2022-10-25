import "./App.css";
import AppRoutes from "./routes/AppRoutes";
import { isEmpty } from "./helpers/string";

function App() {
  const accountsToken = localStorage.getItem("account_token");
  const isActive = !isEmpty(accountsToken);

  return <div className="App">{AppRoutes(isActive)}</div>;
}

export default App;
