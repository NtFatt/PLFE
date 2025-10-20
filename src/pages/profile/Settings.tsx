import { useNavigate } from "react-router-dom";
import { ArrowLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/profile-ui/button";
import { Card } from "@/components/profile-ui/card";
import { Separator } from "@/components/profile-ui/separator";
import { toast } from "sonner";

const Settings = () => {
  const navigate = useNavigate();

  const sections = [
    {
      title: "Tài khoản của tôi",
      items: [
        { label: "Tài khoản & Bảo mật", action: () => toast.info("Tính năng đang phát triển") },
        { label: "Địa chỉ", action: () => toast.info("Tính năng đang phát triển") },
        { label: "Tài khoản / Thẻ ngân hàng", action: () => toast.info("Tính năng đang phát triển") },
      ],
    },
    {
      title: "Cài đặt",
      items: [
        { label: "Cài đặt Chat", action: () => toast.info("Tính năng đang phát triển") },
        { label: "Cài đặt Thông báo", action: () => toast.info("Tính năng đang phát triển") },
        { label: "Cài đặt riêng tư", action: () => toast.info("Tính năng đang phát triển") },
        { label: "Người dùng đã bị chặn", action: () => toast.info("Tính năng đang phát triển") },
        { label: "Ngôn ngữ / Language", desc: "Tiếng Việt", action: () => toast.info("Tính năng đang phát triển") },
      ],
    },
    {
      title: "Hỗ trợ",
      items: [
        { label: "Trung tâm hỗ trợ", action: () => toast.info("Tính năng đang phát triển") },
        { label: "Tiêu chuẩn cộng đồng", action: () => toast.info("Tính năng đang phát triển") },
        { label: "Điều khoản Phúc Long", action: () => toast.info("Tính năng đang phát triển") },
        { label: "Đánh giá ứng dụng", action: () => toast.success("Cảm ơn bạn đã ủng hộ 💚") },
        { label: "Giới thiệu", action: () => toast.info("Phiên bản 1.0.0 - Phúc Long Coffee & Tea") },
        { label: "Yêu cầu hủy tài khoản", action: () => toast.warning("Liên hệ tổng đài hỗ trợ để hủy tài khoản.") },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-primary text-primary-foreground px-4 py-4 flex items-center gap-3 sticky top-0 z-50 shadow-md">
        <button
          onClick={() => navigate("/profile")}
          className="p-2 hover:bg-white/10 rounded-lg transition-colors -ml-2"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-lg font-semibold">Thiết lập tài khoản</h1>
      </header>

      {/* Content */}
      <div className="p-4 space-y-6">
        {sections.map((section, idx) => (
          <Card key={idx} className="overflow-hidden shadow-soft">
            <div className="bg-muted/50 px-4 py-2 text-sm font-semibold text-muted-foreground">
              {section.title}
            </div>

            <div>
              {section.items.map((item, i) => (
                <div key={i}>
                  <button
                    onClick={item.action}
                    className="w-full flex items-center justify-between px-4 py-3 hover:bg-accent transition-colors"
                  >
                    <div className="flex flex-col items-start">
                      <span className="text-sm font-medium text-foreground">{item.label}</span>
                      {item.desc && (
                        <span className="text-xs text-muted-foreground mt-0.5">{item.desc}</span>
                      )}
                    </div>
                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
                  </button>
                  {i < section.items.length - 1 && <Separator />}
                </div>
              ))}
            </div>
          </Card>
        ))}

        {/* Footer */}
        <div className="mt-8">
          <Button
            onClick={() => {
              toast.success("Đăng xuất thành công");
              navigate("/auth/login");
            }}
            variant="outline"
            className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground font-semibold rounded-xl"
          >
            Chuyển tài khoản / Đăng xuất
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
