import React from "react";
import getWeatherImg from "../../utils/getWeatherImg";
import "./ListView.css";

const ListView = ({ data, type }) => {
   return (
      <div className="listview">
         {type === 1 && data && data.map((el, i) => <p key={i}>{el}°C</p>)}
         {type === 2 &&
            data &&
            data.map((el, i) => (
               <img
                  key={i}
                  style={{ width: 30, height: 30 }}
                  src={getWeatherImg(el)}
               />
            ))}
         {type === 3 && data && data.map((el, i) => <p key={i}>{el}</p>)}
      </div>
   );
};

export default ListView;
