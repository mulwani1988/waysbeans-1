import { Container, Row, Col, Button } from 'react-bootstrap';
import { useParams, useNavigate } from "react-router-dom";

export default function ProductDetails(props) {
  const navigate = useNavigate();

  const params = useParams();
  const Products = props.Products;
  let Product = Products.filter(Product => Product.id === parseInt(params.id));
  Product = Product[0];

  const addToCart = () => {
    if (props.isLogin) {
      let LoggedInUser = props.Users.find(data => data.id === props.LoggedInUser.id);
      if (LoggedInUser.cart.some(item => item.order === Product.name)) LoggedInUser.cart.find(item => item.order === Product.name).quantity += 1;
      else LoggedInUser.cart.push({image:Product.photo,order:Product.name,quantity:1});
      const updatedUsers = props.Users.map(user => {
        if (user.id === props.LoggedInUser.id) {
          return {
            ...user,
            cart: LoggedInUser.cart,
          };
        }
        return user;
      });
      props.SetUsers(updatedUsers);
      navigate("/");
    }
    else props.showModalLogin();
  };

  return (
    <Container>
      <Row className="custom-margin-top justify-content-between align-items-center mx-5 mb-5 responsive-margin-x">
        <Col xs={12} lg={5}>
          <img src={Product.photo} alt={`${Product.name}`} style={{ width:"100%" }}/>
        </Col>
        <Col xs={12} lg={6}>
          <h1 className="product-title font-size-48px">{Product.name}</h1>
          <div className="product-details font-size-18px mb-4">Stock: {Product.stock}</div>
          <p className="font-size-18px" style={{ textAlign:"justify" }}>{Product.description}</p>
          <div className="text-end product-details fw-bold font-size-24px">Rp{Product.price}</div>
          <div className="d-grid mt-5">
            <Button onClick={addToCart} variant="primary" size="lg" className="custom-btn-primary fw-bold font-size-18px w-100">Add Cart</Button>
          </div>
        </Col>
      </Row>
    </Container>
  )
}