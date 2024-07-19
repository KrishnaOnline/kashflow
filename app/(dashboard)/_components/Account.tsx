"use client";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import { MAX_DATE_RANGE } from "@/lib/constants";
import { UserSettings } from "@prisma/client";
import { differenceInDays, startOfMonth } from "date-fns";
import React, { useState } from "react";
import toast from "react-hot-toast";
import StatsCards from "./StatsCards";

function Account({userSettings}:{userSettings:UserSettings}) {
    const [dateRange, setDateRange] = useState<{from:Date, to:Date}>({
        from: startOfMonth(new Date()),
        to: new Date(),
    })

	return (
        <div className="">
            <div className="container flex flex-wrap items-end justify-between gap-2 py-6">
                <p className="text-3xl font-bold">Account</p>
                <div className="flex items-center gap-3">
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
                        }}
                    />
                </div>
            </div>
            <StatsCards userSettings={userSettings} from={dateRange.from} to={dateRange.to}/>
        </div>
    );
}

export default Account;