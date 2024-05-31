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
}

