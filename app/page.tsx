"use client";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import toast from "react-hot-toast";

export default function Home() {
	return (
		<div>
            <Navbar/>
            <div>
                <button onClick={() => toast.success("Toast Working")}>Toaster</button>
            </div>
        </div>
	);
}