import InvoiceForm from "./components/InvoiceForm";
import services from "../../../services/invoice";
import { useNavigate } from "react-router-dom";

const AddInvoice = ({ token }) => {
  const navigate = useNavigate();

  const handleSubmit = async (filledInvoice, event) => {
    event.preventDefault();

    await services.saveInvoice(token, filledInvoice);
    navigate("../facturas", { replace: true });
  };

  return <InvoiceForm onSubmit={handleSubmit} isEditing={false} />;
};

export default AddInvoice;
