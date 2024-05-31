import axios from "axios";

const login = async (loginData, success, fail) => {
  await axios
    .post(`/api/farm-service/login`, loginData)
    .then(success)
    .catch(fail);
};

export { login };
