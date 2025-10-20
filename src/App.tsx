import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { CartProvider } from "@/contexts/CartContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import { Toaster } from "sonner";
import MainLayout from "@/layouts/MainLayout";

// ===== AUTH =====
import Login from "@/pages/auth/Login";
import Register from "@/pages/auth/Register";
import ForgotPassword from "@/pages/auth/ForgotPassword";
import AuthNotFound from "@/pages/auth/NotFound";

// ===== MENU =====
import MenuHome from "@/pages/menu/Menu";
import Cart from "@/pages/menu/Cart";
import Checkout from "@/pages/menu/Checkout";
import OrderSuccess from "@/pages/menu/OrderSuccess";
import MenuNotFound from "@/pages/menu/NotFound";
import MenuIndex from "@/pages/menu/Index";
import OrderHistory from "@/pages/menu/OrderHistory";
import ProductModal from "@/components/ProductModal";

// ===== PROFILE =====
import ProfileHome from "@/pages/profile/Profile";
import ProfileEdit from "@/pages/profile/ProfileEdit";
import Orders from "@/pages/profile/Orders";
import ProfileNotFound from "@/pages/profile/NotFound";
import VoucherPage from "@/pages/profile/Voucher";
import ReviewProduct from "@/pages/profile/ReviewProduct";
import Settings from "@/pages/profile/Settings";

// ===== PROMOTIONS =====
import Promotions from "@/pages/menu/Promotions"; // ✅ thêm dòng này

// ======================
// 🚀 MAIN APP COMPONENT
// ======================
function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <Routes>
          {/* ========== AUTH ========== */}
          <Route path="/auth">
            <Route index element={<Navigate to="/auth/login" replace />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="forgot-password" element={<ForgotPassword />} />
            <Route path="*" element={<AuthNotFound />} />
          </Route>

          {/* ✅ ========== MENU & PROFILE (có sidebar) ========== */}
          <Route element={<MainLayout />}>
            {/* MENU */}
            <Route path="/menu">
              <Route index element={<MenuIndex />} />
              <Route path="index" element={<MenuIndex />} />
              <Route path="menu" element={<MenuHome />} />
              <Route path="cart" element={<Cart />} />
              <Route path="checkout" element={<Checkout />} />
              <Route path="ordersuccess" element={<OrderSuccess />} />
              <Route path="orderHistory" element={<OrderHistory />} />
              <Route path="product/:id" element={<ProductModal />} />
              <Route path="*" element={<MenuNotFound />} />
            </Route>

            {/* PROFILE */}
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <ProfileHome />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile/edit"
              element={
                <ProtectedRoute>
                  <ProfileEdit />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile/orders"
              element={
                <ProtectedRoute>
                  <Orders />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile/voucher"
              element={
                <ProtectedRoute>
                  <VoucherPage />
                </ProtectedRoute>
              }
            />
            <Route path="/profile/review" element={<ReviewProduct />} />
            <Route
              path="/profile/settings"
              element={
                <ProtectedRoute>
                  <Settings />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile/*"
              element={
                <ProtectedRoute>
                  <ProfileNotFound />
                </ProtectedRoute>
              }
            />

            {/* ✅ Promotions nằm trong layout chung */}
            <Route path="/menu/promotions" element={<Promotions />} />
          </Route>

          {/* ========== MẶC ĐỊNH & 404 ========== */}
          <Route path="/" element={<Navigate to="/auth/login" replace />} />
          <Route path="*" element={<Navigate to="/auth/login" replace />} />
        </Routes>

        {/* 👇 Toast thông báo toàn cục */}
        <Toaster
          position="bottom-right"
          richColors
          toastOptions={{
            style: { borderRadius: "10px", fontSize: "15px" },
          }}
        />
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;
