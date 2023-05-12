import { IconContext } from "react-icons";
import {VscDebugStart} from "react-icons/vsc"
import "../Styles/SumarComanda.css"
import { Card } from "react-bootstrap";
import CardHeader from "react-bootstrap/esm/CardHeader";
interface Props {
    total:number;
}
const SumarComanda = ({total}:Props) =>{

    return (<Card className="sumar-container">
        <CardHeader>
        <h5>Summary</h5>
        </CardHeader>
        <label className="detail">Products:</label>
        <label></label>
        <label className="detail">Delivery:</label>
        <label></label>
        <label className="total">Total:</label>
        <label className="total">{total}</label>
        <IconContext.Provider value={{ size: "30px" }}>
            <button className="continue-button">
            <VscDebugStart />
            Checkout
            </button>
        </IconContext.Provider>
        </Card>)
}

export default SumarComanda;