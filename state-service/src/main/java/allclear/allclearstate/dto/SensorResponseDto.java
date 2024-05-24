package allclear.allclearstate.dto;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@ToString
public class SensorResponseDto {
    private String detect;
    private String temperature;
    private String humidity;
    private String light;
    private String air;
    private String co;
    private String alcohol;
    private String co2;
    private String venzene;
    private String nh4;
    private String aceton;

    @Builder
    SensorResponseDto(
        String detect,
        String temperature,
        String humidity,
        String light,
        String air,
        String co,
        String alcohol,
        String co2,
        String venzene,
        String nh4,
        String aceton
    ) {
        this.detect = detect;
        this.temperature = temperature;
        this.humidity = humidity;
        this.light = light;
        this.air = air;
        this.co = co;
        this.alcohol = alcohol;
        this.co2 = co2;
        this.venzene = venzene;
        this.nh4 = nh4;
        this.aceton = aceton;
    }
}