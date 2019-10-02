import React from "react";
import getWeatherImg from "../../utils/getWeatherImg";
import "./ListView.css";

const ListView = ({ data, type }) => {
   return (
      <div className="listview">
         {type === 1 && data && data.map((el, i) => <p key={i}>{el}℃</p>)}
         {type === 2 &&
            data &&
            data.map((el, i) => (
               <img key={i} src={getWeatherImg(el, "small")} />
            ))}
         {type === 3 && data && data.map((el, i) => <p key={i}>{el}</p>)}
      </div>
   );
};

export default ListView;
