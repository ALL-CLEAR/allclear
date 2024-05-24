package allclear.lineservice.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class TreeResponseDto {
    private int lineNumber;
    private List<TreeListResponseDto> treeList;
}
