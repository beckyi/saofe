
import { time } from "console";
import React, {useState, useEffect} from "react";
import styled from "styled-components";
import BrowserStorage from "../../utils/BrowserStorage";
import NAME from "../../utils/Enum";
import {getTodayYMD} from "../../utils/utils";

const Dimm = styled.div`
  overflow: hidden;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1100;
  background: #000;
  opacity: 0.3;
  filter: alpha(opacity=30);
`;

const AlarmModal = styled.div`
  position: absolute;
  display: inline-block;
  background: rgb(0 0 0);
  right: 55px;
  top: 15px;
  height: 200px;
  width: 200px;
  opacity: 0.7;
  border-radius: 10px;
  cursor: default;
  z-index: 1101;
`;

const AlWrap = styled.div`
  position: relative;
  height: calc(100% - 20px);
  width: calc(100% - 20px);
  text-align: center;
  padding: 10px;
`;

const AlItem = styled.div`
  padding: 15px 0px;
  border: 0.5px solid white;
  border-radius: 10px;
  margin: 4px 0px;
  &:first-child {
    margin-top: 2px;
  }
  &:last-child {
    margin-bottom: 2px;
  }
`

const SwitchWrap = styled.div`
  position: relative;
  display: inline-block;
  z-index: 1102;
  float: right;
  right: 6px;
  bottom: 2px;
`;
// `
//   position: relative;
//   display: inline-block;
//   width: 60px;
//   height: 34px;
// `;

const Slider = styled.label`
  position: absolute;
  top: 0;
  left: 0;
  width: 42px;
  height: 26px;
  border-radius: 15px;
  background: #bebebe;
  cursor: pointer;
  &::after {
    content: "";
    display: block;
    border-radius: 50%;
    width: 18px;
    height: 18px;
    margin: 3px;
    background: #ffffff;
    box-shadow: 1px 3px 3px 1px rgba(0, 0, 0, 0.2);
    transition: 0.2s;
  } 
`;

const CheckInput = styled.input`
  opacity: 0;
  z-index: 1103;
  margin: 0px;
  width: 42px;
  height: 26px;
  &:checked + ${Slider} {
    background: #4fbe79;
    &::after {
      content: "";
      display: block;
      border-radius: 50%;
      width: 18px;
      height: 18px;
      margin-left: 21px;
      transition: 0.2s;
    }
  }
`;
 
interface IWFProps{
  onClick: (event: React.MouseEvent) => void;
}
interface alObj {
  time: string;
  check: boolean;
}
interface childProps{
  idx: number;
  time: string;
  check: boolean;
  updateCallback: (idx: number, param:alObj) => void;
}

const storage = new BrowserStorage("local");
const {GROUP} = NAME;
const storage_id = `${GROUP}ALARM-${getTodayYMD()}`;

const checkTime = (ptime:string):boolean => {
  let bool:boolean = true;
  const now = new Date();
  let now_str = `${now.getHours().toString().padStart(2, "0")}${now.getMinutes()}`;   //hhmm
  const now_num = parseInt(now_str);
  const time_num = parseInt(ptime);
  if(now_num >= time_num){
    bool = false;
  } else if (Math.abs(time_num - now_num) < 6){
    bool = false;
  }
  
  return bool;
}

const TimePicker = (props:childProps) => {
  const {idx, time, check, updateCallback} = props;
  const handleOnChange = (event:React.ChangeEvent<HTMLInputElement>):void => {
    const target = event.target as HTMLInputElement;
    const value:string = target.value;
    const bool:boolean = !value && check ? false : check;
    if(checkTime(value.replace(":",""))){
      //현재시간보다 빠르지 않을 경우 적용
      updateCallback(idx, {time: value, check: bool});
    } else {
      alert("시간을 다시 입력해주세요.")
    }
  };
  const handleTest = (event:React.FocusEvent<HTMLInputElement>):void => {
    const target = event.target as HTMLInputElement;
    console.log(event, target, target.id, target.value)
  };
  return (<input type="time" id={`timepick${idx}`} value={time} onChange={handleOnChange} onBlur={handleTest}/>);
};

const SwitchBtn = (props:childProps) => {
  const {idx, time, check, updateCallback} = props;
  const handleOnClick = (event:React.MouseEvent):void => {
    const target = event.target as HTMLInputElement;
    if(!time && target.checked){
      //시간이 없을 경우 사용 불가능
      event.preventDefault();
    } else {
      //끌 경우 시간 초기화
      const val = !target.checked ? "" : time;
      updateCallback(idx, {time: val, check: target.checked});
    }
  };
  return (
    <SwitchWrap>
      <CheckInput id={`checkbox${idx}`} type="checkbox" checked={check} onClick={handleOnClick}/>
      <Slider htmlFor={`checkbox${idx}`} />
    </SwitchWrap>
  );
}

const Alarm: React.FunctionComponent<IWFProps> = ({onClick}: IWFProps) => {
  const [alTimes, setAlramTime] = useState([{time:"", check: false}, {time:"", check: false}, {time:"", check: false}]);
  useEffect(() => {
    const save_alarm = storage.getItem(storage_id);
debugger
    if(save_alarm && save_alarm.length === 3){
      setAlramTime(save_alarm);
    }
  },[]);

  const saveAlramDatas = (idx:number, param:alObj):void => {
    let result = alTimes.slice(0)
    result[idx] = param;
    setAlramTime(result);
debugger;
    storage.setItem(storage_id,JSON.stringify(result));
  }

  return (
    <>
      <Dimm id="dimmed" onClick={onClick} />
      <AlarmModal>
        <AlWrap>
        {alTimes.map((item:alObj, idx:number) =>{
          const {time, check} = item;
          return (
            <AlItem>
              <TimePicker idx={idx} time={time} check={check} updateCallback={saveAlramDatas}/> 
              <SwitchBtn idx={idx} time={time} check={check} updateCallback={saveAlramDatas}/>
            </AlItem>
          );
        })}
        </AlWrap>
      </AlarmModal>
    </>
  );
};


export default Alarm;