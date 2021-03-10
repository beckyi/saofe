import React, { MouseEvent } from "react";
import styled from "styled-components";
import { Container, Item, FxContainer, FxItem } from "../Layout";
import Dimm from "../Area/Dimm";
import NAME from "../../utils/Enum";
// import { getThisMonday } from "../../utils/utils";
import BrowserStorage from "../../utils/BrowserStorage";
import Messages from "../../utils/Messages";

export interface ILogProps {}

export interface ILogState {}

export default class Login extends React.Component<ILogProps, ILogState> {
  public storage: any;

  constructor(props: ILogProps) {
    super(props);

    this.storage = new BrowserStorage("local");
    
    this.state = {};
  }

  componentDidMount() {
    console.log("DZ-componentDidMount",this.storage.getItem("DZ-user"))
  }

  render() {
    // const { } = this.state;

    return (
    <>
      <Dimm brightness={0.7}/>
      <Container cols={["100%"]} rows={["100px", "100%", "100px"]}>
        <Item
          range={[
            [1, 1],
            [1, 1],
          ]}
        >
          <h1 style={{color: "white"}}>WELCOME</h1>
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
              <div>
                이름을 되시오! 
                <input />
              </div>
            </FxItem>
            <FxItem flex={"1 0 50px"} alignSelf={"center"}/>
          </FxContainer>
        </Item>
        <Item
          range={[
            [3, 1],
            [3, 1],
          ]}
          align={"end"}
        />
      </Container>
    </>
    );
  }
}