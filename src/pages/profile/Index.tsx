import { useNavigate } from "react-router-dom";
import { Button } from "@/components/profile-ui/button";
import { User, ShoppingBag, Coffee } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-primary via-primary/90 to-secondary p-4">
      <div className="text-center max-w-2xl">
        <div className="mb-8 inline-block p-6 rounded-full bg-white/10 backdrop-blur-sm">
          <Coffee className="w-20 h-20 text-white" />
        </div>
        <h1 className="mb-4 text-5xl font-bold text-white drop-shadow-lg">
          Aurum Coffee & Tea
        </h1>
        <p className="text-xl text-white/90 mb-8 drop-shadow">
          Hệ thống quản lý người dùng và đơn hàng
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Button
            onClick={() => navigate("/profile")}
            size="lg"
            className="bg-white text-primary hover:bg-white/90 shadow-xl"
          >
            <User className="w-5 h-5 mr-2" />
            Trang cá nhân
          </Button>
          <Button
            onClick={() => navigate("/orders")}
            size="lg"
            variant="secondary"
            className="shadow-xl"
          >
            <ShoppingBag className="w-5 h-5 mr-2" />
            Đơn hàng
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
