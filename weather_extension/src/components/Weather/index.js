import React, { useState } from 'react';
import axios from 'axios';

const Weather = () => {
   const [text, setText] = useState('');

   const submit = () => {
      axios.post('http://localhost:4000', { place: text }).then(res => {
         // console.log(res);
      });
   };

   return (
      <>
         <input onChange={e => setText(e.target.value)} value={text}></input>
         <button onClick={submit}>전송</button>
      </>
   );
};

export default Weather;
