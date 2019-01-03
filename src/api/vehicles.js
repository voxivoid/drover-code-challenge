import axios from ".";

export default {
  // https://app.joindrover.com/api/web/docs/1.0/vehicles/index.html
  search(params) {
    return axios.post("/api/web/vehicles", params).then(response => response.data);
  },
};
