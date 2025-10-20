import { useState } from 'react';
import { Search, ShoppingCart } from 'lucide-react';
import { Input } from '@/components/profile-ui/input';
import { CategoryFilter } from '@/components/CategoryFilter';
import { ProductCard } from '@/components/ProductCard';
import ProductModal from '@/components/ProductModal';
import { CartSummary } from '@/components/CartSummary';
import { useCart } from '@/contexts/CartContext';
import { Badge } from '@/components/profile-ui/badge';
import { useNavigate } from 'react-router-dom';
import React from "react";


// Mock data - will be replaced with API calls
const mockProducts = [
  {
    id: '1',
    name: 'Cà phê sữa đá Phúc Long',
    price: 5.59,
    image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=500',
    rating: 5,
    category: 'coffee',
    discount: 15,
    description: 'Cà phê rang xay truyền thống pha phin kết hợp với sữa đặc thơm ngon',
    sizes: [
      { name: 'S', price: 5.59 },
      { name: 'M', price: 6.59 },
      { name: 'L', price: 7.59 },
    ],
    toppings: [
      { name: 'Thạch cà phê', price: 0.5 },
      { name: 'Topping trân châu', price: 0.7 },
      { name: 'Kem phô mai', price: 1.0 },
    ],
  },
  {
    id: '2',
    name: 'Trà sữa ô long',
    price: 5.59,
    image: 'https://images.unsplash.com/photo-1558857563-b1d9fbb17c3c?w=500',
    rating: 4,
    category: 'tea',
    description: 'Trà ô long thơm mát kết hợp cùng sữa tươi và trân châu',
    sizes: [
      { name: 'S', price: 5.59 },
      { name: 'M', price: 6.59 },
      { name: 'L', price: 7.59 },
    ],
    toppings: [
      { name: 'Trân châu đen', price: 0.7 },
      { name: 'Thạch rau câu', price: 0.5 },
      { name: 'Pudding', price: 0.8 },
    ],
  },
  {
    id: '3',
    name: 'Sinh tố bơ',
    price: 5.59,
    image: 'https://images.unsplash.com/photo-1638176066666-ffb2f013c7dd?w=500',
    rating: 5,
    category: 'smoothie',
    discount: 10,
    description: 'Sinh tố bơ sánh mịn, bổ dưỡng từ trái bơ tươi',
    sizes: [
      { name: 'S', price: 5.59 },
      { name: 'M', price: 6.59 },
      { name: 'L', price: 7.59 },
    ],
    toppings: [
      { name: 'Thêm sữa dừa', price: 0.5 },
      { name: 'Topping hạt chia', price: 0.6 },
    ],
  },
  {
    id: '4',
    name: 'Bánh mì que phô mai',
    price: 3.99,
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=500',
    rating: 4,
    category: 'cake',
    description: 'Bánh mì que giòn rụm với nhân phô mai béo ngậy',
    sizes: [
      { name: 'Đơn', price: 3.99 },
      { name: 'Combo 2', price: 7.49 },
    ],
    toppings: [],
  },
  {
    id: '5',
    name: 'Espresso đá',
    price: 4.59,
    image: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=500',
    rating: 5,
    category: 'coffee',
    description: 'Espresso nguyên chất đậm đà, mạnh mẽ',
    sizes: [
      { name: 'S', price: 4.59 },
      { name: 'M', price: 5.59 },
    ],
    toppings: [
      { name: 'Shot espresso thêm', price: 1.5 },
    ],
  },
  {
    id: '6',
    name: 'Bánh croissant bơ',
    price: 4.99,
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=500',
    rating: 5,
    category: 'cake',
    discount: 20,
    description: 'Bánh croissant bơ Pháp giòn tan, thơm ngậy',
    sizes: [
      { name: 'Đơn', price: 4.99 },
    ],
    toppings: [],
  },
];

export default function Menu() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const { totalItems } = useCart();
  const navigate = useNavigate();

  const filteredProducts = mockProducts.filter((product) => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleProductClick = (product: typeof mockProducts[0]) => {
    navigate(`/menu/product/${product.id}`);
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
                onSelect={setSelectedCategory}
              />
            </div>

            {/* Products Grid */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-foreground">
                  Sản phẩm phổ biến
                </h3>
                <span className="text-sm text-muted-foreground">
                  {filteredProducts.length} sản phẩm
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    {...product}
                    onAddToCart={() => handleProductClick(product)}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Cart Summary Sidebar */}
          <div className="hidden lg:block w-[350px]">
            <CartSummary />
          </div>
        </div>
      </div>
    </div>
  );
}
