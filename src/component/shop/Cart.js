import React, { useState, useEffect } from "react";
import { Alert, Button, Container, FormControl, Table } from "react-bootstrap";
import { getCartFullInfo } from "../../service/CartService";
import { getAllProduct } from "../../service/ProductService";

export default function Cart() {
  const [cart, setCart] = useState({});
  const [products, setProducts] = useState([]);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await getAllProduct();
      setProducts(res);
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const fetchCart = async () => {
      //   console.log(products);
      const res = await getCartFullInfo(user.id, products);
      //   console.log(res);
      setCart(res);
    };

    if (products.length > 0) fetchCart();
  }, [products]);

  const handleQuantityChange = (index, newValue) => {
    if (newValue < 0) {
      return;
    }
    const availableQuantity = cart.products[index]?.product.stock;
    if (newValue > availableQuantity) {
      return;
    }

    const tempCart = { ...cart };
    tempCart.products[index].quantity = parseInt(newValue);

    setCart(tempCart);
  };

  const handleRemoveProduct = (index) => {
    const tempCart = { ...cart };
    tempCart.products[index] = {};

    setCart(tempCart);
  };

  console.log(cart);

  return (
    <div>
      {/* ------- Hero --------*/}
      <div className="my-bg-green-1">
        <Container className="">
          <h1 className="my-text-white-60 mb-0" style={{ padding: "60px 0px" }}>
            Your cart
          </h1>
        </Container>
      </div>

      {/* Cart table */}
      <div className="my-bg-green-3 pt-5" style={{ minHeight: "75vh" }}>
        <Container>
          <Table striped bordered responsive hover style={{ border: "1px solid gray" }}>
            <thead>
              <tr className="text-center">
                <th>#</th>
                <th>Image</th>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
                <th>Remove</th>
              </tr>
            </thead>
            <tbody>
              {cart?.products?.map(
                (item, index) =>
                  Object.keys(item).length > 0 && (
                    <tr key={item.product_id} className="text-center">
                      <td className=" my-vertical-align-center">{index + 1}</td>
                      <td className=" my-vertical-align-center">
                        <img
                          height={128}
                          width={128}
                          src={`images/products/${item?.product?.image}`}
                        ></img>
                      </td>
                      <td className=" my-vertical-align-center">
                        <h5>{item?.product?.name}</h5>
                      </td>
                      <td className=" my-vertical-align-center">${item?.product?.price}</td>
                      <td className="w-25 my-vertical-align-center">
                        <div className="w-50 d-flex justify-content-between justify-content-center mx-auto">
                          <Button
                            variant=""
                            onClick={() => {
                              handleQuantityChange(index, item?.quantity - 1);
                            }}
                          >
                            <span className="fs-4">-</span>
                          </Button>
                          <FormControl
                            className="mx-2"
                            type="number"
                            value={item?.quantity}
                            // value={cart?.products[index].quantity}
                            onChange={(e) => {
                              handleQuantityChange(index, e.target.value);
                            }}
                          ></FormControl>
                          <Button
                            variant=""
                            onClick={() => {
                              handleQuantityChange(index, item?.quantity + 1);
                            }}
                          >
                            <span className="fs-5">+</span>
                          </Button>
                        </div>
                        <span>Available: {item.product.stock}</span>
                      </td>
                      <td className=" my-vertical-align-center">
                        ${item?.product?.price * item?.quantity}
                      </td>
                      <td className="text-center my-vertical-align-center">
                        <Button
                          variant=""
                          onClick={() => {
                            handleRemoveProduct(index);
                          }}
                        >
                          <span className="fs-3">X</span>
                        </Button>
                      </td>
                    </tr>
                  )
              )}
            </tbody>
          </Table>
        </Container>
      </div>
    </div>
  );
}
