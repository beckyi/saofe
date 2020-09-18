import React, {
  useState,
  forwardRef,
  useLayoutEffect,
  ChangeEvent,
  Ref,
} from "react";

import { fixdata } from "../utils/utils";

const onExcelLoad = (_onExcelClose: any, event: ProgressEvent<FileReader>) => {
  console.log(event);
  const XLSX = require("xlsx");
  const target = event.target as FileReader;

  //FIXME : https://github.com/SheetJS/sheetjs/issues/337
  //FIXME : btoa : https://pro-self-studier.tistory.com/106
  // const workbook = XLSX.read(btoa(fixdata(result)), {type: "base64",cellStyles: true,raw: true,cellDates: true,cellNF: true,dateNF: "yyyy-MM-dd hh:mm:ss",});
  const current = new Date();
  const toDay = current.getDay();
  const calc =
    toDay === 1 ? 0 : toDay === 0 ? 1 : toDay === 6 ? 2 : -1 * (toDay - 1);
  const start = `${current.getMonth() + 1}/${current.getDate() + calc}`;
  const data = new Uint8Array(target.result as ArrayBuffer);

  const workbook = XLSX.read(data, {
    type: "array",
    cellStyles: true,
    raw: true,
    cellDates: true,
    cellNF: true,
    dateNF: "yyyy-MM-dd hh:mm:ss",
  });
  const ws = workbook.Sheets[workbook.SheetNames[0]];
  const excelJson = XLSX.utils.sheet_to_json(ws, { header: 1 });
  let menuJSON = []; //엑셀파일 데이터
  let isDiffer = false; //다른 주를 올릴 경우
  let title: string = "";

  if (excelJson && excelJson.length > 0) {
    let reg = new RegExp(
      "더존ICT그룹([0-9]{1,2}월[0-9]{1}주차)주간메뉴표",
      "g"
    );
    title = excelJson[0][0].replace(/ /gi, "");

    if (reg.test(title)) {
      //ex.9/17
      reg = new RegExp("([0-9]{1,2}/[0-9]{1,2})", "g");
      const sDate = excelJson[5][0];
      if (sDate && reg.test(sDate) && start !== sDate) isDiffer = true;
      menuJSON = excelJson.filter((item: any, idx: number) => {
        return reg.test(item[0]) && item.length > 8;
      });

      const sIdx: number = title.indexOf("룹") + 1;
      const eIdx: number = title.indexOf("주");

      title = title.substr(sIdx, eIdx - sIdx);
    }
  }

  if (menuJSON.length > 0) {
    const bool = isDiffer
      ? window.confirm("다른 주간 메뉴입니다. 진행하시겠습니까?")
      : true;
    const param = bool ? menuJSON : undefined;
    _onExcelClose(title, param); //init
  } else {
    window.alert("메뉴 엑셀 파일이 아닙니다. \\ _ /");
    _onExcelClose(); //init
  }
};

const readExcel = (file: Blob, _onExcelClose: any) => {
  const reader = new FileReader();
  reader.onload = onExcelLoad.bind(reader, _onExcelClose);
  reader.readAsArrayBuffer(file);
};

interface Props {
  // [key: string]: Element;
  // ref: React.RefObject<HTMLInputElement>;
  onExcelClose: any;
}

interface FileProps {
  // ref: React.RefObject<HTMLInputElement>;
  onExcelClose: any;
  handleSelectFile?: any;
}

// const FileInput = React.forwardRef<HTMLInputElement, FileProps>(
//   (props: { handleSelectFile: any }, ref) => (
//     <input
//       ref={ref}
//       type="file"
//       accept=".xls, .xlsx"
//       onChange={props.handleSelectFile}
//       style={{ width: 0, display: "none" }}
//     />
//   )
// );
//forwardRef((props: {name: string}, ref: Ref<RefObject>)=> { ,
export const UploadXlsx = forwardRef<HTMLInputElement, FileProps>(
  ({ onExcelClose }: FileProps, ref) => {
    console.log(ref, "!!!!!!!");

    const xlsxInput = ref as React.RefObject<HTMLInputElement>;
    const [file, setFile] = useState({});

    const readFileInfo = () => {
      let bool = window.confirm(
        "메뉴 엑셀 파일 있으신가요? 다운받으러 가실까요?"
      );
      if (bool) {
        onExcelClose(); //init
        //확인 클릭 시 페이지 띄우기 (편의)
        window.open(
          "https://www.ilovepdf.com/ko/pdf_to_excel",
          "_blank",
          "scrollbars=yes,resizable=yes,top=500,left=0,width=500,height=400"
        );
        window.open(
          "https://gwa.douzone.com/gw/uat/uia/egovLoginUsr.do",
          "_blank",
          "scrollbars=yes,resizable=yes,top=500,left=500,width=700,height=400"
        );
      } else if (xlsxInput.current !== null) {
        xlsxInput.current.click();
      }
    };

    useLayoutEffect(() => {
      //비동기 (Rendering 직후 Dom Element 값을 읽는 경우)
      console.log("useLayoutEffect", Object.keys(file), file, xlsxInput);

      //파일 값이 없을 경우 업로드
      if (file.constructor.name !== "File" && xlsxInput.current !== null) {
        readFileInfo();
      }
    });

    const handleSelectFile = (event: ChangeEvent<HTMLInputElement>): void => {
      debugger;
      const target = event.target as HTMLInputElement;
      const files = target.files as FileList; //유사배열

      setFile(files[0]);
      readExcel(files[0], onExcelClose);
    };

    return (
      <input
        ref={ref}
        type="file"
        accept=".xls, .xlsx"
        onChange={handleSelectFile}
        style={{ width: 0, display: "none" }}
      />
    );
  }
);
