package allclear.lineservice.service;

import allclear.lineservice.domain.Line;
import allclear.lineservice.domain.Tree;
import allclear.lineservice.dto.TreeAllResponseDto;
import allclear.lineservice.dto.TreeInsertRequestDto;
import allclear.lineservice.dto.TreeListResponseDto;
import allclear.lineservice.dto.TreeResponseDto;
import allclear.lineservice.repository.LineRepository;
import allclear.lineservice.repository.TreeRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;
import java.util.*;
import java.util.concurrent.CopyOnWriteArrayList;
import java.util.concurrent.atomic.AtomicLong;

@Service
@Slf4j
@RequiredArgsConstructor
public class TreeService {

    private final TreeRepository treeRepository;
    private final LineRepository lineRepository;
    private final List<SseEmitter> emitters = new CopyOnWriteArrayList<>();

    public TreeAllResponseDto getAllTreeData() {
        TreeAllResponseDto treeAllResponseDto = new TreeAllResponseDto();
        List<TreeResponseDto> treeResponseList = new ArrayList<>();
        List<Object[]> treeList = treeRepository.findAllTreeDataByLineNumber();
        System.out.println(treeList.get(0)[0]);
        int lineNum = 0;
        treeResponseList.add(new TreeResponseDto());
        treeResponseList.get(lineNum).setLineNumber(lineNum + 1);
        treeResponseList.get(lineNum).setTreeList(new ArrayList<>());
        for (Object[] obj : treeList) {
            if (lineNum + 1 != (int) obj[3]) {
                lineNum++;
                treeResponseList.add(new TreeResponseDto());
                treeResponseList.get(lineNum).setLineNumber(lineNum + 1);
                treeResponseList.get(lineNum).setTreeList(new ArrayList<>());
            }
            treeResponseList.get(lineNum).getTreeList().add(new TreeListResponseDto((int) obj[1], obj[2].toString()));
        }

        treeAllResponseDto.setData(treeResponseList);

        return treeAllResponseDto;
    }

    public String postTreeData(TreeInsertRequestDto treeInsertRequestDto) {
        Line line = lineRepository.getReferenceById(treeInsertRequestDto.getLinePk());
        Tree tree = treeInsertRequestDto.toEntity(line);
        treeRepository.save(tree);
        return "성공";
    }

    public String postTreeDataSimulation(Map<String, Object> map) {
        TreeInsertRequestDto treeInsertRequestDto = new TreeInsertRequestDto();

        TreeAllResponseDto treeAllResponseDto = new TreeAllResponseDto();
        List<TreeResponseDto> treeResponseList = new ArrayList<>();

        // 시뮬 끝난 결과를 웹에 보내주기 위해 json 형식으로 전처리하는 코드
        for (int lineNum = 0; lineNum < 4; lineNum++) {
            treeResponseList.add(new TreeResponseDto());
            treeResponseList.get(lineNum).setLineNumber(lineNum + 1);
            treeResponseList.get(lineNum).setTreeList(new ArrayList<>());
            for (int i = 1; i <= 8; i++) {
                int treeNumber = i + (lineNum * 8);
                String treeNum = "M" + (i + ((lineNum) * 8));
                treeResponseList.get(lineNum).getTreeList().add(new TreeListResponseDto(treeNumber, map.get(treeNum).toString()));
            }
        }

        treeAllResponseDto.setData(treeResponseList);

        // 연결된 모든 sse에 전송
        emitters.forEach(emitter -> {
            try {
                emitter.send(SseEmitter.event()
                        .name("tree")
                        .data(treeAllResponseDto));
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
        });

        for (int line = 1; line <= 4; line++) {
            for (int i = 1; i <= 8; i++) {
                String treeNum = "M" + (i + ((line - 1) * 8));

                treeInsertRequestDto.setTreeNum(i);
                treeInsertRequestDto.setYield((Integer) map.get(treeNum));
                treeInsertRequestDto.setLinePk(line);

                Line lineEntity = lineRepository.getReferenceById((long) line);
                Tree tree = treeInsertRequestDto.toEntity(lineEntity);
                treeRepository.save(tree);
            }
        }

        return "성공";
    }

    public SseEmitter sseAdd(SseEmitter emitter) {
        this.emitters.add(emitter);
        log.info("new emitter added: {}", emitter);
        log.info("emitter list size: {}", emitters.size());
        emitter.onCompletion(() -> {
            log.info("onCompletion callback");
            this.emitters.remove(emitter);    // 만료되면 리스트에서 삭제
        });
        emitter.onTimeout(() -> { //  확인필요
            log.info("onTimeout callback");
            emitter.complete();
        });
        return emitter;
    }
}
