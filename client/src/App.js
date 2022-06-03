import React, { useState } from "react";
import { UidContext } from "./components/AppContext";
import Routes from "./components/routes";

const App = () => {
  const [uid, setUid] = useState(null);
  return (
    <UidContext.Provider value={uid}>
      <Routes />
    </UidContext.Provider>
  );
};

export default App;
