package allclear.lineservice.repository;

import allclear.lineservice.domain.Line;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LineRepository extends JpaRepository<Line, Long> {
    List<Line> findByLineNumber(int lineNumber);
}
