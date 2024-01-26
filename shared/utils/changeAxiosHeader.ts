import axios from "axios";

const changeAxiosHeader = (key: string, value: any) => {
  axios.defaults.headers.common[key] = value;
};

export default changeAxiosHeader;
