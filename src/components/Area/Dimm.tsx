import React from "react";
import styled from "styled-components";

const Dimmed = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  background: #000;
  opacity: 0.3;
  filter: alpha(opacity=30);
`;

interface Props { 
  onClick?: (event: React.MouseEvent) => void;
}

const Dimm = ({ onClick }: Props) => {
  return (
    <Dimmed id="dimmed" onClick={onClick}/>
  );
};

export default Dimm;