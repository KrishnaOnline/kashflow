import { formatCurrency } from "@/lib/helpers";
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
            return Response.json({
                error: queryParams.error.message,
            }, {status: 400});
        }
        const transactions = await getTransactionsHistory(user.id, queryParams.data.from, queryParams.data.to);
        return Response.json({
            data: transactions,
        });
    } catch(err) {
        console.log(err);
        return Response.json({
            error: err,
        });
    }
}

export type GetTransactionsHistoryResponseType = Awaited<ReturnType<typeof getTransactionsHistory>>;

async function getTransactionsHistory(userId:string, from:Date, to:Date) {
    const userSettings = await prisma.userSettings.findUnique({
        where: {
            userId,
        },
    });
    if(!userSettings) {
        throw new Error("User Settings Not found");
    }
    const transactions = await prisma.transactions.findMany({
        where: {
            userId,
            date: {
                gte: from,
                lte: to,
            }
        },
        orderBy: {
            date: "desc",
        },
    });

    return transactions.map((transaction) => ({
        ...transaction,
        formattedAmount: formatCurrency(transaction.amount),
    }));
}