import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/profile-ui/button";
import { Input } from "@/components/profile-ui/input";
import { Label } from "@/components/profile-ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/profile-ui/card";
import { useToast } from "@/hooks/use-toast";
import { Coffee, Loader2, ArrowLeft, CheckCircle2 } from "lucide-react";
import { z } from "zod";

const forgotPasswordSchema = z.object({
  email: z.string().trim().email({ message: "Email không hợp lệ" }).max(255),
});

const ForgotPassword = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validate form
    const result = forgotPasswordSchema.safeParse({ email });
    if (!result.success) {
      setError(result.error.issues[0].message);
      return;
    }

    setIsLoading(true);

    try {
      // TODO: Replace with actual API endpoint from backend
      const response = await fetch("http://localhost:3001/api/auth/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Không thể gửi email");
      }

      setEmailSent(true);
      toast({
        title: "Email đã được gửi",
        description: "Vui lòng kiểm tra hộp thư của bạn",
      });
    } catch (error) {
      toast({
        title: "Gửi email thất bại",
        description: error instanceof Error ? error.message : "Vui lòng thử lại sau",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-background via-secondary/30 to-background">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-primary to-primary-glow mb-4">
            <Coffee className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-3xl font-bold text-foreground">Phúc Long Coffee & Tea</h1>
          <p className="text-muted-foreground mt-2">Đặt lại mật khẩu</p>
        </div>

        <Card className="shadow-[var(--shadow-premium)] border-border/50">
          {!emailSent ? (
            <>
              <CardHeader>
                <CardTitle>Quên mật khẩu?</CardTitle>
                <CardDescription>
                  Nhập email của bạn và chúng tôi sẽ gửi link đặt lại mật khẩu
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="example@email.com"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        setError("");
                      }}
                      className={error ? "border-destructive" : ""}
                      disabled={isLoading}
                    />
                    {error && (
                      <p className="text-sm text-destructive">{error}</p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-primary to-primary-glow hover:opacity-90 transition-opacity"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Đang gửi...
                      </>
                    ) : (
                      "Gửi link đặt lại"
                    )}
                  </Button>
                </form>
              </CardContent>
            </>
          ) : (
            <>
              <CardHeader>
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8 text-primary" />
                  </div>
                </div>
                <CardTitle className="text-center">Email đã được gửi!</CardTitle>
                <CardDescription className="text-center">
                  Chúng tôi đã gửi link đặt lại mật khẩu đến email <strong>{email}</strong>
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-secondary/50 rounded-lg p-4 space-y-2">
                  <p className="text-sm text-muted-foreground">
                    • Kiểm tra cả thư mục spam/junk nếu không thấy email
                  </p>
                  <p className="text-sm text-muted-foreground">
                    • Link sẽ hết hạn sau 1 giờ
                  </p>
                  <p className="text-sm text-muted-foreground">
                    • Liên hệ hỗ trợ nếu không nhận được email sau 5 phút
                  </p>
                </div>
                <Button
                  onClick={() => {
                    setEmailSent(false);
                    setEmail("");
                  }}
                  variant="outline"
                  className="w-full"
                >
                  Gửi lại email
                </Button>
              </CardContent>
            </>
          )}
          <CardFooter className="flex flex-col space-y-4">
            <Link
              to="/login"
              className="flex items-center justify-center text-sm text-primary hover:text-primary-glow font-medium transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Quay lại đăng nhập
            </Link>
          </CardFooter>
        </Card>

        {!emailSent && (
          <p className="text-center text-sm text-muted-foreground mt-6">
            Chưa có tài khoản?{" "}
            <Link to="/register" className="text-primary hover:text-primary-glow transition-colors">
              Đăng ký ngay
            </Link>
          </p>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
