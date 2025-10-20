import { useState } from "react";
import { Package, Clock, CheckCircle2, XCircle, ArrowLeft } from "lucide-react";
import { Button } from "@/components/profile-ui/button";
import { useNavigate } from "react-router-dom";

/**
 * 🔹 Mô phỏng danh sách đơn hàng.
 * Trong thực tế, bạn sẽ lấy từ API BE qua fetch hoặc axios.
 */
const mockOrders = [
  {
    id: "PL240001",
    date: "2025-10-16",
    status: "completed",
    total: 12.5,
    items: [
      { name: "Trà sữa Phúc Long", quantity: 1, price: 4.5 },
      { name: "Cà phê sữa đá", quantity: 1, price: 3.0 },
      { name: "Bánh Croissant", quantity: 1, price: 5.0 },
    ],
  },
  {
    id: "PL239999",
    date: "2025-10-14",
    status: "processing",
    total: 8.0,
    items: [
      { name: "Trà đào cam sả", quantity: 2, price: 4.0 },
    ],
  },
  {
    id: "PL239998",
    date: "2025-10-10",
    status: "cancelled",
    total: 6.5,
    items: [
      { name: "Cà phê đen đá", quantity: 1, price: 2.5 },
      { name: "Bánh su kem", quantity: 1, price: 4.0 },
    ],
  },
];

export default function OrderHistory() {
  const navigate = useNavigate();
  const [orders] = useState(mockOrders);

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "completed":
        return (
          <span className="inline-flex items-center gap-1 text-success font-medium">
            <CheckCircle2 className="w-4 h-4" /> Hoàn thành
          </span>
        );
      case "processing":
        return (
          <span className="inline-flex items-center gap-1 text-accent font-medium">
            <Clock className="w-4 h-4" /> Đang xử lý
          </span>
        );
      case "cancelled":
        return (
          <span className="inline-flex items-center gap-1 text-destructive font-medium">
            <XCircle className="w-4 h-4" /> Đã hủy
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="flex items-center gap-2 mb-8">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
            className="rounded-xl hover:bg-muted"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-2xl font-bold text-foreground">
            Lịch sử đơn hàng
          </h1>
        </div>

        {orders.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <img
              src="https://illustrations.popsy.co/amber/empty-cart.svg"
              alt="Empty orders"
              className="w-40 h-40 mb-6"
            />
            <h2 className="text-xl font-semibold text-foreground mb-2">
              Bạn chưa có đơn hàng nào
            </h2>
            <p className="text-muted-foreground mb-6">
              Hãy đặt đơn hàng đầu tiên để trải nghiệm hương vị Phúc Long ☕
            </p>
            <Button
              onClick={() => navigate("/menu")}
              className="bg-gradient-primary text-primary-foreground rounded-xl"
            >
              Đặt hàng ngay
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-card rounded-2xl p-6 shadow-soft transition-all hover:shadow-medium"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="font-bold text-lg text-card-foreground">
                      Mã đơn: {order.id}
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      Ngày đặt: {order.date}
                    </p>
                  </div>
                  {getStatusLabel(order.status)}
                </div>

                <div className="border-t pt-3 mt-3 space-y-2">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        {item.name} × {item.quantity}
                      </span>
                      <span className="font-semibold">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between items-center border-t pt-4 mt-4">
                  <span className="text-sm text-muted-foreground">Tổng cộng</span>
                  <span className="text-xl font-bold text-primary">
                    ${order.total.toFixed(2)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
