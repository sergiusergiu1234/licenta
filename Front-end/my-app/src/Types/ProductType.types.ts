import { Brand } from "./Brand.types";
import { Category } from "./Category.types";
import { Gender } from "./Gender.type";

export  type ProductType = {
    id: number;
    name: string;
    price: number;
    brand: Brand;
    gender: Gender;
    category: Category;
    image: string;
  };