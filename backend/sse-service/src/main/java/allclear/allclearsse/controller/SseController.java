package allclear.allclearsse.controller;

import allclear.allclearsse.dto.SensorResponseDto;
import allclear.allclearsse.service.SseService;
import java.io.IOException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

@RestController
@Slf4j
@RequiredArgsConstructor
public class SseController {
  private final SseService sseService;

  @GetMapping(value = "/connect", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
  public ResponseEntity<SseEmitter> connect() {
    SseEmitter emitter = new SseEmitter();
    sseService.add(emitter);
    try {
      emitter.send(SseEmitter.event()
          .name("connect")
          .data("connected!"));
    } catch (IOException e) {
      throw new RuntimeException(e);
    }
    return ResponseEntity.ok(emitter);
  }

  @PostMapping("/transfer")
  public void transfer(@RequestBody SensorResponseDto body) {
    log.info("in = {} ", body);
    sseService.transfer(body);
  }

}