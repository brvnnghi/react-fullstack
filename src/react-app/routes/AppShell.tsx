import { Outlet } from "react-router-dom"

import { AppSidebar } from "@/components/app-sidebar"
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar"

import { AuthProvider } from "@/react-app/lib/auth"

export default function AppShell() {
    return (
        <AuthProvider>
            <SidebarProvider>
                <AppSidebar />
                <SidebarInset className="min-h-svh bg-muted/30">
                    <header className="sticky top-0 z-20 flex h-16 items-center gap-3 border-b border-border bg-background/95 px-4 backdrop-blur sm:px-6">
                        <SidebarTrigger />
                        <div>
                            <h1 className="text-base font-semibold">Sitemap Dashboard</h1>
                            <p className="text-sm text-muted-foreground">
                                A very simple sidebar layout.
                            </p>
                        </div>
                    </header>
                    <main className="flex-1 p-4 sm:p-6">
                        <Outlet />
                    </main>
                </SidebarInset>
            </SidebarProvider>
        </AuthProvider>
    )
}