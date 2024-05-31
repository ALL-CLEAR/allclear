package allclear.lineservice.controller;

import allclear.lineservice.dto.LineEnvInsertRequestDto;
import allclear.lineservice.dto.LineInsertRequestDto;
import allclear.lineservice.dto.LineResponseDto;
import allclear.lineservice.service.LineService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@Slf4j
@RequiredArgsConstructor
public class LineController {

    private final LineService lineService;

    // 특정 라인의 정보 조회
    @GetMapping("/line/{lineNumber}")
    public ResponseEntity<LineResponseDto> getLineData(@PathVariable int lineNumber) {
        return ResponseEntity.ok(lineService.getOneLineData(lineNumber));
    }

    // 라인 추가
    @PostMapping("/line/add")
    public ResponseEntity<String> postLineData(@RequestBody LineInsertRequestDto lineInsertRequestDto) {
        return ResponseEntity.ok(lineService.postLineData(lineInsertRequestDto));
    }

    // 라인 환경 변수 추가
    @PostMapping("/line/env/add")
    public ResponseEntity<String> postLineEnvData(@RequestBody LineEnvInsertRequestDto lineEnvInsertRequestDto) {
        return ResponseEntity.ok(lineService.postLineEnvData(lineEnvInsertRequestDto));
    }
}
