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
            <Form.Group className="mb-4" controlId="formName">
              <Form.Control type="text" onChange={props.PaymentOnChange} name="name" value={props.formPayment.name} placeholder="Recipient's Name" className="font-size-18px p-3 custom-form-input" required/>
            </Form.Group>
            <Form.Group className="mb-4" controlId="formEmail">
              <Form.Control type="email" onChange={props.PaymentOnChange} name="email" value={props.formPayment.email} placeholder="Recipient's Email" className="font-size-18px p-3 custom-form-input" required/>
            </Form.Group>
            <Form.Group className="mb-4" controlId="formPhone">
              <Form.Control type="text" onChange={props.PaymentOnChange} name="phone" value={props.formPayment.phone} placeholder="Recipient's Phone Number" className="font-size-18px p-3 custom-form-input" required/>
            </Form.Group>
            <Form.Group className="mb-4" controlId="formAddress">
              <Form.Control type="text" onChange={props.PaymentOnChange} name="address" value={props.formPayment.address} placeholder="Shipping Address" className="font-size-18px p-3 custom-form-input" required/>
            </Form.Group>
            <Form.Group className="mb-4" controlId="formPostCode">
              <Form.Control type="number" onChange={props.PaymentOnChange} name="postcode" value={props.formPayment.postcode} placeholder="Shipping Post Code" className="font-size-18px p-3 custom-form-input" required/>
            </Form.Group>
            <div id="payment-prove-container" className="font-size-18px p-3 py-2 custom-form-input rounded w-100">
              <label htmlFor="payment-prove" className="d-flex justify-content-between align-items-center" style={{ color:"rgba(97, 61, 43, 0.5)",cursor:"pointer" }}>
                Payment Prove
                <img src="/images/icon-paperclip.png" alt="Attach File" style={{ width:"2rem",transform:"rotate(-45deg)" }}/>
              </label>
              <input id="payment-prove" type="file" onChange={props.handlePaymentProveUpload} name="photo" className="d-none"/>
            </div>
            <div className="w-100 d-flex justify-content-center mt-4">
              <img src={props.paymentProve} alt="Payment Prove" className="w-75"/>
            </div>
            <Form.Text className="custom-text-primary fw-bold font-size-24px d-block mb-4 mt-4">
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