import { Modal } from "react-bootstrap";

export default function SuccessAddProductModal(props) {
  return (
    <>
      <Modal {...props} size="lg" aria-labelledby="success-add-product-modal" centered>
        <Modal.Body className="p-5">
          <p className="font-size-24px text-center" style={{ color:"#E83939" }}>Sorry, the email you entered was not registered, please register <strong onClick={props.changeModal} style={{ cursor:"pointer", color:"#E83939" }}>Here</strong>.</p>
        </Modal.Body>
      </Modal>
    </>
  );
}