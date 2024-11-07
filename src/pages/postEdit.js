import { EditablePost } from "../components/posts-manage/edit-posts";
import Sidebar from "../components/dashboard/sidebar";

export const EditPostForm = () => {
    return (
        <>
            <Sidebar childComponent={<EditablePost />} />
        </>
    ) 
}