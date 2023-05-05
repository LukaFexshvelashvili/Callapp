import { useEffect, useState } from "react";
import "./UpdateBlock.css";
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
export default function UpdateBlock(props: {
  setLoader: React.Dispatch<React.SetStateAction<boolean>>;
  updateData?: ICaller;
  updateBlock: boolean;
  setUpdateBlock: React.Dispatch<React.SetStateAction<boolean>>;
  setCallers: React.Dispatch<React.SetStateAction<ICaller[]>>;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [gender, setGender] = useState<number>(-1);
  const updateCaller = (e: React.FormEvent<HTMLFormElement>) => {
    props.setLoader(true);
    e.preventDefault();
    axios
      .post("http://localhost:3001/updateCaller", {
        id: props.updateData?.id == undefined ? -1 : props.updateData?.id,
        name,
        email,
        gender: gender == 0 ? "male" : "female",
        address: {
          street,
          city,
        },
        phone,
      })
      .then((res) => {
        props.setLoader(false);
        props.setCallers(res.data);
        props.setUpdateBlock(false);
      });
  };
  useEffect(() => {
    if (props.updateData !== undefined) {
      setName(props.updateData.name);
      setEmail(props.updateData.email);
      setPhone(props.updateData.phone);
      setStreet(props.updateData.address.street);
      setCity(props.updateData.address.city);
      if (props.updateData.gender == "male") {
        setGender(0);
      } else if (props.updateData.gender == "female") {
        setGender(1);
      }
    }
  }, [props.updateData]);

  return (
    <div className={`UpdateBlock${props.updateBlock ? " UpdateBlockC" : ""}`}>
      <div className="closeUpdate" onClick={() => props.setUpdateBlock(false)}>
        <span></span>
        <span></span>
      </div>
      <h1>Update Caller</h1>
      <div className="Line"></div>
      <form onSubmit={(e) => updateCaller(e)}>
        <div className="InpRow">
          <div className="InpLabel">
            <p>Name</p>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="InpLabel">
            <p>Email</p>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="InpLabel">
            <p>Phone</p>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className="InpLabel">
            <p>Street</p>
            <input
              type="text"
              value={street}
              onChange={(e) => setStreet(e.target.value)}
            />
          </div>
          <div className="InpLabel">
            <p>City</p>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>
          <div className="InpLabel">
            <p>Gender</p>
            <div className="BRow">
              <div
                className={`Male${gender == 0 ? " MaleC" : ""}`}
                onClick={() => setGender(0)}
              >
                Male
              </div>
              <div
                className={`Female${gender == 1 ? " FemaleC" : ""}`}
                onClick={() => setGender(1)}
              >
                Female
              </div>
            </div>
          </div>
        </div>

        <button className="UpdateCall">Update Caller</button>
      </form>
    </div>
  );
}
