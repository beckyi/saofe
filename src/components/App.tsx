import React from "react";
import styled from "styled-components";
import { Login, Moment } from "../components/Container"
import BrowserStorage from "../utils/BrowserStorage";

export interface IAppProps {}

export interface IAppState {
  isUser: boolean;
}

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

export default class App extends React.Component<IAppProps, IAppState> {
  public storage: any;

  constructor(props: IAppProps) {
    super(props);

    // this.onhandleClick = this.onhandleClick.bind(this);
    this.storage = new BrowserStorage("local");
    
    this.state = {
      isUser: false//this.storage.getItem("DZ-user") ? true: false
    };

    console.log("DZ-user",this.storage.getItem("DZ-user"))
  }

  componentDidMount() {
    console.log("DZ-componentDidMount",this.storage.getItem("DZ-user"))
    
    window.onload = function () {
      //알람 기능용
      if (window.Notification) {
        Notification.requestPermission().then((result)=>{
          console.log(result);
        });
      }
    };
  }

  saveUserInfo = (): void=> {
    this.setState({isUser: true});
  };

  render() {
    const { isUser } = this.state;

    return (
      <BaseGround id="SAOFE">
        {isUser ?
          <Moment/> 
        :
          <Login saveUserInfo={this.saveUserInfo}/>
        }
      </BaseGround>
    );
  }
}
//nodeJS는 타입스크립트를 이해하지 못하므로 자바스크립트 컴파일 과정 필요
