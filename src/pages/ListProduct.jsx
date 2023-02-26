import { Container, Table, Button } from 'react-bootstrap';
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function ProductDetails(props) {
  useEffect(() => {document.title = "Products List | WaysBeans";}, []);

  const navigate = useNavigate();

  const [ProductsList, SetProductsList] = useState(props.Products);

  function deleteProduct(id) {
    const UpdateProduct = ProductsList.filter(item => item.id !== id);
    SetProductsList(UpdateProduct);
    props.SetProducts(UpdateProduct);
  }

  function UpdateProduct(id) {
    const Products = props.Products;
    let Product = Products.filter(Product => Product.id === id);
    Product = Product[0];
    props.setImageUrl(Product.photo);
    props.setformUpdateProduct(Product);
    navigate(`/update-product-page/${id}`);
  }
  
  const ProductsListSorted = [...ProductsList];
  ProductsListSorted.sort((a, b) => b.id - a.id);

  return (
    <Container>
      <h1 className="custom-margin-top product-title font-size-36px mb-5">List Product</h1>
      {
        ProductsListSorted.length > 0 ? (
          <Table responsive bordered hover className="mx-auto w-100 animate__animated animate__fadeIn">
            <thead style={{ backgroundColor:"#E5E5E5" }}>
              <tr>
                <th>No.</th>
                <th>Image</th>
                <th>Name</th>
                <th>Stock</th>
                <th>Price</th>
                <th>Description</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {
                ProductsListSorted.map((item, index) => (
                  <tr key={item.id}>
                    <td>{index + 1}</td>
                    <td><img src={item.photo} alt={item.name} style={{ width:"7.5rem", height:"10rem", objectFit:"cover" }}/></td>
                    <td>{item.name}</td>
                    <td>{item.stock}</td>
                    <td>{item.price}</td>
                    <td>{item.description}</td>
                    <td style={{ width:"15rem" }}>
                      <Button onClick={() => deleteProduct(item.id)} variant="danger" className="py-0 me-2 button-delete mb-2" style={{ width:"48%" }}>delete</Button>
                      <Button onClick={() => UpdateProduct(item.id)} variant="success" className="py-0 button-update mb-2" style={{ width:"48%" }}>update</Button>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </Table>
        ) : <p className="opacity-50">There are no products to display.</p>
      }
    </Container>
  )
}