import React, { useState,useEffect } from "react"; //MouseEvent
import styled from "styled-components";

let tictokIV:any;

const Timer = styled.div`
  cursor: wait;
  display: block;
  text-align: center;
  font-size: 1050%;
  letter-spacing: -5px;
  font-weight: 500;
  color: #fff;
  line-height: 1;
  padding: 0;
  margin: 0;
  font-weight: 400;
  text-shadow: 0 1px 5px rgba(0, 0, 0, 0.1);
`;

const Dater = styled.div`
  cursor: wait;
  font-family: sans-serif;
  font-size: 1.3em;
  letter-spacing: 5px;
  text-align: center;
  color: #fff;
`;

const AMPM = styled.h3`
  display: inline;
  position: absolute;
  margin: 0px;
  top: -15px;
  left: -10px;
  color: white;
`;

let today = new Date();

const fillChar = (item: number, num: number, ch: string) => {
  return item.toString().padStart(num, ch);
};

const ticktock = (time: string, clockMode: string, _setState: any) => {
  console.log(tictokIV, clockMode)

  if(tictokIV === undefined){
    tictokIV = setInterval(() => {
      today = new Date();
      let hour:number = today.getHours();
      let min:number = today.getMinutes();
      console.log('2>',clockMode)
      if(clockMode === "am/pm" && hour > 12){
        hour = hour - 12;
      }
  
      time =
        fillChar(today.getHours(), 2, "0") +
        ":" +
        fillChar(today.getMinutes(), 2, "0");
  
      _setState(time);
    }, 1000); //0.1 second
  }
};

const setDate = (): string => {
  function dayChar(num: number) {
    return num === 1
      ? "MON"
      : num === 2
      ? "TUE"
      : num === 3
      ? "WED"
      : num === 4
      ? "THU"
      : num === 5
      ? "FRI"
      : num === 6
      ? "SAT"
      : "SUN"; // num === 0
  }

  return `${today.getFullYear()}.${fillChar(
    today.getMonth() + 1,
    2,
    "0"
  )}.${fillChar(today.getDate(),2,"0")}.${dayChar(today.getDay())}`;
};

// const handleMouseOver = (event: MouseEvent): void => {
//   console.log("TOUCH", event);
//   //showDate(true);
// };

interface IAppProps {
  clockMode: string;
}

const Clock = (props:IAppProps) => {
  const {clockMode} = props;
  const date = setDate();
  const [time, setTime] = useState<string>("00:00");
  const [isShow, showDate] = useState<boolean>(false);
  const apm = today.getHours() > 12 ? "PM" : "AM";

  const handleMouseOver = (): void => showDate(true);
  const handleMouseOut = (): void => showDate(false);

  ticktock(time, clockMode, setTime);
  console.log(time)
  return (
    <div style={{position: "relative"}}>
      {clockMode === "am/pm" && 
        <AMPM>{apm}</AMPM>
      }
      <Timer onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
        {time}
      </Timer>
      {isShow && <Dater>{date}</Dater>}
    </div>
  );
};

export default Clock;
