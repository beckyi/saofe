import React, { useState, MouseEvent } from "react";
import styled from "styled-components";
import { getCalendar, makeDateSlash, makeYMD } from "../../utils/utils";

import { dayList } from "../../utils/utils";

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
  vertical-align: bottom;
  width: calc(97% / 7);
  height: calc(98% / 5);
  box-sizing: border-box;
  border-radius: 5px;
  padding: 20px;
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

  for (let idx = 0; idx < 35; idx++) {
    const item = monthInfo[idx - start_day];
    if (idx >= start_day && item) {
      console.log(dayList, dayList[1]);
      const i = item[0];
      const day = dayList[i]; //한글 요일
      component.push(
        <CalDay color={item[1]}>
          {idx + 1 - start_day}, {day}
        </CalDay>
      );
    } else {
      component.push(<CalDay />);
    }
  }

  return component;
};

const Calendar = () => {
  const [current, setCurrent] = useState(makeYMD(today));
  const monthInfo = getCalendar(current.substr(0, 6));

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

  console.log(current, monthInfo);
  return (
    <CalMonth>
      <ul>
        <li id="prev" className="prev" onClick={handleClick}>
          &#10094;
        </li>
        <li id="next" className="next" onClick={handleClick}>
          &#10095;
        </li>
        <li>
          {current}
          <br />
          <span style={{ fontSize: "18px" }}>{current.substr(0, 4)}</span>
        </li>
      </ul>
      <ul className="weekdays">
        <li>Sun</li>
        <li>Mon</li>
        <li>Tue</li>
        <li>Wed</li>
        <li>Thu</li>
        <li>Fri</li>
        <li>Sat</li>
      </ul>
      <ul className="days">{setCalendar(monthInfo)}</ul>
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
