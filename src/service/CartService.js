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
  //   const productInCart = cart.products;
  //   console.log(cart.products);
  //   console.log(products);

  const productInCartFullInfo = cart?.products?.map((item) => ({
    ...item,
    product: products.find((p) => p.id === item.product_id),
  }));

  return { ...cart, products: productInCartFullInfo };
};

export { getCart, getCartFullInfo };
