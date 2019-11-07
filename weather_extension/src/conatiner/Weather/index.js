import React, { useState, useEffect } from "react";
import axios from "axios";

import ListView from "./../../components/ListView";
import getWeatherImg from "../../utils/getWeatherImg";
import getDustStatus from "../../utils/getDustStatus";
import "./Weather.scss";

const Weather = () => {
   const [text, setText] = useState("");
   const [value, setValue] = useState("");

   useEffect(() => {
      chrome.storage.sync.get("locate", data => {
         if (Object.keys(data).length !== 0) fetchData(data.locate);
      });
   }, []);

   const submit = () => {
      fetchData(text);
      chrome.storage.sync.set({ locate: text }, function() {});
   };

   const fetchData = text => {
      axios.post("http://localhost:4000", { place: text }).then(res => {
         if (res.status === 200) {
            setValue(res.data);
         } else if (res.status === 404) {
            console.log(res);
            setValue();
         }
      });
   };

   return (
      <>
         <input onChange={e => setText(e.target.value)} value={text}></input>
         <button onClick={submit}>전송</button>

         {!value && <div>데이터가 엄서요</div>}

         {value && (
            <div>
               <div
                  className="txt-bold"
                  style={{ fontSize: "16px", padding: "10px" }}
               >
                  {value.current}
               </div>
               <div className="now">
                  <img src={getWeatherImg(value.todayCondition[0], "big")} />
                  <div>
                     <span className="now-temp">
                        {value.now}
                        <span style={{ fontSize: "1.5rem" }}>℃</span>
                     </span>
                     {value.tmiData.map((el, i) => (
                        <div key={i}>{el}</div>
                     ))}
                  </div>
                  <div className="now-dust">
                     {value.dustData.map((el, i) => (
                        <div key={i}>
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
