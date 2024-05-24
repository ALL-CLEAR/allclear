package allclear.allclearsse.service;

import allclear.allclearsse.client.SensorServiceClient;
import allclear.allclearsse.dto.SensorResponseDto;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;
import java.util.concurrent.atomic.AtomicLong;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.cloud.client.circuitbreaker.CircuitBreakerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

@Service
@Slf4j
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class SseService {
  private static final AtomicLong counter = new AtomicLong();
  private final List<SseEmitter> emitters = new CopyOnWriteArrayList<>();

  /** SSE 연결 추가 **/
  public SseEmitter add(SseEmitter emitter) {
    this.emitters.add(emitter);
    log.info("new emitter added: {}", emitter);
    log.info("emitter list size: {}", emitters.size());
    emitter.onCompletion(() -> {
      log.info("onCompletion callback");
      this.emitters.remove(emitter);    // 만료되면 리스트에서 삭제
    });
    emitter.onTimeout(() -> { //  확인필요
      log.info("onTimeout callback");
      emitter.complete();
    });
    return emitter;
  }

  /** 온도 습도 조도 화재, 가스 센서 정보 : 실시간 전달 : 현재코드  **/
  public void transfer(SensorResponseDto sensorResponseDto) {
    emitters.forEach(emitter -> {
      try {
        emitter.send(SseEmitter.event()
            .name("secondmessage")
            .data(sensorResponseDto));
      } catch (IOException e) {
        throw new RuntimeException(e);
      }
    });
  }

  /** 온도 습도 조도 화재, 가스 센서 정보 : 실시간 전달 : 이전코드**/
//  private final SensorServiceClient sensorServiceClient;
//  private final CircuitBreakerFactory circuitBreakerFactory;
//  private final TestUserService testUserService;
//  @Scheduled(fixedRate = 60000L) // 5분에 한번
//  public SensorResponseDto getModuleInfoSecond() {
//    log.info("Sse Service In");
//    CircuitBreaker circuitbreaker = circuitBreakerFactory.create("circuitbreaker");
//    SensorResponseDto sensorInfo = circuitbreaker.run(sensorServiceClient::getInfo,
//        throwable -> SensorResponseDto.builder()
//            .detect("none-detect")
//            .temperature("26")
//            .humidity("68.8")
//            .light("1124")
//            .air("435")
//            .co("122")
//            .alcohol("12")
//            .co2("13")
//            .venzene("42")
//            .nh4("51")
//            .aceton("66")
//            .build()
//    );
//
//    log.info("##################################################################################################### DTO IN WHAT = {}", sensorInfo);
//    log.info("##################################################################################################### Call Time = {}", LocalDateTime.now());
//
//    emitters.forEach(emitter -> {
//      try {
//        emitter.send(SseEmitter.event()
//            .name("secondmessage")
//            .data(sensorInfo));
//      } catch (IOException e) {
//        throw new RuntimeException(e);
//      }
//    });
//    return sensorInfo;
//  }

}

