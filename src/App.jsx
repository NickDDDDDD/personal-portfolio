import HomePage from "./pages/HomePage";
import { AliveScope } from "react-keep-alive";

function App() {
  return (
    <AliveScope>
      <HomePage />
    </AliveScope>
  );
}

export default App;
