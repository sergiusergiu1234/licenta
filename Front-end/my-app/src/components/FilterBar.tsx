import { useState } from 'react';
import '../Styles/FilterBar.css';

const FilterBar =({onSearch}:any)=>{

    const [productName, setProductName] = useState('');
    const [brandName, setBrandName] = useState('');

    const handleSearch =() =>{
        onSearch(productName,brandName);
    }

    return (<div>
        <h4>
            Filter by:
        </h4>
            <label htmlFor='productName'>Name</label>
            <input id='productName'
                    type='text'
                    onChange={(e) => setProductName(e.currentTarget.value)}
                    />
            <label htmlFor='brandName'>Brand</label>
            <input id='brandName'
                    type='text'
                    onChange={(e) => setBrandName(e.currentTarget.value)}
                    />
            <button onClick={handleSearch}>Search</button>
       

    </div>)
}

export default FilterBar;