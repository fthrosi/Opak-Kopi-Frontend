# STAGE 1: Build aplication
#-------------------------------------------
# Gunakan nama "builder" untuk stage ini
FROM node:20 AS builder

# Set direktori kerja
WORKDIR /app

# Salin package.json dan lock file
COPY package*.json ./

# Install dependencies
RUN npm install

# Salin semua sisa source code
COPY . .

# Jalankan script build dari package.json Anda
# Ini akan membuat folder /app/dist
RUN npm run build


# STAGE 2: Serve aplication with Nginx
#-------------------------------------------
# Gunakan image Nginx yang sangat ringan
FROM nginx:stable-alpine

# Salin hasil build (folder dist) dari stage "builder"
# ke folder default Nginx untuk menyajikan file HTML
COPY --from=builder /app/dist /usr/share/nginx/html

# (Opsional tapi sangat direkomendasikan) Salin file konfigurasi Nginx kustom
# Ini penting agar routing di React (React Router) berfungsi dengan benar
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Ekspos port 80, port default untuk web server Nginx
EXPOSE 80

# Perintah untuk menjalankan Nginx
CMD ["nginx", "-g", "daemon off;"]