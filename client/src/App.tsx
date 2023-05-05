import { useEffect, useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Callers from "./Pages/Callers/Callers";
import Stats from "./Pages/Stats/Stats";
import axios from "axios";
interface ICaller {
  id: number;
  name: string;
  email: string;
  gender: string;
  address: {
    street: string;
    city: string;
  };
  phone: string;
}
function App() {
  const [loader, setLoader] = useState<boolean>(false);
  const [callers, setCallers] = useState<ICaller[]>([]);

  useEffect(() => {
    axios.get("http://localhost:3001/getResults").then((res) => {
      setCallers(res.data);
    });
  }, []);

  return (
    <>
      <div className={`Loader${loader ? " LoaderShow" : ""}`}>
        <div className="LoaderBlock"></div>
      </div>
      <Routes>
        <Route path="/">
          <Route
            index
            element={
              <Callers
                callers={callers}
                setCallers={setCallers}
                setLoader={setLoader}
              />
            }
          />
          <Route
            path="/Stats"
            element={<Stats callers={callers} setCallers={setCallers} />}
          />
        </Route>
      </Routes>
    </>
  );
}

export default App;
