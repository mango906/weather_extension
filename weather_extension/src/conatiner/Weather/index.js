import React, { useState } from "react";
import axios from "axios";

import ListView from "./../../components/ListView";
import "./Weather.css";

const Weather = () => {
   const [text, setText] = useState("");
   const [value, setValue] = useState("");

   const submit = () => {
      console.log(text);
      axios.post("http://localhost:4000", { place: text }).then(res => {
         console.log(res.data);
         setValue(res.data);
      });
   };

   return (
      <>
         <input onChange={e => setText(e.target.value)} value={text}></input>
         <button onClick={submit}>전송</button>

         <div>
            <div className="txt-bold" style={{ padding: "10px" }}>
               {value && `시간대별 날씨`}
            </div>
            <ListView data={value.todayTmp} type={1}></ListView>
            <ListView data={value.todayCondition} type={2}></ListView>
            <ListView data={value.todayTime} type={3}></ListView>
         </div>
      </>
   );
};

export default Weather;
