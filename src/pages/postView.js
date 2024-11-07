import { Post } from "../components/posts-manage/posts";
import Sidebar from "../components/dashboard/sidebar";

export const PostView = () => {
    return (
        <>
            <Sidebar childComponent={<Post />} />
        </>
    )
}