import Sidebar from "../components/dashboard/sidebar";
import CategoryForm from "../components/categories/createCategory";

export const CreateCategoryForm = () => {
    return (
        <>
            <Sidebar childComponent={<CategoryForm />} />
        </>
    ) 
}