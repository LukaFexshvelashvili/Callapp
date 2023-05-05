import axios from "axios";
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

export default function Caller(props: {
  id: number;
  name: string;
  email: string;
  gender: string;
  address: {
    street: string;
    city: string;
  };
  phone: string;
  setLoader: React.Dispatch<React.SetStateAction<boolean>>;
  setCallers: React.Dispatch<React.SetStateAction<ICaller[]>>;
  setUpdateData: React.Dispatch<React.SetStateAction<ICaller | undefined>>;
  setUpdateBlock: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [openCaller, setOpenCaller] = useState(false);
  const callerInfo: ICaller = {
    id: props.id,
    name: props.name,
    email: props.email,
    gender: props.gender,
    address: {
      street: props.address.street,
      city: props.address.city,
    },
    phone: props.phone,
  };
  // REMOVE CALLER

  const deleteCall = (callId: number) => {
    props.setLoader(true);
    axios
      .delete("http://localhost:3001/deleteCaller", {
        headers: {
          Authorization: "123",
        },
        data: { id: callId },
      })
      .then((res) => {
        props.setLoader(false);
        props.setCallers(res.data);
      });
  };
  const setUpdater = () => {
    props.setUpdateBlock(true);
    props.setUpdateData(callerInfo);
  };
  return (
    <div className={`Caller${openCaller ? " CallerActive" : ""}`}>
      <div className="CallerStarter">
        <div className="Id">{props.id}</div>
        <div className="CallerName">
          <p className="Title">{props.name}</p>
          <p>{props.email}</p>
        </div>
        <div className="HLine"></div>
        <div className="CallerNumber">{props.phone}</div>
        <div className="CallerButtons">
          <button onClick={() => setOpenCaller(!openCaller)}>
            {openCaller ? "Less" : "More"} Details
          </button>
        </div>
      </div>
      <div className="Line"></div>
      <div className="CallerDetails">
        <button className="updateCaller" onClick={() => setUpdater()}>
          Update
        </button>
        <button className="deleteCaller" onClick={() => deleteCall(props.id)}>
          Delete
        </button>

        <div className="DetRow">
          <h3>Address</h3>
          <p>
            Street: <span>{props.address.street}</span>
          </p>
          <p>
            City: <span>{props.address.city}</span>
          </p>
        </div>
        <div className="HLineDesc"></div>
        <div className="DetRow">
          <h3>More Info</h3>
          <p>
            Gender: <span>{props.gender}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
