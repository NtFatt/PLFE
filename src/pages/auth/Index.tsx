import { Link } from "react-router-dom";
import { Button } from "@/components/profile-ui/button";
import { Coffee } from "lucide-react";

const Index = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-background via-secondary/30 to-background p-4">
      <div className="text-center max-w-2xl">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-primary to-primary-glow mb-6">
          <Coffee className="w-10 h-10 text-primary-foreground" />
        </div>
        <h1 className="mb-4 text-5xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
          Aurum Coffee & Tea
        </h1>
        <p className="text-xl text-muted-foreground mb-8">
          Hương vị truyền thống, trải nghiệm hiện đại
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/login">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-primary to-primary-glow hover:opacity-90 transition-opacity"
            >
              Đăng nhập
            </Button>
          </Link>
          <Link to="/register">
            <Button 
              size="lg" 
              variant="outline"
              className="border-primary text-primary hover:bg-primary/10"
            >
              Đăng ký ngay
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Index;
