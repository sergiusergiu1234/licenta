import React, { useEffect, useState } from "react";
import { Alert, Button, Dropdown, DropdownButton, FloatingLabel, Form, InputGroup, Table } from "react-bootstrap";
import { VscDebugStart } from "react-icons/vsc";
import { Brand } from "../../Types/Brand.types";
import { Category } from "../../Types/Category.types";
import { Gender } from "../../Types/Gender.type";
import { Attribute } from "../../Types/Attribute.types";
import { Type } from "../../Types/Type.types";
import { deleteProduct, fetchBrands, fetchGenders, fetchTypes } from "../../api/api";
import "../../Styles/ManageProducts.css";
import { error } from "console";

const ManageProducts = () => {
    const [showSuccess, setShowSuccess] = useState(false);
    const [showFail, setShowFail] = useState(false);

    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const [productId, setProductId] = useState<number | null>(null);
    const [productName, setProductName] = useState('');

    const [price, setPrice] = useState('');

    const [description, setDescription] = useState('');

    const [types, setTypes] = useState<Type[]>([]);
    const [selectedType, setSelectedType] = useState<Type | null>(null);

    const [brands, setBrands] = useState<Brand[]>([]);
    const [selectedBrand, setSelectedBrand] = useState('');

    const [categories, setCategories] = useState<Category[]>([]);
    const [selectedCategory, setSelectedCategory] = useState('');

    const [genders, setGenders] = useState<Gender[]>([]);
    const [selectedGender, setSelectedGender] = useState('');

    const [attributes, setAttributes] = useState<Attribute[]>([]);

    const [attributeValues, setAttributeValues] = useState<string[]>([]);

    const handleAttributeValueChange = (index: number, value: string) => {
      const updatedAttributeValues = [...attributeValues];
      updatedAttributeValues[index] = value;
      setAttributeValues(updatedAttributeValues);
    };
  
    useEffect(() => {
        fetchTypes().then((data) => setTypes(data));
        fetchBrands().then((data) => setBrands(data));
        fetchGenders().then((data) => setGenders(data));
    }, []);


    const handleSubmit1 = async (event: any) => {
        event.preventDefault();
        const productData = {
            name: productName,
            brand_name: selectedBrand,
            gender_name: selectedGender,
            category_name: selectedCategory,
            price: price,
            description: description
        }
        const token = localStorage.getItem("accessToken")
      const createProductReponse = await fetch("http://localhost:8080/products/admin/add",{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(productData)
        })
        .then(response => response.json())
        .then(data => {
          setProductId(data.id);
            handleFileUpload(data.id);
        })
        

    }
    const handleFileUpload = async (productId:number) =>{
        if(selectedFile){
           console.log(productId)
            const formData = new FormData();
            formData.append('file', selectedFile);
            const token = localStorage.getItem("accessToken")
          const response = await  fetch(`http://localhost:8080/products/admin/add-image/${productId}`,{
                method: 'POST',
                headers:{
                'Authorization': `Bearer ${token}`
                },
                body: formData
            })
            if (response.ok) {
               console.log("product uploaded succesfully!")
                setShowSuccess(true);
              } else {
                const errorData = await response.json();
                console.log(errorData);
               setShowFail(true);
              }
            }
          }
          useEffect(() => {
            if (showSuccess) {
              const timer = setTimeout(() => {
                setShowSuccess(false);
              }, 2000);
        
              return () => {
                clearTimeout(timer);
              };
            }
          }, [showSuccess]);

    const handleSubmit2 = async (event:any)=>{
        event.preventDefault();

        selectedType?.attributeDtoList.forEach(async (attribute, index) => {
            const attributeRequest = {
                productId: productId,
                attributeId: attribute.id,
                value: attributeValues[index]
              };

        const token = localStorage.getItem("accessToken");
       const response = await fetch("http://localhost:8080/productAttributes/admin/add",{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(attributeRequest)
        })
        if( response.ok){
            setShowSuccess(true);
            console.log("Product attributes add succesfully!")
        }else{
            setShowFail(true);
            console.log("Error")
        }
    });
    };


    const handleFileChange =(event: any)=>{
        const file = event.target.files[0];
        setSelectedFile(file);
        console.log(file)
    }
    return (<div className="manageProducts-page">
        {showSuccess ? <Alert variant="success" onClose={()=>setShowSuccess(false)} dismissible>
    <Alert.Heading>Success!</Alert.Heading>
    </Alert>: <></>} 
    {showFail ? <Alert variant="danger" onClose={()=>setShowFail(false)} dismissible>
    <Alert.Heading>Something went wrong!</Alert.Heading>
    </Alert>: <></>} 
        <h1>
            Manage products
        </h1>
        <section>
            <h2>Add product</h2>
            <form onSubmit={handleSubmit1}>
                
            <FloatingLabel label='Product name'>
                <Form.Control
                placeholder="Product name"
                type="text"
                id="username"
                
                onChange={(e) => setProductName(e.target.value)}
                value={productName}
                required
                /></FloatingLabel>

                <FloatingLabel label="Price">
                    <Form.Control
                        placeholder="Price"
                        id="price"
                        type="number"
                        pattern="[0-9]*"
                        onChange={(e) => setPrice(e.currentTarget.value)}
                        value={price}
                    /></FloatingLabel>

                <FloatingLabel controlId="textarea" label="Product description">
                        <Form.Control
                        as="textarea"
                        placeholder="Enter product description"
                        style={{ height: '100px' }}
                        onChange={(e) => setDescription(e.currentTarget.value)}
                        value={description}
                        />
                    </FloatingLabel>

        
                <DropdownButton
                    id="dropdown-item-button"
                    title={selectedType?.name ? selectedType.name : "Select type"}
                >
                    <Dropdown.ItemText>Select type</Dropdown.ItemText>
                    {types.map((type) => (
                        <Dropdown.Item
                            as="option"
                            key={type.id}
                            onClick={() => {
                                setSelectedType(type);
                                setCategories(type.categoryDtoList);
                                setAttributes(type.attributeDtoList);

                            }}
                        >
                            {type.name}
                        </Dropdown.Item>
                    ))}
                </DropdownButton>

                <DropdownButton
                    id="dropdown-item-button"
                    title={selectedCategory ? selectedCategory : "Select category"}>
                    <Dropdown.ItemText>Select category</Dropdown.ItemText>

                    {categories.map((category: Category) =>
                        <Dropdown.Item
                            as="option"
                            key={category.id}
                            onClick={() => { setSelectedCategory(category.name) }}
                            value={category.name}>{category.name}</Dropdown.Item>)}
                </DropdownButton>

                <DropdownButton
                    id="dropdown-item-button"
                    title={selectedBrand ? selectedBrand : "Select brand"}>
                    <Dropdown.ItemText>Select brand</Dropdown.ItemText>
                    {brands.map((brand: Brand) =>
                        <Dropdown.Item
                            as="option"
                            key={brand.id}
                            onClick={() => { setSelectedBrand(brand.name) }}
                            value={brand.name}>{brand.name}</Dropdown.Item>)}
                </DropdownButton>


                <DropdownButton
                    id="dropdown-item-button"
                    title={selectedGender ? selectedGender : "Select gender"}>
                    <Dropdown.ItemText>Select gender</Dropdown.ItemText>
                    {genders.map((gender: Gender) =>
                        <Dropdown.Item
                            as="option"
                            key={gender.id}
                            onClick={() => { setSelectedGender(gender.name) }}
                            value={gender.name}>{gender.name}</Dropdown.Item>)}
                </DropdownButton>

                <Form.Group controlId="formFile" className="mb-3">
                    <Form.Control required={true} type="file" onChange={handleFileChange}/>
                </Form.Group>

                <Button variant="success" type="submit" >
                    Add product
                </Button>
            </form>
           
        </section>
        <hr/>
        <section>
            <h2>Add product attributes</h2>
            <form onSubmit={handleSubmit2}>
            <FloatingLabel label="Product id ">
                    <Form.Control
                        placeholder="Product id"
                        id="id"
                        type="number"
                        pattern="[0-9]*"
                        onChange={(e) => setProductId(parseInt(e.currentTarget.value))}
                        value={productId !== null ? productId.toString() : ''}
                    /></FloatingLabel>

                {selectedType?.attributeDtoList.map((attribute: Attribute, index: number)=>(
                    <FloatingLabel label={attribute.name}>
                    <Form.Control
                        placeholder={attribute.name}
                        id={attribute.name}
                        type="text"
                        onChange={(e) => handleAttributeValueChange(index, e.currentTarget.value)}
                        value={attributeValues[index] || ''}
                    /></FloatingLabel>
                ))}
                 <DropdownButton
                    id="dropdown-item-button"
                    title={selectedType?.name ? selectedType.name : "Select type"}>
                    <Dropdown.ItemText>Select type</Dropdown.ItemText>
                    {types.map((type) => (
                        <Dropdown.Item
                            as="option"
                            key={type.id}
                            onClick={() => {
                                setSelectedType(type);
                                setCategories(type.categoryDtoList);
                                setAttributes(type.attributeDtoList);

                            }}
                        >
                            {type.name}
                        </Dropdown.Item>
                    ))}
                </DropdownButton>

                <Button variant="success" type="submit" >
                    Add product attribute
                </Button>
            </form>
        </section>   

        <hr/>
        <section>
            <h2>Delete product by id</h2>
            <FloatingLabel label="Product id ">
                    <Form.Control
                        placeholder="Product id"
                        id="id"
                        type="number"
                        pattern="[0-9]*"
                        onChange={(e) => setProductId(parseInt(e.currentTarget.value))}
                        value={productId !== null ? productId.toString() : ''}
                    /></FloatingLabel>
                <Button onClick={()=>deleteProduct(productId)} variant="danger">Delete product</Button>
        </section>
    </div>)
}

export default ManageProducts;

