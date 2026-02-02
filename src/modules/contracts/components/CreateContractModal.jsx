import { Modal, Button, Form } from "react-bootstrap";
import { useEffect, useState } from "react";
import { createContractApi } from "../services/contractApi";
import { toast } from "react-toastify";

const CreateContractModal = ({ show, onHide, application }) => {
  const [amount, setAmount] = useState("");
  console.log("APPLICATION OBJECT:", application);

  useEffect(() => {
    if (application) {
      setAmount("");
    }
  }, [application]);

  if (!application) return null;

  const handleCreate = async () => {
    try {
      await createContractApi({
        jobId: application.jobId,        // ✅ CORRECT
        workerId: application.workerId,  // ✅ CORRECT
        agreedAmount: Number(amount),
      });

      toast.success("Contract created. Negotiation started");
      onHide();
    } catch (err) {
      if (
        err.response &&
        err.response.status === 403 &&
        err.response.data?.message?.includes("Contract already exists")
      ) {
        toast.info("Contract already exists. Redirecting to contracts...");
        onHide();
        // optional navigation
        // navigate("/contracts");
      } else {
        toast.error("Failed to create contract");
      }
    }

  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Create Contract</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p>
          <b>Job:</b> {application.jobTitle}
        </p>
        <p>
          <b>Worker:</b> {application.workerName}
        </p>

        <Form.Group className="mt-3">
          <Form.Label>Agreed Amount (₹)</Form.Label>
          <Form.Control
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
            min="1"
          />
        </Form.Group>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>
        <Button
          variant="primary"
          onClick={handleCreate}
          disabled={!amount}
        >
          Start Negotiation
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateContractModal;
