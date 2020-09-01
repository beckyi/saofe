import React, { useState, MouseEvent } from "react";
import styled from "styled-components";
import { getCalendar, makeDateSlash, makeYMD } from "../../utils/utils";

const today = new Date();

function getDate() {
  return { month: today.getMonth().toString().padStart(2, "0") };
}

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
    <div className="month">
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
      <ul className="days">
        {monthInfo.map((item, idx) => {
          return (
            <li style={{ color: item[1] }}>
              {idx + 1}, {item[0]}
            </li>
          );
        })}
      </ul>
    </div>
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
