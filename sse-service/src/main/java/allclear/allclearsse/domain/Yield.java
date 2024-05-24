package allclear.allclearsse.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import java.time.LocalDateTime;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Yield {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name="yield_pk", nullable = false )
  private Long pk;

  @Column(name="harvest_at", nullable = false)
  private LocalDateTime harvestAt;

  @Column(name="yield_count", nullable = false)
  private int count;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "farm_pk", nullable = false)
  private Farm farm;

  @Builder
  public Yield(LocalDateTime harvestAt, int count) {
    this.harvestAt = harvestAt;
    this.count = count;
  }
}
