import React, { Component, createRef, ChangeEvent, FocusEvent } from 'react';
import styled from "styled-components";
import { Container, Item, FxContainer, FxItem } from "../Layout";
import Icon from "./Icon";
import NAME from "../../utils/Enum";

interface ISetProps {
  onIconClick: (name:string,event: React.MouseEvent) => void;
}

interface ISetState {
  text: string;
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

const TagArea = styled.div`
  width: 350px;
  padding: 10px 10px 8px;
  background: transparent;
  border: 2px solid #a2a2a2;
  outline: none;
  border-radius: 0px;
`;

const TagList = styled.ul`
  clear: both;
  margin: 0px;
  padding-top: 0px;
  padding-right: initial;
  padding-bottom: 0px;
  padding-left: 0px;
`;

const TagLi = styled.li`
  list-style-type: none;
  margin: 0;
  padding: 0;
  display: inline-block;
  position: relative;
  vertical-align: top;
`;

const Tag = styled.div`
  display: inline-block;
  overflow: hidden;
  position: relative;
  vertical-align: top;
  cursor: default;
  user-select: none;
  margin: 0px 4px 2px 0px;
`;

const TagItem = styled.span`
  display: inline-block;
  padding: 5px 25px 3px 10px;
  background: rgb(245, 245, 245);
  border-radius: 2px;
  font-size: 15px;
  font-weight: 200;
  font-family: "Nanum Square", 돋움, Dotum, Helvetica, "Apple SD Gothic Neo", sans-serif;
  color: black;
`;

const CloseBtn = styled.button`
  box-sizing: border-box;
  cursor: pointer;
  display: inline-block;
  outline: none;
  position: absolute;
  text-align: center;
  vertical-align: top;
  border-radius: 0px;
  border: 0px none;
  background: transparent;
  color: rgb(74, 74, 74);
  text-decoration: none;
  height: 28px;
  line-height: initial;
  padding: 0px;
  width: 24px;
  top: 50%;
  right: 2px;
  margin-top: -14px;
`;

const TagInput = styled.div`
  position: relative;
  width: 1px;
  display: inline-block;
  opacity: 1;
  vertical-align: top;
`;

const WrapInput = styled.div`
  display: block;
  height: 21px;
  padding: 0px;
  border: none;
  background: rgb(255, 255, 255);
  line-height: 19px;
`;

const EditInput = styled.input`
  margin: 0px;
  padding: 0px;
  display: block;
  width: 100%;
  height: 100%;
  border: 0px;
  outline: none;
  font-size: 12px;
  font-family: 돋움, Dotum, Helvetica, "Apple SD Gothic Neo", sans-serif;
  cursor: auto;
  background: transparent;
  color: rgb(26, 26, 26);
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
  private editIp: React.RefObject<HTMLInputElement>;

  constructor(props: ISetProps) {
    super(props);
    this.state = {
      text: ''
    };
    this.editIp = createRef();
  }

  handleOnFocus = (event:FocusEvent<HTMLInputElement>) => {
    console.log(event, event.target.value)

  };

  handleOnChange = (event:ChangeEvent<HTMLInputElement>) => {
    console.log(event, event.target.value)
    this.setState({text: event.target.value})
  }

  render(){
    const {
      onIconClick
    } = this.props;

    return (
      <Container cols={["155px","60%","40%","150px"]} rows={["30px", "40%", "60%"]}>
        <Item range={[[1,1],[1,3]]} style={Heads}>
          <HeadLine>SETTING 🛠</HeadLine>
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
          <TagArea onFocus={this.handleOnFocus}>
            <TagList>
              <TagLi>
                <Tag>
                  <TagItem>TEST<CloseBtn/></TagItem>
                </Tag>
              </TagLi>
              <TagLi>
                <TagInput>
                  <WrapInput>
                    <EditInput ref={this.editIp} type="text" value={this.state.text} onChange={this.handleOnChange}/>
                  </WrapInput>
                </TagInput>
              </TagLi>
            </TagList>
          </TagArea>
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