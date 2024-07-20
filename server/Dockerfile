# Sử dụng image gốc từ Node.js trên Docker Hub
FROM node:14

# Đặt thư mục làm việc trong container
WORKDIR /usr/src/app

# Sao chép package.json và package-lock.json vào container
COPY package*.json ./

# Cài đặt các thư viện phụ thuộc
RUN npm install

# Sao chép toàn bộ mã nguồn vào container
COPY . .

# # Sao chép entrypoint.sh vào container
# COPY entrypoint.sh /usr/src/app

# # Đảm bảo entrypoint.sh có quyền thực thi
# RUN chmod +x /usr/src/app/entrypoint.sh

# Mở cổng ứng dụng
EXPOSE 8080

# # Sử dụng entrypoint.sh để khởi động container
# ENTRYPOINT ["/usr/src/app/src/entrypoint.sh"]

# Chạy ứng dụng
CMD ["npm", "start"]
