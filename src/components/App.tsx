import React, { MouseEvent } from "react";
import axios from "axios";
import styled from "styled-components";

import { Container, Item, FxContainer, FxItem } from "./Layout";

import Jenkins from "./Area/Jenkins";
import Clock from "./Area/Clock";
import Icon from "./Area/Icon";
import Modal from "./Area/Modal";

import NAME from "../utils/Enum";

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
  width: 100px;
  position: absolute;
  padding: 5px 10px;
  margin-left: 27px;
  bottom: 3px;
  background-color: rgba(0, 0, 0, 0.3);
`;

const Temp = styled.span`
  transition: transform var(--a-fast) linear;
  margin: 0px 10px 10px;
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

export interface IAppProps {}

export interface IAppState {
  modal_show: string;
  subFunc_show: boolean;
}

export default class App extends React.Component<IAppProps, IAppState> {
  constructor(props: IAppProps) {
    super(props);
    this.state = {
      modal_show: "",
      subFunc_show: false,
    };

    // this.onhandleClick = this.onhandleClick.bind(this);
  }

  componentDidMount() {
    // window.addEventListener()
    window.onload = function () {
      if (window.Notification) {
        Notification.requestPermission();
      }
    };
  }

  //event: MouseEvent, React.MouseEventHandler<HTMLSpanElement>
  onhandleClick = (event: MouseEvent): void => {
    event.stopPropagation(); //stop bubbling and capturing

    const target = event.target as HTMLElement;
    const { id } = target;
    const { CALENDAR, RICE } = NAME;
    const array: string[] = [CALENDAR, RICE];
    const modal_show = array.includes(id) ? id : "";

    this.setState({ modal_show });
  };

  handleMouseHover = (event: MouseEvent): void => {
    event.stopPropagation(); //stop bubbling and capturing

    this.setState({ subFunc_show: !this.state.subFunc_show });
  };

  render() {
    //: JSX.Element {
    const { modal_show, subFunc_show } = this.state;

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
            <Icon
              name={NAME.SETTING}
              onClick={this.onhandleClick}
              onMouseOver={this.handleMouseHover}
            />
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
                </FxContainer>
              </SubFunc>
            )}
          </Item>
        </Container>
      </BaseGround>
    );
  }
}

//nodeJS는 타입스크립트를 이해하지 못하므로 자바스크립트 컴파일 과정 필요
