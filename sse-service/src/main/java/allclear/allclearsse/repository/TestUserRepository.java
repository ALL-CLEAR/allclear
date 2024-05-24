package allclear.allclearsse.repository;

import allclear.allclearsse.domain.Farm;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TestUserRepository extends JpaRepository<Farm, Long> {



}

