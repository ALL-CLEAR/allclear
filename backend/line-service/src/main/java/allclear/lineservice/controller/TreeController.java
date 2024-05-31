package allclear.lineservice.controller;

import allclear.lineservice.dto.TreeAllResponseDto;
import allclear.lineservice.dto.TreeInsertRequestDto;
import allclear.lineservice.dto.TreeResponseDto;
import allclear.lineservice.service.TreeService;
import com.sun.net.httpserver.Headers;
import feign.Response;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.http.Header;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;
import java.util.List;
import java.util.Map;

@RestController
@Slf4j
@RequiredArgsConstructor
public class TreeController {

    private final TreeService treeService;

    // 모든 나무 수확량 가져오기
    @GetMapping("/tree")
    public ResponseEntity<TreeAllResponseDto> getTreeData() {
        return ResponseEntity.ok(treeService.getAllTreeData());
    }

    // 나무 수확량 데이터 추가
    @PostMapping("/tree/add")
    public ResponseEntity<String> postTreeData(@RequestBody TreeInsertRequestDto treeInsertRequestDto) {
        return ResponseEntity.ok(treeService.postTreeData(treeInsertRequestDto));
    }

    // 시뮬레이션 결과 저장
    @PostMapping("/tree/simulation")
    public ResponseEntity<String> postTreeDataSimulation(@RequestBody Map<String, Object> map) {
        String result = treeService.postTreeDataSimulation(map);

        return ResponseEntity.ok(result);
    }

    // sse 연결
    @GetMapping(value = "/connection/connect/tree", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public ResponseEntity<SseEmitter> sseConnect() {
        SseEmitter emitter = new SseEmitter();
        treeService.sseAdd(emitter);
        try {
            emitter.send(SseEmitter.event()
                    .name("treeConnect")
                    .data("connected!"));
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        return ResponseEntity.ok(emitter);
    }

}
