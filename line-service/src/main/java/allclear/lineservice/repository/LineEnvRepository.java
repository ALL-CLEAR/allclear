package allclear.lineservice.repository;

import allclear.lineservice.domain.LineEnv;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LineEnvRepository extends JpaRepository<LineEnv, Long> {
    @Query(nativeQuery = true, value = "select * from line_env where line_pk = :linePk order by line_env_pk limit 10")
    List<LineEnv> findTop10LineData(Long linePk);
}
