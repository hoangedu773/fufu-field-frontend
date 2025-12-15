/**
 * Author: hoangedu773
 * GitHub: https://github.com/hoangedu773
 * Date: 2025-12-09
 * Description: Manual Testing Checklist - Danh sách test case kiểm tra thủ công
 */

# 📋 MANUAL TESTING CHECKLIST - Football Booking App

## 🔧 Chuẩn bị
- [ ] Backend server đang chạy tại `http://localhost:5000`
- [ ] Chạy `npm run dev` để khởi động frontend
- [ ] Mở trình duyệt tại `http://localhost:5173`

---

## 1. 🏠 TRANG CHỦ (HomePage)

### 1.1 Giao diện
| # | Test Case | Expected Result | Pass/Fail |
|---|-----------|-----------------|-----------|
| 1 | Mở trang chủ | Hiển thị banner, search form, danh sách sân |  |
| 2 | Logo hiển thị | Thấy "Sân bóng FuFu" với icon F |  |
| 3 | Banner có text | "Sân chuẩn, giá tốt, chỉ cần bạn bấm" |  |

### 1.2 Tìm kiếm
| # | Test Case | Expected Result | Pass/Fail |
|---|-----------|-----------------|-----------|
| 4 | Nhập vị trí | Input nhận giá trị |  |
| 5 | Chọn ngày | Date picker hoạt động |  |
| 6 | Bấm "Tìm sân" | Chuyển sang trang Search |  |

### 1.3 Danh sách sân
| # | Test Case | Expected Result | Pass/Fail |
|---|-----------|-----------------|-----------|
| 7 | Hiển thị các sân | Có ít nhất 1 card sân bóng |  |
| 8 | Click vào sân | Chuyển sang trang chi tiết |  |

---

## 2. 🔐 ĐĂNG NHẬP / ĐĂNG KÝ (LoginPage)

### 2.1 Đăng nhập
| # | Test Case | Expected Result | Pass/Fail |
|---|-----------|-----------------|-----------|
| 9 | Mở trang login | Form đăng nhập hiển thị |  |
| 10 | Submit form trống | Hiện alert "Vui lòng nhập đầy đủ thông tin!" |  |
| 11 | Đăng nhập sai mật khẩu | Hiện lỗi từ server |  |
| 12 | Đăng nhập thành công | Chuyển về home, hiển thị tên user |  |

### 2.2 Đăng ký
| # | Test Case | Expected Result | Pass/Fail |
|---|-----------|-----------------|-----------|
| 13 | Click "Đăng ký ngay" | Chuyển sang form đăng ký |  |
| 14 | Form đăng ký | Có thêm input Họ tên, Email, Địa chỉ |  |
| 15 | Đăng ký thành công | Hiện "Đăng ký thành công!" |  |

### 2.3 Quên mật khẩu
| # | Test Case | Expected Result | Pass/Fail |
|---|-----------|-----------------|-----------|
| 16 | Click "Quên mật khẩu?" | Chuyển sang form quên MK |  |
| 17 | Nhập email và gửi | Hiện thông báo đã gửi email |  |

---

## 3. ⚽ CHI TIẾT SÂN (FieldDetailPage)

### 3.1 Thông tin sân
| # | Test Case | Expected Result | Pass/Fail |
|---|-----------|-----------------|-----------|
| 18 | Hiển thị tên sân | Tên sân được hiển thị đúng |  |
| 19 | Hiển thị địa chỉ | Có icon MapPin + địa chỉ |  |
| 20 | Hiển thị tiện ích | Các tag tiện ích hiển thị |  |
| 21 | Hiển thị đánh giá | Danh sách review từ users |  |

### 3.2 Đặt sân (khi đã đăng nhập)
| # | Test Case | Expected Result | Pass/Fail |
|---|-----------|-----------------|-----------|
| 22 | Chọn loại sân | Chọn được Sân 5 hoặc Sân 7 |  |
| 23 | Chọn ngày | Date picker hoạt động |  |
| 24 | Chọn giờ bắt đầu/kết thúc | Time picker hoạt động |  |
| 25 | Xem giờ bận | Hiện các slot bận màu đỏ |  |
| 26 | Chọn giờ trùng với giờ bận | Hiện cảnh báo "Giờ đã bị trùng" |  |
| 27 | Chọn giờ trong quá khứ | Hiện cảnh báo "Giờ đã qua" |  |
| 28 | Tính giá đúng | Giá tạm tính hiển thị theo khung giờ |  |
| 29 | Ngày 14 hàng tháng | Hiện badge "Ngày 14 giảm 10%!" |  |
| 30 | Bấm "Tiếp tục thanh toán" | Chuyển sang trang thanh toán |  |

### 3.3 Viết đánh giá (khi đã đăng nhập)
| # | Test Case | Expected Result | Pass/Fail |
|---|-----------|-----------------|-----------|
| 31 | Form đánh giá hiển thị | Có chọn sao + textarea |  |
| 32 | Chọn số sao | Các sao được highlight |  |
| 33 | Gửi đánh giá | Hiện "Cảm ơn bạn đã đánh giá!" |  |

---

## 4. 💳 THANH TOÁN (PaymentPage)

| # | Test Case | Expected Result | Pass/Fail |
|---|-----------|-----------------|-----------|
| 34 | Hiển thị thông tin đặt sân | Tên sân, ngày, giờ, giá đúng |  |
| 35 | Chọn thanh toán QR | Hiển thị mã QR VietQR |  |
| 36 | Đếm ngược thời gian QR | Timer 3 phút đếm ngược |  |
| 37 | Bấm "Đã thanh toán xong" | Lưu booking, về home |  |
| 38 | Chọn thanh toán tại sân | Lưu booking, về home |  |

---

## 5. 📜 LỊCH SỬ (HistoryPage)

| # | Test Case | Expected Result | Pass/Fail |
|---|-----------|-----------------|-----------|
| 39 | Xem lịch sử đặt sân | Hiển thị các booking đã đặt |  |
| 40 | Xóa lịch sử | Confirm + xóa hết lịch sử |  |

---

## 6. 👤 TRANG CÁ NHÂN (UserProfilePage)

| # | Test Case | Expected Result | Pass/Fail |
|---|-----------|-----------------|-----------|
| 41 | Xem thông tin | Tên, avatar, SĐT hiển thị đúng |  |
| 42 | Cập nhật thông tin | Sửa được tên, email, địa chỉ |  |
| 43 | Đổi mật khẩu | Nhập MK cũ, MK mới và đổi |  |

---

## 7. 💬 CHAT

| # | Test Case | Expected Result | Pass/Fail |
|---|-----------|-----------------|-----------|
| 44 | Bấm nút chat nổi | Mở hộp chat |  |
| 45 | Gửi tin nhắn | Tin nhắn hiển thị bên phải |  |
| 46 | Nhận tin nhắn từ Admin | Tin nhắn hiển thị bên trái |  |
| 47 | Badge thông báo | Hiện số tin chưa đọc |  |

---

## 8. 🔧 TRANG ADMIN (AdminPage)

### 8.1 Đăng nhập Admin
| # | Test Case | Expected Result | Pass/Fail |
|---|-----------|-----------------|-----------|
| 48 | Đăng nhập với admin/admin | Vào được trang Admin |  |

### 8.2 Thống kê
| # | Test Case | Expected Result | Pass/Fail |
|---|-----------|-----------------|-----------|
| 49 | Tab Thống kê | Hiển thị doanh thu, đơn đặt, thành viên |  |

### 8.3 Quản lý sân
| # | Test Case | Expected Result | Pass/Fail |
|---|-----------|-----------------|-----------|
| 50 | Tab Quản lý sân | Danh sách sân hiển thị |  |
| 51 | Thêm sân mới | Form thêm sân hoạt động |  |
| 52 | Sửa sân | Click Sửa -> form được điền sẵn |  |
| 53 | Xóa sân | Confirm + xóa sân |  |

### 8.4 Lịch đặt
| # | Test Case | Expected Result | Pass/Fail |
|---|-----------|-----------------|-----------|
| 54 | Tab Lịch đặt | Hiển thị danh sách bookings |  |

### 8.5 Khách hàng
| # | Test Case | Expected Result | Pass/Fail |
|---|-----------|-----------------|-----------|
| 55 | Tab Khách hàng | Hiển thị danh sách users |  |

### 8.6 Đánh giá
| # | Test Case | Expected Result | Pass/Fail |
|---|-----------|-----------------|-----------|
| 56 | Tab Đánh giá | Hiển thị tất cả reviews |  |

### 8.7 Tin nhắn Admin
| # | Test Case | Expected Result | Pass/Fail |
|---|-----------|-----------------|-----------|
| 57 | Tab Tin nhắn | Danh sách users có chat |  |
| 58 | Chọn user để chat | Xem và trả lời tin nhắn |  |
| 59 | Badge thông báo | Hiện số tin chưa đọc |  |

---

## 9. 🎁 KHUYẾN MÃI (PromotionModal)

| # | Test Case | Expected Result | Pass/Fail |
|---|-----------|-----------------|-----------|
| 60 | Click menu Khuyến mãi | Hiện modal "SIÊU SALE NGÀY 14!" |  |
| 61 | Bấm "Đã hiểu" | Đóng modal |  |

---

## ✅ TỔNG KẾT

| Mục | Số test | Passed | Failed |
|-----|---------|--------|--------|
| Trang chủ | 8 |  |  |
| Đăng nhập/Đăng ký | 9 |  |  |
| Chi tiết sân | 16 |  |  |
| Thanh toán | 5 |  |  |
| Lịch sử | 2 |  |  |
| Trang cá nhân | 3 |  |  |
| Chat | 4 |  |  |
| Admin | 12 |  |  |
| Khuyến mãi | 2 |  |  |
| **TỔNG CỘNG** | **61** |  |  |

---

## 📝 GHI CHÚ
- Tester: _________________
- Ngày test: _________________
- Ghi chú thêm:

