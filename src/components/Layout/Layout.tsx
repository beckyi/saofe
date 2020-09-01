import React, { memo } from "react";
import styled from "styled-components";

interface MainBoxProps {
  children: React.ReactNode;
  width?: string;
  height?: string;
  cols: Array<string | number>;
  rows: Array<string>;
}
//string[]

type BoxProps = {
  children: React.ReactNode;
  range: number[][];
  align?: string;
};

interface mainStyles {
  cols: string;
  rows: string;
  width?: string;
  height?: string;
}

interface boxStyles {
  range: number[][];
  align?: string;
}

//position: absolute;
const MainBox = styled.div`
  display: grid;
  width: ${(props: mainStyles) => (props.width ? props.width : "100%")};
  height: ${(props: mainStyles) => (props.height ? props.height : "100%")};
  grid-template-rows: ${(props: mainStyles) => props.cols};
  grid-template-columns: ${(props: mainStyles) => props.rows};
  -ms-grid-rows: ${(props: mainStyles) => props.cols};
  -ms-grid-columns: ${(props: mainStyles) => props.rows};
`;

const Box = styled.div`
  display: grid;
  align-self: ${(props: boxStyles) => (props.align ? props.align : "stretch")};
  grid-row: ${(props: boxStyles) => props.range[0][0]} / span
    ${(props: boxStyles) => props.range[1][0] - props.range[0][0] + 1};
  grid-column: ${(props: boxStyles) => props.range[0][1]} / span
    ${(props: boxStyles) => props.range[1][1] - props.range[0][1] + 1};
`;

const setGridTemplate = (pArr: Array<string | number>) => {
  // 퍼센테이지 로만 이루어진 항목 계산
  let totalPercent = 0;
  pArr.forEach((item) => {
    if (typeof item === "string" && item.endsWith("%")) {
      totalPercent += parseInt(item);
    }
  });
  const result = pArr
    .map((item) => {
      if (typeof item === "string" && item.endsWith("%")) {
        // %이면 비율을 계산한다.
        return (parseInt(item) / totalPercent) * 100 + "fr";
      } else if (typeof item === "number") {
        return `${item}px`;
      } else {
        // %이가 아니면 값을 그대로 리턴한다.
        return item;
      }
    })
    .join(" ");
  return result;
};

export const Container = (props: MainBoxProps) => {
  console.log(props, props.children);
  const { children, cols, rows, ...other } = props;
  return (
    <MainBox
      cols={setGridTemplate(cols)}
      rows={setGridTemplate(rows)}
      {...other}
    >
      {children}
    </MainBox>
  );
};

export const Item = (props: BoxProps) => {
  return <Box {...props}>{props.children}</Box>;
};

//study link :: https://studiomeal.com/archives/533
