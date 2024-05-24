package allclear.lineservice.service;

import allclear.lineservice.domain.Farm;
import allclear.lineservice.domain.Line;
import allclear.lineservice.domain.LineEnv;
import allclear.lineservice.dto.LineEnvInsertRequestDto;
import allclear.lineservice.dto.LineInsertRequestDto;
import allclear.lineservice.dto.LineResponseDto;
import allclear.lineservice.repository.FarmRepository;
import allclear.lineservice.repository.LineEnvRepository;
import allclear.lineservice.repository.LineRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class LineService {

    private final FarmRepository farmRepository;
    private final LineRepository lineRepository;
    private final LineEnvRepository lineEnvRepository;
    public LineResponseDto getOneLineData(int lineNumber) {
        List<Line> lineList = lineRepository.findByLineNumber(lineNumber);

        LineResponseDto lineResponseDto = new LineResponseDto();
        ArrayList<String> waterList = new ArrayList<>();
        ArrayList<String> phList = new ArrayList<>();
        ArrayList<String> dateList = new ArrayList<>();

        List<LineEnv> lineEnvList = lineEnvRepository.findTop10LineData(lineList.get(0).getLinePk());

        for (LineEnv lineEnv : lineEnvList) {
            waterList.add(lineEnv.getEc());
            phList.add(lineEnv.getPh());
            String date = lineEnv.getLineDate().toString().substring(5, 10);
            dateList.add(date);
        }

        lineResponseDto.setLineNumber(lineNumber);
        lineResponseDto.setEcList(waterList);
        lineResponseDto.setPhList(phList);
        lineResponseDto.setDateList(dateList);

        return lineResponseDto;
    }

    public String postLineData(LineInsertRequestDto lineInsertRequestDto) {
        Farm farm = farmRepository.getReferenceById(lineInsertRequestDto.getFarmPk());
        Line line = lineInsertRequestDto.toEntity(farm);
        lineRepository.save(line);
        return "성공";
    }

    public String postLineEnvData(LineEnvInsertRequestDto lineEnvInsertRequestDto) {
        Line line = lineRepository.getReferenceById(lineEnvInsertRequestDto.getLinePk());
        LineEnv lineEnv = lineEnvInsertRequestDto.toEntity(line);
        lineEnvRepository.save(lineEnv);
        return "성공";
    }
}
