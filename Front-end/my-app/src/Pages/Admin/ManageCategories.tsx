import { useEffect, useState } from "react"
import { Category } from "../../Types/Category.types"
import { fetchCategories } from "../../api/api";
import { IconContext } from "react-icons";
import { MdOutlineModeEdit } from "react-icons/md";
import { Button } from "react-bootstrap";

const ManageCategories = () =>{

    const [categories,setCategories] = useState<Category[]>([])
    const [categoryId,setCategoryId] = useState(0);

    useEffect(()=>{
        fetchCategories().then((data)=>setCategories(data));
    },[]);
    const addCategory =()=>{

    }

    const deleteCategory =()=>{

    }

    const editCategory =()=>{

    }



    
    return (<div>
        <h1> Manage categories</h1>
        <section>
        <table className="brands-table" >
            <thead>
                <th>
                    Cateogory id
                </th>
                <th>
                    Category name
                </th>
                
            </thead>
            <tbody>
                {categories.map((category:Category)=><tr key={category.id}>
                    <td>
                        {category.id}
                    </td>
                    <td>
                        {category.name}
                    </td>
                    <td className="actions">
                        <IconContext.Provider  value={{size: '30px'}}>
                        <Button className="edit" onClick={()=>setCategoryId(category.id)}><MdOutlineModeEdit /></Button>
                        </IconContext.Provider>
                    </td>
                </tr>)}
            </tbody>
        </table>
        </section>


        <section>
            <form onSubmit={addCategory}></form>
        </section>
    </div>)
}

export default ManageCategories