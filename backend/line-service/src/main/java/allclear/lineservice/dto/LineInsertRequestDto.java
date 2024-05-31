package allclear.lineservice.dto;

import allclear.lineservice.domain.Farm;
import allclear.lineservice.domain.Line;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LineInsertRequestDto {
    private int lineNumber;
    private long farmPk;

    public Line toEntity(Farm farm) {
         return Line.builder()
                 .lineNumber(lineNumber)
                 .farmPk(farm)
                 .build();
    }
}
