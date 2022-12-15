import { Provider } from "react-redux";
import "./App.css";
import AnalyticsBoard from "./components/Dashboard/AnalyticsBoard";
import store from "./Redux/store";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <AnalyticsBoard></AnalyticsBoard>
      </div>
    </Provider>
  );
}

export default App;
