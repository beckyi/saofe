import React, { useState, MouseEvent } from "react";
import styled from "styled-components";
import { getCalendar, makeDateSlash, makeYMD } from "../../utils/utils";

import { dayList } from "../../utils/utils";

import { Container, Item } from "../Layout/Layout";

const CalMonth = styled.div`
  width: 99%;
  height: 100%;
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
  border-radius: 10px;
  font-size: 10px;
  padding: 10px;
  background: #f9f9f9;
  color: ${(props: CDInterface) => (props.color ? props.color : "#fff")};
`; // margin-right: 0.5%; margin-top: 0.5%;

const ArrowBtn = styled.span`
  cursor: pointer;
`;

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
          <CalDay color={item[1]}>{idx + 1 - start_day}</CalDay>
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

const cols = ["98px", "98px", "98px", "98px", "98px", "98px", "98px"];
const rows = ["15px", "40px", "20%", "20%", "20%", "20%", "20%"];

const Calendar = () => {
  const [current, setCurrent] = useState(makeYMD(today));
  const monthInfo = getCalendar(current.substr(0, 6)); //2d Array

  // const handleClick = (): void => setCurrent("20201001");

  const handleClick = (event: MouseEvent): void => {
    const toDate = new Date(makeDateSlash(current));
    const target = event.target as HTMLTextAreaElement;
    let who = target.id;

    let _current =
      who === "next"
        ? makeYMD(new Date(toDate.setMonth(toDate.getMonth() + 1)))
        : makeYMD(new Date(toDate.setMonth(toDate.getMonth() - 1)));
    console.log(_current, "!!!");
    setCurrent(_current); //날짜 갱신
  };

  return (
    <CalMonth>
      <Container cols={cols} rows={rows} gap="3px">
        <Item
          range={[
            [1, 3],
            [1, 3],
          ]}
        >
          <ArrowBtn
            id="prev"
            className="prev"
            onClick={handleClick}
            style={{ textAlign: "center" }}
          >
            &#10094;
          </ArrowBtn>
        </Item>
        <Item
          range={[
            [1, 4],
            [1, 4],
          ]}
        >
          {`${current.substr(0, 4)}.${current.substr(4, 2)}`}
        </Item>
        <Item
          range={[
            [1, 5],
            [1, 5],
          ]}
        >
          <ArrowBtn id="next" className="next" onClick={handleClick}>
            &#10095;
          </ArrowBtn>
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
                    ? { color: "#DC143C" }
                    : day === "Sat"
                    ? { color: "#1E90FF" }
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
