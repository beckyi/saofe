import React, { useState, MouseEvent } from "react";
import styled from "styled-components";
import { getCalendar, makeDateSlash, makeYMD } from "../../utils/utils";

import { dayList } from "../../utils/utils";

import { Container, Item } from "../Layout/Layout";

const CalMonth = styled.div`
  width: 99%;
  height: 99%;
  box-sizing: border-box;
  padding: 0.5%;
`;

interface CDInterface {
  color?: string;
}
//monthInfo: Array<Array<number | string>>; (string | number)[][];
interface calenInterface {
  [key: number]: any;
}

const CalDay = styled.div`
  display: inline-block;
  box-sizing: border-box;
  border-radius: 5px;
  padding: 20px;
  background: beige;
  color: ${(props: CDInterface) => (props.color ? props.color : "#fff")};
`; // margin-right: 0.5%; margin-top: 0.5%;

const today = new Date();

function getDate() {
  return { month: today.getMonth().toString().padStart(2, "0") };
}

//달력 동적 생성
const setCalendar = (monthInfo: calenInterface) => {
  let component = [];

  const start_day = monthInfo[0][0]; //monthInfo[0][0]; //시작요일 ( 0 ~)

  // generate 7 * 5  Calendar
  for (let idx = 0; idx < 35; idx++) {
    const x = Math.floor(idx / 7) + 3;
    const y = (idx % 7) + 1;
    const item = monthInfo[idx - start_day];
    if (idx >= start_day && item) {
      console.log(dayList, dayList[1]);
      const i = item[0];
      const day = dayList[i]; //한글 요일
      component.push(
        <Item
          range={[
            [x, y],
            [x, y],
          ]}
        >
          <CalDay color={item[1]}>
            {idx + 1 - start_day}, {day}
          </CalDay>
        </Item>
      );
    } else {
      component.push(
        <Item
          range={[
            [x, y],
            [x, y],
          ]}
        >
          <CalDay />
        </Item>
      ); //blank
    }
  }

  return component;
};

const structure = ["14%", "14%", "14%", "14%", "14%", "14%", "14%"];

const Calendar = () => {
  const [current, setCurrent] = useState(makeYMD(today));
  const monthInfo = getCalendar(current.substr(0, 6)); //2d Array

  // const handleClick = (): void => setCurrent("20201001");

  const handleClick = (event: MouseEvent): void => {
    const toDate = new Date(makeDateSlash(current));
    const target = event.target as HTMLTextAreaElement;
    let who = target.id;
    debugger;
    let _current =
      who === "next"
        ? makeYMD(new Date(toDate.setMonth(toDate.getMonth() + 1)))
        : makeYMD(new Date(toDate.setMonth(toDate.getMonth() - 1)));
    console.log(_current, "!!!");
    setCurrent(_current); //날짜 갱신
  };

  return (
    <CalMonth>
      <Container cols={structure} rows={structure}>
        <Item
          range={[
            [1, 1],
            [1, 7],
          ]}
        >
          <ul>
            <li id="prev" className="prev" onClick={handleClick}>
              &#10094;
            </li>
            <li>
              {current}
              <br />
              <span style={{ fontSize: "18px" }}>{current.substr(0, 4)}</span>
            </li>
            <li id="next" className="next" onClick={handleClick}>
              &#10095;
            </li>
          </ul>
        </Item>
        {/* weekdays */}
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day, idx) => {
          return (
            <Item
              range={[
                [2, idx + 1],
                [2, idx + 1],
              ]}
            >
              <p
                style={
                  day === "Sun"
                    ? { color: "red" }
                    : day === "Sat"
                    ? { color: "blue" }
                    : {}
                }
              >
                {day}
              </p>
            </Item>
          );
        })}
        {/* days */}
        {setCalendar(monthInfo)}
      </Container>
    </CalMonth>
  );
};

export default Calendar;
{
  /* <li>1</li>
        <li>2</li>
        <li>3</li>
        <li>4</li>
        <li>5</li>
        <li>6</li>
        <li>7</li>
        <li>8</li>
        <li>9</li>
        <li>
          <span className="active">10</span>
        </li>
        <li>11</li> */
}
