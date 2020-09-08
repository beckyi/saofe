//윤달여부에 따라 마지막 날짜
function getLastdate(pDate: Date) {
  let arrLast;
  const pMonIdx = pDate.getMonth();
  const leapYear = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  const notLeapYear = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  if (pDate.getFullYear() % 4 === 0) {
    arrLast = leapYear;
  } else {
    arrLast = notLeapYear;
  }

  return arrLast[pMonIdx];
}

//요일 정보
export const dayList = ["일", "월", "화", "수", "목", "금", "토"];

//날짜 형식 > '/' 붙여서 문자 반환
export const makeDateSlash = (ymd: string) => {
  return ymd.substr(0, 4) + "/" + ymd.substr(4, 2) + "/" + ymd.substr(6, 2);
};

//날짜를 문자열로 반환 (yyyymmdd)
export const makeYMD = (date: Date): string => {
  return (
    date.getFullYear() +
    (date.getMonth() + 1).toString().padStart(2, "0") +
    date.getDate().toString().padStart(2, "0")
  );
};

//휴일 정보 가져오기
function getFixHoliday(pYear: string) {
  // 공휴일 정보
  const fixHolidays = [
    pYear + "0101",
    pYear + "0301",
    pYear + "0430",
    pYear + "0505",
    pYear + "0606",
    pYear + "0815",
    pYear + "1003",
    pYear + "1009",
    pYear + "1225",
    "20200124",
    "20200125",
    "20200126",
    "20200127",
    "20200930",
    "20201001",
    "20201002",
  ];

  return fixHolidays;
}

//달력 정보 가져오기
export const getCalendar = (yyyymm: string) => {
  const current = makeDateSlash(makeYMD(new Date()));
  const fixHolidays = getFixHoliday(yyyymm.substr(0, 4)); //year
  let result = [];
  let model = yyyymm + "01";
  let ymdSlash = makeDateSlash(model);
  let toMonth = new Date(ymdSlash);

  let lastDate = getLastdate(toMonth);

  for (let i = 1; i < lastDate + 1; i++) {
    model = yyyymm + i.toString().padStart(2, "0");
    ymdSlash = makeDateSlash(model);
    toMonth = new Date(ymdSlash);

    const today = toMonth.getDay();
    // 0("일") ~  6 ("토")
    const color =
      current === ymdSlash ? "#afd9ec":
      fixHolidays.includes(model) || today === 0
        ? "#DC143C"
        : today === 6
        ? "#1E90FF"
        : "black";
    // form: [요일,색상(휴일여부)] : red - #00BFFF
    result.push([today, color]); //2d Array
  }

  return result;
};
