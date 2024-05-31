package allclear.allclearfarm.service;

import allclear.allclearfarm.domain.Farm;
import allclear.allclearfarm.dto.JoinRequestDto;
import allclear.allclearfarm.dto.JoinResponseDto;
import allclear.allclearfarm.dto.LoginRequestDto;
import allclear.allclearfarm.dto.LoginResponseDto;
import allclear.allclearfarm.exception.CustomException;
import allclear.allclearfarm.exception.errorcode.FarmErrorCode;
import allclear.allclearfarm.repository.FarmRepository;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Slf4j
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class FarmService {
  private final FarmRepository farmRepository;

  /** 회원가입 **/
  @Transactional
  public JoinResponseDto join(JoinRequestDto joinRequestDto) {
    Optional<Farm> optionalFarm = farmRepository.findByUserId(joinRequestDto.getId());
    if (optionalFarm.isPresent()) {
      throw new CustomException(FarmErrorCode.FarmIsAlreadyExist.getCode(), FarmErrorCode.FarmIsAlreadyExist.getDescription());
    }

    Farm farm = Farm.builder()
        .name(joinRequestDto.getName())
        .userId(joinRequestDto.getId())
        .userPw(joinRequestDto.getPw())
        .build()
        ;

    farmRepository.save(farm);

    return JoinResponseDto.builder()
        .id(farm.getUserId())
        .name(farm.getName())
        .build();
  }

  /** 로그인 **/
  public LoginResponseDto login(LoginRequestDto loginRequestDto) {
    Optional<Farm> optionalFarm = farmRepository.findByUserIdAndUserPw(loginRequestDto.getId(), loginRequestDto.getPw());
    if (optionalFarm.isEmpty()) {
      throw new CustomException(FarmErrorCode.FarmIsNotFound.getCode(), FarmErrorCode.FarmIsNotFound.getDescription());
    }
    Farm farm = optionalFarm.get();

    return LoginResponseDto.builder()
        .pk(farm.getPk())
        .id(farm.getUserId())
        .name(farm.getName())
        .build();
  }

  /** farm 엔티티 찾기 : pk **/
  public Farm getFarmByPk(Long pk) {
    Optional<Farm> optionalFarm = farmRepository.findById(pk);
    if (optionalFarm.isEmpty()) {
      throw new CustomException(FarmErrorCode.FarmIsNotFound.getCode(), FarmErrorCode.FarmIsNotFound.getDescription());
    }
    Farm farm = optionalFarm.get();
    return farm;
  }

}
