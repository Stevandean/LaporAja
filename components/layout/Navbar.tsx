"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import ReportModal from "../modal/ReportModal";

const navItems = [
    { name: "Beranda", href: "/" },
    { name: "Reports", href: "/reports" },
    { name: "Services", href: "/services" },
    { name: "About Us", href: "/about" },
    { name: "Contact", href: "/contact" },
];

export default function Navbar() {
    const [isOpen, setOpen] = useState(false);
    const pathname = usePathname();
    const isActive = (href: string) => {
        if (href === "/") return pathname === "/";
        return pathname.startsWith(href);
    };

    return (
        <>
            <header className="fixed top-0 left-0 right-0 z-50 border-b border-slate-100 h-20 bg-white backdrop-blur-2xl">
            <nav className="max-w-6xl mx-auto px-8 h-full flex items-center justify-between">
                
                {/* Logo */}
                <div>
                <span className="text-2xl font-bold tracking-tight text-primary">
                    LaporAja
                </span>
                </div>

                {/* Desktop Nav */}
                <ul className="hidden md:flex items-center gap-10 text-sm font-medium">
                {navItems.map((item) => (
                    <li key={item.href}>
                    <Link
                        href={item.href}
                        className={`transition-all pb-1 border-b-2 ${
                        isActive(item.href)
                            ? "text-primary font-bold border-primary"
                            : "text-slate-400 border-transparent hover:text-primary"
                        }`}
                    >
                        {item.name}
                    </Link>
                    </li>
                ))}
                </ul>

                {/* CTA */}
                <button onClick={() => setOpen(true)} className="open-modal bg-primary text-white px-8 py-2.5 rounded-full font-bold shadow-lg shadow-blue-900/10 hover:bg-slate-900 transition-all hidden md:block">
                    Mulai Lapor
                </button>

                {/* Mobile Toggle (optional nanti kita refine) */}
                <button className="md:hidden text-primary p-2">
                ☰
                </button>
            </nav>
            </header>
        
            <ReportModal isOpen={isOpen} onClose={() => setOpen(false)} />
        </>
    );
}