"use client";
import { GetTransactionsHistoryResponseType } from "@/app/api/transaction-history/route";
import { apiConnector } from "@/lib/apiConnector";
import { dateToUTCDate } from "@/lib/helpers";
import React, { useEffect, useState } from "react";

interface Props {
    from:Date;
    to:Date;
}

type TransactionsHistory = GetTransactionsHistoryResponseType[0];

function TransactionTable({from, to}:Props) {
	const [history, setHistory] = useState<GetTransactionsHistoryResponseType[]>([]);
    const [page, setPage] = useState<number>(0);
    const getTransactionsHistory = async () => {
        const res = await apiConnector("GET", `/api/transaction-history?from=${dateToUTCDate(from)}&to=${dateToUTCDate(to)}&page=${page}`, null, null, null);
        console.log(res.data?.data);
        setHistory(res.data?.data);
    }
    useEffect(() => {
        getTransactionsHistory();
    }, [from, to, page]);
    
    return (
        <div>
            {
                history.map((item:TransactionsHistory) => {
                    return (
                        <div key={item.id}>
                            {item.categoryIcon} {item.category} {item.type} {item.formattedAmount} {item.date}
                        </div>
                    )
                })
            }
            <div className="flex gap-5">
                <button onClick={() => {
                    if(page!==0) {
                        setPage(page-1);
                    }
                }}>Prev</button>
                <button onClick={() => {
                    if(page<=history.length/5) {
                        setPage(page+1);
                    }
                }}>Next</button>
            </div>
        </div>
    );
}

export default TransactionTable;