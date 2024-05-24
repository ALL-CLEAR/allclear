package allclear.allclearstate.controller;

import allclear.allclearstate.dto.HourlyGraphResponseDto;
import allclear.allclearstate.dto.SensorResponseDto;
import allclear.allclearstate.service.HourlyEnvService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Slf4j
@RequiredArgsConstructor
@CrossOrigin("*")
public class HourlyEnvController {
    private final HourlyEnvService hourlyEnvService;

    @GetMapping(value = "/hourly")
    public ResponseEntity<HourlyGraphResponseDto> getHourlyData () {
        return ResponseEntity.ok(hourlyEnvService.getHourlyDataRecentTwentyFourHour());
    }

    @PostMapping(value = "/hourly")
    public void setInfoHourly(@RequestBody SensorResponseDto sensorResponseDto) {
        log.info("in = {} ", sensorResponseDto);
        hourlyEnvService.setInfoHourly(sensorResponseDto);
    }
}
