"use client";
import { apiConnector } from "@/lib/apiConnector";
import { TransactionType } from "@/lib/types";
import React, { useEffect, useState } from "react";
import { Category } from "@prisma/client";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Command, CommandInput } from "@/components/ui/command";
import CreateCategoryDialog from "./CreateCategoryDialog";

interface Props {
    type: TransactionType;
}

function CategoryPicker({type}: Props) {
    const [categories, setCategories] = useState<Category[]>([]);
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState("");

    const getCategories = async () => {
        const res = await apiConnector("GET", `/api/categories?type=${type}`, null, null, null);
        console.log(res.data?.data);
        setCategories(res.data?.data);
    }
    useEffect(() => {
        getCategories();
    }, [])

    const selectedCategory = categories.find(
        (category: Category) => category.name===value
    );

	return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant={"outline"}
                    role="combobox"
                    aria-expanded={open}
                    className="w-full"
                >
                    {selectedCategory ? (
                        <CategoryData category={selectedCategory} />
                    ) : (
                        "Select Category"
                    )}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command onSubmit={e => e.preventDefault()}>
                    <CommandInput placeholder="Search Category..."/>
                    <CreateCategoryDialog type={type}/>
                </Command>
            </PopoverContent>
        </Popover>
    );
}

function CategoryData({category}:{category:Category}) {
    return (
        <div>
            <span role="img">{category.icon}</span>
            <span>{category.name}</span>
        </div>
    )
}

export default CategoryPicker;