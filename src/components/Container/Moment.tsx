import React, { MouseEvent } from "react";
import axios from "axios";
import styled from "styled-components";

import { Container, Item, FxContainer, FxItem } from "../Layout";

import Jenkins from "../Area/Jenkins";
import Clock from "../Area/Clock";
import Icon from "../Area/Icon";
import Modal from "../Area/Modal";
import WriteForm from "../Area/WriteForm";
import Alarm from "../Area/Alarm";

import NAME from "../../utils/Enum";
import { getThisMonday } from "../../utils/utils";
import BrowserStorage from "../../utils/BrowserStorage";
import Messages from "../../utils/Messages";

interface IUserInfo {
  [NAME.USERNAME]: string;
  [NAME.BIRTH]: string;
  [NAME.COMMENT]: string;
}

export interface IMoProps {
  isUser: IUserInfo;
  saveUserInfo: (param:IUserInfo) => void;
}

export interface IMoState {
  modal_show: string;
  subFunc_show: boolean;
  moreFunc_show: boolean;
  alramFunc_show: boolean;
  writeExcel: boolean;
  menuList: any;
  clockMode: string;
  secondMode: boolean;
}

const MoreFunc = styled.div`
  display: inline-block;
  position: absolute;
  padding: 12px 10px;
  border-radius: 10px;
  background-color: rgba(0,0,0,0.3);
  bottom: 35px;
  left: 27px;
  height:65px;
`;

const SH3 = styled.h3`
  color: #fff;
  line-height: 1;
  margin: 5px 0px;
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

const BtnBox = styled.div`
  border: 0.5px solid white;
  width: 45px;
  text-align: center;
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

export default class Moment extends React.Component<IMoProps, IMoState> {
  public storage: any;

  constructor(props: IMoProps) {
    super(props);

    this.storage = new BrowserStorage("local");
    
    this.state = {
      modal_show: "",
      subFunc_show: false,
      moreFunc_show: false,
      alramFunc_show: false,
      writeExcel: false,
      menuList: [],
      clockMode: "default",
      secondMode: false,
    };
  }

  componentDidMount() {
    console.log(this.props)
    this.loadMenuData();
  }
  //메뉴 정보 가져오기
  loadMenuData() {
    const {GROUP} = NAME;
    const thisMonday = getThisMonday();
    const sName = `${GROUP}Menu-${thisMonday}`;
    const menuData = this.storage.getItem(sName);

    if (!menuData) {
      axios
        .get("https://my-json-server.typicode.com/beckyi/demo/menus")
        .then((response) => {
          console.log("response1", response, response.data);

          if (
            Object.prototype.toString.call(response.data.data).slice(8, -1) ===
            "Array"
          ) {
            this.setState({ menuList: response.data.data }, () => {
              this.storage.setItem(sName, response.data.data);
            });
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
    } else {
      this.setState({ menuList: menuData });
    }
  }

  onIconClick=(name:string, event: React.MouseEvent)=> {
    event.stopPropagation(); //stop bubbling and capturing

    const { CALENDAR, RICE, SETTING, WRITE, BELL, INFORM, RESET, GROUP } = NAME;
    const array: string[] = [CALENDAR, RICE, SETTING];
    const modal_show = array.includes(name) ? name : "";
    const moreFunc_show = name === INFORM;
    let alramFunc_show:boolean = false;
    
    if ( name === BELL){
      if (Notification.permission ==='granted') {
        alramFunc_show = true;
      } else {
        //denied, default
        alert(Messages.allowNotifications);
      }
    } else if (name === RESET){
      const isReset = window.confirm(Messages.askReset);
      if(isReset){
        //위 서비스 관련 모든 정보 삭제 (사용자, 알람 등)
        this.props.saveUserInfo({
          [NAME.USERNAME]: "",
          [NAME.BIRTH]: "",
          [NAME.COMMENT]: "",
        });
        this.storage.cleanItems(GROUP);
      } else {
        return; //stop
      }
    }

    const changeState:object = { modal_show, moreFunc_show, alramFunc_show, writeExcel: name === WRITE };

    this.setState(changeState);
  }

  //event: MouseEvent, React.MouseEventHandler<HTMLSpanElement>
  onhandleClick = (event: MouseEvent): void => {
    event.stopPropagation(); //stop bubbling and capturing

    const {clockMode, secondMode} = this.state;
    const target = event.target as HTMLElement;
    const { id } = target;
    const { CALENDAR, RICE, SETTING, WRITE, BELL, INFORM } = NAME;
    const array: string[] = [CALENDAR, RICE, SETTING];
    const modal_show = array.includes(id) ? id : "";
    const moreFunc_show = id === INFORM;
    const alramFunc_show = id === BELL;
  
    let changeState:object = { modal_show, moreFunc_show, alramFunc_show, writeExcel: id === WRITE };

    if(id === "clock_switch"){
      const _clockMode:string = clockMode === "default" ?  "am/pm" : "default";
      changeState = Object.assign(changeState, {clockMode: _clockMode})    
    } else if ( id === "second_switch"){
      changeState = Object.assign(changeState, {secondMode: !secondMode})
    }

    this.setState(changeState);
  };

  handleMouseHover = (event: MouseEvent): void => {
    event.stopPropagation(); //stop bubbling and capturing
    this.setState({ subFunc_show: !this.state.subFunc_show });
  };

  setMenuProp = (monday: string, list: any) => {
    this.setState({ menuList: list }, () => {
      const {GROUP} = NAME;
      //DZ-Menu-NwNd
      const sName = `${GROUP}Menu-${monday}`;
      this.storage.setItem(sName, list);
    });
  };

  render() {
    const {isUser} = this.props;
    const { modal_show, subFunc_show, moreFunc_show, alramFunc_show, menuList, writeExcel, clockMode, secondMode } = this.state;

    return (
      <Container cols={["100%"]} rows={["100px", "100%", "100px"]}>
        <Item
          range={[
            [1, 1],
            [1, 1],
          ]}
        >
          <FxContainer jContent={"space-between"}>
            <FxItem flex={"0 0 700px"} alignSelf={"center"}>
              <Jenkins name={isUser.name} />
            </FxItem>
            <FxItem flex={"1 1 auto"}/>
            <FxItem flex={"0 0 50px"} style={{margin: "20px auto", textAlign: "center"}}>
              <Icon name={NAME.BELL} onClick={this.onIconClick} />
            </FxItem>
          </FxContainer>
        </Item>
        <Item
          range={[
            [2, 1],
            [2, 1],
          ]}
          align={"center"}
        >
          <FxContainer>
            <FxItem flex={"1 0 50px"} alignSelf={"center"}/>
            <FxItem flex={"1 0 50px"} alignSelf={"center"}>
              <Clock clockMode={clockMode} secondMode={secondMode}/>
            </FxItem>
            <FxItem flex={"1 0 50px"} alignSelf={"center"} style={{position: "relative"}}>
              <span
                style={{
                  textAlign: "center",
                  margin: "55px 25px",
                }}
              ></span>
              {/* 더보기 */}
              <Icon name={NAME.INFORM} onClick={this.onIconClick} />
              { moreFunc_show &&
                <MoreFunc>
                  <FxContainer direction={"column"} flexWrap={"wrap"} alignItems={"center"} jContent={"center"}>
                    <FxItem flex={"0 0 auto"}>
                      <BtnBox>
                        <SH3 id="clock_switch" onClick={this.onhandleClick}>{clockMode === "am/pm" ? "24" : "12"}</SH3>
                      </BtnBox>
                    </FxItem>
                    <FxItem flex={"0 0 auto"}>
                      <BtnBox>
                        <SH3 id="second_switch" onClick={this.onhandleClick}>{secondMode ? "MIN" : "SEC"}</SH3>
                      </BtnBox>
                    </FxItem>
                  </FxContainer>
                </MoreFunc>
              }
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
          <Icon name={NAME.SETTING} width={"20px"} onClick={this.onIconClick}/>
          {subFunc_show && (
            <SubFunc>
              <FxContainer jContent={"space-around"}>
                <FxItem flex={"0 1 auto"}>
                  <Icon name={NAME.CALENDAR} onClick={this.onIconClick} />
                </FxItem>
                <FxItem flex={"0 1 auto"}>
                  <Icon name={NAME.RICE} onClick={this.onIconClick} />
                </FxItem>
                <FxItem flex={"0 1 auto"}>
                  <Icon name={NAME.WRITE} onClick={this.onIconClick} />
                </FxItem>
              </FxContainer>
            </SubFunc>
          )}
          {/* 좌하측 모달창 */}
          {modal_show && (
            <Modal
              modal_show={modal_show}
              menuList={menuList}
              onClick={this.onhandleClick}
              onIconClick={this.onIconClick}
              setMenuProp={this.setMenuProp}
            />
          )}
          {/* 우상측 알람*/}
          {alramFunc_show &&
            <Alarm onClick={this.onhandleClick}/>
          }
          {/* 엑셀파일작성 */}
          {writeExcel && <WriteForm onClick={this.onhandleClick} />}
        </Item>
      </Container>
    );
  }
}
