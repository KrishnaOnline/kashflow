"use client";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import { MAX_DATE_RANGE } from "@/lib/constants";
import { differenceInDays, startOfMonth } from "date-fns";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import TransactionTable from "./_components/TransactionTable";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Category } from "@prisma/client";
import { apiConnector } from "@/lib/apiConnector";


function TransactionsPage() {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState("");
    const [dateRange, setDateRange] = useState<{from:Date, to:Date}>({
        from: startOfMonth(new Date()),
        to: new Date(),
    });

    const [categories, setCategories] = useState<Category[]>([]);
    const getCategories = async () => {
        const res = await apiConnector("GET", `/api/categories?type=${type}`, null, null, null);
        console.log(res.data?.data);
        setCategories(res.data?.data);
    }
    useEffect(() => {
        getCategories();
    }, []);
    const selectedCategory = categories.find(
        (category: Category) => category.name===value
    );
    
    const frameworks = [
        {
          value: "next.js",
          label: "Next.js",
        },
        {
          value: "sveltekit",
          label: "SvelteKit",
        },
        {
          value: "nuxt.js",
          label: "Nuxt.js",
        },
        {
          value: "remix",
          label: "Remix",
        },
        {
          value: "astro",
          label: "Astro",
        },
    ]

	return (
        <div>
            <div className="border-b bg-card">
                <div className="container flex flex-wrap items-center justify-between gap-6 py-8">
                    <div>
                        <p className="text-3xl font-bold">Transactions History</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <Popover open={open} onOpenChange={setOpen}>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    role="combobox"
                                    aria-expanded={open}
                                    className="w-[200px] justify-between"
                                >
                                {value
                                    ? frameworks.find((framework) => framework.value === value)?.label
                                    : "Select framework..."}
                                <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-[200px] p-0">
                                <Command>
                                <CommandInput placeholder="Search framework..." className="h-9" />
                                <CommandEmpty>No framework found.</CommandEmpty>
                                <CommandGroup>
                                    {frameworks.map((framework) => (
                                    <CommandItem
                                        key={framework.value}
                                        value={framework.value}
                                        onSelect={(currentValue) => {
                                        setValue(currentValue === value ? "" : currentValue)
                                        setOpen(false)
                                        }}
                                    >
                                        {framework.label}
                                        <CheckIcon
                                        className={cn(
                                            "ml-auto h-4 w-4",
                                            value === framework.value ? "opacity-100" : "opacity-0"
                                        )}
                                        />
                                    </CommandItem>
                                    ))}
                                </CommandGroup>
                                </Command>
                            </PopoverContent>
                        </Popover>
                        <DateRangePicker
                            initialDateFrom={dateRange.from}
                            initialDateTo={dateRange.to}
                            showCompare={false}
                            onUpdate={values => {
                                const {from, to} = values.range;
                                if(!from || !to) return;
                                if(differenceInDays(to, from) > MAX_DATE_RANGE) {
                                    toast.error(`Maximum allowed range is ${MAX_DATE_RANGE}`);
                                    return;
                                }
                                setDateRange({from, to});
                                // getStatsData(from, to);
                                // getCategoryStatsData(from, to);
                            }}
                        />
                    </div>
                </div>
            </div>
            <div className="container">
                <TransactionTable from={dateRange.from} to={dateRange.to}/>
            </div>
        </div>
    );
}

export default TransactionsPage;