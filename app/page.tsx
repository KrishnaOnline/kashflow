"use client";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function Home() {
    // const addUserToDB = async () => {
    //     await fetch("http://localhost:3000/api/user-settings");
    // }

    // useEffect(() => {
    //     addUserToDB();
    // }, []);

	return (
		<div>
            <Navbar/>
            <div>
                <button onClick={() => toast.success("Toast Working")}>Toaster</button>
            </div>
        </div>
	);
}