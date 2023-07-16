import { useEffect, useRef, useState } from "react";
import "../Styles/FilterBar.css";
import { AttributeValues, Type } from "../Types/Type.types";
import { Category } from "../Types/Category.types";
import { Accordion, AccordionButton, Button, Dropdown, DropdownButton, Form, FormCheck, InputGroup } from "react-bootstrap";
import { Gender } from "../Types/Gender.type";
import { Brand } from "../Types/Brand.types";
import { Attribute } from "../Types/Attribute.types";
import { fetchBrands, fetchGenders, fetchTypes } from "../api/api";
import { ToggleButton } from 'primereact/togglebutton';
import { Size } from "../Types/Size.types";
import AccordionHeader from "react-bootstrap/esm/AccordionHeader";
import AccordionItem from "react-bootstrap/esm/AccordionItem";
import AccordionBody from "react-bootstrap/esm/AccordionBody";

const FilterBar = ({ onSearch }: any) => {
  const [productName, setProductName] = useState("");

  const [genderName, setGenderName] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [typeName, setTypeName] = useState("");
  const [categoryName, setCategoryName] = useState("");

  const [selectedType, setSelectedType] = useState<Type | null>(null);
  const [types, setTypes] = useState<Type[]>([]);

  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  const [brands, setBrands] = useState<Brand[]>([]);
  const [selectedBrands,setSelectedBrands] = useState<string[]>([]);

  const [genders,setGenders] = useState<Gender[]>([]);
  const [selectedGender, setSelectedGender] = useState("");

  const [selectedValues,setSelectedValues]= useState(new Map());
  const[possibleValues, setPossibleValues] = useState<AttributeValues | null>(null);

  const [sizes,setSizes] = useState<Size[]>([]);
  const [selectedSizes,setSelectedSizes]=useState<string[]>([])
  let tp = localStorage.getItem("f");
  const handleSearch = () => {
    const attributeString = mapToString(selectedValues);
    onSearch(
      productName,
      selectedBrands,
      genderName,
      selectedCategory,
      minPrice,
      maxPrice,
      typeName,
      attributeString,
      selectedSizes
    );
  };
  const handleReset = () => {
    window.location.reload();
    setCategories([]);
    setTypeName("");
    setProductName("");
    setSelectedBrands([]);
    setGenderName("");
    setCategoryName("");
    setMinPrice("");
    setMaxPrice("");
    onSearch("", [], "", "", "", "");
    setSelectedCategory('');
    setSelectedType(null);
    setSelectedGender('');
    setSelectedSizes([]);
  };

  useEffect(() => {
    
    fetchTypes().then(data => setTypes(data));
    fetchGenders().then(data => setGenders(data));
    fetchBrands().then(data => setBrands(data));
  }, []);

  useEffect(()=>{
      setSelectedCategory('');
      setSelectedValues(new Map());
  },[selectedType]);

  useEffect(() => {
    const matchedType = types.find(type => type.name === tp);
    if (matchedType) {
      setSelectedType(matchedType);
      setTypeName(matchedType.name);
      setCategories(matchedType.categoryDtoList);
      setSelectedType(matchedType);
      setPossibleValues(matchedType.attributeValues);
      setSizes(matchedType.sizeDtoList);
      localStorage.removeItem("f")
    }
  }, [types]);

  const handleBrandChange = (event: React.ChangeEvent<HTMLInputElement>) =>{
      const {value, checked} = event.target;
      if(checked){
        setSelectedBrands(prevSelected => [...prevSelected, value])
      } else {
        setSelectedBrands(prevSelected => prevSelected.filter(val=> val !== value))
      }
  }
  useEffect(()=>{
    console.log(selectedValues);
  },[selectedValues]);

  const handleSizesChange =(sizeValue:string)=>{
    setSelectedSizes((prevState)=>{
      if(prevState.includes(sizeValue)){
        return prevState.filter((size)=> size != sizeValue);
      } else {
        return [...prevState,sizeValue];
      }
    })
  }
  const handleAttributesChange = (attributeName: string, value:string)=>{
      setSelectedValues((prevState)=>{
        const updatedValues:any = new Map(prevState);
        // If the key already exists in the Map, add the new value to the array
        if (updatedValues.has(attributeName)) {
          const existingValues = updatedValues.get(attributeName);
          
          if(existingValues.includes(value)){
            // Filter out the value from the array
            const filteredValues = existingValues.filter((v:string) => v !== value);
            // Update the Map with the filtered values
              updatedValues.set(attributeName, filteredValues);
          }else{
            // Add the value to the array
              updatedValues.set(attributeName, [...existingValues, value]);
          }
        }else{
          // If the key doesn't exist, create a new array with the value
          updatedValues.set(attributeName, [value]);
        }
         return updatedValues;
        })
      }
     const mapToString = (map:any) =>{
      let result ='';
      //Each entry of the map...
      for( const [key,value] of map){
        //...write it as a string
        result += `${key}:${value}_`;
      }
      //cut off the "_"
      result = result.slice(0,-1)
      return result;
     }


  return (
    <div className="containe">
       <Button variant="primary" onClick={()=>{handleSearch();}}>
        Search
      </Button>
      <Button variant="danger" onClick={handleReset}>
        Reset
      </Button>
         <Accordion defaultActiveKey="1">
          <AccordionButton className="accordion-item bg-transparent">
            Equipment type
          </AccordionButton>
          <AccordionBody  className="filter-accordion">
          {types.map((type) => (
            <div className="buttons">
                  <Button
              className={selectedType === type ? "sselected " : "notselected"}
              key={type.id}
              onClick={() => {
                setTypeName(type.name);
                setCategories(type.categoryDtoList);
                setSelectedType(type);
                setPossibleValues(type.attributeValues);
                setSizes(type.sizeDtoList);
              }}
            >
              {type.name}
            </Button>

            </div>
          
          ))}
          <hr/>
          </AccordionBody>
        </Accordion>
  
    

      {categories.length ? (
        <Accordion defaultActiveKey="1">
          <AccordionButton className="accordion-item bg-transparent">
            Category
          </AccordionButton>
          <AccordionBody  className="filter-accordion">
          {categories.map((category) => (
            <div className="buttons">
                            <Button
              className={selectedCategory === category.name ? "sselected " : "notselected"}
              key={category.id}
              onClick={() => {
                setCategoryName(category.name);
                setSelectedCategory(category.name);
              }}
            >
              {category.name}
            </Button>

            </div>

          ))}
         
          </AccordionBody>
        </Accordion>
      ) : (
        <p>No category selected. Pick a type first.</p>
      )}
     
   
      <Accordion defaultActiveKey="1">
          <AccordionButton className="accordion-item bg-transparent">
          Product size
          </AccordionButton>
          <AccordionBody>
          {sizes.length?(<>
        {sizes.map((size)=>(
          <Button
                   key={size.id}
                  className={selectedSizes.includes(size.value) ? "sselected" : "notselected" }
              
                  onClick={()=>handleSizesChange(size.value)}>{size.value}</Button>
        ))}
      </>) : (
        <p>Pick a type first.</p>
      )}
          </AccordionBody>
      </Accordion>
      <br/>
     
      
      
      {
        possibleValues != null ? 
      <>
     
      {/* map through a array of maps Map<string,string[]>[] */}
        {Object.entries(possibleValues).map(([attributeName, attributeValues])=>(
          <div key={attributeName}>
             <Accordion>
       
          <AccordionButton className="accordion-item bg-transparent">
          {attributeName}
          </AccordionButton>
          <Accordion.Body className="filter-accordion">
          <div className="buttons">
            {attributeValues && attributeValues
            .sort((a, b)=>{
              if (!isNaN(Number(a)) && !isNaN(Number(b))) {
                return Number(a) - Number(b);
              }
              return a.localeCompare(b);
            })
            .map((value) => (
               <Button key={value}
               //check wether selectedValues map has attributeName key and if corresponding values array includes the selected value
                className={selectedValues.has(attributeName) && selectedValues.get(attributeName).includes(value) ? "sselected" : "notselected"} 
                onClick={()=>handleAttributesChange(attributeName,value)}>{value}</Button>
            ))}
          </div>
          </Accordion.Body>
      </Accordion>
      <br/>
         
        </div>
        ))
        }
      </>
      :
     <></>
    }
     
      <br />
      
      <h3 className="fbh3">Brand</h3>
      {brands.map((brand) => (
        <Form.Check
          key={brand.id}
          onChange={handleBrandChange}
          label={brand.name}
          value={brand.name}
          checked={selectedBrands.includes(brand.name)}
        />
      ))}
      <br />
       
      <h4>Gender</h4>
      <DropdownButton
        id="dropdown-item-button"
        title={selectedGender ? selectedGender : "Select gender"}
      >
        <Dropdown.ItemText>Pick gender</Dropdown.ItemText>
        {genders.map((gender) => (
          <Dropdown.Item
            as="button"
            key={gender.id}
            onClick={() => {
              setGenderName(gender.name);
              setSelectedGender(gender.name);

            }}
          >
            {gender.name}
          </Dropdown.Item>
        ))}
      </DropdownButton>
      <br /><br />
      <h3 className="fbh3">Name</h3>
      <input
        id="productName"
        type="text"
        onChange={(e) => setProductName(e.currentTarget.value)}
        value={productName}
      />
    <br/>
    <br />
      <h3 className="fbh3">Minimum price</h3>
      <input
        id="minPrice"
        type="number"
        pattern="[0-9]*"
        onChange={(e) => setMinPrice(e.currentTarget.value)}
        value={minPrice}
      />
      <h4>Maximum price</h4>
      <input
        id="maxPrice"
        type="number"
        pattern="[0-9]*"
        onChange={(e) => setMaxPrice(e.currentTarget.value)}
        value={maxPrice}
      />
      <br />
      <br />
     

</div>
  );
};

export default FilterBar;
