import React, { useState } from "react";
// import "../App.css";
import axios from "axios";
import styled from "styled-components";

const Img = styled.img`
  display: inline-block;
  margin: 10px;
  float: left;
`;

const Hone = styled.h1`
  display: inline-block;
  margin-left: 10px;
`;

function getRandomImg() {
  axios
    .get("https://api.unsplash.com/photos/random", {
      params: {
        client_id: "6K__wfATbrqMP4nTdz0iQeWQg-2GN58N0nlx7c128aM",
        count: 1,
      },
    })
    .then((response) => {
      console.log(response);
    });
}

const Clock = styled.div`
  display: block;
  text-align: center;
  font-size: 1050%;
  letter-spacing: -5px;
  font-weight: 500;
  color: #fff;
  line-height: 1;
  padding: 0;
  margin: 0;
  font-weight: 400;
`;

function ticktock(time: string, _setState: any) {
  setInterval(() => {
    let today = new Date();

    time =
      today.getHours().toString().padStart(2, "0") +
      ":" +
      today.getMinutes().toString().padStart(2, "0");
    _setState(time);
  }, 1000); //0.1 second
}

//nodeJS는 타입스크립트를 이해하지 못하므로 자바스크립트 컴파일 과정 필요
function App() {
  let name = "JENKINS";
  let [time, setTime] = useState("00:00");
  ticktock(time, setTime);

  return (
    <div className="App">
      <header>
        <Img
          // src={require("../img/jenkins.png")}
          src={"img/jenkins.png"}
          width={"50px"}
          // className="App-logo"
          alt="jenkins"
        />
        <Hone>오늘의 젠킨스씨는 {name}입니다.</Hone>
      </header>
      <Clock id="timer">{time}</Clock>
    </div>
  );
}

export default App;
