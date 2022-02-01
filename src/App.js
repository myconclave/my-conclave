import { Suspense } from "react";
import { Provider } from "react-redux";

import store from "./store";
import "./App.scss";
import MyRoutes from "./MyRoutes";

const App = () => {
  return (
    <Provider store={store}>
      <Suspense fallback={<div>Loading...</div>}>
        <MyRoutes />
      </Suspense>
    </Provider>
  );
};

export default App;
