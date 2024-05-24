package allclear.lineservice.domain;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Line {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private Long linePk;

    @Column
    private int lineNumber;

    @ManyToOne
    @JoinColumn(name = "farm_pk")
    private Farm farmPk;

}
