package allclear.lineservice.domain;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class HourlyEnv {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "hourly_env_pk", nullable = false)
    private Long pk;

    @Column(name = "check_at", nullable = false)
    private LocalDateTime checkAt;

    @Column(nullable = false)
    private String temperature;

    @Column(nullable = false)
    private String humidity;

    @Column(nullable = false)
    private String light;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "farm_pk", nullable = false)
    private Farm farm;

    @Builder
    public HourlyEnv(LocalDateTime checkAt, String temperature, String humidity, String light, Farm farm) {
        this.checkAt = checkAt;
        this.temperature = temperature;
        this.humidity = humidity;
        this.light = light;
        this.farm = farm;
    }
}
