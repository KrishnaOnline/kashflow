"use client";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { redirect, useRouter } from "next/navigation";
import React from "react";

function Welcome() {
    const router = useRouter();
    const addUserToDB = async () => {
        await fetch("http://localhost:3000/api/user-settings");
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