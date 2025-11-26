import { 
  FileText, 
  Calendar, 
  GraduationCap, 
  DollarSign, 
  GitBranch, 
  CreditCard, 
  HelpCircle, 
  LogIn,
  User
} from "lucide-react";
import { NavLink } from "@/components/NavLink";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarHeader,
  useSidebar,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const menuItems = [
  { title: "Persyaratan Umum", url: "/", icon: FileText },
  { title: "Jadwal Pendaftaran", url: "/jadwal", icon: Calendar },
  { title: "Prodi Pilihan", url: "/prodi", icon: GraduationCap },
  { title: "Biaya Pendidikan", url: "/biaya", icon: DollarSign },
  { title: "Alur Pendaftaran", url: "/alur", icon: GitBranch },
  { title: "Petunjuk Pembayaran", url: "/pembayaran", icon: CreditCard },
  { title: "Bantuan", url: "/bantuan", icon: HelpCircle },
  { title: "Login", url: "/login", icon: LogIn },
];

export function AppSidebar() {
  const { open } = useSidebar();

  return (
    <Sidebar collapsible="icon" className="border-r border-sidebar-border">
      <SidebarHeader className="border-b border-sidebar-border p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
            <GraduationCap className="h-6 w-6 text-primary-foreground" />
          </div>
          {open && (
            <div className="flex flex-col">
              <h1 className="text-lg font-bold text-sidebar-foreground">SPMB UNSOED</h1>
              <p className="text-xs text-sidebar-foreground/70">Sistem Penerimaan Mahasiswa Baru</p>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent>
        {/* User Status */}
        <div className="border-b border-sidebar-border p-4">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarFallback className="bg-sidebar-accent text-sidebar-accent-foreground">
                <User className="h-5 w-5" />
              </AvatarFallback>
            </Avatar>
            {open && (
              <div className="flex flex-col">
                <span className="text-sm font-medium text-sidebar-foreground">Guest</span>
                <span className="text-xs text-sidebar-foreground/70">Belum login</span>
              </div>
            )}
          </div>
        </div>

        {/* Navigation Menu */}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      end
                      className="hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                      activeClassName="bg-sidebar-primary text-sidebar-primary-foreground font-medium"
                    >
                      <item.icon className="h-5 w-5" />
                      {open && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
