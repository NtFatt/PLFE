import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Gộp class Tailwind an toàn và thông minh
 * Sử dụng: cn("p-2", condition && "bg-red-500")
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Định dạng số tiền theo kiểu Việt Nam (VD: 50.000 ₫)
 */
export function formatCurrency(amount: number): string {
  if (isNaN(amount)) return "0 ₫";
  return amount.toLocaleString("vi-VN", { style: "currency", currency: "VND" });
}

/**
 * Định dạng ngày/tháng/năm
 * @example formatDate("2025-10-09T00:00:00Z") -> "09/10/2025"
 */
export function formatDate(date: string | Date): string {
  const d = new Date(date);
  return d.toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

/**
 * Tạm dừng xử lý async (đơn vị ms)
 * @example await sleep(1000)
 */
export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
