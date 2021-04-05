import React from "react";
import styled from "styled-components";
import Dimm from "./Dimm";
import Calendar from "./Calendar";
import Menu from "./Menu";
import Setting from "./Setting";
import NAME from "../../utils/Enum";
interface Props {
  modal_show: string;
  monday?: string;
  menuList?: any;
  onClick: (event: React.MouseEvent) => void;
  onIconClick: (name:string,event: React.MouseEvent) => void;
  setMenuProp: (monday: string, list: any) => void;
}

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
          <Setting onIconClick={onIconClick} />
        }
      </Dialog>
    </>
  );
};

export default Modal;
