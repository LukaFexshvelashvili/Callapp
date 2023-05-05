import Caller from "../../Components/Caller/Caller";
import "./Callers.css";
import AddCaller from "./AddCaller/AddCaller";
import { Link } from "react-router-dom";
import UpdateBlock from "../../Components/Caller/UpdateBlock/UpdateBlock";
import { useState } from "react";
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
export default function Callers(props: {
  setLoader: React.Dispatch<React.SetStateAction<boolean>>;
  callers: ICaller[];
  setCallers: React.Dispatch<React.SetStateAction<ICaller[]>>;
}) {
  const [updateData, setUpdateData] = useState<ICaller>();
  const [updateBlock, setUpdateBlock] = useState<boolean>(false);

  return (
    <>
      <UpdateBlock
        updateData={updateData}
        updateBlock={updateBlock}
        setUpdateBlock={setUpdateBlock}
        setLoader={props.setLoader}
        setCallers={props.setCallers}
      />
      <div className="Callers">
        <Link className="goCharts" to={"/Stats"}>
          <button className="GoBack">STATISTICS</button>
        </Link>
        <h1>CALLERS</h1>
        <div className="Line"></div>
        <AddCaller setLoader={props.setLoader} setCallers={props.setCallers} />
        <div className="CallersRow">
          {props.callers
            .slice(0)
            .reverse()
            .map((e: ICaller) => (
              <Caller
                key={e.id}
                id={e.id}
                name={e.name}
                email={e.email}
                gender={e.gender}
                address={e.address}
                phone={e.phone}
                setLoader={props.setLoader}
                setCallers={props.setCallers}
                setUpdateData={setUpdateData}
                setUpdateBlock={setUpdateBlock}
              />
            ))}
        </div>
      </div>
    </>
  );
}
