import { Category } from "./Category.types"
import {Attribute} from "./Attribute.types"
export type Type ={
    id:number,
    name: string,
    categoryDtoList: Category[],
    attributeDtoList: Attribute[]
}