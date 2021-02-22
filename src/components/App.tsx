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

export interface IAppProps {}

export interface IAppState {
  modal_show: string;
  subFunc_show: boolean;
  moreFunc_show: boolean;
  writeExcel: boolean;
  menuList: any;
  clockMode: string;
  secondMode: boolean;
}

export default class App extends React.Component<IAppProps, IAppState> {
  public storage: any;

  constructor(props: IAppProps) {
    super(props);
    this.state = {
      modal_show: "",
      subFunc_show: false,
      moreFunc_show: false,
      writeExcel: false,
      menuList: [],
      clockMode: "default",
      secondMode: false
    };

    // this.onhandleClick = this.onhandleClick.bind(this);
    this.storage = new BrowserStorage("local");
  }

  componentDidMount() {
    window.onload = function () {
      if (window.Notification) {
        Notification.requestPermission().then((result)=>{
          console.log(result);
        });
      }
    };

    this.loadMenuData();
  }
  //메뉴 정보 가져오기
  loadMenuData() {
    const thisMonday = getThisMonday();
    const sName = `D-Menu-${thisMonday}`;
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
    console.log(name, event);

    const { CALENDAR, RICE, SETTING, WRITE, BELL } = NAME;
    const array: string[] = [CALENDAR, RICE, SETTING];
    const modal_show = array.includes(name) ? name : "";
    const moreFunc_show = name === "INFORM";
    let changeState:object = { modal_show, moreFunc_show, writeExcel: name === WRITE };

    if ( name === BELL){
debugger
      if (Notification.permission ==='granted') {
        let notify = new Notification('알림이 왔습니다.', {
          'body': '안녕하세요. \n알림을 성공적으로 수신했습니다.',
          'icon': 'https://tistory3.daumcdn.net/tistory/2979840/attach/6e5d2d16ab6a49628dfe1f4c164e38a0',
          'tag': '메시지'
        })
        notify.onclick = function(){
          alert(this.tag)
        }
      } else {
        //denied, default
        alert('알림을 허용해 주세요.');
      }
    }

    this.setState(changeState);
  }

  //event: MouseEvent, React.MouseEventHandler<HTMLSpanElement>
  onhandleClick = (event: MouseEvent): void => {
    event.stopPropagation(); //stop bubbling and capturing

    const {clockMode, secondMode} = this.state;
    const target = event.target as HTMLElement;
    const { id } = target;
    const { CALENDAR, RICE, SETTING, WRITE, BELL } = NAME;
    const array: string[] = [CALENDAR, RICE, SETTING];
    const modal_show = array.includes(id) ? id : "";
    const moreFunc_show = id === "INFORM";
  debugger 
    let changeState:object = { modal_show, moreFunc_show, writeExcel: id === WRITE };

    if(id === "clock_switch"){
      const _clockMode:string = clockMode === "default" ?  "am/pm" : "default";
      changeState = Object.assign(changeState, {clockMode: _clockMode})    
    } else if ( id === "second_switch"){
      changeState = Object.assign(changeState, {secondMode: !secondMode})
    } else if ( id === BELL){
      let notify = new Notification('알림이 왔습니다.', {
        'body': '안녕하세요. \n알림을 성공적으로 수신했습니다.',
        'icon': 'https://tistory3.daumcdn.net/tistory/2979840/attach/6e5d2d16ab6a49628dfe1f4c164e38a0',
        'tag': '메시지'
      })
      notify.onclick = function(){
        alert(this.tag)
      }
    }

    this.setState(changeState);
  };

  handleMouseHover = (event: MouseEvent): void => {
    event.stopPropagation(); //stop bubbling and capturing
console.log("handleMouseHover",event)
    this.setState({ subFunc_show: !this.state.subFunc_show });
  };

  setMenuProp = (monday: string, list: any) => {
    console.log("!!!", list);
    this.setState({ menuList: list }, () => {
      const sName = `D-Menu-${monday}`;
      this.storage.setItem(sName, list);
    });
  };
//{/* <Icon name={NAME.BELLING} onClick={this.onhandleClick} /> */}
  render() {
    //: JSX.Element {
    const { modal_show, subFunc_show, moreFunc_show, menuList, writeExcel, clockMode, secondMode } = this.state;

    return (
      <BaseGround id="SAOFE">
        <Container cols={["100%"]} rows={["100px", "100%", "100px"]}>
          <Item
            range={[
              [1, 1],
              [1, 1],
            ]}
          >
            <FxContainer jContent={"space-between"}>
              <FxItem flex={"0 0 550px"} alignSelf={"center"}>
                <Jenkins name={"최재은"} />
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
            {modal_show && (
              <Modal
                modal_show={modal_show}
                menuList={menuList}
                onClick={this.onhandleClick}
                setMenuProp={this.setMenuProp}
              />
            )}
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
            {/* 엑셀파일작성 */}
            {writeExcel && <WriteForm onClick={this.onhandleClick} />}
          </Item>
        </Container>
      </BaseGround>
    );
  }
}

//nodeJS는 타입스크립트를 이해하지 못하므로 자바스크립트 컴파일 과정 필요
