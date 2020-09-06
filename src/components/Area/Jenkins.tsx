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
  onClick: (event: React.MouseEvent) => void;
};

const Jenkins: React.FC<JenkinsProps> = ({ name, ...props }) => (
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
    <Icon name={"setting"} {...props}/>
  </header>
);

export default Jenkins;
