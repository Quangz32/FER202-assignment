import React, { useState, useEffect } from "react";
import { Button, Container, FormControl, Table, Row, Col, FormLabel, Alert } from "react-bootstrap";
import { getCartFullInfo, updateCart } from "../../service/CartService";
import { getAllProduct } from "../../service/ProductService";
import { useNavigate } from "react-router-dom";
import MyToast from "../shared/MyToast";
import { getCouponByCode } from "../../service/CouponService";

export default function Cart() {
  const navigate = useNavigate();

  const [cart, setCart] = useState({});
  const [products, setProducts] = useState([]);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [showToast, setShowToast] = useState(false);
  const [coupon, setCoupon] = useState("");
  const [couponError, setCouponError] = useState("");
  const [discount, setDiscount] = useState(0);
  const [toastMessage, setToastMessage] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await getAllProduct();
      setProducts(res);
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const fetchCart = async () => {
      const res = await getCartFullInfo(user.id, products);
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

  const handleSaveCart = async (cartState) => {
    const cart = { ...cartState, id: String(cartState.id) };
    let newDetails = cart.products?.filter((p) => Object.keys(p).length > 0);

    newDetails = newDetails?.map((d) => ({
      product_id: d.product_id,
      quantity: d.quantity,
    }));

    cart.products = newDetails;
    updateCart(cart);

    setToastMessage("Your cart has been saved");
    setShowToast(true);
  };

  const getCartTotal = () => {
    let total = 0;
    cart.products?.forEach((p) => {
      total += p.quantity * p.product.price;
    });
    return total;
  };

  const getDiscount = async (code, total) => {
    const coupon = await getCouponByCode(code);
    if (!coupon) {
      setCouponError("This is not a valid coupon");
      return;
    }
    const calculatedDiscount = Math.min(coupon.max_discount, (total * coupon.percent) / 100);
    setCouponError("Apply coupon success");
    setDiscount(calculatedDiscount);
  };

  const handleCheckout = async () => {
    setToastMessage("Order placed successfully");
    setShowToast(true);

    //tạm thời xoá giỏ hàng sau khi đặt hàng
    await updateCart({
      id: user.id,
      user_id: user.id,
    });

    setTimeout(() => {
      navigate("/shop");
    }, 1500);
  };

  // console.log(getDiscount("COUPON1", 100));
  // console.log(cart.products);

  return (
    <>
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
        {!cart.products || cart.products.length === 0 ? (
          <Container>
            <Alert className="">
              <div className="fs-4 mb-3">You have no product in cart</div>
              <Button
                className=" rounded-pill"
                variant="dark"
                onClick={() => {
                  navigate("/shop");
                }}
              >
                <span className="">Let's go Shopping</span>
              </Button>
            </Alert>
          </Container>
        ) : (
          <Container>
            <div className="d-flex justify-content-end px-3 mb-3">
              <Button
                className=" me-4 rounded-pill"
                variant="dark"
                onClick={() => {
                  navigate("/shop");
                }}
              >
                <i className="bi bi-arrow-return-left me-1 ms-2"></i>
                <span className="ms-1 me-2">Continue Shopping</span>
              </Button>
              <Button
                className="my-bg-green-1 rounded-pill"
                onClick={() => {
                  handleSaveCart(cart);
                }}
              >
                <span className="mx-2">Save cart</span>
              </Button>
            </div>
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
                          <span className="fs-5">{item?.product?.name}</span>
                        </td>
                        <td className=" my-vertical-align-center">${item?.product?.price}</td>
                        <td className="my-vertical-align-center">
                          <div className="d-flex justify-content-center justify-content-center mx-auto">
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
                              style={{ width: "100px" }}
                              type="number"
                              value={item?.quantity}
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
                          <span>Available: {item.product?.stock}</span>
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
            <hr></hr>
            <Row className="pb-5">
              <Col sm={12} md={6} lg={8}>
                <FormLabel>Coupon</FormLabel>
                <div className="d-flex w-75">
                  <FormControl
                    value={coupon}
                    onChange={(e) => {
                      setCoupon(e.target.value);
                    }}
                    placeholder="Enter your coupon"
                    className="w-50"
                  ></FormControl>
                  <Button
                    className="rounded-pill ms-3"
                    variant="dark"
                    onClick={() => {
                      getDiscount(coupon, getCartTotal());
                    }}
                  >
                    <span className="mx-2">Apply coupon</span>
                  </Button>
                </div>
                <span className={couponError?.includes("valid") ? "text-danger" : "text-success"}>
                  {couponError}
                </span>
              </Col>
              <Col sm={12} md={6} lg={4}>
                <div className="mt-4 mt-md-0">
                  <span className="fs-4 my-fw-500">CART TOTAL</span>
                  <Row className="ps-3">
                    <Col>
                      <Row>Total</Row>
                      <Row>Discount</Row>
                    </Col>
                    <Col>
                      <Row>$ {getCartTotal()}</Row>
                      <Row>$ -{discount}</Row>
                    </Col>
                  </Row>
                  <hr className="my-1"></hr>
                  <Row className="ps-3">
                    <Col>
                      <Row>Total</Row>
                    </Col>
                    <Col>
                      <Row>$ {getCartTotal() - discount}</Row>
                    </Col>
                  </Row>
                  <Button
                    className="rounded-pill mt-3"
                    variant="dark"
                    onClick={() => {
                      handleCheckout();
                    }}
                  >
                    <span className="mx-2">Check out</span>
                  </Button>
                </div>
              </Col>
            </Row>
          </Container>
        )}
      </div>

      <MyToast
        show={showToast}
        setShow={setShowToast}
        variant="success"
        position="top-right"
        message={toastMessage}
      ></MyToast>
    </>
  );
}
