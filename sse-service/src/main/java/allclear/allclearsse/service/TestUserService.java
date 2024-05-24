package allclear.allclearsse.service;


import allclear.allclearsse.domain.Farm;
import allclear.allclearsse.dto.FarmRequestDto;
import allclear.allclearsse.repository.TestUserRepository;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@RequiredArgsConstructor
public class TestUserService {
  private final TestUserRepository testUserRepository;


  public List<Farm> getFarm(FarmRequestDto farmRequestDto) {
    List<Farm> list = testUserRepository.findAll();
    log.info("list in = {}", list.get(0));
    return testUserRepository.findAll();
  }
}
