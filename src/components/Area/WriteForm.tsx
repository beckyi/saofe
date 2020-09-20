import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { UploadXlsx } from "../../utils/UploadXlsx";
import NAME from "../../utils/Enum";
import Icon from "../Area/Icon";

const Dimm = styled.div`
  overflow: hidden;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  zindex: 1100;
  background: #000;
  opacity: 0.3;
  filter: alpha(opacity=30);
`;

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
];

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
    if (excelJson && excelJson.length > 0) setContentList(excelJson);
  };

  const onhandleClick = () => {
    alert("COPIED!");
  };

  useEffect(() => {
    console.log(excel_show, contentList, xlsx);
    if (
      contentList.length === 0 &&
      !excel_show &&
      xlsx &&
      xlsx.current !== null
    ) {
      // setExcelShow(true);
    }
  }, [excel_show]);

  return (
    <>
      <Dimm id="dimmed" onClick={onClick} />
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
                  onClick={onhandleClick}
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
                <TextArea>
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
