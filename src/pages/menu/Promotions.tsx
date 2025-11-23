import { useState } from "react";
import MainLayout from "@/layouts/MainLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Eye } from "lucide-react";
import Menu from "./Menu";

interface Promotion {
  id: string;
  title: string;
  excerpt: string;
  imageUrl: string;
  date: string;
  category: string;
  isNew?: boolean;
}

const Promotions = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  // Mock data - based on the screenshot you provided
  const promotions: Promotion[] = [
    {
      id: "1",
      title: "Phê La Có Hỷ - Cả Làng Chill Vui",
      excerpt: "Ơi, vui quá xá là vui! Phê La mới cả Làng Chill đi cưới. Lấy cảm hứng từ nét đẹp cưới hỏi truyền thống, Phê La duyên dáng khoác chiếc áo đỏ son...",
      imageUrl: "/placeholder.svg",
      date: "2025-01-15",
      category: "Sự kiện",
      isNew: true
    },
    {
      id: "2",
      title: "Sữa Chua Bồng Bềnh - Sữa Chua Ô Long Đá Xay",
      excerpt: "Lễ khai giảng năm học chill 2025 - 2026 bắt đầu! Đang tiến vào lễ đài Q3 miền chill là Khối Đồng Chill do 'ban học' Sữa Chua Bồng Bềnh đến đầu. Mang theo...",
      imageUrl: "/placeholder.svg",
      date: "2025-01-10",
      category: "Sản phẩm mới"
    },
    {
      id: "3",
      title: "Sáng Tạo Ly Ô Ly - Cuộc thi 'Vớ Sách Ly Đẹp' cấp trường Phê La",
      excerpt: "I. ĐỐI TƯỢNG DỰ THI Tất cả Động Chill Q3 miền chill (áp dụng với tài khoản có nhận). II. THỂ LỆ VÀ HÌNH THỨC DỰ THI Từ ngày 14/08 - 19h 25/08...",
      imageUrl: "/placeholder.svg",
      date: "2025-01-08",
      category: "Sự kiện",
      isNew: true
    },
    {
      id: "4",
      title: "Phê Xíu Vani - Chill Đầy Chill Đó",
      excerpt: "Như thước phim tuổi thơ chậm chạm quay về ngày xưa. Bờ chôi vạn người cùng chạy vui qua, Tự vườn buổi xanh, kỷ ức tuổi nhỏ nhang còn đây. Mùi hương...",
      imageUrl: "/placeholder.svg",
      date: "2025-01-05",
      category: "Sản phẩm mới"
    },
    {
      id: "5",
      title: "Ô Long Đào Hồng - Thức Quả Tuổi Chill",
      excerpt: "Từ vườn buổi xanh mát, kỷ ức tuổi nhỏ nhang còn đây. Nhó những ngày trói cao giát, mình lại thống khoái uống trà ô long cùng nhau. Bồ chở Ô Long...",
      imageUrl: "/placeholder.svg",
      date: "2025-01-03",
      category: "Sản phẩm mới",
      isNew: true
    },
    {
      id: "6",
      title: "Bồng Bưởi - Ô Long Bưởi Nha Đam",
      excerpt: "Là những ngày trời cao giát, trái cây, mình lại thống khoái uống bồng bưởi ô long để giải khát - Thức uống đậm đà hương vị cay gấy kết hợp bồng bưởi nha đam mát lành...",
      imageUrl: "/placeholder.svg",
      date: "2025-01-01",
      category: "Sản phẩm mới"
    }
  ];

  const categories = [
    { id: "all", name: "Tất cả" },
    { id: "event", name: "Sự kiện" },
    { id: "product", name: "Sản phẩm mới" },
    { id: "promotion", name: "Khuyến mãi" }
  ];

  const filteredPromotions = selectedCategory === "all"
    ? promotions
    : promotions.filter(p => p.category.toLowerCase().includes(selectedCategory));

  return (
      <div className="min-h-screen bg-background">
        {/* Header */}
        <div className="bg-gradient-primary text-primary-foreground py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Tin Tức
            </h1>
            <p className="text-lg opacity-90">
              Cập nhật tin tức mới nhất từ Aurum
            </p>
          </div>
        </div>

        {/* Breadcrumb */}
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center space-x-2 text-sm text-muted-foreground">
            <a href="/" className="hover:text-primary transition-colors">Aurum</a>
            <span>›</span>
            <span className="text-foreground">Tin tức</span>
          </nav>
        </div>

        {/* Category Filter */}
        <div className="container mx-auto px-4 mb-8">
          <div className="flex gap-3 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-6 py-2 rounded-full font-medium transition-all ${selectedCategory === cat.id
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "bg-secondary text-secondary-foreground hover:bg-primary/10"
                  }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Promotions Grid */}
        <div className="container mx-auto px-4 pb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPromotions.map((promo) => (
              <Card
                key={promo.id}
                className="group overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer"
              >
                {/* Image */}
                <div className="relative overflow-hidden aspect-[4/3] bg-muted">
                  <img
                    src={promo.imageUrl}
                    alt={promo.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  {promo.isNew && (
                    <Badge className="absolute top-4 right-4 bg-destructive text-destructive-foreground">
                      Mới
                    </Badge>
                  )}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Eye className="h-8 w-8 text-white" />
                  </div>
                </div>

                <CardContent className="p-6">
                  {/* Category Badge */}
                  <Badge variant="outline" className="mb-3">
                    {promo.category}
                  </Badge>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-foreground mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                    {promo.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                    {promo.excerpt}
                  </p>

                  {/* Date */}
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>{new Date(promo.date).toLocaleDateString('vi-VN')}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
  );
};

export default Promotions;
