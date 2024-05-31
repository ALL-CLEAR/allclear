package allclear.allclearstate.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

import java.time.LocalDateTime;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class DailyEnv {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "daily_env_pk", nullable = false)
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
    public DailyEnv(LocalDateTime checkAt, String temperature, String humidity, String light, Farm farm) {
        this.checkAt = checkAt;
        this.temperature = temperature;
        this.humidity = humidity;
        this.light = light;
        this.farm = farm;
    }
}
