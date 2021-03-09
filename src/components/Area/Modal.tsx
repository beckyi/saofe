import React from "react";
import styled from "styled-components";
import Dimm from "./Dimm";

import NAME from "../../utils/Enum";
import Calendar from "./Calendar";
import Icon from "./Icon";
import Menu from "./Menu";

const Dialog = styled.div`
  bottom: 55px;
  left: 7px;

  --sidebar-width: 180px;
  height: 450px;
  width: 713px;
  max-width: none;
  padding: 0;

  max-height: 100vh;
  max-width: 100vw;
  min-width: 200px;
  padding: 10px;
  position: absolute;
  background: white;
  border-radius: 10px;
  overflow-x: hidden;
  overflow-y: auto;
  text-align: left;
  text-shadow: none;

  transition: var(--a-default);
`;
interface Props {
  modal_show: string;
  monday?: string;
  menuList?: any;
  onClick: (event: React.MouseEvent) => void;
  onIconClick: (name:string,event: React.MouseEvent) => void;
  setMenuProp: (monday: string, list: any) => void;
}

const Modal = ({ modal_show, menuList, onClick, onIconClick, setMenuProp }: Props) => {
  return (
    <>
      <Dimm onClick={onClick} />
      <Dialog id="Modal">
        {modal_show === NAME.CALENDAR ?
          <Calendar modal_show={modal_show}/>
        : modal_show === NAME.RICE ?
          <Menu menuProp={menuList} setMenuProp={setMenuProp} />
        :
          <div>
            <Icon name={NAME.RESET} onClick={onIconClick} style={{display: "inline-block", float: "right"}}/>
            SETTING 🛠
            <hr/>
            What's your mood?
            IMAGE subject
          </div>
        }
      </Dialog>
    </>
  );
};

export default Modal;
