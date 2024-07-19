"use client";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { TransactionType } from "@/lib/types";
import { CreateTransactionSchema, CreateTransactionSchemaType } from "@/schemas/transaction";
import React, { ReactNode, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import CategoryPicker from "./CategoryPicker";
import { Popover, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";

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

    const handleCategoryChange = useCallback((value:string) => {
        form.setValue("category", value);
    }, [form]);

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
                                                <CategoryPicker type={type} onChange={handleCategoryChange}/>
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="date"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>Transaction Date *</FormLabel>
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <FormControl>
                                                        <Button variant={"outline"}
                                                            className={`w-[200px] pl-3 text-left font-normal ${!field.value && "text-muted-foreground"}`}
                                                        >
                                                            {field.value ? (format(field.value, "PPP")) : (<span>Pick a Date</span>)}
                                                        </Button>
                                                    </FormControl>
                                                </PopoverTrigger>
                                            </Popover>
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