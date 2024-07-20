"use client";
import { GetCategoryStatsResponseType } from "@/app/api/stats/categories/route";
import { UserSettings } from "@prisma/client";
import React from "react";

interface Props {
    userSettings:UserSettings;
    categoryStatsData: GetCategoryStatsResponseType | undefined;
    from:Date;
    to:Date;
}

function CategoryStats({userSettings, categoryStatsData, from, to}:Props) {
    console.log(categoryStatsData);
    return (
        <div>CategoryStats</div>
    );
}

export default CategoryStats;