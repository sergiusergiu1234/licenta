import { Button } from "react-bootstrap";
import "../Styles/EditAccount.css";
import { useState } from "react";

const EditAccount =()=>{
const [selected,setSelected] = useState("");

const handleEdit = (param:string)=>{


}
    return (<div className="editAccount-container">
        {selected == "fn"   ?
            <div>
                <label>EdName</label>
                <Button variant="success">confirm</Button>
                <Button variant="danger" onClick={()=>{setSelected("")}}>close</Button>  
            </div>
            : 
            <Button  onClick={()=>{setSelected("fn")}}>Edit Firstname </Button> 
        } 


        {selected == "ln"   ?
            <div>
                <label>EdName</label>
                <Button variant="success">confirm</Button>
                <Button variant="danger" onClick={()=>{setSelected("")}}>close</Button>  
            </div>
            : 
            <Button  onClick={()=>{setSelected("ln")}}>Edit Lastname </Button> 
        } 


        {selected == "e"   ?
            <div>
                <label>EdName</label>
                <Button variant="success">confirm</Button>
                <Button variant="danger" onClick={()=>{setSelected("")}}>close</Button>  
            </div>
            : 
            <Button  onClick={()=>{setSelected("e")}}>Edit Email </Button> 
        } 


        {selected == "ph"   ?
            <div>
                <label>EdName</label>
                <Button variant="success">confirm</Button>
                <Button variant="danger" onClick={()=>{setSelected("")}}>close</Button>  
            </div>
            : 
            <Button  onClick={()=>{setSelected("ph")}}>Edit phone number </Button> 
        } 
        
        {selected == "pass"   ?
            <div>
                <label>EdName</label>
                <Button variant="success">confirm</Button>
                <Button variant="danger" onClick={()=>{setSelected("")}}>close</Button>  
            </div>
            : 
            <Button  onClick={()=>{setSelected("pass")}}>Edit password </Button> 
        } 
    </div>)
}
export default EditAccount;