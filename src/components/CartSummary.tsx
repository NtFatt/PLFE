import { ShoppingCart, Trash2 } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useNavigate } from 'react-router-dom';

export const CartSummary = () => {
  const { items, removeItem, subtotal, totalItems } = useCart();
  const navigate = useNavigate();

  if (totalItems === 0) {
    return (
      <div className="bg-card rounded-2xl p-6 shadow-soft">
        <div className="flex items-center gap-3 mb-6">
          <ShoppingCart className="w-6 h-6 text-primary" />
          <h2 className="text-xl font-bold text-card-foreground">Giỏ hàng</h2>
        </div>
        <div className="text-center py-8 text-muted-foreground">
          <ShoppingCart className="w-16 h-16 mx-auto mb-3 opacity-50" />
          <p>Giỏ hàng trống</p>
        </div>
      </div>
    );
  }

  const serviceFee = 1.0;
  const total = subtotal + serviceFee;

  return (
    <div className="bg-card rounded-2xl p-6 shadow-soft sticky top-4">
      <div className="flex items-center gap-3 mb-6">
        <ShoppingCart className="w-6 h-6 text-primary" />
        <h2 className="text-xl font-bold text-card-foreground">
          Giỏ hàng ({totalItems})
        </h2>
      </div>

      <ScrollArea className="max-h-[400px] mb-6">
        <div className="space-y-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex gap-3 p-3 rounded-xl bg-secondary group hover:bg-secondary/70 transition-colors"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-16 h-16 rounded-lg object-cover"
              />
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-sm truncate text-card-foreground">
                  {item.name}
                </h4>
                <p className="text-xs text-muted-foreground">
                  {item.size} • x{item.quantity}
                </p>
                {item.toppings.length > 0 && (
                  <p className="text-xs text-muted-foreground truncate">
                    {item.toppings.join(', ')}
                  </p>
                )}
                <p className="text-sm font-bold text-primary mt-1">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
              <Button
                size="icon"
                variant="ghost"
                onClick={() => removeItem(item.id)}
                className="opacity-0 group-hover:opacity-100 transition-opacity rounded-lg"
              >
                <Trash2 className="w-4 h-4 text-destructive" />
              </Button>
            </div>
          ))}
        </div>
      </ScrollArea>

      <div className="space-y-3 mb-6 pt-4 border-t">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Tạm tính</span>
          <span className="font-semibold">${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Phí dịch vụ</span>
          <span className="font-semibold">+${serviceFee.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-lg font-bold pt-3 border-t">
          <span>Tổng cộng</span>
          <span className="text-primary">${total.toFixed(2)}</span>
        </div>
      </div>

      <Button
        onClick={() => navigate('/menu/checkout')}
        className="w-full bg-gradient-primary hover:opacity-90 text-primary-foreground rounded-xl h-12 font-semibold shadow-medium"
      >
        Thanh toán
      </Button>
    </div>
  );
};
