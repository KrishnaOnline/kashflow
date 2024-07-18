"use client";
import React from "react";
import LogoImg from "@/assets/Logo.png";
import Image from "next/image";

function Logo() {
	return (
        <div>
            <a href="/" className="flex items-center gap-2">
                <Image src={LogoImg} className="h-16 w-16" alt="logo"/>
                {/* <p>ashFlow</p> */}
            </a>
        </div>
    );
}

export default Logo;