import React, {useState} from "react";
import styled from "styled-components";
import ContextComp from "../Container/Context";

interface IProps {
  editMode: boolean;
};

interface IState {};

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

 const Profile = (props:IProps) => {
   const [temp, setTemp] = useState('');
   return(
   <ContextComp.Consumer>
     {({value, actions}) => (
     <>
      <GreetUser>Hello {value.userInfo.name}</GreetUser>
      <Motto>Be Brave, Be Happy, Be yourself</Motto>
     </>
     )}
    </ContextComp.Consumer>
  )
};

export default Profile;