package allclear.lineservice.domain;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class LineEnv {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private Long lineEnvPk;

    @Column
    private String ec;

    @Column
    private String ph;

    @Column
    private LocalDateTime lineDate;

    @ManyToOne
    @JoinColumn(name = "line_pk")
    private Line linePk;
}
