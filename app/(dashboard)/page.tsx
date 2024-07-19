import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { Minus, Plus } from "lucide-react";
import { redirect } from "next/navigation";

export default async function Home() {
    const user = await currentUser();
    if(!user) {
        redirect("/sign-in");
    }
    
    let userSettings = await prisma.userSettings.findUnique({
        where: {
            userId: user.id,
        },
    });
    if(!userSettings) {
        userSettings = await prisma.userSettings.create({
            data: {
                userId: user.id,
                email: user.primaryEmailAddress?.emailAddress,
                // currency: "INR",
            }
        })
    }

    const getNameFromMail = (mail:string|any) => {
        let name = mail?.split('@')[0];
        let ans = name?.charAt(0).toUpperCase()+name?.slice(1);
        return ans;
    }

	return (
		<div className="h-full bg-background">
            <div className="border-b bg-card">
                <div className="container flex flex-wrap items-center justify-between gap-6 py-8">
                    <p className="text-3xl font-bold">Hello, {getNameFromMail(user.primaryEmailAddress?.emailAddress)}! 👋</p>
                    <div className="flex gap-5 items-center justify-center">
                        <Button className="text-white text-lg bg-green-900 border border-white hover:bg-green-800">
                            <div className="flex items-center justify-center gap-1">
                                <Plus/>
                                <p>Income</p>
                            </div>
                        </Button>
                        <Button className="text-white text-lg bg-red-900 border border-white hover:bg-red-800">
                            <div className="flex items-center justify-center gap-1">
                                <Minus/>
                                <p>Expense</p>
                            </div>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
	);
}