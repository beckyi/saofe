import * as React from "react";
import styled from "styled-components";
import { Container, Item } from "../Layout/Layout";

const MenuBase = styled.div`
  width: 100%;
  height: 100%;
`;

interface IMenuProps {}

const cols = ["15px", "30%", "30%", "30%", "10%"];
const rows = ["15px", "20px", "20%", "20%", "20%", "20%", "20%"];

const Menu: React.FunctionComponent<IMenuProps> = (props) => {
  return (
    <MenuBase>
      <Container cols={cols} rows={rows} gap="3px">
        <Item
          range={[
            [1, 1],
            [1, 5],
          ]}
        >
          9월 메뉴
        </Item>
        <Item
          range={[
            [2, 1],
            [2, 1],
          ]}
        >
           ✿
        </Item>
        <Item
          range={[
            [2, 2],
            [2, 3],
          ]}
        >
          본관
        </Item>
        <Item
          range={[
            [2, 4],
            [2, 4],
          ]}
        >
          신관
        </Item>
        <Item
          range={[
            [3, 1],
            [3, 1],
          ]}
        >
          월
        </Item>
        <Item
          range={[
            [3, 2],
            [3, 2],
          ]}
        >
          누들
        </Item>
        <Item
          range={[
            [3, 3],
            [3, 3],
          ]}
        >
          한식
        </Item>
        <Item
          range={[
            [3, 4],
            [3, 4],
          ]}
        >
          특식
        </Item>
        <Item
          range={[
            [3, 5],
            [3, 5],
          ]}
        >
          저녁
        </Item>
      </Container>
    </MenuBase>
  );
};

export default Menu;
