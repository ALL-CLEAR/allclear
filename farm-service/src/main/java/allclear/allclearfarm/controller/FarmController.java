package allclear.allclearfarm.controller;

import allclear.allclearfarm.domain.Farm;
import allclear.allclearfarm.dto.JoinRequestDto;
import allclear.allclearfarm.dto.JoinResponseDto;
import allclear.allclearfarm.dto.LoginRequestDto;
import allclear.allclearfarm.dto.LoginResponseDto;
import allclear.allclearfarm.service.FarmService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin("*")
@RequiredArgsConstructor
public class FarmController {
  private final FarmService farmService;

  @GetMapping
  public ResponseEntity<Farm> getFarmByPk(Long pk) {
    Farm farm = farmService.getFarmByPk(pk);
    return ResponseEntity.ok(farm);
  }

  @PostMapping("/login")
  public ResponseEntity<LoginResponseDto> login(@RequestBody LoginRequestDto loginRequestDto) {
    LoginResponseDto loginResponseDto = farmService.login(loginRequestDto);
    return ResponseEntity.ok(loginResponseDto);
  }

  @PostMapping("/join")
  public ResponseEntity<JoinResponseDto> join(@RequestBody JoinRequestDto joinRequestDto) {
    JoinResponseDto joinResponseDto = farmService.join(joinRequestDto);
    return ResponseEntity.ok(joinResponseDto);
  }


}
