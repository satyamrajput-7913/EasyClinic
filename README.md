# 🏥 EasyClinic

**EasyClinic** is a full-stack doctor appointment booking system designed for use by individual doctors or hospitals. It features **role-based access**, allowing patients, doctors, and administrators to interact with the system according to their permissions.

This application is perfect for real-world deployment demonstrating modern web development with JWT authentication, MongoDB, Express, and React.

---

## 🔐 Role-Based Authentication

EasyClinic features **three levels of secure access**:

1. **🧑‍⚕️ Patient Portal**
   - Register/login
   - Book appointments with doctors
   - View/manage existing bookings
   - Make online payments for appointments

2. **👨‍⚕️ Doctor Dashboard**
   - Login to view upcoming appointments
   - Check earnings
   - Update profile and availability

3. **🛠️ Admin Dashboard**
   - Manage all appointments
   - Approve or manage doctor profiles
   - Monitor system activity

---

## 🛠 Tech Stack

- **Frontend:** React.js
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (with Mongoose)
- **Authentication:** JWT (JSON Web Token)
- **Payment Integration:** Online payment gateway (RazorPay)
- **Cloudinary:** Online Media Storage Service
---

## 🚀 Features

- Secure login & registration for 3 roles
- Real-time doctor availability & appointment booking
- Online appointment fee payment
- Dashboard views for each role
- Profile management for doctors
- Admin-level control over all operations
- Responsive UI for all screen sizes

---

## ⚙️ Installation

### Prerequisites:
- Node.js and npm
- MongoDB (local )
  

### 1. Clone the repository:
```bash
git clone https://github.com/satyamrajput-7913/easyclinic.git
cd easyclinic
