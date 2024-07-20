import prisma from "@/lib/prisma";
import { AccountQuerySchema } from "@/schemas/account";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export async function GET(request:Request) {
    try {
        const user = await currentUser();
        if(!user) {
            redirect("/sign-in");
        }
        const {searchParams} = new URL(request.url);
        const from = searchParams.get("from");
        const to = searchParams.get("to");
        const queryParams = AccountQuerySchema.safeParse({from, to});
        if(!queryParams.success) {
            throw new Error(queryParams.error.message);
        }
        const stats = await getCategoryStats(user.id, queryParams.data.from, queryParams.data.to);
        return Response.json({
            data: stats,
        })
    } catch(err) {
        console.log(err);
        return Response.json({
            error: err,
        })
    }
}

export type GetCategoryStatsResponseType = Awaited<ReturnType<typeof getCategoryStats>>;

async function getCategoryStats(userId:string, from:Date, to:Date) {
    const stats = await prisma.transactions.groupBy({
        by: ["type", "category", "categoryIcon"],
        where: {
            userId,
            date: {
                gte: from,
                lte: to
            }
        },
        _sum: {
            amount: true
        },
        orderBy: {
            _sum: {
                amount: "desc",
            },
        }
    });

    return stats;
}