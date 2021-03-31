import React, { Component, createRef, FocusEvent, ChangeEvent, MouseEvent, KeyboardEvent} from "react";
import styled from "styled-components";
import ContextComp from "../Container/Context";
import Icon from "./Icon";
import NAME from "../../utils/Enum";

interface ITagProps {
  maxCnt: number;
  keywords: Array<string>;
}

interface ITagState {
  mode: string;
  text: string;
  tags: Array<string>;
}

interface ItagStyle {
  mode: string;
}

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
  display: inline-block;
  position: relative;
  vertical-align: top;
  width: ${(props:ItagStyle)=> props.mode === "edit" ? "100px" : "1px"};
  opacity: ${(props:ItagStyle)=> props.mode === "edit" ? "1" : "0"};
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

//enter, ",", ";"
const insertKeyCode = [13, 186, 188];
const {BackConsumer} = ContextComp;

class TagField extends Component<ITagProps, ITagState> {
  private tagArea: React.RefObject<HTMLDivElement>;
  private editIp: React.RefObject<HTMLInputElement>;

  constructor(props:ITagProps){
    super(props);
    this.state = {
      mode: "view",
      text: "",
      tags: props.keywords || []
    };
    this.tagArea = createRef();
    this.editIp = createRef();
  }

  handleOnFocus = (event:FocusEvent<HTMLDivElement>) => {
    if(this.state.mode === "view"){
      this.setState({mode: "edit"});
    }
    if(this.editIp.current) this.editIp.current.focus();
  };

  handleOnBlur = (event: FocusEvent<HTMLDivElement>) => {
    console.log("handleOnBlur",event, event.target)
    if(this.state.mode === "edit"){
      this.setState({mode: "view"});
    }
  }

  handleOnChange = (event:ChangeEvent<HTMLInputElement>) => {
    console.log(event, event.target.value)
    this.setState({text: event.target.value})
  }

  //insert event
  handleOnKeyDown = (event: KeyboardEvent) => {
console.log("KeyboardEvent", event);
    if(insertKeyCode.includes(event.keyCode) && this.state.text){
      if(this.state.tags.includes(this.state.text)){
        this.setState({
          text: ""
        });
      } else if(this.props.maxCnt >= this.state.tags.length + 1){
        this.setState((prevState) => ({
          tags: prevState.tags.concat(prevState.text),
          text: "",
        }));
      }
    }
  }

  handleOnClick = (pIdx:number, name:string, event:MouseEvent) => {
    console.log("ONCLICK", pIdx, name, event);
    this.setState((prevState)=> ({
      tags: prevState.tags.filter((item, idx)=>{
        return idx !== pIdx;
      })
    }));
  };

  render(){
    const {mode, text, tags} = this.state;
console.log(BackConsumer)
    return (
      <TagArea ref={this.tagArea} tabIndex={0} onFocus={this.handleOnFocus} onBlur={this.handleOnBlur}>
        <TagList>
          <TagLi>
            <BackConsumer>
              {({ value, actions }) => (
                  <>
                    {value.keywords.map((item, idx)=>{
                        return (
                          <Tag>
                            <TagItem>
                              {item}
                              <CloseBtn>
                                <Icon name={NAME.CLOSE} onClick={this.handleOnClick.bind(this, idx)} />
                              </CloseBtn>
                            </TagItem>
                          </Tag>
                        );
                      })
                    }
                  </>
              )};
            </BackConsumer>
          </TagLi>
          <TagLi>
            <TagInput mode={mode}>
              <WrapInput>
                <EditInput ref={this.editIp} type="text" value={text} onChange={this.handleOnChange} onKeyDown={this.handleOnKeyDown}/>
              </WrapInput>
            </TagInput>
          </TagLi>
        </TagList>
      </TagArea>
    );
  }
}

export default TagField;