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

const updateCart = async (cart) => {
  await axios
    .put(`http://localhost:9999/carts/${cart.id}`, cart)
    .then((res) => {
      console.log(res);
    })
    .catch((e) => {
      console.log(e);
    });
};

const createNewCart = async (userId) => {
  let newCart = {};
  await axios
    .post(`http://localhost:9999/carts`, {
      id: String(userId),
      user_id: userId,
    })
    .then((res) => {
      console.log(res);
      newCart = res.data;
    })
    .catch();

  return newCart;
};

const addProductToCart = async (cart_id, product_id) => {
  let cart = await getCart(cart_id); // Cart_id = user_id
  if (!cart) {
    cart = await createNewCart(cart_id);
  }

  let cartDetail = cart.products;
  if (!cartDetail) {
    cartDetail = [{ product_id: parseInt(product_id), quantity: 1 }];
  } else {
    let added = false;
    cartDetail.forEach((detail) => {
      if (parseInt(detail.product_id) === parseInt(product_id)) {
        detail.quantity += 1;
        added = true;
      }
    });

    if (!added) {
      cartDetail.push({ product_id: parseInt(product_id), quantity: 1 });
    }
  }

  cart.products = cartDetail;
  cart.id = String(cart.id);

  updateCart(cart);
};

export { getCart, getCartFullInfo, updateCart, addProductToCart };
