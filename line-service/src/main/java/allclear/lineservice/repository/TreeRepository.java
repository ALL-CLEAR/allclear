package allclear.lineservice.repository;

import allclear.lineservice.domain.Tree;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TreeRepository extends JpaRepository<Tree, Long> {
    @Query(value = "SELECT t.tree_date, t.tree_num, sum(t.yield) as yield, l.line_number " +
            "FROM tree t, line l " +
            "WHERE l.line_number = t.line_pk " +
            "GROUP BY t.line_pk, t.tree_num " +
            "ORDER BY l.line_number",
            nativeQuery = true)
    List<Object[]> findAllTreeDataByLineNumber();
}
