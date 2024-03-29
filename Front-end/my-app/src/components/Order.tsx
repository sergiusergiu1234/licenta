import { useEffect } from "react";

import { Accordion, Table } from "react-bootstrap";
import { OrderType } from "../Types/Order.types";
import { OrderDetail } from "../Types/OrderDetail.types";



interface Props{
    order:OrderType;
}

const Order = ({order}:Props)=>{
    useEffect(()=>{
        console.log(order.billingName)
    },[]);
    return (<Accordion defaultActiveKey="1" className="order">
        <Accordion.Item eventKey="0">
            <Accordion.Header >Order - {order.id} - {order.status} </Accordion.Header>
            <Accordion.Body>
            {order.orderDetails && order.orderDetails.length > 0 ? (
                 <Table className="details">
                    <thead>
                        <tr>
                            <th>Product name</th>
                            <th>Quantity</th>
                            <th>Total</th>
                            <th>Ordered at</th>
                        </tr>
                    </thead>
                    <tbody>
            {order.orderDetails.map((detail: OrderDetail) => (
                    <tr>
                        <td>{detail.productName} {detail.size}</td>
                        <td>{detail.quantity}</td>
                        <td>{detail.price} RON</td>
                        <td>{order.generationDateTime}</td>
                    </tr>
            ))}
            </tbody>
            <label className="bold">Total: {order.total} RON</label>
            <br/>
            <label>{`Paid with ` + " " + order.paymentMethod} </label>
        
            </Table>
          ) : (
            <p>No order details found.</p>
          )}
               
            </Accordion.Body>
        </Accordion.Item>
    </Accordion>)
}

export default Order;