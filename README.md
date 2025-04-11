# 📦 Backend API - User & Post Management

Bu proje, [Perwatch Backend Case](https://perwatch.com) kapsamında geliştirilmiş, Node.js (Express.js) tabanlı bir RESTful API servisidir. Kullanıcı ve gönderi yönetimi işlemlerini gerçekleştirir.

## 🚀 Özellikler

### 🔐 Auth & Güvenlik
- JWT ile kullanıcı doğrulama altyapısı
- CORS güvenlik konfigürasyonu
- Helmet ile HTTP header güvenliği
- Joi ile veri doğrulama ve giriş kontrolü
- API Rate Limiting (DDoS koruması)
- Benzersiz e-posta kontrolü

### 👤 Kullanıcı Servisleri
- `GET /api/users` – Tüm kullanıcıları getirir
- `GET /api/users/:id` – ID'ye göre kullanıcı getirir
- `POST /api/users` – Yeni kullanıcı oluşturur
- `PUT /api/users/:id` – Kullanıcıyı günceller
- `DELETE /api/users/:id` – Kullanıcıyı siler

### 📝 Gönderi Servisleri
- `GET /api/posts` – Tüm gönderileri getirir
- `GET /api/posts/user/:userId` – Belirli kullanıcıya ait gönderileri getirir
- `GET /api/posts/tag/:tag` – Belirli etiketli gönderileri getirir
- `GET /api/posts/:id` – ID'ye göre gönderi getirir
- `POST /api/posts` – Yeni gönderi oluşturur
- `PUT /api/posts/:id` – Gönderiyi günceller
- `DELETE /api/posts/:id` – Gönderiyi siler

---

## 🛠 Teknolojiler

| Teknoloji | Açıklama |
|----------|----------|
| Node.js  | Sunucu taraflı JavaScript çalıştırma ortamı |
| Express.js | Minimal ve esnek web uygulama çatısı |
| MongoDB & Mongoose | NoSQL veritabanı ve ODM aracı |
| Joi | Veri doğrulama |
| JWT | Kullanıcı kimlik doğrulama |
| Helmet | HTTP güvenlik başlıkları |
| Rate-Limit | İstek limitleme ve DDoS önleme |
| Morgan | HTTP istek loglama |
| Docker | Uygulama konteynerleştirme |

---

## 🐳 Docker ile Başlatma

```bash
git clone https://github.com/stasarr/perwatch-case-api.git
cd perwatch-case-api

# Ortam değişkenlerini düzenle
cp .env.example .env

# Docker ile başlat
docker-compose up --build
