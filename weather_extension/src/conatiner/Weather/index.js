import React, { useState } from "react";
import axios from "axios";

import ListView from "./../../components/ListView";
import getWeatherImg from "../../utils/getWeatherImg";
import getDustStatus from "../../utils/getDustStatus";
import "./Weather.scss";

const Weather = () => {
   const [text, setText] = useState("");
   const [value, setValue] = useState("");

   const submit = () => {
      axios.post("http://localhost:4000", { place: text }).then(res => {
         console.log(res);
         setValue(res.data);
      });
   };

   return (
      <>
         <input onChange={e => setText(e.target.value)} value={text}></input>
         <button onClick={submit}>전송</button>

         {value && (
            <div>
               <div className="now">
                  <img src={getWeatherImg(value.todayCondition[0], "big")} />
                  <div className="now-temp">
                     {value.now} <span style={{ fontSize: "1.5rem" }}>℃</span>
                  </div>
                  <div className="now-dust">
                     {value.dustData.map((el, i) => (
                        <div>
                           <div>{el.name}</div>
                           <div style={{ color: getDustStatus(el.status) }}>
                              {el.detail}
                           </div>
                        </div>
                     ))}
                  </div>
               </div>
               <div>
                  <div className="txt-bold" style={{ padding: "10px" }}>
                     시간대별 날씨
                  </div>
                  <ListView data={value.todayTmp} type={1}></ListView>
                  <ListView data={value.todayCondition} type={2}></ListView>
                  <ListView data={value.todayTime} type={3}></ListView>
               </div>
            </div>
         )}
      </>
   );
};

export default Weather;
