import React from "react";
import styled from "styled-components";

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

const Modal = () => {
  return <Dialog></Dialog>;
};

export default Modal;
