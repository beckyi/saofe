import { diffDays, makeDateSlash, getLastdate } from "../utils/utils";

// region >>> 규칙
// 담당자 바인딩
export const getJenkinsList = (pDate: string) => {
  const sDate = "20200810"; //TEMPARR[0] start!
  const TEMPARR = [
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
  const diffDay = diffDays(
    new Date(makeDateSlash(sDate)),
    new Date(makeDateSlash(pDate))
  ); //닐찌 차이

  const diff = diffDay - (diffDay / 7);

};
