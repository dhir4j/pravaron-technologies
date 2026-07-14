# Pravaron Technologies - Website & Hiring Management System

Modern AI-focused technology company website with integrated hiring management platform.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Gmail account (for email notifications)

### Installation

1. **Clone/Download the project**
```bash
cd Archive
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure environment variables**
```bash
# Copy example env file
cp .env.example .env.local

# Edit .env.local with your credentials
```

4. **Set up Gmail App Password**
   - Go to [Google Account Security](https://myaccount.google.com/security)
   - Enable **2-Step Verification**
   - Go to **App Passwords**
   - Generate password for "Mail"
   - Copy the 16-character password
   - Add to `.env.local` as `SMTP_PASS`

5. **Build the project**
```bash
npm run build
```

6. **Start the server**
```bash
npm start
```

Visit: `http://localhost:3000`

## 📖 Documentation

- **[IMPLEMENTATION.md](./IMPLEMENTATION.md)** - Complete technical documentation
- **[updates.md](./updates.md)** - Project requirements

## 🎨 Features

### Website
- Modern pink-themed design (#C7546D)
- Fully responsive layout
- Smooth animations
- Professional typography (Manrope + Inter)

### Hiring System
- **Applicant Portal**
  - Email OTP registration
  - Job browsing and applications
  - Real-time status tracking
  - Notifications

- **Admin Dashboard**
  - Job posting management
  - Application review
  - Status updates
  - Email notifications

## 🔧 Development

```bash
# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 📁 Project Structure

```
Archive/
├── app/              # Next.js app directory
├── components/       # React components
├── lib/             # Utilities (auth, db, email)
├── types/           # TypeScript definitions
├── public/          # Static assets
└── .env.local       # Environment variables (not committed)
```

## 🔐 Environment Variables

Required in `.env.local`:

```env
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=<random-secret>

SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
SMTP_FROM=your-email@gmail.com

ADMIN_EMAIL=admin@pravarontechnologies.com
```

## 📧 Email Setup

The system uses **Gmail SMTP** for email notifications:

1. **OTP Verification** - Account registration
2. **Application Confirmation** - After applying
3. **Status Updates** - When admin changes status
4. **Admin Alerts** - New registrations/applications

See [IMPLEMENTATION.md](./IMPLEMENTATION.md) for detailed email configuration.

## 🗄️ Database

- **SQLite** database (file-based)
- Location: `./data/pravaron.db`
- Auto-created on first run
- Tables: users, jobs, applications, notifications

## 👤 User Roles

1. **Applicant** (Default)
   - Register and login
   - Browse jobs
   - Submit applications
   - Track status

2. **Admin**
   - Manage job postings
   - Review applications
   - Update statuses
   - Receive notifications

## 🚨 Important Notes

### Security
- Never commit `.env.local` (already in .gitignore)
- Use strong `NEXTAUTH_SECRET` in production
- Enable 2FA on Gmail account
- Use Gmail App Password (not regular password)

### Email Notifications
- SMTP must be configured for OTP verification
- Without SMTP, registration will fail
- Test email delivery after setup

### First Admin Account
Admin accounts need to be created manually:
1. Register as normal user
2. Update `role` in database to 'admin'
3. Or use SQL: `UPDATE users SET role='admin' WHERE email='admin@example.com'`

## 📊 Application Status Flow

```
Applied → Under Review → Shortlisted → 
Document Review → Interview Scheduled → 
Selected / Rejected
```

## 🎯 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS
- **Auth**: NextAuth.js
- **Database**: SQLite (better-sqlite3)
- **Email**: Nodemailer
- **TypeScript**: Full type safety

## 🐛 Troubleshooting

### Email not sending
- Check Gmail App Password is correct
- Verify 2FA is enabled on Google Account
- Check SMTP credentials in `.env.local`

### Build errors
```bash
# Clear cache and rebuild
rm -rf .next
npm run build
```

### Database issues
```bash
# Delete and recreate database
rm ./data/pravaron.db
npm start  # Will auto-create tables
```

## 📞 Support

**Pravaron Technologies**  
Email: careers@pravarontechnologies.com  
Address: O-621, Block-A, EON Fairfox, Sector-140A, Noida.

## 📄 License

Proprietary - Pravaron Technologies

---

**Version**: 1.0.0  
**Last Updated**: 2024
