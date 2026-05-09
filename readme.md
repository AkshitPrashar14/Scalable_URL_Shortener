# 🚀 Production-Grade Scalable URL Shortener (Bitly Clone)

A cloud-native, production-style scalable URL shortener inspired by Bitly, built using **Node.js, Express.js, MySQL, Redis, Docker, and DevOps tooling**.

This project focuses not only on CRUD functionality but also on demonstrating:
- Distributed systems concepts
- Containerized architecture
- Redis caching strategies
- CI/CD readiness
- Cloud-native backend engineering
- Scalable deployment practices

---

# 📌 Features

✅ Shorten long URLs  
✅ Redirect using short URLs  
✅ Redis caching for faster redirects  
✅ Click analytics tracking  
✅ Health check endpoints  
✅ Dockerized multi-container setup  
✅ Production-style backend architecture  
✅ Environment-based configuration  
✅ RESTful API design  

---

# 🧩 Tech Stack

## 🚀 Backend
- Node.js
- Express.js

## 🗄️ Database
- MySQL

## ⚡ Cache
- Redis

## 🐳 DevOps & Infrastructure
- Docker
- Docker Compose
- Jenkins (Planned)
- Kubernetes (Planned)
- Terraform (Planned)
- AWS EC2 (Planned)

## 📊 Monitoring (Planned)
- Prometheus
- Grafana

---

# 🏗️ System Architecture

```text
                    ┌──────────────┐
                    │    Client    │
                    └──────┬───────┘
                           │
                           ▼
                ┌────────────────────┐
                │  Express Backend   │
                └─────────┬──────────┘
                          │
             ┌────────────┴────────────┐
             ▼                         ▼
      ┌────────────┐           ┌────────────┐
      │   Redis    │           │   MySQL    │
      │   Cache    │           │  Database  │
      └────────────┘           └────────────┘