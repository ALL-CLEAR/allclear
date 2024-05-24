import axios from "axios";

const login = async (loginData, success, fail) => {
  await axios
    .post(`http://k10b302.p.ssafy.io:30201/api/farm-service/login`, loginData)
    .then(success)
    .catch(fail);
};

export { login };
