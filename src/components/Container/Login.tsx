import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Container, Item, FxContainer, FxItem } from "../Layout";
import Dimm from "../Area/Dimm";
import NAME from "../../utils/Enum";
import Messages from "../../utils/Messages";

interface ILogProps {
  saveUserInfo: (param:IUserInfo) => void;
}

interface ILogState {}

interface IUserInfo {
  [key:string]:string;  //Index Signatures(Indexable types) - 출처: https://itmining.tistory.com/87 [IT 마이닝]
  [NAME.USERNAME]: string;
  [NAME.BIRTH]: string;
  [NAME.COMMENT]: string;
}

interface sh2Style {
  fontSize: string;
}

const Title = styled.div`
  padding: 10px 20px;
`;

const SH1 = styled.h1`
  color: white;
  background: black;
`;

const SH5 = styled.h2`
  font: italic 1.2em "Fira Sans", serif;
  font-size: ${(props:sh2Style) => props.fontSize};
  color: white;
  background: black;
  text-align: center;
`;

const UserInput = styled.input`
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

let seq = 0;//answer order
let userInfo:IUserInfo = {
  [NAME.USERNAME]: "",
  [NAME.BIRTH]: "",
  [NAME.COMMENT]: "",
}
const getID = ():string => {
  return seq === 1 ? NAME.BIRTH : seq === 2 ? NAME.COMMENT : NAME.USERNAME;
};

const getMaxLength = ():number => {
  const id:string = getID();
  return id === NAME.BIRTH ? 4 : id === NAME.USERNAME ? 10 : 20;
};

const Login:React.FunctionComponent<ILogProps> = (props:ILogProps) => {
  const [answer, setAnswer] = useState("");
  const {saveUserInfo} = props;

  useEffect(() => {
    seq = 0; //init
    userInfo = {
      [NAME.USERNAME]: "",
      [NAME.BIRTH]: "",
      [NAME.COMMENT]: "",
    }
    console.log(userInfo,"DIDMOUNT")
  }, []);
  
  const submitAnswer = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const id:string = getID();
    const maxLength:number = getMaxLength();

    if((id === NAME.BIRTH && answer.length === maxLength) || (id !== NAME.BIRTH && answer.length <= maxLength)){
      userInfo[id] = answer;
    
      setAnswer("");
      seq++;
    }

    if(seq === 3 && id === NAME.COMMENT){
      saveUserInfo(userInfo);
    }
  }

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const id:string = getID();
    const value = e.target.value;

    if(id === NAME.BIRTH && isNaN(Number(value))){
      return; //숫자로만 구성
    }
    
    setAnswer(value);
  }

  return(
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
              HELLO {userInfo.name ? userInfo.name : "JENKINS WORLD"} :)
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
          <SH5 fontSize={seq === (questions.length - 1) ? "1.7em" : "3em"}>
            {questions[seq]}
          </SH5>
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
              <form onSubmit={submitAnswer}>
                <UserInput type="text"value={answer} maxLength={getMaxLength()} onChange={handleOnChange}/>
              </form>
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
  )

};

export default Login;