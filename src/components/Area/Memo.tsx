import React from "react";
import styled from "styled-components";

const Textarea = styled.textarea`
  width: 100%;
  height: 100%;
  border: 0px;
  background: transparent;
  outline: none;
  resize: none;
`;

const Memo = () => {
  return (
    <div className="rgyPostIt" style={{padding: "20px 20px 20px 15px"}}>
      <Textarea />
    </div>
  );
}

export default Memo;