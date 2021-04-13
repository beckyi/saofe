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
  userInfo: IUserInfo;
  keywords: Array<string>;
};

interface Props {
  setUserInfo: (userInfo:IUserInfo) => void;
  setKeywords: (keywords:any) => void;
}

interface IconText {
  value : IState;
  actions: Props;
  children?:JSX.Element|[JSX.Element];
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
  value: {
    userInfo: userForm,
    keywords: []
  },
  actions: {
    setUserInfo: () => {},
    setKeywords: () => {}
  }
});

export const BackProvider:React.FunctionComponent<IProps> = (props:IProps) => {
  const {children} = props;
  const [userInfo, setUserInfo] = useState(storage.getItem(storageUser) || userForm);
  const [keywords, setKeywords] = useState(storage.getItem(storageBackground) || []);

  const saveUserInfo = (pUserInfo: IUserInfo): void=> {
    const { GROUP, USERNAME } = NAME;
    setUserInfo(pUserInfo);
    
    if(pUserInfo[USERNAME] === ""){
      storage.cleanItems(GROUP);
    } else {
      storage.setItem(storageUser, pUserInfo);
    }
  };
  
  const saveKeywords = (pArr:[]): void=> {
    setKeywords(pArr);
    storage.setItem(storageBackground, pArr);
  };

  const val: {value:IState, actions: Props} = {
    value:{userInfo, keywords}, 
    actions: {setUserInfo: saveUserInfo, setKeywords: saveKeywords}
  }

  return(
    <BackContext.Provider value={val}>
      {children}
    </BackContext.Provider>
  );
}


export default BackContext