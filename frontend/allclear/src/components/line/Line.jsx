import { useState, useEffect } from "react";
import styled from "styled-components";
import { LineChart } from "@mui/x-charts/LineChart";
import { BarChart } from "@mui/x-charts/BarChart";
import { getLineData } from "../../apis/statistic/statisticData";
import { useRecoilValue } from "recoil";
import { selectedLineAtom } from "../../recoil/statistics/statistics";
import { ChartsReferenceLine } from "@mui/x-charts/ChartsReferenceLine";
import { axisClasses } from "@mui/x-charts/ChartsAxis";

function Line() {
  const selectedLine = useRecoilValue(selectedLineAtom);

  // API 연동 데이터
  const [ec, setEc] = useState([]);
  const [ph, setPh] = useState([]);
  const [date, setDate] = useState([]);
  const ecCompare = ec.map((x) => x - 2.5);
  const phCompare = ph.map((x) => x - 5.5);

  useEffect(() => {
    getLineData(
      selectedLine,
      ({ data }) => {
        setEc(data.ecList);
        setPh(data.phList);
        setDate(data.dateList);
      },
      (error) => {
        console.log(error);
      }
    );
  }, [selectedLine]);

  return (
    <div>
      <DashboardContents>
        <div style={{ backgroundColor: "#273444", marginBottom: 30 }}>
          <LineChart
            width={705}
            height={400}
            colors={["#2699E6"]}
            series={[{ data: ec, label: "양액 EC" }]}
            yAxis={[{ min: 1.5, max: 3.5 }]}
            xAxis={[{ scaleType: "point", data: date }]}
            sx={{
              [`& .${axisClasses.directionX} .${axisClasses.tickLabel}`]: {
                fill: "#e6e5ea", // 텍스트 색상을 흰색으로 설정
              },
              [`& .${axisClasses.directionY} .${axisClasses.tickLabel}`]: {
                fill: "#e6e5ea", // 축 라벨의 텍스트 색상을 흰색으로 설정
              },
              [`& .${axisClasses.directionX} .${axisClasses.line}`]: {
                stroke: "#e6e5ea", // x축 선의 색상을 흰색으로 설정
              },
              [`& .${axisClasses.directionY} .${axisClasses.line}`]: {
                stroke: "#e6e5ea", // y축 선의 색상을 흰색으로 설정
              },
              [`& .${axisClasses.directionX} .${axisClasses.tick}`]: {
                stroke: "#e6e5ea", // x축 눈금의 색상을 흰색으로 설정
              },
              [`& .${axisClasses.directionY} .${axisClasses.tick}`]: {
                stroke: "#e6e5ea", // y축 눈금의 색상을 흰색으로 설정
              },
              ["& path"]: { strokeWidth: "5px", stroke: "#2699E6" },
            }}
            slotProps={{ legend: { labelStyle: { fill: `#e6e5ea` } } }}
          >
            <ChartsReferenceLine
              y={2.5}
              lineStyle={{ stroke: "#e6e5ea", strokeWidth: 1 }}
            />
          </LineChart>
        </div>
        <div style={{ backgroundColor: "#273444", marginBottom: 30 }}>
          <LineChart
            width={705}
            height={400}
            colors={["#03C04A"]}
            series={[{ data: ph, label: "양액 pH" }]}
            yAxis={[{ min: 4, max: 7 }]}
            xAxis={[{ scaleType: "point", data: date }]}
            sx={{
              [`& .${axisClasses.directionX} .${axisClasses.tickLabel}`]: {
                fill: "#e6e5ea", // 텍스트 색상을 흰색으로 설정
              },
              [`& .${axisClasses.directionY} .${axisClasses.tickLabel}`]: {
                fill: "#e6e5ea", // 축 라벨의 텍스트 색상을 흰색으로 설정
              },
              [`& .${axisClasses.directionX} .${axisClasses.line}`]: {
                stroke: "#e6e5ea", // x축 선의 색상을 흰색으로 설정
              },
              [`& .${axisClasses.directionY} .${axisClasses.line}`]: {
                stroke: "#e6e5ea", // y축 선의 색상을 흰색으로 설정
              },
              [`& .${axisClasses.directionX} .${axisClasses.tick}`]: {
                stroke: "#e6e5ea", // x축 눈금의 색상을 흰색으로 설정
              },
              [`& .${axisClasses.directionY} .${axisClasses.tick}`]: {
                stroke: "#e6e5ea", // y축 눈금의 색상을 흰색으로 설정
              },
              ["& path"]: { strokeWidth: "5px", stroke: "#03C04A" },
            }}
            slotProps={{ legend: { labelStyle: { fill: `#e6e5ea` } } }}
          >
            <ChartsReferenceLine
              y={5.5}
              lineStyle={{ stroke: "#e6e5ea", strokeWidth: 1 }}
            />
          </LineChart>
        </div>
        <div style={{ backgroundColor: "#273444", marginBottom: 30 }}>
          <BarChart
            width={705}
            height={400}
            colors={["#2699E6"]}
            series={[
              { data: ecCompare, label: "양액 EC" },
              // { data: hourlyHumidity, label: "습도" },
              // { data: hourlyLight, label: "조도" },
            ]}
            xAxis={[{ scaleType: "band", data: date }]}
            yAxis={[
              {
                min: -1,
                max: 1,
                colorMap: {
                  type: "piecewise",
                  thresholds: [0],
                  colors: ["red", "#0055ff"],
                },
              },
            ]}
            sx={{
              [`& .${axisClasses.directionX} .${axisClasses.tickLabel}`]: {
                fill: "#e6e5ea", // 텍스트 색상을 흰색으로 설정
              },
              [`& .${axisClasses.directionY} .${axisClasses.tickLabel}`]: {
                fill: "#e6e5ea", // 축 라벨의 텍스트 색상을 흰색으로 설정
              },
              [`& .${axisClasses.directionX} .${axisClasses.line}`]: {
                stroke: "#e6e5ea", // x축 선의 색상을 흰색으로 설정
              },
              [`& .${axisClasses.directionY} .${axisClasses.line}`]: {
                stroke: "#e6e5ea", // y축 선의 색상을 흰색으로 설정
              },
              [`& .${axisClasses.directionX} .${axisClasses.tick}`]: {
                stroke: "#e6e5ea", // x축 눈금의 색상을 흰색으로 설정
              },
              [`& .${axisClasses.directionY} .${axisClasses.tick}`]: {
                stroke: "#e6e5ea", // y축 눈금의 색상을 흰색으로 설정
              },
            }}
            slotProps={{
              legend: { labelStyle: { fill: `#e6e5ea` } },
            }}
          >
            <ChartsReferenceLine
              y={0}
              lineStyle={{ stroke: "#e6e5ea", strokeWidth: 1.5 }}
            />
          </BarChart>
        </div>
        <div style={{ backgroundColor: "#273444", marginBottom: 30 }}>
          <BarChart
            width={705}
            height={400}
            colors={["#03C04A"]}
            series={[
              { data: phCompare, label: "양액 pH" },
              // { data: hourlyHumidity, label: "습도" },
              // { data: hourlyLight, label: "조도" },
            ]}
            xAxis={[{ scaleType: "band", data: date }]}
            yAxis={[
              {
                min: -1.5,
                max: 1.5,
                colorMap: {
                  type: "piecewise",
                  thresholds: [0],
                  colors: ["red", "#0055ff"],
                },
              },
            ]}
            sx={{
              [`& .${axisClasses.directionX} .${axisClasses.tickLabel}`]: {
                fill: "#e6e5ea", // 텍스트 색상을 흰색으로 설정
              },
              [`& .${axisClasses.directionY} .${axisClasses.tickLabel}`]: {
                fill: "#e6e5ea", // 축 라벨의 텍스트 색상을 흰색으로 설정
              },
              [`& .${axisClasses.directionX} .${axisClasses.line}`]: {
                stroke: "#e6e5ea", // x축 선의 색상을 흰색으로 설정
              },
              [`& .${axisClasses.directionY} .${axisClasses.line}`]: {
                stroke: "#e6e5ea", // y축 선의 색상을 흰색으로 설정
              },
              [`& .${axisClasses.directionX} .${axisClasses.tick}`]: {
                stroke: "#e6e5ea", // x축 눈금의 색상을 흰색으로 설정
              },
              [`& .${axisClasses.directionY} .${axisClasses.tick}`]: {
                stroke: "#e6e5ea", // y축 눈금의 색상을 흰색으로 설정
              },
            }}
            slotProps={{
              legend: { labelStyle: { fill: `#e6e5ea` } },
            }}
          >
            <ChartsReferenceLine
              y={0}
              lineStyle={{ stroke: "#e6e5ea", strokeWidth: 1.5 }}
            />
          </BarChart>
        </div>
      </DashboardContents>
    </div>
  );
}

export default Line;

const DashboardContents = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;
