import axios from "axios";

export const getAllProduct = async () => {
  const res = await axios.get(`http://localhost:9999/products`);
  if (res.status === 200) {
    return res.data;
  }
};
