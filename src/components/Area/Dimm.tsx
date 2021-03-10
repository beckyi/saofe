import React from "react";
import styled from "styled-components";

interface Props { 
  brightness? : number;
  onClick?: (event: React.MouseEvent) => void;
}

const Dimmed = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  background: #000;
  opacity: ${(props:Props) => props.brightness ? props.brightness : 0.3};
  filter: alpha(opacity=30);
`;

const Dimm = ({ brightness, onClick }: Props) => {
  return (
    <Dimmed id="dimmed" brightness={brightness} onClick={onClick}/>
  );
};

export default Dimm;