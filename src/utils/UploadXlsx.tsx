import React, {
  useState,
  useRef,
  useEffect,
  useLayoutEffect,
  ChangeEvent,
} from "react";

import { fixdata } from "../utils/utils";

const onExcelLoad = (event: ProgressEvent<FileReader>) => {
  const XLSX = require("xlsx");
  const target = event.target as FileReader;

  //FIXME : https://github.com/SheetJS/sheetjs/issues/337 , https://stackoverrun.com/ko/q/10264681
  //FIXME : btoa : https://pro-self-studier.tistory.com/106
  // const workbook = XLSX.read(btoa(fixdata(result)), {type: "base64",cellStyles: true,raw: true,cellDates: true,cellNF: true,dateNF: "yyyy-MM-dd hh:mm:ss",});

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
  console.log(target.result, workbook, excelJson);
  /* DO SOMETHING WITH workbook HERE */
};

const readExcel = (file: Blob) => {
  const reader = new FileReader();
  reader.onload = onExcelLoad;
  reader.readAsArrayBuffer(file);
};

export const UploadXlsx = () => {
  const xlsxInput = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState({});

  useLayoutEffect(() => {
    //비동기 (Rendering 직후 Dom Element 값을 읽는 경우)
    console.log("useLayoutEffect", xlsxInput);
    //파일 값이 없을 경우 업로드
    if (Object.keys(file).length === 0 && xlsxInput.current !== null) {
      xlsxInput.current.click();
    }
  });

  useEffect(() => {
    //동기
  });

  const handleSelectFile = (event: ChangeEvent<HTMLInputElement>): void => {
    const target = event.target as HTMLInputElement;
    const files = target.files as FileList; //유사배열
    setFile(files[0]);
    readExcel(files[0]);
  };

  return (
    <input
      ref={xlsxInput}
      type="file"
      accept=".xls, .xlsx"
      onChange={handleSelectFile}
      style={{ width: 0, display: "none" }}
    />
  );
};
