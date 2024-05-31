import axios from "axios";

const getHourlyData = async (success, fail) => {
  await axios
    .get(`/api/state-service/hourly`)
    .then(success)
    .catch(fail);
};

const getDailyData = async (success, fail) => {
  await axios
    .get(`/api/state-service/daily`)
    .then(success)
    .catch(fail);
};

const getLineData = async (lineNumber, success, fail) => {
  await axios
    .get(`/api/line-service/line/${lineNumber}`)
    .then(success)
    .catch(fail);
};

export { getHourlyData, getDailyData, getLineData };
