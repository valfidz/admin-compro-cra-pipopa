import React from "react";
import Sidebar from "../components/dashboard/sidebar";
import { PostsTable } from "../components/posts-manage/posts-table";

export const PostsManage = (props) => {
    return (
        <>
            <Sidebar childComponent={<PostsTable />} />
        </>
    )
}