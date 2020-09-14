import React, {
  useState,
  useRef,
  useEffect,
  useLayoutEffect,
  ChangeEvent,
} from "react";

export const UploadXlsx = () => {
  // const XLSX = require("xlsx");
  const xlsxInput = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState({});

  console.log("???????????????????", file);
  const handleSelectFile = (event: ChangeEvent<HTMLInputElement>): void => {
    const target = event.target as HTMLInputElement;
    const files = target.files as FileList;
    // let files2:FileList = (<FileList>(<HTMLInputElement>event.target).files);
    // console.log("~~~", files[0]);
    setFile(files[0]);
  };

  useLayoutEffect(() => {
    console.log("useLayoutEffect", xlsxInput);
    if (Object.keys(file).length === 0 && xlsxInput.current !== null) {
      xlsxInput.current.click();
    }
  });
  useEffect(() => {
    debugger;
    console.log("useEffect", xlsxInput);
  });

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
