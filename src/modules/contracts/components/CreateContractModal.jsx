import { Modal, Button, Form } from "react-bootstrap";
import { useState, useEffect } from "react";
import { createContractApi } from "../services/contractApi";
import { toast } from "react-toastify";

const CreateContractModal = ({ show, onHide, application }) => {
  const [amount, setAmount] = useState("");

  useEffect(() => {
    if (application?.expectedAmount) {
      setAmount(application.expectedAmount);
    }
  }, [application]);

  if (!application) return null;

  const handleCreate = async () => {
    try {
      const payload = {
        jobId: application.jobId,
        workerId: application.workerId,
        agreedAmount: amount,
      };

      await createContractApi(payload);

      toast.success("Contract created. Negotiation started");
      onHide();
    } catch (err) {
      toast.error("Failed to create contract");
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Create Contract</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p><strong>Application ID:</strong> {application.applicationId}</p>

        <p>
          <strong>Worker:</strong><br />
          {application.workerName}<br />
          <small className="text-muted">{application.workerEmail}</small>
        </p>

        <p>
          <strong>Job:</strong><br />
          {application.jobTitle}
        </p>

        <Form.Group className="mb-3">
          <Form.Label>Agreed Amount (₹)</Form.Label>
          <Form.Control
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter agreed amount"
          />
        </Form.Group>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleCreate}>
          Start Negotiation
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateContractModal;
