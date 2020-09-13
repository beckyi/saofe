import { diffDays, makeDateSlash, getLastdate } from "../utils/utils";

export const TEMPARR = [
  "김용택",
  "김준원",
  "김지욱",
  "남기섭",
  "양희준",
  "오윤해",
  "우동혁",
  "윤소라",
  "이범희",
  "이소연",
  "임성호",
  "장규민",
  "최재은",
  "황민욱",
];

// region >>> 규칙
// 담당자 바인딩
export const getJenkinsList = (pDate: string) => {
  const sDate = new Date("2020/08/10"); //TEMPARR[0] start!
  let eDate = new Date(makeDateSlash(pDate));
  let pn = eDate.getDay();
  pn = pn === 0 ? 1 : pn === 6 ? 2 : -1;
  eDate = pn !== -1 ? new Date(eDate.setDate(eDate.getDate() + pn)) : eDate;
  const diffDay = diffDays(sDate, eDate); //닐찌 차이

  const diff = diffDay - diffDay / 7;
};
