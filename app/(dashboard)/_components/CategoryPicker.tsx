"use client";
import { apiConnector } from "@/lib/apiConnector";
import { TransactionType } from "@/lib/types";
import React, { useEffect, useState } from "react";

interface Props {
    type: TransactionType;
}

function CategoryPicker({type}: Props) {
    const [categories, setCategories] = useState<string[]>([]);
    const getCategories = async () => {
        const res = await apiConnector("GET", `/api/categories?type=${type}`, null, null, null);
        console.log(res.data?.data);
        setCategories(res.data?.data);
    }
    useEffect(() => {
        getCategories();
    }, [])

	return (
        <div>CategoryPicker</div>
    );
}

export default CategoryPicker;