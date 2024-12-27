import PostForm from "../components/posts-manage/simple-form";
import Sidebar from "../components/dashboard/sidebar";

export const CreatePostForm = () => {
    return (
        <>
            <Sidebar childComponent={<PostForm />} />
        </>
    ) 
}