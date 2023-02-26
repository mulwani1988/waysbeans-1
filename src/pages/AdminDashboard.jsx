import { Container, Table } from 'react-bootstrap';
import { useEffect } from "react";

export default function ProductDetails(props) {
  useEffect(() => {document.title = "Admin Dashboard | WaysBeans";}, []);

  let usersTransactions = [...props.Transactions];
  usersTransactions.sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <Container>
      <h1 className="custom-margin-top product-title font-size-36px mb-5">Income Transaction</h1>
      <Table responsive bordered hover className="mx-auto animate__animated animate__fadeIn">
        <thead style={{ backgroundColor:"#E5E5E5" }}>
          <tr>
            <th>No.</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Address</th>
            <th>Post Code</th>
            <th>Products Order</th>
            <th>Payment Prove</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {
            usersTransactions.map((user, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>{user.address}</td>
                <td>{user.postcode}</td>
                <td>{user.order}</td>
                <td><img src={user.prove} alt={`${user.name} Payment Prove`} style={{ width:"7.5rem", height:"10rem", objectFit:"cover" }}/></td>
                {
                  user.status === "Waiting Approve" ? <td style={{ color:"#FF9900" }}>{user.status}</td> : null
                }
                {
                  user.status === "Success" ? <td style={{ color:"#78A85A" }}>{user.status}</td> : null
                }
                {
                  user.status === "Cancel" ? <td style={{ color:"#E83939" }}>{user.status}</td> : null
                }
                {
                  user.status === "Complete" ? <td style={{ color:"#613D2B" }}>{user.status}</td> : null
                }
              </tr>
            ))
          }
        </tbody>
      </Table>
    </Container>
  )
}