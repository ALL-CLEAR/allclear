package allclear.allclearstate.controller;

import allclear.allclearstate.dto.DailyGraphResponseDto;
import allclear.allclearstate.service.DailyEnvService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Slf4j
@RequiredArgsConstructor
@CrossOrigin("*")
public class DailyEnvController {
  private final DailyEnvService dailyEnvService;

  @GetMapping(value = "/daily")
  public ResponseEntity<DailyGraphResponseDto> getDailyData () {
    return ResponseEntity.ok(dailyEnvService.getDailyDataRecentThirtyDays());
  }

  @GetMapping(value = "/test")
  public ResponseEntity<String> testDailyGetMapping () {
    dailyEnvService.setInfoDaily();
    return ResponseEntity.ok().body("success");
  }

}
