
import React from "react";
import styled from "styled-components";

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
  padding: 15px;
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

const SwitchBtn = () => {
  return (
    <SwitchWrap>
      <CheckInput type="checkbox" />
      <Slider htmlFor="checkbox" />
    </SwitchWrap>
  );
}

const Alarm: React.FunctionComponent<IWFProps> = ({onClick}: IWFProps) => {
  return (
    <>
      <Dimm id="dimmed" onClick={onClick} />
      <AlarmModal>
        <AlWrap>
        {[1,2,3].map((item)=>{
          return <AlItem><input type="time" style={{width:"88px"}}/> <SwitchBtn /></AlItem>
        })}
        </AlWrap>
      </AlarmModal>
    </>
  );
};


export default Alarm;