import { useState } from 'react';
import { ArrowLeft, MapPin, Wallet, CreditCard } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/profile-ui/button';
import { Input } from '@/components/profile-ui/input';
import { Label } from '@/components/profile-ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/profile-ui/radio-group';
import { Textarea } from '@/components/profile-ui/textarea';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export default function Checkout() {
  const { items, subtotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [pickupMethod, setPickupMethod] = useState('delivery');
  const [paymentMethod, setPaymentMethod] = useState('momo');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    note: '',
  });

  const serviceFee = 1.0;
  const deliveryFee = pickupMethod === 'delivery' ? 2.0 : 0;
  const total = subtotal + serviceFee + deliveryFee;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.phone) {
      toast.error('Vui lòng điền đầy đủ thông tin');
      return;
    }

    if (pickupMethod === 'delivery' && !formData.address) {
      toast.error('Vui lòng nhập địa chỉ giao hàng');
      return;
    }

    // Mock order creation
    const orderId = 'PL' + Date.now().toString().slice(-8);
    
    // Clear cart and navigate to success page
    clearCart();
    navigate('/menu/ordersuccess', { state: { orderId, total } });
    toast.success('Đặt hàng thành công!');
  };

  return (
    <div className="min-h-screen bg-background">

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Customer Info */}
          <div className="bg-card rounded-2xl p-6 shadow-soft">
            <h2 className="text-xl font-bold mb-4 text-card-foreground">
              Thông tin khách hàng
            </h2>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Họ và tên *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Nguyễn Văn A"
                  className="mt-2 rounded-xl"
                  required
                />
              </div>
              <div>
                <Label htmlFor="phone">Số điện thoại *</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="0912345678"
                  className="mt-2 rounded-xl"
                  required
                />
              </div>
            </div>
          </div>

          {/* Pickup Method */}
          <div className="bg-card rounded-2xl p-6 shadow-soft">
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-bold text-card-foreground">
                Phương thức nhận hàng
              </h2>
            </div>
            <RadioGroup value={pickupMethod} onValueChange={setPickupMethod}>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 p-4 rounded-xl border-2 border-border hover:border-primary transition-colors">
                  <RadioGroupItem value="pickup" id="pickup" />
                  <Label htmlFor="pickup" className="flex-1 cursor-pointer">
                    <div className="font-semibold">Nhận tại cửa hàng</div>
                    <div className="text-sm text-muted-foreground">
                      Miễn phí - Nhận hàng sau 15 phút
                    </div>
                  </Label>
                </div>
                <div className="flex items-center space-x-3 p-4 rounded-xl border-2 border-border hover:border-primary transition-colors">
                  <RadioGroupItem value="delivery" id="delivery" />
                  <Label htmlFor="delivery" className="flex-1 cursor-pointer">
                    <div className="font-semibold">Giao hàng tận nơi</div>
                    <div className="text-sm text-muted-foreground">
                      Phí vận chuyển: $2.00 - Giao trong 30-45 phút
                    </div>
                  </Label>
                </div>
              </div>
            </RadioGroup>

            {pickupMethod === 'delivery' && (
              <div className="mt-4">
                <Label htmlFor="address">Địa chỉ giao hàng *</Label>
                <Textarea
                  id="address"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="Số nhà, tên đường, phường/xã, quận/huyện"
                  className="mt-2 rounded-xl resize-none"
                  rows={3}
                  required
                />
              </div>
            )}

            <div className="mt-4">
              <Label htmlFor="note">Ghi chú đơn hàng</Label>
              <Textarea
                id="note"
                value={formData.note}
                onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                placeholder="Yêu cầu đặc biệt về đơn hàng..."
                className="mt-2 rounded-xl resize-none"
                rows={2}
              />
            </div>
          </div>

          {/* Payment Method */}
          <div className="bg-card rounded-2xl p-6 shadow-soft">
            <div className="flex items-center gap-2 mb-4">
              <Wallet className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-bold text-card-foreground">
                Phương thức thanh toán
              </h2>
            </div>
            <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 p-4 rounded-xl border-2 border-border hover:border-primary transition-colors">
                  <RadioGroupItem value="cash" id="cash" />
                  <Label htmlFor="cash" className="flex-1 cursor-pointer">
                    <div className="font-semibold">Tiền mặt</div>
                    <div className="text-sm text-muted-foreground">
                      Thanh toán khi nhận hàng
                    </div>
                  </Label>
                </div>
                <div className="flex items-center space-x-3 p-4 rounded-xl border-2 border-border hover:border-primary transition-colors">
                  <RadioGroupItem value="momo" id="momo" />
                  <Label htmlFor="momo" className="flex-1 cursor-pointer">
                    <div className="font-semibold flex items-center gap-2">
                      <CreditCard className="w-4 h-4" />
                      Ví MoMo
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Thanh toán qua ví điện tử MoMo
                    </div>
                  </Label>
                </div>
                <div className="flex items-center space-x-3 p-4 rounded-xl border-2 border-border hover:border-primary transition-colors">
                  <RadioGroupItem value="zalopay" id="zalopay" />
                  <Label htmlFor="zalopay" className="flex-1 cursor-pointer">
                    <div className="font-semibold flex items-center gap-2">
                      <CreditCard className="w-4 h-4" />
                      ZaloPay
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Thanh toán qua ví điện tử ZaloPay
                    </div>
                  </Label>
                </div>
              </div>
            </RadioGroup>
          </div>

          {/* Order Summary */}
          <div className="bg-card rounded-2xl p-6 shadow-medium">
            <h2 className="text-xl font-bold mb-4 text-card-foreground">
              Chi tiết đơn hàng
            </h2>
            <div className="space-y-3 mb-6">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span className="text-muted-foreground">
                    {item.name} × {item.quantity}
                  </span>
                  <span className="font-semibold">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
              <div className="border-t pt-3 mt-3">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-muted-foreground">Tạm tính</span>
                  <span className="font-semibold">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-muted-foreground">Phí dịch vụ</span>
                  <span className="font-semibold">+${serviceFee.toFixed(2)}</span>
                </div>
                {deliveryFee > 0 && (
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-muted-foreground">Phí giao hàng</span>
                    <span className="font-semibold">+${deliveryFee.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-xl font-bold pt-3 border-t">
                  <span>Tổng cộng</span>
                  <span className="text-primary">${total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-primary hover:opacity-90 text-primary-foreground rounded-xl h-14 text-lg font-semibold shadow-medium"
            >
              Xác nhận đặt hàng
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
