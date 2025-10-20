import { useState, useEffect, useCallback } from "react";
import { Search, ShoppingCart, User, Mail, Phone, MapPin, Clock, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useNavigate } from 'react-router-dom';
import ProductModal from "@/components/ProductModal";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";

const products = [
  {
    id: 1,
    name: "Hồng trà đào (L)",
    price: "65,000₫",
    image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&h=400&fit=crop",
  },
  {
    id: 2,
    name: "Hồng trà đào (L)",
    price: "65,000₫",
    image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&h=400&fit=crop",
  },
  {
    id: 3,
    name: "Hồng trà đào (L)",
    price: "65,000₫",
    image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&h=400&fit=crop",
  },
  {
    id: 4,
    name: "Hồng trà đào (L)",
    price: "65,000₫",
    image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&h=400&fit=crop",
  },
  {
    id: 5,
    name: "Hồng trà đào (L)",
    price: "65,000₫",
    image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&h=400&fit=crop",
  },
];

const newsItems = [
  {
    id: 1,
    title: "ƯU ĐÃI MỘT ĐẾN TOP - 100% NGUYÊN CHẤT ĂN THẬT TẠI CHỖ 30-50% TẤT CẢ",
    views: 1572,
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=400&fit=crop",
  },
  {
    id: 2,
    title: "ƯU ĐÃI HỘI VIÊN - GIẢM 50% CÁC SẢN PHẨM TRÀ XANH ĐẶC BIỆT",
    views: 267,
    image: "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=400&h=400&fit=crop",
  },
  {
    id: 3,
    title: "TINH TẾ TRONG TỪNG BƯỚC CHÂN - KHÁM PHÁ KHÔNG GIAN XANH",
    views: 190,
    image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&h=400&fit=crop",
  },
];

const heroSlides = [
  {
    id: 1,
    title: "CHẤT LƯỢNG",
    subtitle: "Đảm Vị",
    images: [
      "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=300&h=400&fit=crop",
      "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=300&h=400&fit=crop",
    ],
  },
  {
    id: 2,
    title: "TRẢI NGHIỆM",
    subtitle: "Tuyệt Vời",
    images: [
      "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=300&h=400&fit=crop",
      "https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?w=300&h=400&fit=crop",
    ],
  },
  {
    id: 3,
    title: "HƯƠNG VỊ",
    subtitle: "Đặc Biệt",
    images: [
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=300&h=400&fit=crop",
      "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=300&h=400&fit=crop",
    ],
  },
];

export default function Index() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 5000, stopOnInteraction: false }),
  ]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const handleProductClick = (product: (typeof products)[0]) => {
    navigate(`/menu/product/${product.id}`);
  };

  const handleAddToCart = (product: any) => {
    setSelectedProduct({
      id: product.id.toString(),
      name: product.name,
      price: 5.59, // giá gốc, bạn có thể đổi cho từng sản phẩm
      image: product.image,
      description: "Cà phê rang xay truyền thống pha phin kết hợp với sữa đặc thơm ngon",
      sizes: [
        { name: "S", price: 5.59 },
        { name: "M", price: 6.59 },
        { name: "L", price: 7.59 },
      ],
      toppings: [
        { name: "Thạch cà phê", price: 0.5 },
        { name: "Topping trân châu", price: 0.7 },
        { name: "Kem phô mai", price: 1.0 },
      ],
    });
    setModalOpen(true);
  };

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const scrollTo = useCallback(
    (index: number) => {
      if (emblaApi) emblaApi.scrollTo(index);
    },
    [emblaApi]
  );

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };

    emblaApi.on("select", onSelect);
    onSelect();

    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-white border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-4">
          {/* Top Bar */}
          <div className="flex items-center justify-between py-3 border-b border-border">
            <div className="flex items-center gap-2">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">PL</span>
              </div>
              <div className="flex-1 max-w-md">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Bạn muốn mua gì..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 h-9 rounded-full border-border"
                  />
                </div>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <button className="flex items-center gap-2 text-sm text-foreground hover:text-primary transition-colors">
                <Phone className="w-4 h-4" />
                <span>Chọn phương thức nhận hàng</span>
              </button>
              <button className="hover:text-primary transition-colors">
                <Mail className="w-5 h-5" />
              </button>
              <button className="hover:text-primary transition-colors">
                <User className="w-5 h-5" />
              </button>
              <button className="hover:text-primary transition-colors relative">
                <ShoppingCart className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary text-white text-xs rounded-full flex items-center justify-center">
                  0
                </span>
              </button>
            </div>
          </div>

          {/* Navigation */}
          <nav className="py-4">
            <ul className="flex items-center justify-center gap-8">
              <li>
                <a href="#" className="text-primary font-semibold hover:text-primary-dark transition-colors">
                  TRANG CHỦ
                </a>
              </li>
              <li>
                <button
                  onClick={() => navigate("/menu/menu")}
                  className="text-foreground font-semibold hover:text-primary transition-colors"
                >
                  MENU
                </button>
              </li>
              <li>
                <a href="#" className="text-foreground font-semibold hover:text-primary transition-colors">
                  SẢN PHẨM ĐÓNG GÓI
                </a>
              </li>
              <li>
                <a href="#" className="text-foreground font-semibold hover:text-primary transition-colors">
                  VÉ CHỨNG TỐI
                </a>
              </li>
              <li>
                <a href="/menu/promotions" className="text-foreground font-semibold hover:text-primary transition-colors">
                  KHUYẾN MÃI
                </a>
              </li>
              <li>
                <a href="#" className="text-foreground font-semibold hover:text-primary transition-colors">
                  HỘI VIÊN
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Hero Banner Carousel */}
      <section className="bg-gradient-to-br from-accent via-secondary to-accent py-16 relative">
        <div className="container mx-auto px-4">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {heroSlides.map((slide) => (
                <div key={slide.id} className="flex-[0_0_100%] min-w-0">
                  <div className="flex items-center justify-between">
                    <div className="flex-1 animate-fade-in">
                      <h1
                        className="text-6xl font-bold text-primary mb-4"
                        style={{ fontFamily: "serif" }}
                      >
                        {slide.title}
                      </h1>
                      <h2
                        className="text-6xl font-bold mb-8"
                        style={{ color: "#D4851B", fontFamily: "serif" }}
                      >
                        {slide.subtitle}
                      </h2>
                    </div>
                    <div className="flex-1 flex items-center justify-end gap-6">
                      <img
                        src={slide.images[0]}
                        alt="Drink 1"
                        className="h-80 w-auto object-cover rounded-lg shadow-medium animate-fade-in"
                      />
                      <img
                        src={slide.images[1]}
                        alt="Drink 2"
                        className="h-80 w-auto object-cover rounded-lg shadow-medium animate-fade-in"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={scrollPrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 hover:bg-white flex items-center justify-center shadow-medium transition-all hover:scale-110"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6 text-primary" />
          </button>
          <button
            onClick={scrollNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 hover:bg-white flex items-center justify-center shadow-medium transition-all hover:scale-110"
            aria-label="Next slide"
          >
            <ChevronRight className="w-6 h-6 text-primary" />
          </button>

          {/* Indicators */}
          <div className="flex justify-center gap-2 mt-8">
            {heroSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollTo(index)}
                className={`w-2 h-2 rounded-full transition-all ${index === selectedIndex
                  ? "bg-primary w-8"
                  : "bg-white/50 hover:bg-white/80"
                  }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Best Sellers - Trà Thơm Chất Lượng */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-8 text-foreground">
            BEST SELLERS - TRÀ THƠM CHẤT LƯỢNG
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg overflow-hidden shadow-soft hover:shadow-medium transition-all"
              >
                <div className="aspect-square overflow-hidden bg-muted">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-sm font-semibold mb-2 text-foreground">{product.name}</h3>
                  <p className="text-lg font-bold text-primary mb-3">{product.price}</p>
                  <Button
                    onClick={() => handleProductClick(product)}
                    className="w-full bg-primary hover:bg-primary-dark text-white rounded-md h-9"
                  >
                    Đặt mua
                  </Button>

                </div>
              </div>
            ))}
          </div>
          <div className="text-center">
            <Button variant="outline" className="rounded-md border-border hover:bg-muted">
              Xem thêm 5 sản phẩm BEST SELLERS - TRÀ THƠM CHẤT LƯỢNG
            </Button>
          </div>
        </div>
      </section>

      {/* Best Sellers - Trà Sữa Đậm Vị */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-8 text-foreground">
            BEST SELLERS - TRÀ SỮA ĐẬM VỊ
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
            {products.map((product) => (
              <div
                key={`tea-${product.id}`}
                className="bg-white rounded-lg overflow-hidden shadow-soft hover:shadow-medium transition-all"
              >
                <div className="aspect-square overflow-hidden bg-muted">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-sm font-semibold mb-2 text-foreground">{product.name}</h3>
                  <p className="text-lg font-bold text-primary mb-3">{product.price}</p>
                  <Button
                    onClick={() => handleProductClick(product)}
                    className="w-full bg-primary hover:bg-primary-dark text-white rounded-md h-9"
                  >
                    Đặt mua
                  </Button>

                </div>
              </div>
            ))}
          </div>
          <div className="text-center">
            <Button variant="outline" className="rounded-md border-border hover:bg-muted">
              Xem thêm 5 sản phẩm BEST SELLERS - TRÀ SỮA ĐẬM VỊ
            </Button>
          </div>
        </div>
      </section>

      {/* News & Promotions */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-2">Tin tức & Khuyến mãi</h2>
            <p className="text-muted-foreground">Tin tức & Khuyến mãi của Phúc Long</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {newsItems.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-lg overflow-hidden shadow-soft hover:shadow-medium transition-all cursor-pointer group"
              >
                <div className="aspect-[4/3] overflow-hidden bg-muted">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      👁️ {item.views}
                    </span>
                  </div>
                  <h3 className="font-bold text-foreground line-clamp-2">{item.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card py-12 border-t">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4 text-card-foreground">
                Phúc Long Coffee & Tea
              </h3>
              <p className="text-muted-foreground">
                Mang đến trải nghiệm cà phê và trà tuyệt vời cho mọi người
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-card-foreground">Liên hệ</h4>
              <div className="space-y-2 text-muted-foreground">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>Hồ Chí Minh, Việt Nam</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  <span>1900 63 66 36</span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-card-foreground">Giờ mở cửa</h4>
              <div className="space-y-2 text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>Thứ 2 - Chủ nhật</span>
                </div>
                <div className="ml-6">7:00 - 22:00</div>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t text-center text-muted-foreground">
            <p>© 2025 Phúc Long Coffee & Tea. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
