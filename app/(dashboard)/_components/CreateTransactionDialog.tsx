"use client";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { TransactionType } from "@/lib/types";
import { CreateTransactionSchema, CreateTransactionSchemaType } from "@/schemas/transaction";
import React, { ReactNode } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import CategoryPicker from "./CategoryPicker";

interface Props {
    trigger: ReactNode;
    type: TransactionType;
}

function CreateTransactionDialog({trigger, type}:Props) {
    const form = useForm<CreateTransactionSchemaType>({
        resolver: zodResolver(CreateTransactionSchema),
        defaultValues: {
            type,
            date: new Date(),
        }
    });

	return (
        <div>
            <Dialog>
                <DialogTrigger asChild>{trigger}</DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            Add new <span className={`${type==="income" ? "text-green-600" : "text-red-600"}`}>{type==="income" ? "Income" : "Expense"}</span>
                        </DialogTitle>
                    </DialogHeader>
                    <Form {...form}>
                        <form className="space-y-4">
                            <FormField
                                control={form.control}
                                name="amount"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Amount *</FormLabel>
                                        <FormControl>
                                            <Input defaultValue={0} type="number" {...field}/>
                                        </FormControl>
                                        <FormDescription>
                                            Transaction Amount (required)
                                        </FormDescription>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="description"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Description</FormLabel>
                                        <FormControl>
                                            <Input defaultValue={""} {...field}/>
                                        </FormControl>
                                        <FormDescription>
                                            Transaction Description (optional)
                                        </FormDescription>
                                    </FormItem>
                                )}
                            />
                            <div className="flex items-center justify-between gap-2">
                                <FormField
                                    control={form.control}
                                    name="category"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>Category *</FormLabel>
                                            <FormControl>
                                                <CategoryPicker type={type}/>
                                            </FormControl>
                                            <FormDescription>
                                                Select Category of Transaction (required)
                                            </FormDescription>
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </form>
                    </Form>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default CreateTransactionDialog;