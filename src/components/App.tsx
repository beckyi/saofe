import React, { MouseEvent } from "react";
import axios from "axios";
import styled from "styled-components";

import { Container, Item, FxContainer, FxItem } from "./Layout";

import Jenkins from "./Area/Jenkins";
import Clock from "./Area/Clock";
import Icon from "./Area/Icon";
import Modal from "./Area/Modal";
import WriteForm from "./Area/WriteForm";

import NAME from "../utils/Enum";
import { getThisMonday } from "../utils/utils";
import BrowserStorage from "../utils/BrowserStorage";

const BaseGround = styled.div`
  height: 100%;
  min-width: 700px;
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  animation: fadeIn 2s;
  background-image: url(https://source.unsplash.com/category/nature/1600x900);
  background-size: cover; /*크기 비율을 유지한 상태에서 부모 요소의 width, height 중 큰값에 배경이미지를 맞춘다*/
  background-position: center;
  background-repeat: no-repeat;
`;

/**
 * display: inline-block;
    width: 105px;
    position: absolute;
    z-index: 0;
    padding: 5px 10px 6px 35px;
    margin-left: -7px;
    bottom: 2px;
    background-color: rgba(0,0,0,0.3);
 */
const SubFunc = styled.div`
  display: inline-block;
  width: 125px;
  position: absolute;
  padding: 5px 10px;
  margin-left: 27px;
  bottom: 3px;
  background-color: rgba(0, 0, 0, 0.3);
`;

const Point = styled.span`
  display: inline-block;
  position: absolute;
  width: 5px;
  height: 5px;
  margin: 6px;
  cursor: pointer;
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

export interface IAppProps {}

export interface IAppState {
  modal_show: string;
  subFunc_show: boolean;
  writeExcel: boolean;
}

export default class App extends React.Component<IAppProps, IAppState> {
  public storage: any;

  constructor(props: IAppProps) {
    super(props);
    this.state = {
      modal_show: "",
      subFunc_show: false,
      writeExcel: false,
    };

    // this.onhandleClick = this.onhandleClick.bind(this);
    this.storage = new BrowserStorage("local");
  }

  componentDidMount() {
    window.onload = function () {
      if (window.Notification) {
        Notification.requestPermission();
      }
    };

    const thisMonday = getThisMonday();
    const sName = `D-Menu-${thisMonday}`;

    if (!this.storage.getItem(sName)) {
      axios
        .get("https://my-json-server.typicode.com/beckyi/demo/menus")
        .then((response) => {
          console.log("response1", response, response.data);

          if (
            Object.prototype.toString.call(response.data.data).slice(8, -1) ===
            "Array"
          ) {
            this.storage.setItem(sName, response.data.data);
          }
        });
      //메뉴 데이터가 없을 경우 API 호출 영역
      // let xhr = new XMLHttpRequest();
      // xhr.open(
      //   "GET",
      //   "https://my-json-server.typicode.com/beckyi/demo/menus",
      //   true
      // ); //비동기
      // xhr.onreadystatechange = function (responseData) {
      //   console.log("responseData", responseData);
      //   // if (xhr.readyState === XMLHttpRequest.DONE) {
      //   if (xhr.status === 200) {
      //     console.log(JSON.parse(xhr.responseText));
      //   }
      // };
      // xhr.send(); //call api
    }
  }

  //event: MouseEvent, React.MouseEventHandler<HTMLSpanElement>
  onhandleClick = (event: MouseEvent): void => {
    event.stopPropagation(); //stop bubbling and capturing

    const target = event.target as HTMLElement;
    const { id } = target;
    const { CALENDAR, RICE, SETTING, WRITE } = NAME;
    const array: string[] = [CALENDAR, RICE, SETTING];
    const modal_show = array.includes(id) ? id : "";

    this.setState({ modal_show, writeExcel: id === WRITE });
  };

  handleMouseHover = (event: MouseEvent): void => {
    event.stopPropagation(); //stop bubbling and capturing

    this.setState({ subFunc_show: !this.state.subFunc_show });
  };

  render() {
    //: JSX.Element {
    const { modal_show, subFunc_show, writeExcel } = this.state;

    return (
      <BaseGround id="SAOFE">
        <Container cols={["100%"]} rows={["100px", "100%", "100px"]}>
          <Item
            range={[
              [1, 1],
              [1, 1],
            ]}
          >
            <Jenkins name={"최재은"} />
          </Item>
          <Item
            range={[
              [2, 1],
              [2, 1],
            ]}
            align={"center"}
          >
            <FxContainer>
              <FxItem flex={"1 0 50px"} alignSelf={"center"} />
              <FxItem flex={"1 0 50px"} alignSelf={"center"}>
                <Clock />
              </FxItem>
              <FxItem flex={"1 0 50px"} alignSelf={"center"}>
                <span
                  style={{
                    textAlign: "center",
                    margin: "55px 25px",
                  }}
                ></span>
                <Icon name={NAME.INFORM} onClick={this.onhandleClick} />
              </FxItem>
            </FxContainer>
          </Item>
          <Item
            range={[
              [3, 1],
              [3, 1],
            ]}
            align={"end"}
            extraStyle={"margin: 10px 10px 10px 12px;"}
          >
            <Point onMouseOver={this.handleMouseHover} />
            <Icon name={NAME.SETTING} width={"20px"} />
            {modal_show && (
              <Modal modal_show={modal_show} onClick={this.onhandleClick} />
            )}
            {subFunc_show && (
              <SubFunc>
                <FxContainer jContent={"space-around"}>
                  <FxItem flex={"0 1 auto"}>
                    <Icon name={NAME.CALENDAR} onClick={this.onhandleClick} />
                  </FxItem>
                  <FxItem flex={"0 1 auto"}>
                    <Icon name={NAME.RICE} onClick={this.onhandleClick} />
                  </FxItem>
                  <FxItem flex={"0 1 auto"}>
                    <Icon name={NAME.WRITE} onClick={this.onhandleClick} />
                  </FxItem>
                </FxContainer>
              </SubFunc>
            )}
            {writeExcel && <WriteForm onClick={this.onhandleClick} />}
          </Item>
        </Container>
      </BaseGround>
    );
  }
}

//nodeJS는 타입스크립트를 이해하지 못하므로 자바스크립트 컴파일 과정 필요
