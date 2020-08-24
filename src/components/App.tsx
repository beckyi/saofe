import React, { useState } from "react";
// import "../App.css";
import axios from "axios";
import styled from "styled-components";

const Full = styled.div`
  height: 100%;
  top: 0;
  position: absolute;
  right: 0;
  left: 0;
  bottom: 0;
`;

const Img = styled.img`
  display: inline-block;
  margin: 10px;
  float: left;
`;

const Temp = styled.span`
  height: 18px;
  width: 18px;
  transition: transform var(--a-fast) linear;
`;

const Hone = styled.h1`
  display: inline-block;
  margin-left: 10px;
`;

const EmptyElem = styled.span`
  flex: 1 0 50px;
  display: inline-flex;
  alignitems: center;
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
  text-shadow: 0 1px 5px rgba(0, 0, 0, 0.1);
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
    <Full>
      <div className="App">
        <Img
          // src={require("../img/jenkins.png")}
          src={"img/jenkins.png"}
          width={"50px"}
          // className="App-logo"
          alt="jenkins"
        />
        <header>
          <Hone>오늘의 젠킨스씨는 {name}입니다.</Hone>
        </header>
        <div
          style={{
            flex: "1 1 50%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
          }}
        ></div>
        <div style={{ display: "block" }}>
          <span style={{ display: "flex" }}>
            <EmptyElem />
            <span>
              <Clock id="timer">{time}</Clock>
            </span>
            <EmptyElem>
              <span
                style={{
                  textAlign: "center",
                  cursor: "pointer",
                  margin: "55px 25px",
                }}
              ></span>
              <svg
                className="icon icon-ellipsis dash-icon more-icon"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 60 60"
                height="22px"
                fill="#fff"
              >
                <path d="M8 22c-4.411 0-8 3.589-8 8s3.589 8 8 8 8-3.589 8-8-3.589-8-8-8zM52 22c-4.411 0-8 3.589-8 8s3.589 8 8 8 8-3.589 8-8-3.589-8-8-8zM30 22c-4.411 0-8 3.589-8 8s3.589 8 8 8 8-3.589 8-8-3.589-8-8-8z"></path>
              </svg>
            </EmptyElem>
          </span>
        </div>
      </div>
      <Temp>
        <svg
          className="toggle-icon"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 340.274 340.274"
          width="18px"
        >
          <path
            d="M293.629 127.806l-5.795-13.739c19.846-44.856 18.53-46.189 14.676-50.08l-25.353-24.77-2.516-2.12h-2.937c-1.549 0-6.173 0-44.712 17.48l-14.184-5.719c-18.332-45.444-20.212-45.444-25.58-45.444h-35.765c-5.362 0-7.446-.006-24.448 45.606l-14.123 5.734C86.848 43.757 71.574 38.19 67.452 38.19l-3.381.105-27.27 26.737c-4.138 3.891-5.582 5.263 15.402 49.425l-5.774 13.691C0 146.097 0 147.838 0 153.33v35.068c0 5.501 0 7.44 46.585 24.127l5.773 13.667c-19.843 44.832-18.51 46.178-14.655 50.032l25.353 24.8 2.522 2.168h2.951c1.525 0 6.092 0 44.685-17.516l14.159 5.758c18.335 45.438 20.218 45.427 25.598 45.427h35.771c5.47 0 7.41 0 24.463-45.589l14.195-5.74c26.014 11 41.253 16.585 45.349 16.585l3.404-.096 27.479-26.901c3.909-3.945 5.278-5.309-15.589-49.288l5.734-13.702c46.496-17.967 46.496-19.853 46.496-25.221V151.88c-.005-5.519-.005-7.446-46.644-24.074zM170.128 228.474c-32.798 0-59.504-26.187-59.504-58.364 0-32.153 26.707-58.315 59.504-58.315 32.78 0 59.43 26.168 59.43 58.315-.006 32.177-26.656 58.364-59.43 58.364z"
            fill="#FFF"
          ></path>
        </svg>
      </Temp>
    </Full>
  );
}

export default App;
