import axios from "axios";

// export const addProductToCart = async () => {};

//assum userId === cartId
const getCart = async (userId) => {
  const response = await axios.get(`http://localhost:9999/carts?user_id=${userId}`);
  if (response.status === 200) {
    return response.data[0];
  } else {
    console.log(response);
  }
};

const getCartFullInfo = async (userId, products) => {
  const cart = await getCart(userId);

  const productInCartFullInfo = cart?.products?.map((item) => ({
    ...item,
    product: products.find((p) => parseInt(p.id) === item.product_id),
  }));

  const updatedCart = { ...cart, products: productInCartFullInfo };
  return updatedCart;
};

const updateCard = async (cart) => {
  await axios
    .put(`http://localhost:9999/carts/${cart.id}`, cart)
    .then((res) => {
      console.log(res);
    })
    .catch((e) => {
      console.log(e);
    });
};

export { getCart, getCartFullInfo, updateCard };
