import { useState, useEffect } from "react";
import { Tab, Tablist } from "evergreen-ui";
import React from "react";
import { Unity, useUnityContext } from "react-unity-webgl";
import Day from "./period/Day";
import Week from "./period/Week";
import styled from "styled-components";
import Line from "./line/Line";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { selectedLineAtom } from "../recoil/statistics/statistics";
import close from "../assets/close.png";
import treeRed from "../assets/tree_red.png";
import treeYellow from "../assets/tree_yellow.png";
import treeGreen from "../assets/tree_green.png";
import treeDisabled from "../assets/tree_disabled.png";
// 커밋용
function Statistics() {
  const [selectedPeriodIndex, setSelectedPeriodIndex] = useState(0);
  const [periodTabs] = useState(["일간", "주간"]);
  const [lineTabs] = useState(["라인1", "라인2", "라인3", "라인4"]);
  const periodComponents = [<Day />, <Week />];
  const lineComponent = <Line />;
  const setSelectedLineAtom = useSetRecoilState(selectedLineAtom);
  const selectedLine = useRecoilValue(selectedLineAtom);
  const setSelectedLine = (lineNumber) => setSelectedLineAtom(lineNumber);
  const [isSimulationModalVisible, setIsSimulationModalVisible] =
    useState(false);

  const { unityProvider, sendMessage, unload } = useUnityContext({
    loaderUrl: "Simul/Downloads.loader.js",
    dataUrl: "Simul/webgl.data",
    frameworkUrl: "Simul/build.framework.js",
    codeUrl: "Simul/build.wasm",
  });
  // API 연동 데이터
  const [treeData, setTreeData] = useState([
    {
      lineNumber: "",
      treeList: [
        { treeNumber: "", yield: "" },
        { treeNumber: "", yield: "" },
        { treeNumber: "", yield: "" },
        { treeNumber: "", yield: "" },
        { treeNumber: "", yield: "" },
        { treeNumber: "", yield: "" },
        { treeNumber: "", yield: "" },
        { treeNumber: "", yield: "" },
      ],
    },
    {
      lineNumber: "",
      treeList: [
        { treeNumber: "", yield: "" },
        { treeNumber: "", yield: "" },
        { treeNumber: "", yield: "" },
        { treeNumber: "", yield: "" },
        { treeNumber: "", yield: "" },
        { treeNumber: "", yield: "" },
        { treeNumber: "", yield: "" },
        { treeNumber: "", yield: "" },
      ],
    },
    {
      lineNumber: "",
      treeList: [
        { treeNumber: "", yield: "" },
        { treeNumber: "", yield: "" },
        { treeNumber: "", yield: "" },
        { treeNumber: "", yield: "" },
        { treeNumber: "", yield: "" },
        { treeNumber: "", yield: "" },
        { treeNumber: "", yield: "" },
        { treeNumber: "", yield: "" },
      ],
    },
    {
      lineNumber: "",
      treeList: [
        { treeNumber: "", yield: "" },
        { treeNumber: "", yield: "" },
        { treeNumber: "", yield: "" },
        { treeNumber: "", yield: "" },
        { treeNumber: "", yield: "" },
        { treeNumber: "", yield: "" },
        { treeNumber: "", yield: "" },
        { treeNumber: "", yield: "" },
      ],
    },
  ]);

  const StartButton = () => {
    sendMessage("SimulationManager", "StartAllSimulations");
  };

  const changeTreeBorderColor = (yieldAmount) => {
    if (yieldAmount == undefined || yieldAmount == null || yieldAmount == 0) {
      return "#4A5361";
    } else if (yieldAmount < 19) {
      return "#BF2C1C";
    } else if (yieldAmount < 23) {
      return "#F9B838";
    } else {
      return "#48A62C";
    }
  };

  const changeTreeBackGroundColor = (yieldAmount) => {
    if (yieldAmount == undefined || yieldAmount == null || yieldAmount == 0) {
      return "#242E3A";
    } else if (yieldAmount < 19) {
      return "#3E2624";
    } else if (yieldAmount < 23) {
      return "#3E3825";
    } else {
      return "#283A21";
    }
  };

  const changeTreeImage = (yieldAmount) => {
    if (yieldAmount == undefined || yieldAmount == null || yieldAmount == 0) {
      return <TreeImage src={treeDisabled} />;
    } else if (yieldAmount < 19) {
      return <TreeImage src={treeRed} />;
    } else if (yieldAmount < 23) {
      return <TreeImage src={treeYellow} />;
    } else {
      return <TreeImage src={treeGreen} />;
    }
  };

  useEffect(() => {}, []);

  const fetchSSE = () => {
    console.log("fetchSSE 실행");
    const eventSource = new EventSource(
      "/api/line-service/connection/connect/tree"
    );

    eventSource.addEventListener("open", () => {
      console.log("sse OPENED");
    });

    eventSource.addEventListener("tree", (e) => {
      console.log(JSON.parse(e.data));
      setTreeData(JSON.parse(e.data).data);
    });

    eventSource.addEventListener("hourmessage", (e) => {
      // console.log(e.data);
    });
  };

  useEffect(() => {
    setSelectedLine(1);
    fetchSSE();
    return () => {
      // 컴포넌트가 언마운트될 때 Unity 인스턴스를 언로드합니다.
      unload();
    };
  }, [unload]);

  return (
    <StatisticsBox>
      <div>
        <TitleContainer>
          <Title>통계</Title>
        </TitleContainer>
      </div>
      <div>
        <div
          style={{
            fontSize: "24px",
            fontWeight: 600,
            marginBottom: "16px",
            backgroundColor: "#384351",
            display: "inline-block",
            padding: "10px 20px",
            borderRadius: "10px",
          }}
        >
          스마트팜 환경
        </div>
        <Tablist
          marginBottom={16}
          flexBasis={240}
          marginRight={24}
          marginLeft={3}
        >
          {periodTabs.map((tab, index) => (
            <Tab
              aria-controls={`panel-${tab}`}
              isSelected={index === selectedPeriodIndex}
              key={tab}
              onSelect={() => {
                setSelectedPeriodIndex(index);
              }}
              color={"#e6e5ea"}
              fontSize={"16px"}
            >
              {tab}
            </Tab>
          ))}
        </Tablist>
        {periodComponents[selectedPeriodIndex]}
        <div
          style={{
            fontSize: "24px",
            fontWeight: 600,
            marginBottom: "16px",
            backgroundColor: "#384351",
            display: "inline-block",
            padding: "10px 20px",
            borderRadius: "10px",
          }}
        >
          라인별 환경
        </div>
        <Tablist
          marginBottom={16}
          flexBasis={240}
          marginRight={24}
          marginLeft={3}
        >
          {lineTabs.map((tab, index) => (
            <Tab
              aria-controls={`panel-${tab}`}
              isSelected={index + 1 == selectedLine}
              key={tab}
              onSelect={() => {
                setSelectedLine(index + 1);
              }}
              color={"#e6e5ea"}
              fontSize={"16px"}
            >
              {tab}
            </Tab>
          ))}
        </Tablist>
        {lineComponent}
        <div style={{ position: "relative" }}>
          <div style={{ display: "flex" }}>
            <div
              style={{
                fontSize: "24px",
                fontWeight: 600,
                marginBottom: "16px",
                backgroundColor: "#384351",
                display: "inline-block",
                padding: "10px 20px",
                borderRadius: "10px",
              }}
            >
              라인별 수확량
            </div>
            <SimulationOpenButton
              onClick={() => {
                setIsSimulationModalVisible(true);
              }}
            >
              시뮬레이션
            </SimulationOpenButton>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              width: "100%",
              marginBottom: "20px",
            }}
          >
            {treeData.map((line, index) => (
              <div key={index}>
                <div
                  style={{
                    fontSize: "22px",
                    fontWeight: 600,
                    margin: "5px 5px 5px 10px",
                  }}
                >
                  라인{line.lineNumber}
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%",
                    overflow: "hidden",
                  }}
                >
                  {line.treeList.map((tree, index) => (
                    <Tree
                      key={index}
                      style={{
                        border: `1.5px solid ${changeTreeBorderColor(tree.yield) || "#D1180B"}`,
                        backgroundColor:
                          changeTreeBackGroundColor(tree.yield) || "#3E2624",
                      }}
                    >
                      {changeTreeImage(tree.yield)}
                      {tree.yield}
                    </Tree>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {isSimulationModalVisible && (
            <SimulationModalOverlay>
              <SimulationModal>
                <SimulationStartButton
                  onClick={() => {
                    StartButton();
                  }}
                >
                  시작
                </SimulationStartButton>
                <div
                  style={{
                    display: "flex",
                    height: "90%",
                  }}
                >
                  <Unity
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      width: "100%", // 너비 70%
                      height: "100%", // 높이 70%
                      marginTop: "11px",
                      borderBottomRightRadius: "8px",
                      borderBottomLeftRadius: "8px",
                      borderTop: "1.5px solid #e6e5ea",
                    }}
                    unityProvider={unityProvider}
                  />
                </div>
                <CloseButton
                  src={close}
                  onClick={() => {
                    setIsSimulationModalVisible(false);
                  }}
                />
              </SimulationModal>
            </SimulationModalOverlay>
          )}
        </div>
      </div>
    </StatisticsBox>
  );
}

const StatisticsBox = styled.div`
  overflow: auto;
  width: calc(100% - 70px);
  height: 100%;
  margin: 0 35px;
`;

const TitleContainer = styled.div`
  display: flex;
  padding: 25px 0;
`;

const Title = styled.div`
  font-size: 32px;
  font-weight: 600;
`;

const Tree = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 130px;
  margin: 5px;
  border-radius: 5px;
  font-size: 24px;
  font-weight: 600;
`;

const TreeImage = styled.img`
  width: 20%;
  object-fit: contain;
`;

const SimulationOpenButton = styled.div`
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 16px;
  background-color: #20ade4;
  display: inline-block;
  padding: 10px 20px;
  border-radius: 10px;
  margin-left: 16px;
  cursor: pointer;

  &:hover {
    background-color: #1b94c7;
  }

  &:active {
    background-color: #176b94;
  }
`;

const SimulationModalOverlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 3;
`;

const SimulationModal = styled.div`
  position: relative;
  width: 80%;
  height: 90%;
  background-color: #68615b;
  border-radius: 8px;
  border: 1.5px solid #e6e5ea;
`;

const SimulationStartButton = styled.button`
  width: 180px;
  height: 50px;
  outline: none;
  border: none;
  border-radius: 8px;
  margin: 10px 0 0 10px;
  cursor: pointer;

  &:hover {
    background-color: #1b94c7;
  }

  &:active {
    background-color: #176b94;
  }
`;

const CloseButton = styled.img`
  position: absolute;
  right: 7px;
  top: 7px;
  width: 20px;
  height: 20px;

  &:active {
    opacity: 0.5;
  }
`;
export default Statistics;
