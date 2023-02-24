import { Container, Table } from 'react-bootstrap';

export default function ProductDetails(props) {
  const UsersAll = props.Users;
  const Users = [];
  for (let user of UsersAll) {
    if (user.isAdmin !== true) Users.push(user);
  }
  const Transactions = props.Transactions;

  let usersTransactions = [];
  for (let transaction of Transactions) {
    for (let user of Users) {
      if (transaction.customerId === user.id) {
        transaction.name = user.name;
        transaction.address = user.address;
        transaction.postcode = user.postcode;
        transaction.date = new Date(transaction.date);
      }
    }
    usersTransactions.push(transaction);
  }
  usersTransactions.sort((a, b) => b.date - a.date);

  return (
    <Container>
      <h1 className="custom-margin-top product-title font-size-36px mb-5">Income Transaction</h1>
      <Table responsive bordered hover className="mx-auto">
        <thead style={{ backgroundColor:"#E5E5E5" }}>
          <tr>
            <th>No.</th>
            <th>Name</th>
            <th>Address</th>
            <th>Post Code</th>
            <th>Products Order</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {
            usersTransactions.map((user, index) => (
              <tr key={user.id}>
                <td>{index + 1}</td>
                <td>{user.name}</td>
                <td>{user.address}</td>
                <td>{user.postcode}</td>
                <td>{user.order}</td>
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