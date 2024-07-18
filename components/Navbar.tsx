"use client";
import React from "react";
import Logo from "./Logo";
import { usePathname } from "next/navigation";
import Link from "next/link";

function Navbar() {
	return (
        <div>
            <LargeScreenNavabar/>
        </div>
    );
}

const navItems = [
    {item: "Dashboard", link: "/"},
    {item: "Transactions", link: "/transactions"},
    {item: "Account", link: "/account"},
]

function LargeScreenNavabar() {
    return (
        <div className="hidden md:block border-separate border-b bg-background">
            <nav className="container flex items-center justify-between px-8">
                <div className="flex h-[80px] min-h-[60px] items-center gap-x-4">
                    <Logo/>
                    <div className="flex items-center gap-5">
                        {navItems.map(i => (
                            <NavItem key={i.item} link={i.link} label={i.item}/>
                        ))}
                    </div>
                </div>
            </nav>
        </div>
    )
}

function NavItem({link, label}:{link:string, label:string}) {
    const pathname = usePathname();
    const isActive = pathname===link;

    return (
        <div className="relative flex items-center">
            <Link href={link}>{label}</Link>
        </div>
    )
}

export default Navbar;