import React, {
  useState,
  forwardRef,
  useLayoutEffect,
  ChangeEvent,
} from "react";
import NAME from "../utils/Enum";
// import { fixdata } from "../utils/utils";

const onExcelLoad = (
  enterence: string,
  _onExcelClose: any,
  event: ProgressEvent<FileReader>
) => {
  console.log(enterence, event);
  try {
    const XLSX = require("xlsx");
    const target = event.target as FileReader;

    //FIXME : https://github.com/SheetJS/sheetjs/issues/337
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
    const tabNum = enterence === NAME.WRITE ? 2 : 0;
    const ws = workbook.Sheets[workbook.SheetNames[tabNum]];
    const excelJson = XLSX.utils.sheet_to_json(ws, { header: 1 });

    if (excelJson.length > 0) {
      _onExcelClose(excelJson); //init
    } else {
      throw Error;
    }
  } catch (e) {
    window.alert("엑셀 파일을 읽을 수가 없습니다. 엑셀을 확인해주세요.");
    _onExcelClose(); //init
  }
};

const readExcel = (file: Blob, enterence: string, _onExcelClose: any) => {
  const reader = new FileReader();
  reader.onload = onExcelLoad.bind(reader, enterence, _onExcelClose);
  reader.readAsArrayBuffer(file);
};

interface Props {
  enterence: string;
  onExcelClose: any;
}

interface FileProps {
  // ref: React.RefObject<HTMLInputElement>;
  enterence: string;
  onExcelClose: any;
}

export const UploadXlsx = forwardRef<HTMLInputElement, FileProps>(
  ({ enterence, onExcelClose }: FileProps, ref) => {

    const xlsxInput = ref as React.RefObject<HTMLInputElement>;
    const [file, setFile] = useState({});

    const readFileInfo = () => {
      let bool = window.confirm("엑셀 파일 있으신가요? 다운받으러 가실까요?");
      if (bool) {
        const url =
          enterence === NAME.WRITE
            ? "http://wiki.duzon.com:8080/pages/viewpage.action?pageId=64457546"
            : "https://gwa.douzone.com/";
        onExcelClose(); //init
        //확인 클릭 시 페이지 띄우기 (편의)
        window.open(
          "https://www.ilovepdf.com/ko/pdf_to_excel",
          "_blank",
          "scrollbars=yes,resizable=yes,top=500,left=0,width=500,height=400"
        );
        window.open(
          url,
          "_blank",
          "scrollbars=yes,resizable=yes,top=500,left=500,width=700,height=400"
        );
      } else if (xlsxInput.current !== null) {
        xlsxInput.current.click();
      }
    };

    const handleSelectFile = (event: ChangeEvent<HTMLInputElement>): void => {
      const target = event.target as HTMLInputElement;
      const files = target.files as FileList; //유사배열

      setFile(files[0]);
      readExcel(files[0], enterence, onExcelClose);
    };

    useLayoutEffect(() => {
      //비동기 (Rendering 직후 Dom Element 값을 읽는 경우)
      console.log("useLayoutEffect", Object.keys(file), file, xlsxInput);

      //파일 값이 없을 경우 업로드
      if (file.constructor.name !== "File" && xlsxInput.current !== null) {
        console.log(
          "useLayoutEffect2",
          Object.keys(file),
          file,
          file.constructor.name
        );
        readFileInfo();
      }
    });

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
