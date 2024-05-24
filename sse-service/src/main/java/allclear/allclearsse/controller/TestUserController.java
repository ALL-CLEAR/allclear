package allclear.allclearsse.controller;


import allclear.allclearsse.domain.Farm;
import allclear.allclearsse.dto.FarmRequestDto;
import allclear.allclearsse.service.TestUserService;
import com.netflix.discovery.converters.Auto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin("*")
@RequestMapping(value = "/api")
public class TestUserController {

  @Autowired
  private TestUserService testUserService;

  @PostMapping("/farm-service/login")
  public ResponseEntity<Farm> connect(@RequestBody FarmRequestDto farmRequestDto) {
    return ResponseEntity.ok().body(testUserService.getFarm(farmRequestDto).get(0));
  }
}

