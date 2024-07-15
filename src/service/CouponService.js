import axios from "axios";

const getAllCoupon = async () => {
  const res = await axios.get("http://localhost:9999/coupons");
  return res.data;
};

const getCouponByCode = async (code) => {
  const coupons = await getAllCoupon();
  //   console.log(coupons);
  const foundCoupon = coupons?.find((c) => c.code === code);
  //   console.log(foundCoupon);
  return foundCoupon;
};

export { getAllCoupon, getCouponByCode };
