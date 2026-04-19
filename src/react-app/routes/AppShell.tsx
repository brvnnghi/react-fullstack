import { Outlet } from "react-router-dom";

import reactLogo from "../assets/react.svg";
import viteLogo from "/vite.svg";
import cloudflareLogo from "../assets/Cloudflare_Logo.svg";
import honoLogo from "../assets/hono.svg";

export default function AppShell() {
    return (
        <div className="flex min-h-screen flex-col">
            <header className="bg-gray-800 text-white p-4">
                <div className="flex items-center justify-center gap-6 flex-wrap">
                    <a href="https://vite.dev" target="_blank">
                        <img src={viteLogo} className="h-24 w-24" alt="Vite logo" />
                    </a>
                    <a href="https://react.dev" target="_blank">
                        <img src={reactLogo} className="h-24 w-24" alt="React logo" />
                    </a>
                    <a href="https://hono.dev/" target="_blank">
                        <img src={honoLogo} className="h-24 w-24" alt="Hono logo" />
                    </a>
                    <a href="https://workers.cloudflare.com/" target="_blank">
                        <img src={cloudflareLogo} className="h-24 w-24" alt="Cloudflare logo" />
                    </a>
                </div>
                <h1 className="text-3xl font-bold underline">Vite + React + Hono + Cloudflare</h1>
            </header>
            <main className="flex-1 p-4">
                <Outlet />
            </main>
            <footer className="bg-gray-800 text-white p-4">Footer</footer>
        </div>
    );
}