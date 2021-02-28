class BrowserStorage {
  public STORAGE: any;

  constructor(type?: string) {
    this.STORAGE =
      type && type === "local" ? window.localStorage : window.sessionStorage;
  }

  getItem(name: string) {
    let data = null;

    if (name) {
      //모든 데이터를 '문자열' 형태로 반환됩니다.
      data = this.STORAGE.getItem(name);

      //변환 작업
      if (data !== null) {
        if (this.STORAGE.getItem(name) === "undefined") {
          data = undefined;
        } else if (!isNaN(this.STORAGE.getItem(name))) {
          data = Number(data);
        } else if (/[.*]|{.*}/.test(this.STORAGE.getItem(name))) {
          data = JSON.parse(data);
        }
      }
    }
    return data;
  }

  setItem(name: string, data: any) {
    if (name) {
      name = name.toUpperCase(); //(규칙)대문자
      //type : Object, Array
      if (typeof data === "object" && data !== null) {
        //문자열 형태로 저장합니다.
        data = JSON.stringify(data);
      }

      try {
        this.STORAGE.setItem(name, data);
      } catch (e) {
        console.warn("STORAGE ERR", e);
        //용량 초과로 인한 오류 발생시.
        if (e.name !== undefined && e.name === "QuotaExceededError") {
          let storageData = Object.assign({}, this.STORAGE);
          for (var key in storageData) {
            if (key.indexOf("_ACCTIT") > -1) {
              this.removeItem(key);
            }
          }
        }
      }
    }
  }

  //데이터 삭제
  removeItem(name: string) {
    // *** 'key= undefined'일 경우 전체 삭제 됩니다.
    this.STORAGE.removeItem(name);
  }

  //스토리지 비우기 (데이터 전체 삭제)
  clear() {
    this.STORAGE.clear();
  }
}

export default BrowserStorage;
