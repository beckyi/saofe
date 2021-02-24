
import React from "react";
import styled from "styled-components";

const Dimm = styled.div`
  overflow: hidden;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  zindex: 1100;
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
 
interface IWFProps{
  onClick: (event: React.MouseEvent) => void;
}

const Alarm: React.FunctionComponent<IWFProps> = ({onClick}: IWFProps) => {
  return (
    <>
      <Dimm id="dimmed" onClick={onClick} />
      <AlarmModal>
        <AlWrap>
        {[1,2,3].map((item)=>{
          return <AlItem><input type="time"/> <input type="checkbox"/></AlItem>
        })}
        </AlWrap>
      </AlarmModal>
    </>
  );
};


export default Alarm;