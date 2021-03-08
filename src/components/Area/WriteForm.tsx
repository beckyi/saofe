import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { UploadXlsx } from "../../utils/UploadXlsx";
import Dimm from "./Dimm";
import NAME from "../../utils/Enum";
import Icon from "../Area/Icon";

const FormModal = styled.div`
  position: absolute;
  display: inline-block;
  background: white;
  right: 10px;
  height: 600px;
  bottom: 36px;
  width: 547px;
  cursor: default;
`;

const InnerForm = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const TextInner = styled.div`
  padding: 30px 25px 10px;
  ${(props: ITAStyleProps) =>
    props.textAlign ? `text-align: ${props.textAlign};` : ""}
`;

const TextArea = styled.div`
  overflow: scroll;
  height: 497px;
  font-size: 12px;
  line-height: 14px;
`;

const CopyArea = styled.div`
  position: absolute;
  right: 29px;
`;

const Result = styled.div`
  position: absolute;
  bottom: 0px;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  background: #fafafa;
  box-sizing: border-box;
  width: 100%;
  height: 35px;
`;

const DropArea = styled.div`
  height: 420px;
  border: 4px dashed #94bf62;
`;

interface IWFProps {
  onClick: (event: React.MouseEvent) => void;
}

interface ITAStyleProps {
  textAlign?: string;
}

const today = new Date();
const form: string[] = [
  "",
  "",
  "Smart AX 회계, 급여관리서비스에 대하여 아래와 같이 정기 업데이트를 진행하고자 하오니 검토 후 재가하여 주시기 바랍니다.",
  "",
  "",
  "-----------------------------------------  아       래  -----------------------------------------",
  "",
  "",
  "1. 업데이트 구분",
  "1) 정기 업데이트",
  "",
  "",
];

const onhandleClick = () => {
  var from = document.getElementById(NAME.TEXTAREA);
  var range = document.createRange();

  if (window !== null && from !== null) {
    window.getSelection()!.removeAllRanges();
    range.selectNode(from);
    window.getSelection()!.addRange(range);
    document.execCommand("copy");
    window.getSelection()!.removeAllRanges();

    alert("복사 했습니다!");
  }
};

const WriteForm: React.FunctionComponent<IWFProps> = ({
  onClick,
}: IWFProps) => {
  const [excel_show, setExcelShow] = useState(true);
  const xlsx = useRef<HTMLInputElement>(null);
  const [contentList, setContentList] = useState([]);
  const title = `[${today.getFullYear()}-${(today.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${today
    .getDate()
    .toString()
    .padStart(2, "0")}] Smart AX 회계, 급여관리서비스 정기 업데이트`;
  const ttt = form.concat(contentList);

  const onExcelClose = (excelJson: any): void => {
    // 엑셀 파일 업로드 끝!
    console.log(excelJson);
    if (excelJson && excelJson.length > 0) {
      let isDone: boolean = true;
      let dic: any = { Fn: [], Hr: [], Comm: [] };

      excelJson.forEach((row: any, idx: number) => {
        if (idx > 0 && idx !== excelJson.length - 1) {
          let type =
            row[0] === NAME.Fn ? "Fn" : row[0] === NAME.Hr ? "Hr" : "Comm";

          dic[type].push(`- ${row[1].replace("..", "")}`);

          if (isDone && row[2] !== NAME.DONE) isDone = false;
        }
      });

      //작성 시작!
      const fnCnt = dic.Fn.length || 0,
        hrCnt = dic.Hr.length || 0,
        cmCnt = dic.Comm.length || 0;
      let result: any = [
        "2. 모듈별 업데이트 내역",
        `1) 회계관리 - ${fnCnt}건`,
        `2) 급여관리 - ${hrCnt}건`,
        `3) 공통 - ${cmCnt}건`,
        `- 총 ${fnCnt + hrCnt + cmCnt}건`,
        "",
        "",
        "3. 업데이트 상세내역",
      ];

      result.push("1) 회계관리");
      if (dic.Fn.length > 0) {
        result = result.concat(dic.Fn);
      } else {
        result.push("- 없음");
      }

      result.push("", "2) 급여관리");
      if (dic.Hr.length > 0) {
        result = result.concat(dic.Hr);
      } else {
        result.push("- 없음");
      }

      result.push("", "3) 공통");
      if (dic.Comm.length > 0) {
        result = result.concat(dic.Comm);
      } else {
        result.push("- 없음");
      }
      result.push("", "", "4. 특이사항", "- 없음");

      setContentList(result);

      if (!isDone) alert("[주의] 검수 미완료된 리스트가 있습니다.");
    }
  };

  const onhandleUpload = () => {
    if (contentList.length === 0) {
      // 엑셀 파일 업로드 시작!
      if (excel_show && xlsx && xlsx.current !== null) {
        xlsx.current.click();
      } else {
        setExcelShow(true);
      }
    }
  };

  useEffect(() => {
    console.log(excel_show, contentList, xlsx);
  }, [excel_show]);

  return (
    <>
      <Dimm onClick={onClick}/>
      <FormModal>
        <InnerForm>
          {contentList.length === 0 ? (
            <TextInner textAlign={"center"}>
              <h2>
                I have <em style={{ color: "red" }}>nothing</em> to Load list
                data
              </h2>
              <h3>Give Me Excel File ~ へ(￣∇￣へ) Try Again~</h3>
              <DropArea>
                <Icon
                  name={NAME.UPLOAD}
                  margin={"140px 0px 0px"}
                  onClick={onhandleUpload}
                />
              </DropArea>
            </TextInner>
          ) : (
            <>
              <TextInner>
                <CopyArea>
                  <Icon name={NAME.COPY} onClick={onhandleClick} />
                </CopyArea>
                {title}
                <hr />
                <TextArea id={NAME.TEXTAREA}>
                  {ttt.map((item, idx) => {
                    return [item, <br key={idx} />];
                  })}
                </TextArea>
              </TextInner>
              <Result />
            </>
          )}
        </InnerForm>
      </FormModal>
      {/* 엑셀업로드 */}
      {excel_show && (
        <UploadXlsx
          ref={xlsx}
          enterence={NAME.WRITE}
          onExcelClose={onExcelClose}
        />
      )}
    </>
  );
};

export default WriteForm;
