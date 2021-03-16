import React, { useState, MouseEvent } from "react";
import styled from "styled-components";
import { Container, Item } from "../Layout/Grid";
import {
  dayList,
  getCalendar,
  makeDateSlash,
  makeYMD,
  addMonths,
} from "../../utils/utils";
import NAME from "../../utils/Enum";

type Props = {
  modal_show: string;
};

interface CDInterface {
  color?: string;
  today?: boolean;
}
//monthInfo: Array<Array<number | string>>; (string | number)[][];
interface calenInterface {
  [key: number]: any;
}

const TODAY = new Date();

const CalMonth = styled.div`
  width: 99%;
  height: 100%;
  box-sizing: border-box;
  padding: 0.5%;
`;

const CalDay = styled.div`
  display: inline-block;
  box-sizing: border-box;
  border-radius: 10px;
  font-size: 10px;
  padding: 10px;
  background: #f9f9f9;
  color: ${(props: CDInterface) => (props.color ? props.color : "#fff")};
  ${(props: CDInterface) => (props.today ? "outline: dashed 2px;" : "")}
`; // margin-right: 0.5%; margin-top: 0.5%;

const ArrowBtn = styled.span`
  cursor: pointer;
`;

//달력 동적 생성
const setCalendar = (monthInfo: calenInterface, beforeMonth: Array<(string | number)[]>, nextMonth:  Array<(string | number)[]>) => {
  
  const start_day = monthInfo[0][0]; //monthInfo[0][0]; //시작요일 ( 0 ~)
  let component = [];
  let maxLength = 0;

  // generate 7 * 5  Calendar
  for (let idx = 0; idx < 35; idx++) {
    const x = Math.floor(idx / 7) + 3;
    const y = (idx % 7) + 1;
    const diff = idx - start_day;
    const item = monthInfo[idx - start_day];
  
    if (idx >= start_day && item) {
      const i = item[0];
      const day = dayList[i]; //한글 요일
      const bool_current = item[1] === NAME.CURCOL;

      maxLength = diff;

      component.push(
        <Item
          key={`IC${idx}`}
          range={[
            [x, y],
            [x, y],
          ]}
        >
          <CalDay color={item[1]} today={bool_current}>
            {idx + 1 - start_day}
          </CalDay>
        </Item>
      );
    } else {
      const etcDate = diff < 0 ? beforeMonth.length + diff : diff - maxLength - 1;
      const etcItem =  diff < 0 ? beforeMonth[etcDate] : nextMonth[etcDate];
      const etcColor = etcItem[1] === NAME.BLUECOL ? NAME.DARKBLUE : etcItem[1] === NAME.REDCOL ? NAME.DARKRED : NAME.GRAYCOL;
      component.push(
        <Item
          key={idx}
          range={[
            [x, y],
            [x, y],
          ]}
        >
          <CalDay color={etcColor}>
            {etcDate + 1}
          </CalDay>
        </Item>
      ); //blank
    }
  }

  return component;
};

const cols = ["98px", "98px", "98px", "98px", "98px", "98px", "98px"];
const rows = ["15px", "40px", "20%", "20%", "20%", "20%", "20%"];
const weekArr = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const Calendar = ({ modal_show }: Props) => {
  const [current, setCurrent] = useState(makeYMD(TODAY));
  const monthInfo = getCalendar(current.substr(0, 6)); //2d Array
  const before_monthInfo = getCalendar(addMonths(current,-1).substr(0, 6));
  const next_monthInfo = getCalendar(addMonths(current,1).substr(0, 6));

  const handleClick = (event: MouseEvent): void => {
    const toDate = new Date(makeDateSlash(current));
    const target = event.target as HTMLTextAreaElement;
    let who = target.id;

    let _current =
      who === "next"
        ? makeYMD(new Date(toDate.setMonth(toDate.getMonth() + 1)))
        : makeYMD(new Date(toDate.setMonth(toDate.getMonth() - 1)));

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
        {weekArr.map((day, idx) => {
          return (
            <Item
              key={`IP${idx}`}
              range={[
                [2, idx + 1],
                [2, idx + 1],
              ]}
            >
              <p
                style={
                  day === "Sun"
                    ? { color: NAME.REDCOL }
                    : day === "Sat"
                    ? { color: NAME.BLUECOL }
                    : {}
                }
              >
                {day}
              </p>
            </Item>
          );
        })}
        {/* days */}
        {setCalendar(monthInfo, before_monthInfo, next_monthInfo)}
      </Container>
    </CalMonth>
  );
};

export default Calendar;
