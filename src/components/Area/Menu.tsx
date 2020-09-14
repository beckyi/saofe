import React, { useState } from "react";
import styled from "styled-components";
import { Container, Item } from "../Layout/Grid";
import { UploadXlsx } from "../../utils/UploadXlsx";

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
  color: ${(props: { bool: boolean }) => (props.bool ? "red" : "blue")};
  cursor: ${(props: { bool: boolean }) =>
    props.bool ? "pointer" : "not-allowed"};
`;

const Content = styled.div`
  background: ${(props: { isDinner: boolean }) =>
    props.isDinner ? "#e8f3fb" : "#f7f7f7"};
  border-radius: 10px;
  padding: 10px;
  font-size: 10px;
`;

interface IMenuProps {}

const cols = ["15px", "25%", "25%", "25%", "25%"];
const rows = ["15px", "20px", "20%", "20%", "20%", "20%", "20%"];

const makeMenuList = () => {
  let components = [];
  for (let i = 3; i < 8; i++) {
    for (let j = 2; j < 6; j++) {
      components.push(
        <Item
          key={`IC${i}${j}`}
          range={[
            [i, j],
            [i, j],
          ]}
        >
          <Content isDinner={j === 5}>누들</Content>
        </Item>
      );
    }
  }
  return components;
};

const Menu: React.FunctionComponent<IMenuProps> = (props) => {
  const menuList = window.localStorage.getItem("D-Menu");
  const menuBool = menuList === null;
  const [excel_show, setExcelShow] = useState(false);

  const handleOnClick = (): void => {
    setExcelShow(true);
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
          <Title>9월 메뉴</Title>
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
        {makeMenuList()}
      </Container>
      {/* 엑셀업로드 */}
      {excel_show && <UploadXlsx />}
    </MenuBase>
  );
};

export default Menu;
