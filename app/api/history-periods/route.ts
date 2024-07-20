import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export async function GET(request:Request) {
    try {
        const user = await currentUser();
        if(!user) {
            redirect("/sign-in");
        }
        const periods = await getHistoryPeriods(user.id);
        return Response.json({
            data: periods,
        })
    } catch(err) {
        console.log(err);
        return Response.json({
            error: err,
        })
    }
}

export type GetHistoryPeriodsResponseType = Awaited<ReturnType<typeof getHistoryPeriods>>;

async function getHistoryPeriods(userId:string) {
    const result = await prisma.monthHistory.findMany({
        where: {
            userId,
        },
        select: {
            year: true,
        },
        distinct: ["year"],
        orderBy: [
            {
                year: "asc",
            },
        ]
    });
    const years = result.map((d) => d.year);
    if(years.length===0) {
        return [new Date().getFullYear()];
    }

    return years;
}