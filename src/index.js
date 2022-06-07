import React from "react";
import { BrowserRouter } from 'react-router-dom';
import { Provider} from 'react-redux';
import store from "./redux/Store";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
  <React.StrictMode>
  <Provider store={store}>
    <App />
  </Provider>
  </React.StrictMode>
  </BrowserRouter>
);

reportWebVitals();
