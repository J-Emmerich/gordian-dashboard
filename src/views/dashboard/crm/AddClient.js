import CRMForm from "./components/CRMForm";
import services from "../../../services/crm";
import { useNavigate } from "react-router-dom";

const AddClient = ({token}) => {
const navigate = useNavigate();
    const handleSubmit = async (customerToSave, event) => {
        event.preventDefault();
        await services.saveCustomer(token, customerToSave);
        navigate("../clientes", { replace: true });
      };

    return (
<CRMForm submitCRMForm={handleSubmit}/>
    )
}

export default AddClient