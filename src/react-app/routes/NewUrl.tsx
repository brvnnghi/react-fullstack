import { useNavigate } from "react-router-dom";

import UrlForm from "./UrlForm";
import Modal from "./Modal";

export default function NewUrl() {
  const navigate = useNavigate();

  function closeModalHandler() {
    navigate("..");
  }

  return (
    <Modal isOpen={true} closeModal={closeModalHandler}>
      <UrlForm />
    </Modal>
  );
}