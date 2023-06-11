import { useEffect, useRef, useState } from "react";
import "../Styles/FilterBar.css";
import { AttributeValues, Type } from "../Types/Type.types";
import { Category } from "../Types/Category.types";
import { Button, Dropdown, DropdownButton, Form, FormCheck, InputGroup } from "react-bootstrap";
import { Gender } from "../Types/Gender.type";
import { Brand } from "../Types/Brand.types";
import { Attribute } from "../Types/Attribute.types";
import { fetchBrands, fetchGenders, fetchTypes } from "../api/api";
import { ToggleButton } from 'primereact/togglebutton';

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
      attributeString
    );
  };
  const handleReset = () => {
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
      for( const [key,value] of map){
        result += `${key}:${value}_`;
      }
      result = result.slice(0,-1)
      return result;
     }
  
     const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  return (
    <div className="containe">
       
      <h3>EQUIPMENT TYPE</h3>
      <DropdownButton 
        id="dropdown-item-button"
        title={selectedType?.name ? selectedType.name : "Select type"}
        size='sm'
      >
        <Dropdown.ItemText>Pick equipment type</Dropdown.ItemText>
        {types.map((type) => (
          <Dropdown.Item
            as="button"
            key={type.id}
            onClick={() => {
              setTypeName(type.name);
              setCategories(type.categoryDtoList);
              setSelectedType(type);
              setPossibleValues(type.attributeValues);
            
            }}
          >
            {type.name}
          </Dropdown.Item>
        ))}
      </DropdownButton>

      <hr />
      <h3>CATEGORY</h3>
      {categories.length ? (
        <DropdownButton className="de"
          id="dropdown-item-button"
          title={selectedCategory ? selectedCategory : 'Select category'}
          size='sm'
        >
          <Dropdown.ItemText>Pick equipment category</Dropdown.ItemText>
          {categories.map((category) => (
            <Dropdown.Item
              as="button"
              key={category.id}
              onClick={() => {
                setCategoryName(category.name);
                setSelectedCategory(category.name);
              }}
            >
              {category.name}
            </Dropdown.Item>
          ))}
        </DropdownButton>
      ) : (
        <p>No category selected. Pick a type first.</p>
      )}

      <hr />

      
      <h3>Attributes</h3>
      {
        possibleValues != null ? 
      <>
        {Object.entries(possibleValues).map(([attributeName, attributeValues])=>(
          <div key={attributeName}>
          <h4>{attributeName}</h4>
         
          <div className="buttons">
            {attributeValues && attributeValues.map((value) => (
               <Button key={value}
                className={selectedValues.has(attributeName) && selectedValues.get(attributeName).includes(value) ? "sselected" : "notselected"} 
                onClick={()=>handleAttributesChange(attributeName,value)}>{value}</Button>
            ))}
          </div>
        </div>
        ))
        }
      </>
      :
     <p>Select equipment type</p> 
    }
     
      <hr />
      
      <h3>Brand</h3>
      {brands.map((brand) => (
        <Form.Check
          key={brand.id}
          onChange={handleBrandChange}
          label={brand.name}
          value={brand.name}
          checked={selectedBrands.includes(brand.name)}
        />
      ))}
      <hr />
       
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
      <hr />
      <h4>Name</h4>
      <input
        id="productName"
        type="text"
        onChange={(e) => setProductName(e.currentTarget.value)}
        value={productName}
      />
    <hr/>
      <h4>Minimum price</h4>
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
      <hr />
      <Button variant="primary" onClick={handleSearch}>
        Search
      </Button>
      <Button variant="danger" onClick={handleReset}>
        Reset
      </Button>
    </div>
  );
};

export default FilterBar;
