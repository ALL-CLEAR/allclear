package allclear.allclearsse.client;

import allclear.allclearsse.dto.SensorResponseDto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;

@FeignClient(name = "sensor-service", url = "192.168.31.42:3023")
public interface SensorServiceClient {
    @GetMapping("/sensor/info")
    SensorResponseDto getInfo();
}