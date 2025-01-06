import React from "react";
import Sidebar from "../components/dashboard/sidebar";
import { CategoriesTable } from "../components/categories/categoriesTable";

export const CategoriesManage = (props) => {
    return (
        <>
            <Sidebar childComponent={<CategoriesTable />} />
        </>
    )
}