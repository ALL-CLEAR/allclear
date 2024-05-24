package allclear.allclearsse.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin("*")
@RequestMapping(value = "/api/connection")
public class TestController {

  // 3022 포트 연결
  //  http://localhost:3022/api/connection/count
  
  @GetMapping("/count")
  public ResponseEntity<String> connect() {
    return ResponseEntity.ok().body("sucess!sucess!sucess!sucess!sucess!sucess!sucess!sucess!");
  }

}
