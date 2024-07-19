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
            return Response.json(queryParams.error.message, {status: 400});
        }
        const stats = await getBalanceStats(user.id, queryParams.data.from, queryParams.data.to);

        return Response.json({
            data: stats,
        });
    } catch(err) {
        console.log(err);
        return Response.json({
            error: err,
        })
    }
}

export type GetBalanceStatsResponseType = Awaited<ReturnType<typeof getBalanceStats>>;

async function getBalanceStats(userId:string, from:Date, to:Date) {
    const total = await prisma.transactions.groupBy({
        by: ["type"],
        where: {
            userId,
            date: {
                gte: from,
                lte: to,
            }
        },
        _sum: {
            amount: true,
        }
    });
    return {
        expense: total.find(t => t.type==="expense")?._sum.amount || 0,
        income: total.find(t => t.type==="income")?._sum.amount || 0,
    }
}