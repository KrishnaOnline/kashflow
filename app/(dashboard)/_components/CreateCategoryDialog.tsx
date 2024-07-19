"use client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { TransactionType } from "@/lib/types";
import { CreateCategorySchema, CreateCategorySchemaType } from "@/schemas/categories";
import { zodResolver } from "@hookform/resolvers/zod";
import { PlusSquare } from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

interface Props {
    type: TransactionType;
}

function CreateCategoryDialog({type}: Props) {
    const [open, setOpen] = useState(false);
    const form = useForm<CreateCategorySchemaType>({
        resolver: zodResolver(CreateCategorySchema),
        defaultValues: {
            type,
        }
    });

	return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant={"ghost"} className="flex border-separate items-center justify-start rounded-none border-b px-3 py-3 text-muted-foreground">
                    <PlusSquare className="mr-2 h-4 w-4"/>
                    Create New
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Create new <span className={`${type==="income" ? "text-green-600" : "text-red-600"}`}>{type==="income" ? "Income" : "Expense"}</span> category
                    </DialogTitle>
                    <DialogDescription>
                        To group your Transactions
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form className="space-y-8">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input defaultValue={""} {...field}/>
                                    </FormControl>
                                    <FormDescription>
                                        Transaction Description (optional)
                                    </FormDescription>
                                </FormItem>
                            )}
                        />
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}

export default CreateCategoryDialog;