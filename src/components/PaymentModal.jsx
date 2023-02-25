import { Modal, Form, Button } from "react-bootstrap";

export default function PaymentModal(props) {
  return (
    <>
      <Modal {...props} aria-labelledby="login-modal" centered>
        <Modal.Body>
          <h1 id="login-modal" className="fw-bold custom-text-primary px-3 py-4">
            Payment Information
          </h1>
          <Form onSubmit={props.PaymentOnSubmit} className="px-3 pb-3">
            <Form.Group className="mb-4" controlId="formAddress">
              <Form.Control type="text" onChange={props.PaymentOnChange} name="address" value={props.formPayment.address} placeholder="Address" className="font-size-18px p-3 custom-form-input" required/>
            </Form.Group>
            <Form.Group className="mb-4" controlId="formPostCode">
              <Form.Control type="number" onChange={props.PaymentOnChange} name="postcode" value={props.formPayment.postcode} placeholder="Post Code" className="font-size-18px p-3 custom-form-input" required/>
            </Form.Group>
            <Form.Text className="custom-text-primary fw-bold font-size-24px d-block mb-4">
              Qty: {props.qty}
              <br/>
              Total: Rp{props.total}
            </Form.Text>
            <Button variant="primary" type="submit" className="custom-btn-primary w-100 fw-bold font-size-18px mb-2 mt-2 p-3">Pay</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}