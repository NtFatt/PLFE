import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/profile-ui/input";
import { CategoryFilter } from "@/components/CategoryFilter";
import { ProductCard } from "@/components/ProductCard";
import { CartSummary } from "@/components/CartSummary";
import { useCart } from "@/contexts/CartContext";
import { useNavigate } from "react-router-dom";
import { ProductService } from "@/lib/menu/productService";

export default function Menu() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const { totalItems } = useCart();
  const navigate = useNavigate();
  const [products, setProducts] = useState<any[]>([]);

  // ==========================================
  // ÁNH XẠ CATEGORYNAME → CATEGORYID (FE tự xử lý)
  // ==========================================
  const CategoryMap: Record<string, string> = {
    "Cà phê": "3",
    "Trà": "19",
    "Sinh tố": "20",
    "Bánh": "21",
    "Đồ ăn nhẹ": "22",
  };

  // ==========================================
  // Lấy dữ liệu sản phẩm từ backend
  // ==========================================
  useEffect(() => {
    (async () => {
      try {
        const data = await ProductService.getAll();
        setProducts(data || []);
      } catch (err) {
        console.error("❌ Lỗi tải sản phẩm:", err);
      }
    })();
  }, []);

  // ==========================================
  // Filter product theo CategoryID thật
  // ==========================================
  const filteredProducts = products.filter((product) => {
    const productCatId = CategoryMap[product.CategoryName] || null;

    const matchesCategory =
      selectedCategory === "all" || productCatId === selectedCategory;

    const matchesSearch = product.Name?.toLowerCase().includes(
      searchQuery.toLowerCase()
    );

    return matchesCategory && matchesSearch;
  });

  // ==========================================
  // Navigate tới trang chi tiết sản phẩm
  // ==========================================
  const handleProductClick = (product: any) => {
    navigate(`/menu/product/${product.Id}`);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Banner */}
      <div className="bg-gradient-accent text-accent-foreground">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold mb-2">Ưu đãi đặc biệt</h2>
            <p className="text-lg opacity-90">Giảm giá lên đến 20% cho sản phẩm mới</p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Main Content */}
          <div className="flex-1">
            {/* Search */}
            <div className="relative mb-6">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Tìm kiếm đồ uống, bánh ngọt..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-14 rounded-2xl border-2 focus:border-primary"
              />
            </div>

            {/* Categories */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4 text-foreground">Danh mục</h3>
              <CategoryFilter
                selected={selectedCategory}
                onSelect={(val) => setSelectedCategory(val)}
              />
            </div>

            {/* Products Grid */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-foreground">Sản phẩm phổ biến</h3>
                <span className="text-sm text-muted-foreground">
                  {filteredProducts.length} sản phẩm
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.Id}
                    id={product.Id}
                    name={product.Name}
                    price={product.Price}
                    image={
                      product.ImageUrl ||
                      "https://placehold.co/500x500?text=No+Image"
                    }
                    rating={product.AverageRating || 5}
                    category={product.CategoryName}
                    onAddToCart={() => handleProductClick(product)}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Cart Sidebar */}
          <div className="hidden lg:block w-[350px]">
            <CartSummary />
          </div>
        </div>
      </div>
    </div>
  );
}
