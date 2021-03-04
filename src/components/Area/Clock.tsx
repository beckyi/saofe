import React, { useState, useEffect } from "react"; //MouseEvent
import styled from "styled-components";
import {getTodayYMD} from "../../utils/utils";
import NAME from "../../utils/Enum";
import BrowserStorage from "../../utils/BrowserStorage";

let tictokIV: number = 0;

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
  font-family: sans-serif;
  font-size: 1.3em;
  letter-spacing: 5px;
  text-align: center;
  color: #fff;
  cursor: wait;
`;

const AMPM = styled.h3`
  display: inline;
  position: absolute;
  margin: 0px;
  top: -15px;
  left: -10px;
  color: white;
`;

const SEC = styled.div`
  display: inline-block;
  position: absolute;
  bottom: 15px;
  margin-left: 25px;
  color: #fff;
  line-height: 1;
  font-size: 30px;
`;

interface IAppProps {
  clockMode: string;
  secondMode: boolean;
}

interface tObj {
  homin: string;
  sec: string;
}

interface alObj {
  time: string;
  check: boolean;
}

let today = new Date();

const fillChar = (item: number, num: number, ch: string) => {
  return item.toString().padStart(num, ch);
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

//시간 재는 함수
const tiktockTime = (clockMode:string):tObj=> {

  today = new Date();

  let hour:number = today.getHours();
  let min:number = today.getMinutes();
  let sec:number = today.getSeconds();

  if(clockMode === "am/pm" && hour > 12){
    hour = hour - 12;
  }

  let time:string =
    fillChar(hour, 2, "0") +
    ":" +
    fillChar(min, 2, "0");

  return {homin: time, sec: fillChar(sec, 2, "0")};
}

// const handleMouseOver = (event: MouseEvent): void => {
//   console.log("TOUCH", event);
//   //showDate(true);
// };

const checkAlramTime = (pTime:string):void => {
  const {GROUP} = NAME;
  const storage = new BrowserStorage("local");
  const storage_id = `${GROUP}ALARM-${getTodayYMD()}`;
  const data = storage.getItem(storage_id)

  if(pTime && data){
    let times:Array<string> = [];
    data.forEach((item:alObj)=>{
      if(item.check && item.time){
        times.push(item.time);
      }
    });
    const idx:number = times.indexOf(pTime.replace(":",""));
    if(idx > -1){
      let notify = new Notification('알림이 왔습니다.', {
      'body': '안녕하세요. \n알림을 성공적으로 수신했습니다.',
      'icon': 'https://tistory3.daumcdn.net/tistory/2979840/attach/6e5d2d16ab6a49628dfe1f4c164e38a0',
      'tag': '메시지'
      });
      notify.onclick = function(){
        alert(this.tag)
      }
      notify.onerror = function(){
        alert(this.tag)
      }
      notify.onshow = function() { setTimeout(notify.close, 5000) }

      storage.setItem(storage_id, data.splice(idx,1));
    }
  }
};

const Clock = (props:IAppProps) => {
  const {clockMode, secondMode} = props;
  const date = setDate();
  const [time, setTime] = useState<string>("00:00");
  const [seconds, setSec] = useState<string>("00");
  const [isShow, showDate] = useState<boolean>(false);
  const apm = today.getHours() > 12 ? "PM" : "AM";

  const handleMouseOver = (): void => showDate(true);
  const handleMouseOut = (): void => showDate(false);
  
  useEffect(() => {
  
    console.log('tictokIV>',tictokIV, clockMode, secondMode)

    if(tictokIV > 0){
      clearInterval(tictokIV);
      
      const ptime:tObj = tiktockTime(clockMode);

      if(time !== ptime.homin){
        setTime(ptime.homin);
      }
      if(secondMode)  setSec(ptime.sec);
    }

    tictokIV = setInterval(() => {
      //FIXME: 실시간 카운트
      const ttime:tObj = tiktockTime(clockMode);
      checkAlramTime(ttime.homin);
      setTime(ttime.homin);
      if(secondMode)  setSec(ttime.sec);
    }, 1000); //0.1 second
    
    return () => {
      console.log('unmounted',tictokIV);
      clearInterval(tictokIV);
    };
  },[clockMode, secondMode]);
  
  return (
    <div style={{position: "relative"}}>
      {clockMode === "am/pm" && 
        <AMPM>{apm}</AMPM>
      }
      <div style={{display: "inline-block"}}>
        <Timer id={"TIMER"} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
          {time}
        </Timer>
        {isShow && <Dater>{date}</Dater>}
      </div>
      {secondMode && 
        <SEC>{seconds}</SEC>
      }
    </div>
  );
};

export default Clock;
