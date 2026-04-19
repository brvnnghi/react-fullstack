import type * as React from "react"
import { HomeIcon, ChartGantt } from "lucide-react"
import { Link, useLocation } from "react-router-dom"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"

const navigationItems = [
  {
    title: "Home",
    url: "/",
    icon: HomeIcon,
    exact: true,
  },
  {
    title: "Sitemap List",
    url: "/list",
    icon: ChartGantt,
  },
]

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const location = useLocation()

  return (
    <Sidebar {...props}>
      <SidebarHeader className="border-b border-sidebar-border px-4 py-4">
        <div className="space-y-1">
          <p className="text-sm font-semibold">Sitemap Admin</p>
          <p className="text-xs text-sidebar-foreground/70">
            Basic navigation for this app.
          </p>
        </div>
      </SidebarHeader>
      <SidebarContent className="px-2 py-3">
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => {
                const isActive = item.exact
                  ? location.pathname === item.url
                  : location.pathname.startsWith(item.url)

                return (
                  <SidebarMenuItem key={item.url}>
                    <SidebarMenuButton
                      isActive={isActive}
                      tooltip={item.title}
                      render={<Link to={item.url} />}
                    >
                      <item.icon />
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-t border-sidebar-border p-4 text-xs text-sidebar-foreground/70">
        Press Cmd/Ctrl + B to toggle.
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}