import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/profile-ui/button";
import { Card } from "@/components/profile-ui/card";
import { Badge } from "@/components/profile-ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/profile-ui/tabs";
import { ArrowLeft, Package, Clock, Truck, CheckCircle, XCircle, Star } from "lucide-react";
import { toast } from "sonner";

interface OrderItem {
  id: string;
  productName: string;
  productImage: string;
  quantity: number;
  price: number;
  size?: string;
  toppings?: string[];
}

interface Order {
  id: string;
  orderNumber: string;
  date: string;
  status: "pending" | "confirmed" | "delivering" | "completed" | "cancelled";
  items: OrderItem[];
  subtotal: number;
  shippingFee: number;
  discount: number;
  total: number;
  paymentMethod: string;
  deliveryAddress?: string;
  estimatedDelivery?: string;
}

const Orders = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialStatus = searchParams.get("status") || "all";
  const [activeTab, setActiveTab] = useState(initialStatus);

  // Mock data - replace with actual API call
  const [orders, setOrders] = useState<Order[]>([
    {
      id: "1",
      orderNumber: "PL202501001",
      date: "2025-01-10 14:30",
      status: "pending",
      items: [
        {
          id: "1",
          productName: "Trà sữa ô long nướng",
          productImage: "",
          quantity: 2,
          price: 45000,
          size: "L",
          toppings: ["Trân châu trắng", "Thạch cà phê"],
        },
        {
          id: "2",
          productName: "Cà phê sữa đá",
          productImage: "",
          quantity: 1,
          price: 35000,
          size: "M",
        },
      ],
      subtotal: 125000,
      shippingFee: 15000,
      discount: 0,
      total: 140000,
      paymentMethod: "Momo",
      deliveryAddress: "123 Nguyễn Huệ, Q.1, TP.HCM",
      estimatedDelivery: "2025-01-10 15:30",
    },
    {
      id: "2",
      orderNumber: "PL202501002",
      date: "2025-01-09 10:15",
      status: "confirmed",
      items: [
        {
          id: "3",
          productName: "Trà đào cam sả",
          productImage: "",
          quantity: 1,
          price: 42000,
          size: "L",
        },
      ],
      subtotal: 42000,
      shippingFee: 15000,
      discount: 5000,
      total: 52000,
      paymentMethod: "COD",
      deliveryAddress: "456 Lê Lợi, Q.1, TP.HCM",
      estimatedDelivery: "2025-01-09 11:00",
    },
    {
      id: "3",
      orderNumber: "PL202501003",
      date: "2025-01-08 16:45",
      status: "completed",
      items: [
        {
          id: "4",
          productName: "Freeze trà xanh",
          productImage: "",
          quantity: 2,
          price: 48000,
          size: "L",
        },
      ],
      subtotal: 96000,
      shippingFee: 0,
      discount: 10000,
      total: 86000,
      paymentMethod: "Momo",
    },
  ]);

  const filterOrders = (status: string) => {
    if (status === "all") return orders;
    return orders.filter((order) => order.status === status);
  };

  const getStatusConfig = (status: Order["status"]) => {
    const configs = {
      pending: {
        label: "Chờ xác nhận",
        icon: <Clock className="w-4 h-4" />,
        color: "bg-yellow-100 text-yellow-700 border-yellow-200",
      },
      confirmed: {
        label: "Đã xác nhận",
        icon: <Package className="w-4 h-4" />,
        color: "bg-blue-100 text-blue-700 border-blue-200",
      },
      delivering: {
        label: "Đang giao",
        icon: <Truck className="w-4 h-4" />,
        color: "bg-purple-100 text-purple-700 border-purple-200",
      },
      completed: {
        label: "Hoàn thành",
        icon: <CheckCircle className="w-4 h-4" />,
        color: "bg-green-100 text-green-700 border-green-200",
      },
      cancelled: {
        label: "Đã hủy",
        icon: <XCircle className="w-4 h-4" />,
        color: "bg-red-100 text-red-700 border-red-200",
      },
    };
    return configs[status];
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  const handleCancelOrder = (orderId: string) => {
    toast.success("Đơn hàng đã được hủy");
    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId ? { ...order, status: "cancelled" as const } : order
      )
    );
  };

  const handleReorder = (orderId: string) => {
    toast.success("Đã thêm sản phẩm vào giỏ hàng");
    navigate("/cart");
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
          <h1 className="text-lg font-semibold">Đơn hàng của tôi</h1>
        </div>
      </header>

      {/* Tabs */}
      <div className="sticky top-[60px] z-40 bg-background border-b">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full justify-start rounded-none h-auto p-0 bg-transparent border-b-0">
            <TabsTrigger
              value="all"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-4 py-3"
            >
              Tất cả
            </TabsTrigger>
            <TabsTrigger
              value="pending"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-4 py-3"
            >
              Chờ xác nhận
            </TabsTrigger>
            <TabsTrigger
              value="confirmed"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-4 py-3"
            >
              Đã xác nhận
            </TabsTrigger>
            <TabsTrigger
              value="delivering"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-4 py-3"
            >
              Đang giao
            </TabsTrigger>
            <TabsTrigger
              value="completed"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-4 py-3"
            >
              Hoàn thành
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Orders List */}
      <div className="p-4 space-y-4">
        {filterOrders(activeTab).length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
              <Package className="w-12 h-12 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground mb-4">Chưa có đơn hàng nào</p>
            <Button onClick={() => navigate("/menu")} variant="default">
              Đặt hàng ngay
            </Button>
          </div>
        ) : (
          filterOrders(activeTab).map((order) => (
            <OrderCard
              key={order.id}
              order={order}
              getStatusConfig={getStatusConfig}
              formatCurrency={formatCurrency}
              onCancel={handleCancelOrder}
              onReorder={handleReorder}
              onViewDetail={() => navigate(`/orders/${order.id}`)}
            />
          ))
        )}
      </div>
    </div>
  );
};

interface OrderCardProps {
  order: Order;
  getStatusConfig: (status: Order["status"]) => {
    label: string;
    icon: React.ReactNode;
    color: string;
  };
  formatCurrency: (amount: number) => string;
  onCancel: (orderId: string) => void;
  onReorder: (orderId: string) => void;
  onViewDetail: () => void;
}

const OrderCard = ({
  order,
  getStatusConfig,
  formatCurrency,
  onCancel,
  onReorder,
  onViewDetail,
}: OrderCardProps) => {
  const statusConfig = getStatusConfig(order.status);
const navigate = useNavigate();

  return (
    <Card className="overflow-hidden border-2 hover:border-primary/50 transition-colors">
      {/* Header */}
      <div className="p-4 bg-accent/30 border-b flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">
            Mã đơn: <span className="font-semibold text-foreground">{order.orderNumber}</span>
          </p>
          <p className="text-xs text-muted-foreground mt-1">{order.date}</p>
        </div>
        <Badge className={`${statusConfig.color} border flex items-center gap-1`}>
          {statusConfig.icon}
          {statusConfig.label}
        </Badge>
      </div>

      {/* Items */}
      <div className="p-4 space-y-3">
        {order.items.map((item) => (
          <div key={item.id} className="flex gap-3">
            <div className="w-16 h-16 rounded-lg bg-accent flex items-center justify-center flex-shrink-0">
              <span className="text-2xl">☕</span>
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-sm truncate">{item.productName}</h4>
              <p className="text-xs text-muted-foreground mt-0.5">
                {item.size && `Size: ${item.size}`}
                {item.toppings && item.toppings.length > 0 && ` • ${item.toppings.join(", ")}`}
              </p>
              <div className="flex items-center justify-between mt-1">
                <span className="text-xs text-muted-foreground">x{item.quantity}</span>
                <span className="font-semibold text-sm">{formatCurrency(item.price)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="p-4 bg-accent/20 border-t">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm text-muted-foreground">Tổng tiền:</span>
          <span className="text-lg font-bold text-primary">{formatCurrency(order.total)}</span>
        </div>
        <div className="flex gap-2">
          {order.status === "pending" && (
            <>
              <Button
                onClick={() => onCancel(order.id)}
                variant="outline"
                size="sm"
                className="flex-1"
              >
                Hủy đơn
              </Button>
              <Button onClick={onViewDetail} size="sm" className="flex-1">
                Xem chi tiết
              </Button>
            </>
          )}
          {order.status === "completed" && (
            <>
              <Button
                onClick={() => onReorder(order.id)}
                variant="outline"
                size="sm"
                className="flex-1"
              >
                Đặt lại
              </Button>
              <Button
                onClick={() => navigate(`/profile/review?orderId=${order.id}`)} // ✅ Thêm điều hướng
                size="sm"
                className="flex-1 bg-primary text-primary-foreground hover:opacity-90 rounded-xl"
              >
                Đánh giá
              </Button>
            </>
          )}

          {(order.status === "confirmed" || order.status === "delivering") && (
            <Button onClick={onViewDetail} size="sm" className="w-full">
              Theo dõi đơn hàng
            </Button>
          )}
          {order.status === "cancelled" && (
            <Button onClick={() => onReorder(order.id)} size="sm" className="w-full">
              Đặt lại
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
};

export default Orders;
