"use client";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { currentUser } from "@clerk/nextjs/server";
import { redirect, useRouter } from "next/navigation";
import React, { useState } from "react";

function Welcome() {
    const [data, setData] = useState({});
    const router = useRouter();
    const addUserToDB = async () => {
        const res = await fetch("http://localhost:3000/api/user-settings");
        const response = await res.json();
        // const user = await currentUser();
        // if(!user) {
        //     addUserToDB();
        // }
        console.log(response);
        router.push("/");
    }

	return (
        <div className="flex h-screen p-10 items-center justify-center">
            <Card>
                <CardHeader className="flex flex-col gap-3 items-center justify-center">
                    <div className="flex flex-col gap-2 items-center justify-center">
                        <CardTitle>🎉 Welcome to KashFlow 🎉</CardTitle>
                        <CardDescription>
                            Finance Tracker App
                        </CardDescription>
                    </div>
                    <Button onClick={addUserToDB}>Click to Continue</Button>
                </CardHeader>
            </Card>
        </div>
    );
}

export default Welcome;