package allclear.lineservice.dto;

import allclear.lineservice.domain.Line;
import allclear.lineservice.domain.Tree;
import lombok.Getter;
import lombok.Setter;
import org.springframework.cglib.core.Local;

import java.time.LocalDateTime;

@Getter
@Setter
public class TreeInsertRequestDto {
    private long linePk;
    private int yield;
    private int treeNum;

    public Tree toEntity(Line line) {
        return Tree.builder()
                .yield(yield)
                .treeNum(treeNum)
                .treeDate(LocalDateTime.now())
                .linePk(line)
                .build();
    }
}
