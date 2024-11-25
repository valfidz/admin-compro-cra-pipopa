import { EditablePost } from "../components/posts-manage/edit-posts";
import PostEditForm from "../components/posts-manage/edit-post-dynamic";
import PostForm from "../components/posts-manage/simple-form";
import Sidebar from "../components/dashboard/sidebar";

export const EditPostForm = () => {
    return (
        <>
            <Sidebar childComponent={<PostForm />} />
        </>
    ) 
}