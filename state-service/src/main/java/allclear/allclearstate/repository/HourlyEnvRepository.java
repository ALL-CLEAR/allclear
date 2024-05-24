package allclear.allclearstate.repository;

import allclear.allclearstate.domain.HourlyEnv;
import java.time.LocalDateTime;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface HourlyEnvRepository extends JpaRepository<HourlyEnv, Long> {
  @Query("SELECT h FROM HourlyEnv h WHERE h.checkAt BETWEEN :startDate AND :endDate AND h.farm.pk = :pk")
  List<HourlyEnv> findByCheckAtBetweenAndFarmPk(LocalDateTime startDate, LocalDateTime endDate, Long pk);

}
