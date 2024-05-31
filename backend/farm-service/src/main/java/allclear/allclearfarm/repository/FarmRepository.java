package allclear.allclearfarm.repository;

import allclear.allclearfarm.domain.Farm;
import allclear.allclearfarm.dto.LoginResponseDto;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface FarmRepository extends JpaRepository<Farm, Long> {
  Optional<Farm> findByUserId(String userId);
  @Query(nativeQuery = true, value = "select * from farm f where f.user_id = :id and f.user_pw = :pw")
  Optional<Farm> findByUserIdAndUserPw(String id, String pw);
}
