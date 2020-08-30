import React from "react";
import styled from "styled-components";
import Icon from "./Icon";

const Logo = styled.img`
  display: inline-block;
  margin: 10px;
  float: left;
`;

const Hone = styled.h1`
  display: inline-block;
  margin-left: 10px;
`;

const Name = styled.em`
  letter-spacing: 7px;
  color: #403b3b;
`;

type JenkinsProps = {
  name: string;
};

const Jenkins: React.FC<JenkinsProps> = ({ name }) => (
  <header>
    <Logo
      // src={require("../img/jenkins.png")}
      src={"img/jenkins.png"}
      width={"50px"}
      // className="App-logo"
      alt="jenkins"
    />
    <Hone>
      오늘의 젠킨스씨는 <Name>{name}</Name>입니다.
    </Hone>
    <Icon name={"setting"} />
  </header>
);

export default Jenkins;
