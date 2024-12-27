import EditablePost from "../components/posts-manage/edit-posts";
import Sidebar from "../components/dashboard/sidebar";
import { useParams } from "react-router-dom";

export const EditPostForm = () => {
    const { id } = useParams();
    return (
        <>
            <Sidebar childComponent={<EditablePost postId={id} />} />
        </>
    ) 
}