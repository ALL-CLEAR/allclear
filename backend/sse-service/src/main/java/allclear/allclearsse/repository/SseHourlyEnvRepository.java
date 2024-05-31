package allclear.allclearsse.repository;

import allclear.allclearsse.domain.HourlyEnv;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SseHourlyEnvRepository extends JpaRepository<HourlyEnv, Long> {

}
