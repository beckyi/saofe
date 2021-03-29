import React, {createContext, useState} from "react";

interface IProps {
  children?: React.ReactNode;
};
interface IState {};

const BackContext = createContext({
  state: {
    userInfo: {},
    keywords: []
  },
  actions: {
    setUserInfo: () => {},
    setKeywords: () => {}
  });

const {Provider, Consumer: BackConsumer} = BackContext;

const BackProvider = ({children}) => {
  const [userInfo, setUserInfo] = useState({});
  const [keywords, setKeywords] = useState([]);

    return(
      <Provider value={{state:{userInfo,keywords}, actions: {setUserInfo,setKeywords}}}>
        {children}
      </Provider>
    );
}

export default {BackProvider, BackConsumer};