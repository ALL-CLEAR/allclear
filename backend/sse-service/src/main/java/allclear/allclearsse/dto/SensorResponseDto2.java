package allclear.allclearsse.dto;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@ToString
public class SensorResponseDto2 {
  private Boolean isFire;
  private String gasUnit;
  private String co2Unit;

  @Builder
  SensorResponseDto2(Boolean isFire, String gasUnit, String co2Unit) {
    this.isFire = isFire;
    this.gasUnit = gasUnit;
    this.co2Unit = co2Unit;
  }
}
