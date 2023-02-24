import { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from "react-router-dom";

export default function ProductDetails(props) {
  const LoggedInUserCart = props.LoggedInUser.cart;
  const Products = props.Products;
  let userCarts = [];
  for (let cart of LoggedInUserCart) {
    for (let product of Products) {
      if (product.name === cart.order) {
        cart.price = product.price;
      }
    }
    userCarts.push(cart);
  }
  let userCartUpdate = [];
  for (let cart of userCarts) {
    if(Products.some(product => product.name === cart.order)) {
      userCartUpdate.push(cart);
    }
  }

  const [UserCarts, SetUserCarts] = useState(userCartUpdate);
  const increaseQuantity = (index) => {
    const updatedUserCarts = UserCarts.map((cart) => {
      if (UserCarts.indexOf(cart) === index) {
        cart.quantity += 1;
      }
      return cart;
    });
    SetUserCarts(updatedUserCarts);
    const updatedUsers = props.Users.map(user => {
      if (user.id === props.LoggedInUser.id) {
        return {
          ...user,
          cart: updatedUserCarts.map(({price, ...rest}) => rest),
        };
      }
      return user;
    });
    props.SetUsers(updatedUsers);
  };
  const decreaseQuantity = (index) => {
    const updatedUserCarts = UserCarts.map((cart) => {
      if (UserCarts.indexOf(cart) === index) {
        if (cart.quantity > 0) {
          cart.quantity -= 1;
        }
      }
      return cart;
    });
    SetUserCarts(updatedUserCarts);
    const updatedUsers = props.Users.map(user => {
      if (user.id === props.LoggedInUser.id) {
        return {
          ...user,
          cart: updatedUserCarts.map(({price, ...rest}) => rest),
        };
      }
      return user;
    });
    props.SetUsers(updatedUsers);
  };
  function deleteCart(index) {
    const UpdatedUserCart = UserCarts.filter((item, i) => i !== index);
    SetUserCarts(UpdatedUserCart);
    const updatedUsers = props.Users.map(user => {
      if (user.id === props.LoggedInUser.id) {
        return {
          ...user,
          cart: UpdatedUserCart.map(({price, ...rest}) => rest),
        };
      }
      return user;
    });
    props.SetUsers(updatedUsers);
  }
  const totalQuantity = () => {
    let totalQuantity = [];
    for (let cart of UserCarts) totalQuantity.push(cart.quantity);
    totalQuantity = totalQuantity.reduce((accumulator, currentValue) => accumulator + currentValue,0);
    return totalQuantity;
  };
  useEffect(() => {
    totalQuantity();
  });
  const totalPrice = () => {
    let totalPrice = [];
    for (let cart of UserCarts) totalPrice.push(cart.quantity*cart.price);
    totalPrice = totalPrice.reduce((accumulator, currentValue) => accumulator + currentValue,0);
    return totalPrice;
  };
  useEffect(() => {
    totalPrice();
  });
  const handlePay = () => {
    let updatedTransactions = props.Transactions;
    for (let transaction of UserCarts) {
      transaction.customerId = props.LoggedInUser.id;
      const DateFull = new Date();
      const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
      transaction.date = `${DateFull.getDay()} ${months[DateFull.getMonth()]} ${DateFull.getFullYear()}`;
      transaction.id = updatedTransactions.length + 1;
      transaction.status = "Success";
      updatedTransactions.push(transaction);
    }
    updatedTransactions = updatedTransactions.map(({price, image, ...rest}) => rest);
    props.SetTransactions(updatedTransactions);
    const updatedUsers = props.Users.map(user => {
      if (user.id === props.LoggedInUser.id) {
        return {
          ...user,
          cart: [],
        };
      }
      return user;
    });
    props.SetUsers(updatedUsers);
    props.showModalSuccessTransaction();
  };

  console.log(UserCarts);

  return (
    <Container>
      <Row className="custom-margin-top mx-5 responsive-margin-x">
        <h1 className="px-0 product-title">My Cart</h1>
        <p className="px-0 font-size-18px custom-text-primary">Review Your Order</p>
        <Row className="justify-content-between align-items-start px-0">
          <Col xs={12} lg={7}>
          {
            UserCarts.length > 0 ? (
              UserCarts.map((item, index) => (
                <Col xs={12} className="py-4 px-0 mb-4" style={{ borderTop:"1px solid #613D2B",borderBottom:"1px solid #613D2B" }}>
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="d-flex flex-wrap align-items-center">
                      <img src={item.image} alt={item.order} className="me-3" style={{ width:"7.5rem"}}/>
                      <div className="">
                        <h3 className="product-title font-size-18px mb-4">{item.order}</h3>
                        <div className="d-flex align-items-center">
                          <img src="/images/icon-decrease.webp" alt="Decrease Button" onClick={() => decreaseQuantity(index)} style={{ cursor:"pointer" }}/>
                          <span className="font-size-18px custom-text-primar px-3 mx-3 rounded" style={{ backgroundColor:"#F6E6DA" }}>{item.quantity}</span>
                          <img src="/images/icon-increase.webp" alt="Increase Button" onClick={() => increaseQuantity(index)} style={{ cursor:"pointer" }}/>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="product-details font-size-18px mb-4">Rp{item.price}</div>
                      <div className="text-end"><img src="/images/icon-delete.webp" alt="Delete Order" onClick={() => deleteCart(index)} style={{ cursor:"pointer" }}/></div>
                    </div>
                  </div>
                </Col>
              ))
            ) : <p className="opacity-50">There are no items in your cart.</p>
          }
          </Col>
          {
            UserCarts.length > 0 ? (
              <Col xs={12} lg={4} className="py-4 px-0 ms-2" style={{ borderTop:"1px solid #613D2B" }}>
                <div className="d-flex justify-content-between mb-4 font-size-18px">
                  <div className="product-details">Subtotal</div>
                  <div className="product-details">Rp{totalPrice()}</div>
                </div>
                <div className="d-flex justify-content-between pb-4 font-size-18px" style={{ borderBottom:"1px solid #613D2B" }}>
                  <div className="product-details">Qty</div>
                  <div className="product-details">{totalQuantity()}</div>
                </div>
                <div className="d-flex justify-content-between mt-4 font-size-18px">
                  <div className="product-details fw-bold">Total</div>
                  <div className="product-details fw-bold">Rp{totalPrice()}</div>
                </div>
                <div className="d-flex justify-content-end mt-5">
                  <Link to="/profile" className="w-75">
                    <Button variant="primary" onClick={handlePay} size="lg" className="custom-btn-primary fw-bold font-size-18px w-100">Pay</Button>
                  </Link>
                </div>
              </Col>
            ) : null
          }
        </Row>
      </Row>
    </Container>
  )
}