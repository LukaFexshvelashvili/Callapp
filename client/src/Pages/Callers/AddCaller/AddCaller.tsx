import { useState } from "react";
import "./AddCaller.css";
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
export default function AddCaller(props: {
  setLoader: React.Dispatch<React.SetStateAction<boolean>>;
  setCallers: React.Dispatch<React.SetStateAction<ICaller[]>>;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [gender, setGender] = useState<number>(-1);
  const [adder, setAdder] = useState<boolean>(false);

  const submitCaller = (e: React.FormEvent<HTMLFormElement>) => {
    props.setLoader(true);
    e.preventDefault();
    axios
      .post("http://localhost:3001/addCaller", {
        name,
        email,
        phone,
        address: {
          street,
          city,
        },
        gender: gender == 0 ? "male" : "female",
      })
      .then((res) => {
        props.setCallers(res.data);
        props.setLoader(false);
        setName("");
        setEmail("");
        setPhone("");
        setStreet("");
        setCity("");
        setGender(-1);
      });
  };
  return (
    <div className={`AddCaller${adder ? " AddC" : ""}`}>
      <div className="CloseAdd" onClick={() => setAdder(false)}>
        <span></span>
        <span></span>
      </div>
      <div className="AddStarter" onClick={() => setAdder(true)}>
        Add Caller
      </div>
      <div className="AddCallerForm">
        <form onSubmit={(e) => submitCaller(e)}>
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

          <button className="AddCall">Add Caller</button>
        </form>
      </div>
    </div>
  );
}
