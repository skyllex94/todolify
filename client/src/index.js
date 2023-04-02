import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
// Redux Store
import store from "./redux/store";
import { Provider } from "react-redux";

// import * as serviceWorkerRegistration from "./serviceWorkerRegistration";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

// window.addEventListener("load", async () => {
//   let sw = await navigator.serviceWorker.register("./service-worker.js");
//   console.log("sw:", sw);

//   console.log("sw:", sw);
//   console.log("Service worker registered");
// });

// serviceWorkerRegistration.register();
