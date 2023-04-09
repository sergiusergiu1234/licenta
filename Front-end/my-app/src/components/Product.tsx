import { ProductType } from "../Types/ProductType.types";
import '../Styles/Product.css';
import { type } from "os";

interface Props {
    product: ProductType
}
const Product =({product}:Props)=>{
    const base64String = product.image;
    const byteCharacters = atob(base64String);
    const byteNumbers = new Array(byteCharacters.length);
    for(let i=0; i< byteCharacters.length; i++){
        byteNumbers[i]=byteCharacters.charCodeAt(i);
    }
    const byteArray =new Uint8Array(byteNumbers);
    const image= new Blob([byteArray], {type:'image/jpeg'});
    const imageUrl = URL.createObjectURL(image);

    return(
    <div className="product-container">
        <div className="product-image">
            <img src={imageUrl} alt={product.name} />
        </div>
        <div className="product-details">
            <div className="product-name">{product.name}</div>
            <div className="product-price">{product.price} RON </div>
            <div className="product-buttons">
                <button className="favorite-button"></button>
                <button className="cart-button"></button>
            </div>
        </div>
    </div>)
}

export default Product;