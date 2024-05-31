package allclear.allclearstate.dto;

import java.time.LocalDateTime;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@ToString
public class DailyResponseDto {

  private LocalDateTime checkAt;
  private String temperature;
  private String humidity;
  private String light;

  @Builder
  DailyResponseDto(LocalDateTime checkAt, String temperature, String humidity, String light){
    this.checkAt = checkAt;
    this.temperature = temperature;
    this.humidity = humidity;
    this.light = light;
  }
}
