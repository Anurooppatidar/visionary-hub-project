# Deployment Guide

This guide will help you deploy the Visionary Hub project to various cloud platforms.

## Prerequisites

- A GitHub account with your project repository
- A PostgreSQL database (provided by the platform or external service)

## Deployment Options

### Option 1: Render (Recommended - Easiest)

Render is the easiest platform for deploying full-stack applications with databases.

#### Steps:

1. **Sign up/Login** to [Render](https://render.com)

2. **Create a New Web Service**:
   - Click "New +" → "Web Service"
   - Connect your GitHub repository: `Anurooppatidar/visionary-hub-project`
   - Select the repository

3. **Configure the Service**:
   - **Name**: `visionary-hub` (or your preferred name)
   - **Environment**: `Node`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Plan**: Free (or choose a paid plan)

4. **Add Environment Variables**:
   - `NODE_ENV` = `production`
   - `PORT` = `10000` (Render sets this automatically, but you can specify)
   - `DATABASE_URL` = (will be set automatically if you create a database)

5. **Create PostgreSQL Database**:
   - Click "New +" → "PostgreSQL"
   - Name it `visionary-hub-db`
   - Copy the **Internal Database URL**
   - Add it as `DATABASE_URL` in your web service environment variables

6. **Deploy**:
   - Click "Create Web Service"
   - Wait for the build to complete
   - Your app will be live at `https://your-app-name.onrender.com`

7. **Run Database Migrations**:
   - After deployment, you may need to run migrations
   - You can use Render's shell or add a one-time script:
   ```bash
   npm run db:push
   ```

#### Using render.yaml (Alternative):

If you prefer, you can use the `render.yaml` file:
1. Go to Render Dashboard
2. Click "New +" → "Blueprint"
3. Connect your repository
4. Render will automatically detect and use `render.yaml`

---

### Option 2: Railway

Railway is another excellent platform for full-stack apps.

#### Steps:

1. **Sign up/Login** to [Railway](https://railway.app)

2. **Create New Project**:
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your repository: `Anurooppatidar/visionary-hub-project`

3. **Add PostgreSQL Database**:
   - Click "+ New" → "Database" → "Add PostgreSQL"
   - Railway will automatically create a database

4. **Configure Environment Variables**:
   - Railway automatically sets `DATABASE_URL` from the PostgreSQL service
   - Add `NODE_ENV` = `production`
   - Railway automatically sets `PORT`

5. **Deploy**:
   - Railway will automatically detect the build and start commands
   - Your app will be live at `https://your-app-name.up.railway.app`

6. **Run Database Migrations**:
   - Use Railway's CLI or add a one-time service:
   ```bash
   railway run npm run db:push
   ```

---

### Option 3: Vercel (Frontend + Serverless)

Vercel works well but requires some adjustments for the Express backend.

#### Steps:

1. **Install Vercel CLI**:
   ```bash
   npm i -g vercel
   ```

2. **Create `vercel.json`**:
   ```json
   {
     "version": 2,
     "builds": [
       {
         "src": "dist/index.cjs",
         "use": "@vercel/node"
       }
     ],
     "routes": [
       {
         "src": "/(.*)",
         "dest": "dist/index.cjs"
       }
     ]
   }
   ```

3. **Deploy**:
   ```bash
   vercel
   ```

**Note**: For Vercel, you may need to adjust the server setup for serverless functions.

---

### Option 4: Fly.io

Fly.io is great for full-stack applications.

#### Steps:

1. **Install Fly CLI**:
   ```bash
   curl -L https://fly.io/install.sh | sh
   ```

2. **Login**:
   ```bash
   fly auth login
   ```

3. **Create `fly.toml`**:
   ```toml
   app = "visionary-hub"
   primary_region = "iad"

   [build]
     builder = "paketobuildpacks/builder:base"

   [env]
     NODE_ENV = "production"
     PORT = "8080"

   [[services]]
     internal_port = 8080
     protocol = "tcp"
   ```

4. **Launch**:
   ```bash
   fly launch
   ```

5. **Add PostgreSQL**:
   ```bash
   fly postgres create
   fly postgres attach <postgres-app-name>
   ```

---

## Environment Variables

Regardless of the platform, you'll need these environment variables:

```env
NODE_ENV=production
PORT=5000  # (or the port your platform provides)
DATABASE_URL=postgresql://user:password@host:port/database
```

## Database Setup

After deployment, you need to run database migrations:

```bash
npm run db:push
```

You can do this via:
- Platform's shell/console
- Platform's one-time job/script
- Local connection to production database (if allowed)

## Post-Deployment Checklist

- [ ] Application is accessible via URL
- [ ] Database is connected and migrations are run
- [ ] Environment variables are set correctly
- [ ] Static files are being served correctly
- [ ] API routes are working (if implemented)
- [ ] Test the contact form
- [ ] Test the admin dashboard

## Troubleshooting

### Build Fails
- Check build logs for errors
- Ensure all dependencies are in `package.json`
- Verify Node.js version compatibility

### Database Connection Issues
- Verify `DATABASE_URL` is set correctly
- Check database is accessible from your deployment
- Ensure database migrations have been run

### Static Files Not Loading
- Verify build completed successfully
- Check `dist/public` directory exists
- Ensure static file serving is configured correctly

### Port Issues
- Most platforms set `PORT` automatically
- Check platform documentation for port configuration
- Ensure your app uses `process.env.PORT`

## Need Help?

- Check platform-specific documentation
- Review build logs in your platform's dashboard
- Check application logs for runtime errors

---

**Recommended**: Start with **Render** for the easiest deployment experience!

