import { CheckCircle, Clock, MapPin, Phone } from 'lucide-react';
import { Button } from '@/components/profile-ui/button';
import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

export default function OrderSuccess() {
  const navigate = useNavigate();
  const location = useLocation();
  const { orderId, total } = location.state || {};
  const formatVND = (value: number) =>
    value.toLocaleString("vi-VN", { style: "currency", currency: "VND" });

  useEffect(() => {
    if (!orderId) {
      navigate('/menu');
    }
  }, [orderId, navigate]);

  const estimatedTime = 30; // minutes

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-success/10 mb-4">
            <CheckCircle className="w-12 h-12 text-success" />
          </div>
          <h1 className="text-3xl font-bold mb-2 text-foreground">
            Đặt hàng thành công!
          </h1>
          <p className="text-muted-foreground">
            Cảm ơn bạn đã đặt hàng tại Aurum
          </p>
        </div>

        <div className="bg-card rounded-2xl p-6 shadow-medium space-y-6">
          {/* Order ID */}
          <div className="text-center pb-6 border-b">
            <div className="text-sm text-muted-foreground mb-1">Mã đơn hàng</div>
            <div className="text-2xl font-bold text-primary">{orderId}</div>
          </div>

          {/* Order Details */}
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Clock className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1">
                <div className="font-semibold text-card-foreground">
                  Thời gian dự kiến
                </div>
                <div className="text-sm text-muted-foreground">
                  Khoảng {estimatedTime} phút
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                <MapPin className="w-5 h-5 text-accent" />
              </div>
              <div className="flex-1">
                <div className="font-semibold text-card-foreground">Trạng thái</div>
                <div className="text-sm text-muted-foreground">
                  Đang xử lý đơn hàng
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-success/10 flex items-center justify-center flex-shrink-0">
                <Phone className="w-5 h-5 text-success" />
              </div>
              <div className="flex-1">
                <div className="font-semibold text-card-foreground">
                  Tổng thanh toán
                </div>
                <div className="text-xl font-bold text-primary">
                  {formatVND(total || 0)}
                </div>

              </div>
            </div>
          </div>

          {/* Order Timeline */}
          <div className="bg-muted/50 rounded-xl p-4">
            <h3 className="font-semibold mb-3 text-card-foreground">
              Tiến trình đơn hàng
            </h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-success flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-semibold">Đã xác nhận</div>
                  <div className="text-xs text-muted-foreground">
                    Đơn hàng đã được tiếp nhận
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3 opacity-50">
                <div className="w-8 h-8 rounded-full bg-border flex items-center justify-center flex-shrink-0">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-semibold">Đang chuẩn bị</div>
                  <div className="text-xs text-muted-foreground">
                    Nhân viên đang pha chế
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3 opacity-50">
                <div className="w-8 h-8 rounded-full bg-border flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-semibold">Hoàn thành</div>
                  <div className="text-xs text-muted-foreground">
                    Sẵn sàng giao hàng
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-3 pt-4">
            <Button
              onClick={() => navigate('/menu')}
              className="w-full bg-gradient-primary hover:opacity-90 text-primary-foreground rounded-xl h-12 font-semibold"
            >
              Tiếp tục mua sắm
            </Button>
            <Button
              onClick={() => navigate('/menu')}
              variant="outline"
              className="w-full rounded-xl h-12 font-semibold"
            >
              Xem lịch sử đơn hàng
            </Button>
          </div>
        </div>

        <div className="text-center mt-6">
          <p className="text-sm text-muted-foreground">
            Cần hỗ trợ? Liên hệ:{' '}
            <a href="tel:1900636636" className="text-primary font-semibold">
              1900 63 66 36
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
