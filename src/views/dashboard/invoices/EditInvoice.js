import InvoiceForm from "./components/InvoiceForm";
import services from "../../../services/invoice";
import { useNavigate, useLocation } from "react-router-dom";

const EditInvoice = ({ token }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleEdit = async (filledInvoice, event) => {
    event.preventDefault();
    await services.editInvoice(token, filledInvoice);
    navigate("../facturas", { replace: true });
  };

  return (
    <InvoiceForm onSubmit={handleEdit} isEditing invoice={location.state} />
  );
};

export default EditInvoice;
