import { Container, Row, Col } from 'react-bootstrap';
import { useEffect } from "react";

export default function Profile(props) {
  useEffect(() => {document.title = `My Profile | WaysBeans`;}, []);

  const Products = props.Products;
  const Transactions = props.Transactions;
  let User = props.LoggedInUser;

  let userTransactions = [];
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  for (let transaction of Transactions) {
    if (transaction.customerId === User.id) {
      for (let product of Products) {
        if (product.name === transaction.order) {
          let userTransaction = {id:transaction.id, name:transaction.order, status:transaction.status, date:new Date(transaction.date), quantity:transaction.quantity, image:product.photo, price:product.price, total:product.price*transaction.quantity};
          if (userTransaction.status !== "Cancel") userTransactions.push(userTransaction);
        }
      }
    }
  }
  userTransactions.sort((a, b) => b.date - a.date);

  return (
    <Container>
      <Row className="custom-margin-top mx-5 responsive-margin-x justify-content-between">
        <Col xs={12} lg={6} className="mb-5 animate__animated animate__slideInLeft">
          <h2 className="product-title mb-4 font-size-24px">My Profile</h2>
          <div className="d-flex flex-wrap align-items-start">
            <img id="profile-picture" src="/images/profile-picture.webp" alt="Profile" className="rounded me-4 mb-4" style={{ width:"11rem" }}/>
            <div>
              <h5 className="product-title font-size-18px">Full Name</h5>
              <div className="font-size-18px mb-4">{User.name}</div>
              <h5 className="product-title font-size-18px">Email</h5>
              <div className="font-size-18px mb-4">{User.email}</div>
            </div>
          </div>
        </Col>
        <Col xs={12} lg={6} className="animate__animated animate__slideInRight">
          <h2 className="product-title mb-4 font-size-24px">My Transaction</h2>
          {
            userTransactions.length > 0 ? (
              userTransactions.map((item) => (
                <Row key={item.id} className="justify-content-between align-items-center p-3 mb-4" style={{ backgroundColor:"#F6E6DA" }}>
                  <Col xs={12} lg={8} className="d-flex flex-wrap justify-content-center align-items-center product-transaction">
                    <img src={item.image} alt={item.name} className="me-3 my-3" style={{ width:"6.75rem" }}/>
                    <div>
                      <h3 className="product-title font-size-16px my-0">{item.name}</h3>
                      <p className="custom-text-primary font-size-14px"><strong className="custom-text-primary">{days[item.date.getDay()]}</strong>, {item.date.getDate()} {months[item.date.getMonth()]} {item.date.getFullYear()}</p>
                      <p className="product-details font-size-14px mb-0">Price : Rp{item.price}</p>
                      <p className="product-details font-size-14px mb-0">Qty : {item.quantity}</p>
                      <p className="product-details font-size-14px fw-bold mb-0">Sub Total : Rp{item.total}</p>
                    </div>
                  </Col>
                  <Col xs={12} lg={4} className="d-flex flex-column align-items-center">
                    <img src="/images/icon-logo.webp" alt="Logo" style={{ width:"6rem" }}/>
                    <img src="/images/qr-code.webp" alt="QR Code" className="my-3" style={{ width:"4rem" }}/>
                    {
                      item.status === "Waiting Approve" ? (
                        <div className="font-size-14px text-center rounded py-1" style={{ width:"100%",color:"#FF9900",backgroundColor:"rgba(255,153,0,0.125)" }}>{item.status}</div>
                      ) : null
                    }
                    {
                      item.status === "Success" ? (
                        <div className="font-size-14px text-center rounded py-1" style={{ width:"100%",color:"#78A85A",backgroundColor:"rgba(120,168,90,0.125)" }}>{item.status}</div>
                      ) : null
                    }
                    {
                      item.status === "Complete" ? (
                        <div className="font-size-14px text-center rounded py-1" style={{ width:"100%",color:"#FFFFFF",backgroundColor:"#613D2B" }}>{item.status}</div>
                      ) : null
                    }
                  </Col>
                </Row>
              ))
            ) : <p className="opacity-50">You have never made any transaction.</p>
          }
        </Col>
      </Row>
    </Container>
  )
}