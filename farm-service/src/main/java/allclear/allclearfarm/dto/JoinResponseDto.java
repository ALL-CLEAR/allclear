package allclear.allclearfarm.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class JoinResponseDto {

  private Long pk;
  private String id;
  private String name;

}
