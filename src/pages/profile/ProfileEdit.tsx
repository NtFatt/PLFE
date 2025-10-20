import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/profile-ui/button";
import { Input } from "@/components/profile-ui/input";
import { Label } from "@/components/profile-ui/label";
import { Card } from "@/components/profile-ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/profile-ui/radio-group";
import { ArrowLeft, User, Mail, Phone, Calendar } from "lucide-react";
import { toast } from "sonner";

interface ProfileForm {
  fullName: string;
  email: string;
  phone: string;
  gender: "male" | "female" | "other";
  dateOfBirth: string;
}

const ProfileEdit = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<ProfileForm>({
    fullName: "Nguyễn Thanh Phát",
    email: "phat@example.com",
    phone: "0123456789",
    gender: "male",
    dateOfBirth: "2000-01-01",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    toast.success("Cập nhật thông tin thành công!");
    setIsSubmitting(false);
    navigate("/profile");
  };

  const handleChange = (field: keyof ProfileForm, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-primary text-primary-foreground px-4 py-4 sticky top-0 z-50 shadow-md">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/profile")}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors -ml-2"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-lg font-semibold">Chỉnh sửa hồ sơ</h1>
        </div>
      </header>

      {/* Form */}
      <form onSubmit={handleSubmit} className="p-4 pb-24">
        <Card className="p-6 space-y-6">
          {/* Full Name */}
          <div className="space-y-2">
            <Label htmlFor="fullName" className="flex items-center gap-2">
              <User className="w-4 h-4 text-primary" />
              Họ và tên
            </Label>
            <Input
              id="fullName"
              type="text"
              value={formData.fullName}
              onChange={(e) => handleChange("fullName", e.target.value)}
              placeholder="Nhập họ và tên"
              required
            />
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email" className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-primary" />
              Email
            </Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
              placeholder="Nhập email"
              required
            />
          </div>

          {/* Phone */}
          <div className="space-y-2">
            <Label htmlFor="phone" className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-primary" />
              Số điện thoại
            </Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
              placeholder="Nhập số điện thoại"
              required
            />
          </div>

          {/* Gender */}
          <div className="space-y-3">
            <Label>Giới tính</Label>
            <RadioGroup
              value={formData.gender}
              onValueChange={(value) => handleChange("gender", value as ProfileForm["gender"])}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="male" id="male" />
                <Label htmlFor="male" className="font-normal cursor-pointer">
                  Nam
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="female" id="female" />
                <Label htmlFor="female" className="font-normal cursor-pointer">
                  Nữ
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="other" id="other" />
                <Label htmlFor="other" className="font-normal cursor-pointer">
                  Khác
                </Label>
              </div>
            </RadioGroup>
          </div>

          {/* Date of Birth */}
          <div className="space-y-2">
            <Label htmlFor="dateOfBirth" className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-primary" />
              Ngày sinh
            </Label>
            <Input
              id="dateOfBirth"
              type="date"
              value={formData.dateOfBirth}
              onChange={(e) => handleChange("dateOfBirth", e.target.value)}
              required
            />
          </div>
        </Card>

        {/* Submit Button */}
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-background border-t">
          <Button
            type="submit"
            className="w-full"
            disabled={isSubmitting}
            size="lg"
          >
            {isSubmitting ? "Đang lưu..." : "Lưu thay đổi"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ProfileEdit;
