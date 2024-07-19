import Navbar from "@/components/Navbar";
import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
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
                    <p className="text-3xl font-bold">Hello, {getNameFromMail(user.primaryEmailAddress?.emailAddress)} 👋</p>
                </div>
            </div>
        </div>
	);
}