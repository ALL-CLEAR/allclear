package allclear.allclearstate.repository;

import allclear.allclearstate.domain.DailyEnv;
import java.time.LocalDateTime;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface DailyEnvRepository extends JpaRepository<DailyEnv, Long> {
  @Query("SELECT d FROM DailyEnv d WHERE d.checkAt BETWEEN :startDate AND :endDate AND d.farm.pk = :farmPk")
  List<DailyEnv> findByCheckAtBetweenAndFarmPk(LocalDateTime startDate, LocalDateTime endDate, Long farmPk);

}
