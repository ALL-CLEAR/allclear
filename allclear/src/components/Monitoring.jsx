import React, { useCallback, useRef, useState, useEffect } from "react";
import { Unity, useUnityContext } from "react-unity-webgl";
import VideoStream from "./VideoStream";
import styled from "styled-components";

function Monitoring() {
  const { unityProvider, sendMessage, unload } = useUnityContext({
    loaderUrl: "Build/Downloads.loader.js",
    dataUrl: "Build/Downloads.data",
    frameworkUrl: "Build/Downloads.framework.js",
    codeUrl: "Build/Downloads.wasm",
  });

  const ws = useRef(null);
  const [wsData, setWsData] = useState(null);
  const [activeData, setActiveData] = useState(null);
  const [alarmData, setAlarmData] = useState(null);

  useEffect(() => {
    // fetchSSE();
    fetchSSE2();
    return () => {
      // 컴포넌트가 언마운트될 때 Unity 인스턴스를 언로드합니다.
      unload();
    };
  }, [unload]);
  //..
  useEffect(() => {
    if (activeData) {
      const activationData = JSON.stringify(activeData);
      console.log("Sending message to Unity:", activationData);
      sendMessage("Machine", "ActivateHarvesting", activationData);
    }
  }, [activeData]);

  useEffect(() => {
    if (alarmData) {
      const alarm = JSON.stringify(alarmData);
      sendMessage("FireAlarm", "ActivateAlarm", alarm);
    }
  }, [alarmData]);

  // 용준 SSE ..
  const fetchSSE2 = async () => {
    const eventSource = new EventSource(
      "http://k10b302.p.ssafy.io:30201/api/connection/connect"
    );
    // "http://192.168.31.206:3022/api/connection/connect"

    eventSource.onopen = () => {
      console.log("sse OPENED");
    };
    eventSource.addEventListener("secondmessage", (e) => {
      console.log(e.data);
      setAlarmData(JSON.parse(e.data));
    });

    eventSource.addEventListener("unityResponse", (e) => {
      console.log(e.data);
      setActiveData(JSON.parse(e.data));
    });
  };

  // // 재식 SSE
  // const fetchSSE = async () => {
  //   const eventSource = new EventSource(
  //     "http://192.168.31.213:8081/api/unity/connect"
  //     // "http://192.168.219.92:8081/api/unity/connect"
  //   );
  //   eventSource.onopen = () => {
  //     console.log("sse OPENED");
  //   };

  //   // 수확(이름 바꿔야 됨 secondmessage)
  //   eventSource.addEventListener("harvesting", (e) => {
  //     console.log(e.data);
  //     setActiveData(JSON.parse(e.data));
  //   });
  // };

  const sendToggleWateringMessage = () => {
    sendMessage("WaterManager", "ToggleAllcoolers", "");
  };

  const sendToggleFanMessage = () => {
    sendMessage("FanManager", "ToggleAllFans", "");
  };

  const [activeCamera, setActiveCamera] = useState(0);

  const switchCamera = (index) => {
    sendMessage("CameraController", "SwitchCameraFromReact", index.toString());
    setActiveCamera(index);
  };

  const [functionButtonStates, setFunctionButtonStates] = useState([
    false,
    true,
    false,
  ]);

  const toggleFunction = (index) => {
    setFunctionButtonStates((prevStates) => {
      const newStates = [...prevStates];
      newStates[index] = !newStates[index];
      return newStates;
    });
  };
  // 커밋
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          // 전체 뷰포트 높이
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "center",
            width: "80%",
          }}
        >
          <FunctionButton
            style={{
              borderLeft: "1.5px solid #e6e5ea",
              borderTopLeftRadius: "8px",
              backgroundColor: functionButtonStates[0] ? "#20ade4" : "#384351",
            }}
            onClick={() => {
              toggleFunction(0);
              sendToggleWateringMessage();
            }}
          >
            스프링클러 ON/OFF
          </FunctionButton>
          <FunctionButton
            style={{
              backgroundColor: functionButtonStates[1] ? "#20ade4" : "#384351",
            }}
            onClick={() => {
              toggleFunction(1);
              sendMessage("LightManager", "ToggleAllLights");
            }}
          >
            보광등 ON/OFF
          </FunctionButton>
          <FunctionButton
            style={{
              borderTopRightRadius: "8px",
              backgroundColor: functionButtonStates[2] ? "#20ade4" : "#384351",
            }}
            onClick={() => {
              toggleFunction(2);
              sendToggleFanMessage();
            }}
          >
            실링팬 ON/OFF
          </FunctionButton>
        </div>
        <Unity
          style={{
            width: "80%", // 너비 70%
            height: "70%", // 높이 70%
            border: "1.5px solid #e6e5ea",
          }}
          unityProvider={unityProvider}
        />
        <div
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "center",
            width: "80%",
          }}
        >
          {[0, 1, 2, 3, 4, 5].map((index) => (
            <CameraButton
              key={index}
              style={{
                borderLeft: index === 0 ? "1.5px solid #e6e5ea" : "none",
                borderRight: index < 6 ? "1.5px solid #e6e5ea" : "none",
                borderBottomLeftRadius: index === 0 ? "8px" : "none",
                borderBottomRightRadius: index === 5 ? "8px" : "none",
                backgroundColor: activeCamera === index ? "#20ade4" : "#384351",
              }}
              onClick={() => switchCamera(index)}
            >
              CAM {index + 1}
            </CameraButton>
          ))}
        </div>
      </div>

      <div>
        <VideoStream />
      </div>
    </>
  );
}

export default Monitoring;

const FunctionButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  font-weight: 600;
  width: 33.33333%;
  height: 80px;
  cursor: pointer;
  background-color: #384351;
  border-top: 1.5px solid #e6e5ea;
  border-right: 1.5px solid #e6e5ea;
`;

const CameraButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  font-weight: 600;
  width: 16.66666%;
  height: 80px;
  cursor: pointer;
  background-color: #384351;
  border-bottom: 1.5px solid #e6e5ea;
`;
