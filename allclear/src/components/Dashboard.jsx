import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { PieChart } from "@mui/x-charts/PieChart";
import temperature from "../assets/temperature.png";
import humidity from "../assets/humidity.png";
import light from "../assets/light.png";
import onfire from "../assets/onfire.png";
import nofire from "../assets/nofire.png";
import { dashboardDataAtom } from "../recoil/dashboard/dashboard";
import { useRecoilValue, useSetRecoilState } from "recoil";

function Dashboard() {
  const [contentSize, setContentSize] = useState({ width: 0, height: 0 });
  const contentRef = useRef(null);

  useEffect(() => {
    if (contentRef.current) {
      setContentSize({
        width: contentRef.current.offsetWidth,
        height: contentRef.current.offsetWidth,
      });
    }
  }, [contentRef.current]);

  const [contentSize2, setContentSize2] = useState({ width: 0, height: 0 });
  const contentRef2 = useRef(null);

  useEffect(() => {
    if (contentRef2.current) {
      setContentSize2({
        width: contentRef2.current.offsetWidth,
        height: contentRef2.current.offsetWidth,
      });
    }
  }, [contentRef2.current]);

  const setDashboardDataAtom = useSetRecoilState(dashboardDataAtom);
  const setDashboardData = (data) => setDashboardDataAtom(data);
  const dashboardData = useRecoilValue(dashboardDataAtom);

  const data3 = [
    { day: "월", value: 205 },
    { day: "화", value: 5411 },
    { day: "수", value: 2840 },
    { day: "목", value: 728 },
    { day: "금", value: 623 },
    { day: "토", value: 4910 },
    { day: "일", value: 3214 },
  ];

  const fetchSSE = () => {
    console.log("fetchSSE 실행");
    const eventSource = new EventSource(
      "http://k10b302.p.ssafy.io:30201/api/connection/connect"
    );

    // eventSource.onopen = () => {
    //   console.log("sse OPENED");
    // };

    eventSource.addEventListener("open", () => {
      console.log("sse OPENED");
    });

    eventSource.addEventListener("secondmessage", (e) => {
      console.log(e.data);
      setDashboardData(JSON.parse(e.data));
    });

    eventSource.addEventListener("hourmessage", (e) => {
      // console.log(e.data);
    });

    // eventSource.onerror = (e) => {
    //   console.log(e.target.readyState);
    //   eventSource.close();
    //   if (e.target.readyState === EventSource.CLOSED) {
    //     console.log("sse CLOSED");
    //   }
    // };
  };

  useEffect(() => {
    fetchSSE();
  }, []);

  const detectFire = () => {
    if (dashboardData.detect == "1") {
      return (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-evenly",
            width: "100%",
            height: "75%",
          }}
        >
          <FireImg src={onfire} />
          <div style={{ fontSize: 70, fontWeight: 600, color: "#FF3E03" }}>
            화재 발생
          </div>
        </div>
      );
    } else {
      return (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-evenly",
            width: "100%",
            height: "75%",
          }}
        >
          <FireImg src={nofire} />
          <div style={{ fontSize: 70, fontWeight: 600, color: "#ADAAAB" }}>
            이상 없음
          </div>
        </div>
      );
    }
  };

  return (
    <DashboardContainer>
      <DashboardBox>
        <TitleContainer>
          <Title>대시보드</Title>
        </TitleContainer>
        <DashboardContents>
          <Content1 ref={contentRef} height={contentSize.height * 0.8}>
            <ContentTitle1>온도</ContentTitle1>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "80%",
              }}
            >
              <TemperatureImg src={temperature} />
              <Temperature>{dashboardData.temperature}</Temperature>
              <Celsius>(℃)</Celsius>
            </div>
          </Content1>
          <Content1 ref={contentRef} height={contentSize.height * 0.8}>
            <ContentTitle1>습도</ContentTitle1>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "80%",
              }}
            >
              <HumidityImg src={humidity} />
              <Temperature>{dashboardData.humidity}</Temperature>
              <Celsius>(％)</Celsius>
            </div>
          </Content1>
          <Content1 ref={contentRef} height={contentSize.height * 0.8}>
            <ContentTitle1>조도</ContentTitle1>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "80%",
              }}
            >
              <LightImg src={light} />
              <Temperature>{dashboardData.light}</Temperature>
              <Celsius>(㏓)</Celsius>
            </div>
          </Content1>
          <Content2 ref={contentRef2} height={contentSize2.height / 1.3}>
            <ContentTitle2>공기 질 현황표</ContentTitle2>
            <PieChart
              colors={[
                "#FF5B72",
                "#23ADE5",
                "#FF9142",
                "#23D3B5",
                "#3C4856",
                "#6872E1",
              ]}
              margin={{ top: 30, bottom: 10, left: 10, right: 10 }}
              height={500}
              series={[
                {
                  data: [
                    { label: "CO", value: dashboardData.co },
                    { label: "CO2", value: dashboardData.co2 },
                    { label: "Alcohol", value: dashboardData.alcohol },
                    { label: "Venzene", value: dashboardData.venzene },
                    { label: "NH4", value: dashboardData.nh4 },
                    { label: "Aceton", value: dashboardData.aceton },
                  ],
                  innerRadius: 70,
                  outerRadius: 130,
                },
              ]}
              slotProps={{
                legend: {
                  direction: "row",
                  position: { vertical: "bottom", horizontal: "middle" },
                  labelStyle: { fill: `#e6e5ea` },
                },
              }}
            />
          </Content2>
          <Content3 ref={contentRef2} height={contentSize2.height / 1.3}>
            <ContentTitle3>화재 감지</ContentTitle3>
            {detectFire()}
          </Content3>
        </DashboardContents>
      </DashboardBox>
    </DashboardContainer>
  );
}

const DashboardContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const DashboardBox = styled.div`
  overflow: auto;
  width: calc(100% - 70px);
  height: 100%;
  margin: 0 35px;
`;

const TitleContainer = styled.div`
  display: flex;
  height: 100px;
  padding: 25px 0;
`;

const Title = styled.div`
  height: 50px;
  font-size: 32px;
  font-weight: 600;
`;

const DashboardContents = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  justify-content: space-between;
`;

const Content1 = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #273444;
  margin-bottom: 30px;
  width: 32%;
  height: ${(props) => props.height}px;
  overflow: hidden;
`;

const ContentTitle1 = styled.div`
  font-size: 32px;
  font-weight: 600;
  margin: 25px 0 0px;
`;

const TemperatureImg = styled.img`
  height: 50%;
`;

const Temperature = styled.div`
  font-size: 80px;
  font-weight: 600;
  margin-left: 20px;
`;

const Celsius = styled.div`
  font-size: 70px;
  font-weight: 400;
`;

const LightImg = styled.img`
  height: 45%;
`;

const HumidityImg = styled.img`
  height: 50%;
`;

const Content2 = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
  background-color: #273444;
  width: 49%;
  margin-bottom: 30px;
  height: ${(props) => props.height}px;
  overflow: hidden;
`;

const ContentTitle2 = styled.div`
  font-size: 32px;
  font-weight: 600;
  position: absolute;
  top: 40px;
  z-index: 3;
`;

const Content3 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #273444;
  width: 49%;
  margin-bottom: 30px;
  height: ${(props) => props.height}px;
  overflow: hidden;
`;

const ContentTitle3 = styled.div`
  font-size: 32px;
  font-weight: 600;
  margin: 40px 0 0px;
`;

const FireImg = styled.img`
  height: 65%;
`;

export default Dashboard;
