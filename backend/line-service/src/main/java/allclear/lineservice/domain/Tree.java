package allclear.lineservice.domain;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Tree {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private Long treePk;

    @Column
    private int treeNum;

    @Column
    private LocalDateTime treeDate;

    @Column
    private int yield;

    @ManyToOne
    @JoinColumn(name = "line_pk")
    private Line linePk;
}
