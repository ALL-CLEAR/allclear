import axios from "axios";

const join = async (joinData, success, fail) => {
  await axios
    .post(`http://k10b302.p.ssafy.io:30201/api/farm-service/join`, joinData)
    .then(success)
    .catch(fail);
};

export { join };
