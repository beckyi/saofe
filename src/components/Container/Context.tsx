import React, {createContext, useState} from "react";
import BrowserStorage from "../../utils/BrowserStorage";
import NAME from "../../utils/Enum";

interface IProps {
  children?: React.ReactNode;
};

interface IUserInfo {
  [NAME.USERNAME]: string;
  [NAME.BIRTH]: string;
  [NAME.COMMENT]: string;
}

interface IState {
  userInfo: IUserInfo | object;
  keywords: Array<string>;
};

interface Props {
  setUserInfo: (userInfo:object) => void;
  setKeywords: (keywords:any) => void;
}

interface IconText {
  state : IState;
  actions: Props;
}

const storage = new BrowserStorage("local");
const storageUser = `${NAME.GROUP}USER`;
const storageBackground = `${NAME.GROUP}BACKGROUND`;
const userForm = {
  [NAME.USERNAME]: "",
  [NAME.BIRTH]: "",
  [NAME.COMMENT]: "",
};

const BackContext = createContext<IconText>({
  state: {
    userInfo: {},
    keywords: []
  },
  actions: {
    setUserInfo: () => {},
    setKeywords: () => {}
  }
});

const {Provider, Consumer: BackConsumer} = BackContext;

const BackProvider:React.FunctionComponent<IProps> = (props:IProps) => {
  const {children} = props;
  const [userInfo, setUserInfo] = useState(storage.getItem(storageUser) || userForm);
  const [keywords, setKeywords] = useState(storage.getItem(storageBackground) || []);

  const val: {state:IState, actions: Props} = {
    state:{userInfo, keywords}, 
    actions: {setUserInfo, setKeywords}
  }

  return(
    <Provider value={val}>
      {children}
    </Provider>
  );
}

export default {BackProvider, BackConsumer};