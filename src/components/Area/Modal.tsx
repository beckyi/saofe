import React from "react";
import styled from "styled-components";

import NAME from "../../utils/Enum";
import Calendar from "./Calendar";
import Menu from "./Menu";

const Dialog = styled.div`
  bottom: 55px;
  left: 7px;

--sidebar-width: 180px;
    height: 450px;
    width: 700px;
    max-width: none;
    padding: 0;
    z-index: 1;

    max-height: 100vh;
    max-width: 100vw;
    min-width: 200px;
    padding: 10px;
    position: absolute;
    z-index: 2;
    background: white;
    border-radius: 10px;
    overflow-x: hidden;
    overflow-y: auto;
    text-align: left;
    text-shadow: none;

    transition: var(--a-default);
}
`;

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

interface Props {
  modal_show: string;
  onClick: (event: React.MouseEvent) => void;
}

const Modal = ({ modal_show, onClick }: Props) => {
  return (
    <>
      <Dimm id="dimmed" onClick={onClick} />
      <Dialog id="Modal">
        {modal_show === NAME.CALENDAR && <Calendar modal_show={modal_show} />}
        {modal_show === NAME.RICE && <Menu />}
      </Dialog>
    </>
  );
};

export default Modal;
