import React, { useEffect, useState, useRef, useCallback } from "react";
import styled from "styled-components";
import { Container, Item } from "../Layout/Grid";
import { UploadXlsx } from "../../utils/UploadXlsx";
import NAME from "../../utils/Enum";

const MenuBase = styled.div`
  width: 100%;
  height: 100%;
`;

const Title = styled.div`
  text-align: center;
  font-weight: 700;
  font-size: 11px;
  letter-spacing: 10px;
  background: #59285f;
  border-radius: 10px;
  color: white;
`;

const HeadTitle = styled.div`
  font-size: 11px;
  text-align: center;
  font-weight: 700;
  margin-top: 3px;
  letter-spacing: 7px;
`;

const DayNav = styled.div`
  font-size: 12px;
  background: ${(props: { background: string }) => props.background};
  color: white;
  padding: 30px 2px;
  border-radius: 4px;
`;

const MB = styled.div`
  margin-top: 1px;
  color: ${(props: { bool: boolean }) => (props.bool ? "blue" : "red")};
  cursor: ${(props: { bool: boolean }) =>
    props.bool ? "not-allowed" : "pointer"};
`;

const Content = styled.div`
  background: ${(props: { isDinner: boolean }) =>
    props.isDinner ? "#e8f3fb" : "#f7f7f7"};
  border-radius: 10px;
  padding: 10px;
  font-size: 10px;
`;

interface IMenuProps {}

interface calenInterface {
  [key: number]: any;
}

const cols = ["15px", "25%", "25%", "25%", "25%"];
const rows = ["15px", "20px", "20%", "20%", "20%", "20%", "20%"];

const makeMenuList = (menuList: calenInterface) => {
  let components = [];
  for (let i = 3; i < 8; i++) {
    //row
    for (let j = 2; j < 6; j++) {
      //column
      let food = menuList[i - 3] ? menuList[i - 3][j] : "";
      components.push(
        <Item
          key={`IC${i}${j}`}
          range={[
            [i, j],
            [i, j],
          ]}
        >
          <Content isDinner={j === 5}>{food}</Content>
        </Item>
      );
    }
  }
  return components;
};

type excelProps = {
  title: string;
  onExcelClose?: any;
};

const Menu: React.FunctionComponent<IMenuProps> = (props) => {
  const DMenu = window.localStorage.getItem("D-Menu");
  const [menuHead, setMenuHead] = useState(DMenu ? "주간 메뉴" : "주간 메뉴");
  const [menuList, setMenuList] = useState(DMenu ? DMenu : []);
  const [excel_show, setExcelShow] = useState(false);
  const xlsx = useRef<HTMLInputElement>(null);
  // const xlsx = useRef<React.FunctionComponent<excelProps>>(null);
  const menuBool = menuList.length > 0;
  console.log("xlsx", xlsx);
  useEffect(() => {
    //동기
    console.log(xlsx, "useEffect", menuList, excel_show);
  });

  async function asnySetExcelShow(bool: boolean) {
    await setExcelShow(bool);
  }

  const handleOnClick = (): void => {
    if (menuList.length === 0) {
      // 엑셀 파일 업로드 시작!
      if (excel_show && xlsx && xlsx.current !== null) {
        xlsx.current.click();
      } else {
        asnySetExcelShow(true);
      }
    } else {
      let correct = "슬기로운 더존 생활인 김우동";
      let text = prompt("메뉴를 변경하시겠습니까? 암호를 대세요!", "GUESS");
      if (text === correct) {
        asnySetExcelShow(true);
      }
    }
  };

  const onExcelClose = (excelJson: any): void => {
    // 엑셀 파일 업로드 끝!
    setExcelShow(false);
    const current = new Date();
    const toDay = current.getDay();
    const calc =
      toDay === 1 ? 0 : toDay === 0 ? 1 : toDay === 6 ? 2 : -1 * (toDay - 1);
    const start = `${current.getMonth() + 1}/${current.getDate() + calc}`;

    let menuJSON = []; //엑셀파일 데이터
    let isDiffer = false; //다른 주를 올릴 경우
    let title: string = "";

    if (excelJson && excelJson.length > 0) {
      let reg = new RegExp(
        "더존ICT그룹([0-9]{1,2}월[0-9]{1}주차)주간메뉴표",
        "g"
      );
      title = excelJson[0][0].replace(/ /gi, "");

      if (reg.test(title)) {
        //ex.9/17
        reg = new RegExp("([0-9]{1,2}/[0-9]{1,2})", "g");
        const sDate = excelJson[5][0];
        if (sDate && reg.test(sDate) && start !== sDate) isDiffer = true;
        menuJSON = excelJson.filter((item: any, idx: number) => {
          return reg.test(item[0]) && item.length > 8;
        });

        const sIdx: number = title.indexOf("룹") + 1;
        const eIdx: number = title.indexOf("주");

        title = title.substr(sIdx, eIdx - sIdx + 1);
      }

      if (menuJSON.length > 0) {
        const bool = isDiffer
          ? window.confirm("다른 주간 메뉴입니다. 진행하시겠습니까?")
          : true;
        const param = bool ? menuJSON : undefined;
        if (param) {
          const list = param.map((oneDay: []) => {
            //[date, day, ...menus]
            return oneDay.slice(0, 2).concat(oneDay.slice(4));
          });
          setMenuHead(title);
          setMenuList(list);
        }
      } else {
        window.alert("메뉴 엑셀 파일이 아닙니다. \\ _ /");
      }
    }
  };
  console.log(menuList);
  return (
    <MenuBase>
      <Container cols={cols} rows={rows} gap="3px">
        <Item
          range={[
            [1, 1],
            [1, 5],
          ]}
        >
          <Title>{menuHead}</Title>
        </Item>
        <Item
          range={[
            [2, 1],
            [2, 1],
          ]}
        >
          <MB bool={menuBool} onClick={handleOnClick}>
            ✿
          </MB>
        </Item>
        {["누들(본관)", "한식(본관)", "특식 (신관)", "저녁"].map(
          (item, idx) => {
            return (
              <Item
                key={`IH${idx}`}
                range={[
                  [2, 2 + idx],
                  [2, 2 + idx],
                ]}
              >
                <HeadTitle>{item}</HeadTitle>
              </Item>
            );
          }
        )}
        {["월", "화", "수", "목", "금"].map((item, idx) => {
          const color =
            item === "화"
              ? "#F28DBD"
              : item === "수"
              ? "#F2C9E1"
              : item === "목"
              ? "#89C1D9"
              : item === "금"
              ? "#88E9F7"
              : "#D977A3";
          return (
            <Item
              key={`ID${idx}`}
              range={[
                [3 + idx, 1],
                [3 + idx, 1],
              ]}
            >
              <DayNav background={color}>{item}</DayNav>
            </Item>
          );
        })}
        {makeMenuList(menuList)}
      </Container>
      {/* 엑셀업로드 */}
      {excel_show && (
        <UploadXlsx
          ref={xlsx}
          enterence={NAME.RICE}
          onExcelClose={onExcelClose}
        />
      )}
    </MenuBase>
  );
};

export default Menu;
