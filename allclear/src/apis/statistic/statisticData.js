import axios from "axios";

const getHourlyData = async (success, fail) => {
  await axios
    .get(`http://k10b302.p.ssafy.io:30201/api/state-service/hourly`)
    .then(success)
    .catch(fail);
};

const getDailyData = async (success, fail) => {
  await axios
    .get(`http://k10b302.p.ssafy.io:30201/api/state-service/daily`)
    .then(success)
    .catch(fail);
};

const getLineData = async (lineNumber, success, fail) => {
  await axios
    .get(`http://k10b302.p.ssafy.io:30201/api/line-service/line/${lineNumber}`)
    .then(success)
    .catch(fail);
};

export { getHourlyData, getDailyData, getLineData };
