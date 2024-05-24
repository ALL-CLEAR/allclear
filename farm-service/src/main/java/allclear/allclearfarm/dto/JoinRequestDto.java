package allclear.allclearfarm.dto;

import lombok.Builder;
import lombok.Data;

@Data
public class JoinRequestDto {

  private String id;
  private String pw;
  private String name;

}
