import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Menu } from "lucide-react";

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <div className="flex flex-1 flex-col">
          {/* Header with yellow accent bar */}
          <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b border-border bg-highlight px-4">
            <SidebarTrigger className="text-highlight-foreground hover:bg-highlight-foreground/10">
              <Menu className="h-5 w-5" />
            </SidebarTrigger>
            <div className="flex-1">
              <h2 className="text-sm font-semibold text-highlight-foreground">
                Portal Informasi Penerimaan Mahasiswa Baru
              </h2>
            </div>
          </header>
          
          {/* Main Content */}
          <main className="flex-1 bg-background">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
