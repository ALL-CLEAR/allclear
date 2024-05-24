package allclear.allclearfarm.exception.errorcode;

import lombok.Getter;

@Getter
public enum FarmErrorCode {
  FarmIsAlreadyExist(404, "farm 이/가 이미 존재합니다."),
  FarmIsNotFound(404, "farm 이/가 존재하지 않습니다."),
  ;

  private int code;
  private String description;

  private FarmErrorCode(int code, String description) {
    this.code = code;
    this.description = description;
  }

}
