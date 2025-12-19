# Visionary Hub - MERN Stack Portfolio Application

A full-stack web application showcasing projects and client testimonials, built with React, Express, TypeScript, and PostgreSQL.

## 🚀 Features

- **Landing Page**: Beautiful, responsive portfolio showcase with animated sections
- **Admin Dashboard**: Content management system for projects, clients, messages, and subscribers
- **Contact Form**: User inquiry submission system
- **Newsletter Subscription**: Email subscription management
- **Modern UI**: Built with shadcn/ui components and Tailwind CSS

## 🛠️ Tech Stack

### Frontend
- **React 19** with TypeScript
- **Vite** for fast development and building
- **Wouter** for routing
- **TanStack Query** for data fetching
- **Zustand** for state management
- **shadcn/ui** component library
- **Tailwind CSS** for styling
- **Framer Motion** for animations

### Backend
- **Express.js** REST API
- **PostgreSQL** database with **Drizzle ORM**
- **TypeScript** for type safety
- **Passport.js** for authentication (configured, ready to implement)

## 📦 Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd MERN-StackBuilder
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env` file in the root directory:
```env
DATABASE_URL=your_postgresql_connection_string
PORT=5000
NODE_ENV=development
```

4. Set up the database:
```bash
npm run db:push
```

## 🏃 Running the Application

### Development Mode
```bash
npm run dev
```

This will start both the Express server and Vite dev server. The application will be available at `http://localhost:5000`.

### Client Only (Development)
```bash
npm run dev:client
```

### Production Build
```bash
npm run build
npm start
```

## 📁 Project Structure

```
MERN-StackBuilder/
├── client/              # Frontend React application
│   ├── src/
│   │   ├── components/  # UI components
│   │   ├── pages/       # Route pages
│   │   ├── hooks/       # Custom React hooks
│   │   └── lib/         # Utilities and helpers
│   └── public/          # Static assets
├── server/              # Backend Express application
│   ├── index.ts         # Server entry point
│   ├── routes.ts        # API routes
│   ├── storage.ts       # Data storage interface
│   └── static.ts        # Static file serving
├── shared/              # Shared TypeScript types
│   └── schema.ts        # Database schema
└── script/              # Build scripts
```

## 🗄️ Database Schema

Currently defined:
- `users` table (id, username, password)

**Note**: Additional tables for projects, clients, contacts, and subscribers need to be implemented.

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run dev:client` - Start Vite dev server only
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run check` - Type check TypeScript
- `npm run db:push` - Push database schema changes

## 📝 Current Status

✅ **Completed:**
- Frontend UI/UX implementation
- Client-side state management
- Form validation
- Responsive design
- Component library integration

🚧 **In Progress / TODO:**
- Backend API routes implementation
- Database integration (currently using in-memory storage)
- Authentication system
- Image upload functionality
- Persistent data storage

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

MIT License

## 👤 Author

Visionary Hub Development Team

---

Built with ❤️ using modern web technologies

