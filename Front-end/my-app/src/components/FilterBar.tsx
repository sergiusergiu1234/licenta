import { useEffect, useRef, useState } from "react";
import "../Styles/FilterBar.css";
import { Type } from "../Types/Type.types";
import { Category } from "../Types/Category.types";
import { Button, Dropdown, DropdownButton, Form, InputGroup } from "react-bootstrap";
import { Gender } from "../Types/Gender.type";
import { Brand } from "../Types/Brand.types";
import { Attribute } from "../Types/Attribute.types";
import { fetchBrands, fetchGenders, fetchTypes } from "../api/api";

const FilterBar = ({ onSearch }: any) => {
  const [productName, setProductName] = useState("");
  const [selectedBrands,setSelectedBrands] = useState<string[]>([]);
  const [genderName, setGenderName] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [typeName, setTypeName] = useState("");
  const [categoryName, setCategoryName] = useState("");

  const [selectedType, setSelectedType] = useState<Type>({id:9999,
                                                          name:"",
                                                          categoryDtoList:[{id:9999,name:''}],
                                                          attributeDtoList:[{id:9999,name:''}],});
  const [types, setTypes] = useState<Type[]>([]);

  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  const [brands, setBrands] = useState<Brand[]>([]);

  const [genders,setGenders] = useState<Gender[]>([]);
  const [selectedGender, setSelectedGender] = useState("");

  const [attributes,setAttributes] = useState<Attribute[]>([]);
  const [completedAttributes, setCompletedAttributes] = useState("");


  const handleSearch = () => {
    onSearch(
      productName,
      selectedBrands,
      genderName,
      categoryName,
      minPrice,
      maxPrice,
      typeName
    );
  };
  const handleReset = () => {
    setCategories([]);
    setTypeName("");
    setAttributes([]);
    setProductName("");
    setSelectedBrands([]);
    setGenderName("");
    setCategoryName("");
    setMinPrice("");
    setMaxPrice("");
    onSearch("", [], "", "", "", "");
    setSelectedCategory('');
    setSelectedType({id:9999,
      name:"",
      categoryDtoList:[{id:9999,name:''}],
      attributeDtoList:[{id:9999,name:''}],});
    setSelectedGender('');
  };

  useEffect(() => {
    fetchTypes().then(data => setTypes(data));
    fetchGenders().then(data => setGenders(data));
    fetchBrands().then(data => setBrands(data));
  }, []);

  useEffect(()=>{
      setSelectedCategory('');
  },[selectedType]);

  const handleBrandChange = (event: React.ChangeEvent<HTMLInputElement>) =>{
      const {value, checked} = event.target;
      if(checked){
        setSelectedBrands(prevSelected => [...prevSelected, value])
      } else {
        setSelectedBrands(prevSelected => prevSelected.filter(val=> val !== value))
      }
  }

  return (
    <div>
      <h4>EQUIPMENT TYPE</h4>
      <DropdownButton
        id="dropdown-item-button"
        title={selectedType.name ? selectedType.name : "Select type"}
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
              setAttributes(type.attributeDtoList);
            }}
          >
            {type.name}
          </Dropdown.Item>
        ))}
      </DropdownButton>

      <hr />
      <h4>CATEGORY</h4>
      {categories.length ? (
        <DropdownButton
          id="dropdown-item-button"
          title={selectedCategory ? selectedCategory : "Select category"}
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
        <label>No category selected. Pick a type first.</label>
      )}

      <hr />
      <h3>FILTERS:</h3>
      <h4>Name</h4>
      <input
        id="productName"
        type="text"
        onChange={(e) => setProductName(e.currentTarget.value)}
        value={productName}
      />
      <hr />
      
      <h4>Brand</h4>
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

      <h4>Attributes</h4>
      {
        attributes.length ? 
      <>
      {attributes.map((attribute) => (
        <InputGroup className="mb-3">
          <Form.Control aria-label="Text input with checkbox"
                        placeholder={attribute.name} 
                        value={}/>
        </InputGroup>
      ))}
      </>
      :
      "Select equipment type"
    }
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
