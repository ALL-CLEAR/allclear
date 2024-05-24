package allclear.allclearfarm.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import java.util.ArrayList;
import java.util.List;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

//@Table(name ="user")
@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Farm {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "farm_pk", nullable = false)
  private Long pk;

  @Column(name = "farm_name", nullable = false)
  private String name;

  @Column(name = "user_id", nullable = false)
  private String userId;

  @Column(name = "user_pw", nullable = false)
  private String userPw;

//  @OneToMany(mappedBy = "farm")
//  private List<HourlyEnv> hourlyEnvList = new ArrayList<>();
//
//  @OneToMany(mappedBy = "farm")
//  private List<DailyEnv> dailyEnvList = new ArrayList<>();

//  @OneToMany(mappedBy = "farm")
//  private List<Yield> yieldList = new ArrayList<>();

  @Builder
  public Farm(String name, String userId, String userPw) {
    this.name = name;
    this.userId = userId;
    this.userPw = userPw;
  }

}
