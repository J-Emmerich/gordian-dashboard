import CRMForm from "./components/CRMForm";
import services from "../../../services/crm";
import { useNavigate, useLocation } from "react-router-dom";

const EditClient = ({ token }) => {
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location.state);
  const handleSubmit = async (customerToSave, event) => {
    event.preventDefault();
    await services.editCustomer(token, customerToSave);
    navigate("../clientes", { replace: true });
  };

  return (
    <CRMForm submitCRMForm={handleSubmit} isEditing customer={location.state} />
  );
};

export default EditClient;
