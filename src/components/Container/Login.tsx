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


const Title = styled.div`
  padding: 10px 20px;
`;

const SH1 = styled.h1`
  color: white;
  background: black;
`;

const SH5 = styled.h2`
  font: italic 1.2em "Fira Sans", serif;
  font-size: 3em;
  color: white;
  background: black;
  text-align: center;
`;

const UserInput = styled.div`
  width: 100%;
  padding-top: 4px;
  background: 0;
  border: 0;
  border-bottom: 2px solid #fff;
  color: #fff;
  font-size: 2.25em;
  line-height: 1.2;
  font-weight: 500;
  text-align: center;
  outline: none;
  transition: #fff .2s ease;
`;

//이름, 생일, joke
const questions = [Messages.askName, Messages.askBirthday, Messages.askJoke];

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
    <Dimm brightness={0.7}>
      <Container cols={["100%"]} rows={["100px", "60%", "40%", "100px"]}>
        <Item
          range={[
            [1, 1],
            [1, 1],
          ]}
        >
          <Title>
            <SH1>
              HELLO JENKINS WORLD :)
            </SH1>
          </Title>
        </Item>
        <Item
          range={[
            [2, 1],
            [2, 1],
          ]}
          align={"center"}
        >
          <SH5>
            {questions[0]}
          </SH5>
          {/* action */}
          <form >
            <input type="submit"/>
          </form>
        </Item>
        <Item
          range={[
            [3, 1],
            [3, 1],
          ]}
        >
          <FxContainer>
            <FxItem flex={"1 0 50px"} alignSelf={"center"}/>
            <FxItem flex={"1 0 50px"} alignSelf={"center"}>
              <UserInput />
            </FxItem>
            <FxItem flex={"1 0 50px"} alignSelf={"center"}/>
          </FxContainer>
        </Item>
        <Item
          range={[
            [4, 1],
            [4, 1],
          ]}
          align={"end"}
        />
      </Container>
    </Dimm>
    );
  }
}