import { createContext, useState } from "react";
import { FavoriteType } from "../Types/FavoriteType.types";

export type FavoriteContent ={
    favorite:{
        productId: number
    }[],
    setFavorite: React.Dispatch<React.SetStateAction<{productId: number}[]>>
}

export const FavoriteContext = createContext<FavoriteContent>({
   favorite:[{
       productId: 0
   }],
   setFavorite: ()=>{}
})

type AuthProviderProps={
    children: React.ReactNode;
}

export const FavoriteProvider =({children}:AuthProviderProps)=>{
    const [favorite, setFavorite] = useState([{ productId: 0 }]);

    return (
        <FavoriteContext.Provider value={{ favorite, setFavorite }}>
            {children}
        </FavoriteContext.Provider>
    )
}