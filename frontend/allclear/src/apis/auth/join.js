import axios from "axios";

const join = async (joinData, success, fail) => {
  await axios
    .post(`/api/farm-service/join`, joinData)
    .then(success)
    .catch(fail);
};

export { join };
