import React, { useState } from "react";
import styled from "styled-components";

type JenkinsProps = {
  name: string;
};

const Logo = styled.img`
  display: inline-block;
  margin: 10px;
  float: left;
  cursor: help;
`;

const Hone = styled.h1`
  display: inline-block;
  margin-left: 10px;
  padding: 7px 15px;
`;

const Name = styled.em`
  letter-spacing: 7px;
  color: #403b3b;
`;

const Jenkins: React.FC<JenkinsProps> = ({ name }) => {
  const [who_show, setWhoShow] = useState(false);

  const handleMouseOver = (): void => setWhoShow(true);
  const handleMouseOut = (): void => setWhoShow(false);

  const MSG = who_show
    ? ["오늘의 젠킨스씨는 ", <Name key={"NK"}>{name}</Name>, "입니다."]
    : [<Name key={"NK"}>{name}</Name>,`님 오하요~`];

  return (
    <header>
      <Logo
        // src={require("../img/jenkins.png")}
        src={"img/jenkins.png"}
        width={"50px"}
        // className="App-logo"
        alt="jenkins"
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
      />

      <Hone>{MSG}</Hone>
    </header>
  );
};
export default Jenkins;
