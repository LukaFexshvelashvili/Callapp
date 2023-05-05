import "./Stats.css";
import React, { useState, useEffect, useRef } from "react";
import { Pie } from "@ant-design/plots";
import { Link } from "react-router-dom";
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
interface ICountryStats {
  city: string;
  quantity: number;
}

export default function Stats(props: {
  callers: ICaller[];
  setCallers: React.Dispatch<React.SetStateAction<ICaller[]>>;
}) {
  const allCountries = useRef<string[]>([]);
  const [dash, setDash] = useState<any>();
  const [countriesStats, setCountriesStats] = useState<ICountryStats[]>([]);
  useEffect(() => {
    let newStats: ICountryStats[] = countriesStats;
    props.callers.map((e: ICaller, i: number) => {
      if (allCountries.current.includes(e.address.city)) {
        let getInd: number = newStats.findIndex(
          (item) => item.city == e.address.city
        );
        newStats[getInd].quantity += 1;
      } else {
        allCountries.current.push(e.address.city);
        newStats.push({ city: e.address.city, quantity: 1 });
      }
      if (props.callers.length - 1 == i) {
        setCountriesStats(newStats);
      }
    });

    const DemoPie = () => {
      const data: { type: string; value: number }[] = [];
      countriesStats.map((e: ICountryStats) =>
        data.push({ type: e.city, value: e.quantity })
      );
      const config = {
        appendPadding: 10,
        data,
        angleField: "value",
        colorField: "type",
        radius: 0.9,
        label: {
          type: "inner",
          offset: "-30%",
          content: ({ percent }: { percent: number }) =>
            `${(percent * 100).toFixed(0)}%`,
          style: {
            fontSize: 14,
            textAlign: "center",
          },
        },
        interactions: [
          {
            type: "element-active",
          },
        ],
      };
      return <Pie {...config} />;
    };
    setDash(<DemoPie />);
  }, [props.callers]);

  return (
    <div className="Callers">
      <h1>ANALYTICS</h1>
      <div className="Line"></div>
      <div>All Callers: {props.callers.length}</div>
      <div id="PieChart">{dash}</div>
      <Link to={"/"}>
        <button className="GoBack">Go Back</button>
      </Link>
    </div>
  );
}
