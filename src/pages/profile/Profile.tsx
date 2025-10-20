import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/profile-ui/button";
import { Card } from "@/components/profile-ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/profile-ui/avatar";
import { Badge } from "@/components/profile-ui/badge";
import { Camera, ChevronRight, Settings, ShoppingCart, MessageCircle, User, Calendar, Mail, Phone, Star } from "lucide-react";
import { toast } from "sonner";
import api from "@/lib/api";
import logo from "/images/logo_pl.png";

interface UserProfile {
  id: string;
  username: string;
  email: string;
  phone?: string;
  fullName?: string;
  gender?: "male" | "female" | "other";
  dateOfBirth?: string;
  avatar?: string;
  memberSince?: string;
}

const Profile = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<UserProfile>({
    id: "1",
    username: "nguyenthanhphat",
    email: "phat@example.com",
    phone: "0123456789",
    fullName: "Nguyễn Thanh Phát",
    avatar: "",
    memberSince: "2024-01-01",
  });

  const [isProfileComplete, setIsProfileComplete] = useState(false);

  useEffect(() => {
    // Check if profile is complete
    const complete = !!(profile.fullName && profile.gender && profile.dateOfBirth);
    setIsProfileComplete(complete);
  }, [profile]);

  const handleAvatarUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log("Hàm handleAvatarUpload được gọi"); // 🟡 thêm dòng này
    const file = event.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("avatar", file);

    // 🟡 Thêm log kiểm tra token ở đây
    const token = localStorage.getItem("accessToken");
    console.log("Access token hiện tại:", token);

    try {
      interface UploadResponse {
        message: string;
        url: string;
      }
      console.log("📤 Gửi request upload đến:", api.defaults.baseURL + "/upload/avatar");
      const res = await api.post<UploadResponse>("/upload/avatar", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`, // 🟢 Thêm dòng này luôn
        },
      });



      if (res.data.url) {
        setProfile((prev) => ({ ...prev, avatar: res.data.url }));
        toast.success("Ảnh đại diện đã được cập nhật!");
      }
      else {
        toast.error("Không nhận được link ảnh từ server!");
      }
    } catch (err) {
      console.error(err);
      toast.error("Tải ảnh thất bại!");
    }
  };

  const handleEditProfile = () => {
    navigate("/profile/edit");
  };

  const orderStats = [
    { label: "Chờ xác nhận", count: 2, status: "pending" },
    { label: "Chờ lấy hàng", count: 1, status: "confirmed" },
    { label: "Chờ giao hàng", count: 0, status: "delivering" },
    { label: "Đánh giá", count: 3, status: "completed" },
  ];

  const getInitials = (name?: string) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary via-primary/95 to-background pb-20">
      {/* Header */}
      <header className="bg-primary text-primary-foreground px-4 py-3 flex items-center justify-between sticky top-0 z-50 shadow-lg">
        {/* 🟢 Logo Phúc Long */}
        <div className="flex items-center gap-2">
          <img
            src="/images/logo_pl.png"
            alt="Phúc Long Coffee & Tea"
            className="w-10 h-10 object-contain bg-white rounded-full p-1 shadow-md"
          />
          <span className="font-semibold text-lg text-white tracking-tight">
            Phúc Long
          </span>
        </div>

        <div className="flex items-center gap-4">
          <button className="relative">
            <ShoppingCart className="w-6 h-6" />
            <span className="absolute -top-2 -right-2 bg-white text-primary rounded-full w-5 h-5 text-xs flex items-center justify-center font-semibold">
              5
            </span>
          </button>

          <button className="relative">
            <MessageCircle className="w-6 h-6" />
            <span className="absolute -top-2 -right-2 bg-white text-primary rounded-full w-5 h-5 text-xs flex items-center justify-center font-semibold">
              16
            </span>
          </button>
        </div>
      </header>


      {/* Profile Section */}
      <div className="px-4 pt-6 pb-8">
        <div className="flex items-center gap-4 mb-6">
          <div className="relative">
            <Avatar className="w-24 h-24 border-4 border-white shadow-xl">
              <AvatarImage src={profile.avatar} alt={profile.username} />
              <AvatarFallback className="bg-gradient-to-br from-accent to-accent-foreground text-white text-2xl font-bold">
                {getInitials(profile.fullName || profile.username)}
              </AvatarFallback>
            </Avatar>
            <input
              type="file"
              accept="image/*"
              id="avatar-upload"
              className="hidden"
              onChange={handleAvatarUpload}
            />
            <label
              htmlFor="avatar-upload"
              className="absolute bottom-0 right-0 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-accent transition-colors cursor-pointer"
            >
              <Camera className="w-4 h-4 text-primary" />
            </label>

          </div>

          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h1 className="text-2xl font-bold text-white">{profile.username}</h1>
              <Badge className="bg-white/20 text-white border-white/40 hover:bg-white/30">
                Thành viên
              </Badge>
            </div>
            <div className="flex gap-6 text-white/90 text-sm">
              <button className="hover:text-white transition-colors">
                <span className="font-semibold">0</span> Người theo dõi
              </button>
              <button className="hover:text-white transition-colors">
                <span className="font-semibold">21</span> Đang theo dõi
              </button>
            </div>
          </div>
        </div>

        {/* Profile Completion Alert */}
        {!isProfileComplete && (
          <Card className="bg-white/95 backdrop-blur-sm border-none shadow-lg p-4 mb-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center flex-shrink-0">
                <User className="w-5 h-5 text-accent-foreground" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-muted-foreground mb-1">
                  Vui lòng chọn <span className="font-semibold text-foreground">Tên, Giới tính, Ngày sinh</span> của bạn
                </p>
                <Button
                  onClick={handleEditProfile}
                  variant="link"
                  className="h-auto p-0 text-primary font-semibold"
                >
                  Thiết lập ngay
                </Button>
              </div>
              <button className="text-muted-foreground hover:text-foreground transition-colors flex-shrink-0">
                ✕
              </button>
            </div>
          </Card>
        )}
      </div>

      {/* Main Content */}
      <div className="bg-background rounded-t-3xl -mt-4 pt-6">
        {/* Orders Section */}
        <div className="px-4 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-foreground">Đơn mua</h2>
            <button
              onClick={() => navigate("/profile/orders")} className="flex items-center gap-1 text-sm text-primary hover:text-primary/80 transition-colors font-medium"
            >
              Xem lịch sử mua hàng
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-4 gap-3">
            {orderStats.map((stat) => (
              <button
                key={stat.status}
                onClick={() => navigate(`/profile/orders?status=${stat.status}`)}
                className="flex flex-col items-center gap-2 p-3 rounded-xl hover:bg-accent transition-colors group"
              >
                <div className="relative">
                  {stat.status === "pending" && (
                    <div className="w-12 h-12 rounded-full bg-yellow-50 flex items-center justify-center group-hover:scale-110 transition-transform">
                      📋
                    </div>
                  )}
                  {stat.status === "confirmed" && (
                    <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center group-hover:scale-110 transition-transform">
                      📦
                    </div>
                  )}
                  {stat.status === "delivering" && (
                    <div className="w-12 h-12 rounded-full bg-purple-50 flex items-center justify-center group-hover:scale-110 transition-transform">
                      🚚
                    </div>
                  )}
                  {stat.status === "completed" && (
                    <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center group-hover:scale-110 transition-transform">
                      ⭐
                    </div>
                  )}
                  {stat.count > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-white rounded-full text-xs flex items-center justify-center font-semibold">
                      {stat.count}
                    </span>
                  )}
                </div>
                <span className="text-xs text-center text-foreground font-medium leading-tight">
                  {stat.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Menu Items */}
        <div className="px-4 space-y-2">
          <MenuItem
            icon={<User className="w-5 h-5" />}
            label="Thông tin cá nhân"
            onClick={() => navigate("/profile/edit")}
          />
          <MenuItem
            icon={<ShoppingCart className="w-5 h-5" />}
            label="Địa chỉ nhận hàng"
            onClick={() => toast.info("Tính năng đang phát triển")}
          />
          <MenuItem
            icon={<Calendar className="w-5 h-5" />}
            label="Voucher của tôi"
            onClick={() => navigate("/profile/voucher")}
          />
          <MenuItem
            icon={<Star className="w-5 h-5" />}
            label="Đánh giá sản phẩm"
            onClick={() => navigate("/profile/review")}
          />

          <MenuItem
            icon={<Mail className="w-5 h-5" />}
            label="Thông báo"
            onClick={() => toast.info("Tính năng đang phát triển")}
          />
          <MenuItem
            icon={<Settings className="w-5 h-5" />}
            label="Cài đặt"
            onClick={() => navigate("/profile/settings")}
          />
        </div>

        {/* Logout Button */}
        <div className="px-4 mt-8 mb-8">
          <Button
            onClick={() => {
              toast.success("Đăng xuất thành công");
              navigate("/login");
            }}
            variant="outline"
            className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground"
          >
            Đăng xuất
          </Button>
        </div>
      </div>
    </div>
  );
};

interface MenuItemProps {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  badge?: string;
}

const MenuItem = ({ icon, label, onClick, badge }: MenuItemProps) => (
  <button
    onClick={onClick}
    className="w-full flex items-center justify-between p-4 rounded-xl hover:bg-accent transition-colors group"
  >
    <div className="flex items-center gap-3">
      <div className="text-muted-foreground group-hover:text-primary transition-colors">
        {icon}
      </div>
      <span className="font-medium text-foreground">{label}</span>
    </div>
    <div className="flex items-center gap-2">
      {badge && (
        <Badge variant="secondary" className="bg-primary/10 text-primary">
          {badge}
        </Badge>
      )}
      <ChevronRight className="w-5 h-5 text-muted-foreground" />
    </div>
  </button>
);

export default Profile;
