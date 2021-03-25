import React, { Component, MouseEvent, ChangeEvent } from 'react';
import styled from "styled-components";
import { Container, Item, FxContainer, FxItem } from "../Layout";
import TagField from "./TagField";
import Memo from "./Memo";
import Icon from "./Icon";
import NAME from "../../utils/Enum";

interface ISetProps {
  keywords: Array<string>;
  onIconClick: (name:string,event: React.MouseEvent) => void;
}

interface ISetState {
  text: string;
  editMode: boolean;
}

interface styleType {
  Heads: object;
  Bubble: object;
  Wall: object;
}

const HeadLine = styled.span`
  margin-left: 5px;
`;

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

const DDay = styled.span`
  color: #a7a7a7;
  font-size: 80px;
  top: 30px;
  position: absolute;
  left: 17px;
  font-weight: 800;
  user-select: none;
`;

const DNum = styled.span`
  font-size: 75px;
  font-weight: 900;
  right: 8px;
  position: absolute;
  bottom: 13px;
  user-select: none;
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
    this.state = {
      text: '',
      editMode: false,
    };
  }

  handleOnChange = (event:ChangeEvent<HTMLInputElement>) => {
    console.log(event, event.target.value)
    this.setState({text: event.target.value})
  }

  handleOnClick = (name: string, event: MouseEvent):void => {
    this.setState((prevState)=> ({ editMode: !prevState.editMode }))
  }

  render(){
    const {
      keywords,
      onIconClick
    } = this.props;

    return (
      <Container cols={["155px","60%","40%","150px"]} rows={["30px", "40%", "60%"]}>
        <Item range={[[1,1],[1,3]]} style={Heads}>
          <HeadLine>SETTING 🛠</HeadLine>
        </Item>
        <Item range={[[1,4],[1,4]]} style={{...Heads, textAlign: "right"}}>
          <span>
            <Icon name={NAME.PENCIL} onClick={this.handleOnClick} style={{marginRight: "10px"}}/>
            <Icon name={NAME.RESET} onClick={onIconClick} style={{marginRight: "10px"}}/>
          </span>
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
          <div style={{position: "relative"}}>
            <DDay>D-</DDay>
            <DNum>27</DNum>
          </div>
        </Item>
        <Item range={[[3,1],[3,2]]} style={Wall}>
          <FxContainer direction={"column"} flexWrap={"wrap"} alignItems={"stretch"} jContent={"flex-start"}>
            <FxItem flex={"0 0 auto"}>  
              <p># Backgroud Image TAG</p>
            </FxItem>
            <FxItem flex={"1 0 auto"}>  
              <TagField maxCnt={5} keywords={keywords}/>
            </FxItem>
            <FxItem flex={"0 0 auto"}>  
              WARNING AREA
            </FxItem>
          </FxContainer>
        </Item>
        <Item range={[[3,3],[3,4]]}>
          <Memo />
        </Item>
      </Container>
    );
  }
}
export default Setting;