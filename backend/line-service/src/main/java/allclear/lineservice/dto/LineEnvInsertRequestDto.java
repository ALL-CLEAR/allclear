package allclear.lineservice.dto;

import allclear.lineservice.domain.Line;
import allclear.lineservice.domain.LineEnv;
import lombok.Getter;
import lombok.Setter;
import org.springframework.cglib.core.Local;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Getter
@Setter
public class LineEnvInsertRequestDto {
    private String ec;
    private String ph;
    private String lineDate;
    private long linePk;

    public LineEnv toEntity(Line line) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMdd");
        LocalDateTime date = LocalDate.parse(lineDate, formatter).atStartOfDay();
        if (lineDate.isEmpty()) date = LocalDateTime.now();
        return LineEnv.builder()
                .ec(ec)
                .ph(ph)
                .lineDate(date)
                .linePk(line)
                .build();

    }
}
