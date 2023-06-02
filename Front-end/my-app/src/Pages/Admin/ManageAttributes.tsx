import { useEffect, useState } from "react";
import "../../Styles/ManageAttributes.css";
import { Type } from "../../Types/Type.types";
import { addAttribute, editAttribute, fetchTypes } from "../../api/api";
import { IconContext } from "react-icons";
import { Button, FloatingLabel, Form } from "react-bootstrap";
import { MdOutlineModeEdit } from "react-icons/md";
import { Attribute } from "../../Types/Attribute.types";
import { type } from "os";


const ManageAttributes = ()=>{

    const [types, setTypes] = useState<Type[]>([])
    const [typeId, setTypeId] = useState(0);

    const [attributes, setAttributes] = useState<Attribute[]>([]);
    const [attributeName,setAttributeName] = useState('');
    const [attributeId, setAttributeId] = useState(0);

    useEffect(()=>{
        fetchTypes().then((data)=>setTypes(data));
    },[]);


    const handleAddAttribute=(event:any)=>{
        event.preventDefault();
        addAttribute(attributeName, typeId).then((data)=>setAttributes((prev)=> [...prev, data]))
    }

    const handleDelete=(event:any)=>{
        event.preventDefault();

    }

    const handleEditAttribute = (event:any)=>{
        event.preventDefault();
        editAttribute(attributeName, attributeId).then((data)=>{
            setAttributes((prev)=>{
                const updatedAttributes= prev.map((att)=>{
                    if(att.id === data.id){
                        return data;
                    }
                    return att;
                });
                return updatedAttributes;
            })
        })
    }


    return(<div className="manage-attributes-page">
        <h1>Manage attributes</h1>
        <section>
        <h3>Types</h3>
        <table className="brands-table" >
            <thead>
                <th>
                    Type id
                </th>
                <th>
                    Type name
                </th>
            </thead>
            <tbody>
                {types.map((type:Type)=><tr key={type.id}>
                    <td>
                        {type.id}
                    </td>
                    <td>
                        {type.name}
                    </td>
                    <td >
                        <IconContext.Provider  value={{size: '30px'}}>
                        <Button className="edit" onClick={()=>{setTypeId(type.id);setAttributes(type.attributeDtoList)}}><MdOutlineModeEdit /></Button>
                        </IconContext.Provider>
                    </td>
                </tr>)}
            </tbody>
        </table>
        </section>

        <section>
            <h2>Attributes</h2>
        <table className="brands-table">
            <thead>
                <th>
                    Attribute id 
                </th>
                <th>
                    Attribute name 
                </th>
            </thead>
            <tbody>
                {attributes.map((attribute)=><tr key={attribute.id}>
                <td>
                    {attribute.id}
                </td>
                <td>
                    {attribute.name}
                </td>
                <td>
                <div className="actions">
                <IconContext.Provider  value={{size: '30px'}}>
                    <Button type="submit" variant="danger" onClick={handleDelete}>Delete</Button>
                    <Button className="edit" onClick={()=>setAttributeId(attribute.id)}><MdOutlineModeEdit /></Button>
                </IconContext.Provider>
                </div>
                </td>
                </tr>)}
            </tbody>
        </table>
        </section>

        <section>
        <h2>Add new attribute</h2>
        <form onSubmit={handleAddAttribute}>
            <FloatingLabel label='Category name'>
                <Form.Control
                placeholder="Category name"
                type="text"
                id="categoryName"
                onChange={(e) => setAttributeName(e.target.value)}
                value={attributeName}
                required
                /></FloatingLabel>
                   <FloatingLabel label="Type id ">
                    <Form.Control
                        placeholder="Type id"
                        id="id"
                        type="number"
                        pattern="[0-9]*"
                        onChange={(e) => setTypeId(parseInt(e.currentTarget.value))}
                        value={typeId !== null ? typeId.toString() : ''}
                    /></FloatingLabel>
            <Button type="submit" variant="success">Add attribute</Button>
            </form>
        </section>

        <section>
            <h2>Edit attribute</h2>
            <form onSubmit={handleEditAttribute}>
            <FloatingLabel label='Category name'>
                <Form.Control
                placeholder="Category name"
                type="text"
                id="categoryName"
                onChange={(e) => setAttributeName(e.target.value)}
                value={attributeName}
                required
                /></FloatingLabel>
                 <FloatingLabel label="Attribute id ">
                    <Form.Control
                        placeholder="Attribute id"
                        id="id"
                        type="number"
                        pattern="[0-9]*"
                        onChange={(e) => setAttributeId(parseInt(e.currentTarget.value))}
                        value={attributeId !== null ? attributeId.toString() : ''}
                    /></FloatingLabel>
            <Button type="submit" variant="success">Edit category</Button>
            </form>
        </section>

    </div>)
}
export default ManageAttributes;