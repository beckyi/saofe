import React, { Component } from 'react';
import styled from "styled-components";
import { Container, Item, FxContainer, FxItem } from "../Layout";
import Icon from "./Icon";
import NAME from "../../utils/Enum";

interface ISetProps {
  onIconClick: (name:string,event: React.MouseEvent) => void;
}

interface ISetState {}

interface styleType {
  Heads: object;
  Bubble: object;
  Wall: object;
}

const GreetUser = styled.p`
  font-size: 2em;
  margin: 3px 5px 10px;
`;

const Motto = styled.p`
  font: italic 1.2em "Fira Sans", serif;
  margin: 0px;
  padding: 0.3rem;
  color: #b1b3b2;
`;

const TagArea = styled.div`
  border: 2px solid #a2a2a2;
  width: 95%;
`;

const customStyle:styleType = {
  Heads: {
    borderBottom: "1px solid", 
    paddingTop: "2px"
  },
  Bubble: {
    // height: "85%",
    padding: "10px",
    background: "#d9edff",
    borderRadius: "10px"
  },
  Wall: {
    borderRight: "1px solid",
    marginRight: "15px"
  }
};
const {Heads, Bubble, Wall} = customStyle;

class Setting extends Component<ISetProps, ISetState>{

  constructor(props: ISetProps) {
    super(props);
  }

  render(){
    const {
      onIconClick
    } = this.props;

    return (
      <Container cols={["155px","60%","40%","150px"]} rows={["30px", "40%", "60%"]}>
        <Item range={[[1,1],[1,3]]} style={Heads}>
          <span>SETTING 🛠</span>
        </Item>
        <Item range={[[1,4],[1,4]]} style={{...Heads, textAlign: "right"}}>
          <Icon name={NAME.RESET} onClick={onIconClick} style={{marginRight: "10px"}}/>
        </Item>
        {/* style={{ textAlign: "center", padding: "33px 0px"}} */}
        <Item range={[[2,1],[2,1]]}>
          <FxContainer jContent={"center"} alignItems={"center"}>
            <FxItem flex={"0 1 auto"} alignSelf={"center"}>
              <Icon name={NAME.SMILE} onClick={onIconClick} />
            </FxItem>
          </FxContainer>
        </Item>
        <Item range={[[2,2],[2,3]]}>
          <FxContainer jContent={"center"} alignItems={"center"}>
              <FxItem flex={"1 1 auto"} alignSelf={"center"} style={Bubble}>
                <GreetUser>Hello JAEN</GreetUser>
                <Motto>Be Brave, Be Happy, Be yourself</Motto>
              </FxItem>
            </FxContainer>
        </Item>
        <Item range={[[2,4],[2,4]]}>
          IMAGE subject
        </Item>
        <Item range={[[3,1],[3,2]]} style={Wall}>
          <p># Backgroud Image TAG</p>
          <TagArea/>
          WARNING AREA
        </Item>
        <Item range={[[3,3],[3,4]]}>
          <div className="rgyPostIt">
            MEMO
          </div>
        </Item>
      </Container>
    );
  }
}
export default Setting;