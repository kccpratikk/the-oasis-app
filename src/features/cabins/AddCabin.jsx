import React from "react";
import Button from "../../ui/Button";
import CreateCabinForm from "./CreateCabinForm";
import Modal from "../../ui/Modal";

function AddCabin() {
  return (
    <div>
      <Modal>
        <Modal.Open opens="cabin-form">
          <Button variation="primary" size="medium">
            Add cabin
          </Button>
        </Modal.Open>
        <Modal.Window name="cabin-form">
          <CreateCabinForm />
        </Modal.Window>
      </Modal>
    </div>
  );
}

/*function AddCabin() {
  const [isOpenModal, setIsOpenModal] = useState(false);
  return (
    <div>
      <Button
        variation="primary"
        onClick={() => setIsOpenModal((isOpenModal) => !isOpenModal)}
      >
        Add new cabin
      </Button>
      {isOpenModal && (
        <Modal onClose={() => setIsOpenModal(false)}>
          <CreateCabinForm
            onClose={() => setIsOpenModal((isOpenModal) => !isOpenModal)}
          />
        </Modal>
      )}
    </div>
  );
}
*/
export default AddCabin;
