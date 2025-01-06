import Sidebar from "../components/dashboard/sidebar";
import { useParams } from "react-router-dom";
import EditCategory from "../components/categories/editCategory";

export const EditCategoryForm = () => {
    const { id } = useParams();
    return (
        <>
            <Sidebar childComponent={<EditCategory categoryId={id} />} />
        </>
    ) 
}