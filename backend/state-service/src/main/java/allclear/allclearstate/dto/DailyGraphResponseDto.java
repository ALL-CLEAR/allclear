package allclear.allclearstate.dto;

import java.util.List;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@ToString
public class DailyGraphResponseDto {

  private List<String> checkAtList;
  private List<Double> temperatureList;
  private List<Double> humidityList;
  private List<Double> lightList;

  @Builder
  DailyGraphResponseDto(
      List<String> checkAtList,
      List<Double> temperatureList,
      List<Double> humidityList,
      List<Double> lightList
  ) {
    this.checkAtList = checkAtList;
    this.temperatureList = temperatureList;
    this.humidityList = humidityList;
    this.lightList = lightList;
  }
}
