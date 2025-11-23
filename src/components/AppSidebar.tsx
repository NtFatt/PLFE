import {
  Home,
  Coffee,
  ShoppingCart,
  Clock,
  User,
  Settings,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { useCart } from "@/contexts/CartContext";
import { Badge } from "@/components/ui/badge";

/* 🧭 Danh sách menu chính */
const menuItems = [
  { title: "Trang chủ", url: "/menu/index", icon: Home },
  { title: "Menu", url: "/menu/menu", icon: Coffee },
  { title: "Giỏ hàng", url: "/menu/cart", icon: ShoppingCart },
  { title: "Lịch sử đơn hàng", url: "/menu/orderhistory", icon: Clock },
  { title: "Tài khoản", url: "/profile", icon: User },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const { totalItems } = useCart();
  const isCollapsed = state === "collapsed";

  return (
    <Sidebar
      collapsible="icon"
      className="border-r bg-gradient-primary text-primary-foreground"
    >
      <SidebarContent>
        {/* 🟩 Logo */}
        <div className="p-6 border-b border-white/20">
          {!isCollapsed ? (
            <div>
              <h2 className="text-xl font-bold">Aurum</h2>
              <p className="text-sm opacity-80">Coffee & Tea</p>
            </div>
          ) : (
            <Coffee className="w-6 h-6 mx-auto" />
          )}
        </div>

        {/* 📑 Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-primary-foreground/70">
            {!isCollapsed && "Menu chính"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      end
                      className={({ isActive }) =>
                        `flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${
                          isActive
                            ? "bg-white/20 text-white font-semibold shadow-medium"
                            : "text-primary-foreground/80 hover:bg-white/10 hover:text-white"
                        }`
                      }
                    >
                      {/* Icon + Badge */}
                      <div className="relative">
                        <item.icon className="w-5 h-5" />
                        {/* Hiển thị số lượng trong giỏ hàng */}
                        {item.url === "/menu/cart" && totalItems > 0 && (
                          <Badge className="absolute -top-2 -right-2 bg-accent text-accent-foreground px-1.5 min-w-[1.2rem] h-5 flex items-center justify-center text-xs">
                            {totalItems}
                          </Badge>
                        )}
                      </div>

                      {/* Tên menu */}
                      {!isCollapsed && (
                        <span className="flex-1">{item.title}</span>
                      )}

                      {/* Badge phụ bên phải */}
                      {item.url === "/menu/cart" &&
                        totalItems > 0 &&
                        !isCollapsed && (
                          <Badge className="bg-accent text-accent-foreground px-2">
                            {totalItems}
                          </Badge>
                        )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* ⚙️ Settings */}
        <SidebarGroup className="mt-auto">
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <NavLink
                    to="/profile/settings"
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${
                        isActive
                          ? "bg-white/20 text-white font-semibold"
                          : "text-primary-foreground/80 hover:bg-white/10 hover:text-white"
                      }`
                    }
                  >
                    <Settings className="w-5 h-5" />
                    {!isCollapsed && <span>Cài đặt</span>}
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
