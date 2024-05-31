package allclear.lineservice.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;

@Getter
@Setter
public class LineResponseDto {
    private int lineNumber;
    private ArrayList<String> phList;
    private ArrayList<String> ecList;
    private ArrayList<String> dateList;
}
