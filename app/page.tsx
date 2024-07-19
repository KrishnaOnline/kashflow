"use client";
import Navbar from "@/components/Navbar";
import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function Home() {
    // const addUserToDB = async () => {
    //     await fetch("http://localhost:3000/api/user-settings");
    // }

    // useEffect(() => {
    //     addUserToDB();
    // }, []);

    // const checkUser = async () => {
    //     const user = await currentUser();
    //     if(!user) {
    //         redirect("/sign-in");
    //     }
    // }
    // checkUser();

	return (
		<div>
            <Navbar/>
            <div>
                <button onClick={() => toast.success("Toast Working")}>Toaster</button>
            </div>
        </div>
	);
}