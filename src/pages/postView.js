import { Post } from "../components/posts-manage/posts";
import Sidebar from "../components/dashboard/sidebar";
import { useParams } from "react-router-dom";

export const PostView = () => {
    const { id } = useParams();
    return (
        <>
            <Sidebar childComponent={<Post postId={id} />} />
        </>
    )
}