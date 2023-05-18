import Card from "react-bootstrap/esm/Card";
import CardHeader from "react-bootstrap/esm/CardHeader";
import "../Styles/ConfirmOrder.css"
import OrderContext, { OrderContent } from "../context/OrderDetailsProvider";
import {useContext} from "react"
import Button from "react-bootstrap/esm/Button";
import { handleCheckout } from "../api/api";
const ConfirmOrderPage = () =>{

    const {order,setOrder} = useContext(OrderContext);

    const Checkout =(event:any) =>{
        const deliveryAddress= `${order.address.city}, ${order.address.province}, ${order.address.street}, ${order.address.zipcode}`
        const billingName = order.personal.name;
        const contactPhone = order.personal.phone;
        const paymentMethod = order.payment;
        handleCheckout({
            deliveryAddress, billingName, contactPhone, paymentMethod
        }).then((data)=>console.log(data));
        console.log(deliveryAddress)
    }   

    return (
    <div className="container">
        <h4> Order Summary</h4>
        <div className="details-container">
            <Card className="order-section">
                <CardHeader as="h5">
                    Billing address
                </CardHeader>
                <Card.Body>
                   <label>{order.address.province}, {order.address.city}, {order.address.street}, {order.address.zipcode}</label> 
                </Card.Body>
            </Card>
            <Card className="order-section">
                <CardHeader as="h5">
                    Billing data
                </CardHeader>
                <Card.Body>
                <label>{order.personal.name} - {order.personal.phone}</label>
                </Card.Body>
            </Card>
            <Card className="order-section">
                <CardHeader as="h5">
                    Payment method
                </CardHeader>
                <Card.Body>
                    {order.payment}
                </Card.Body>
            </Card>
        </div>
        <Card className="items-summary">
                <CardHeader>
                </CardHeader>
                <Card.Body>
                    {order.items.map((item)=>(<label>{item.productName} ({item.quantity}) - {item.price} RON</label>))}
                </Card.Body>
            </Card>
            <Button className="place-order-button" onClick={(order)=>Checkout(order)}>Place order</Button>
    </div>)
}

export default ConfirmOrderPage;