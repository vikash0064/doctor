# 🚀 Render Deployment Guide - Dentocare

## 📋 Prerequisites Checklist
- ✅ GitHub account
- ✅ Render account (render.com)
- ✅ MongoDB Atlas URL ready
- ✅ Gmail App Password ready
- ✅ Code pushed to GitHub

---

## 🎯 PART 1: BACKEND DEPLOYMENT (15 minutes)

### Step 1: Create Web Service
1. Go to: https://dashboard.render.com/
2. Click **"New +"** button (top right)
3. Select **"Web Service"**
4. Click **"Connect GitHub"** (if not connected)
5. Find and select: **vikash0064/doctor**

### Step 2: Configure Backend Service
Fill the form with these EXACT values:

```
Name: dentocare-backend
Environment: Node
Branch: main
Region: Oregon (US West)
Root Directory: server           ⚠️ IMPORTANT!
Build Command: npm install
Start Command: npm start
Instance Type: Free
```

### Step 3: Add Environment Variables
Scroll down to **"Environment Variables"** section.

Click **"Add Environment Variable"** and add these 4 variables:

**Variable 1:**
```
Key: MONGO_URI
Value: mongodb+srv://Dentocare_db:Vikash0064@dentocare.bsca8mg.mongodb.net/dentocare?retryWrites=true&w=majority&appName=Dentocare
```

**Variable 2:**
```
Key: EMAIL_USER
Value: vikashkushwaha726@gmail.com
```

**Variable 3:**
```
Key: EMAIL_PASS
Value: gdceyvufevsz jopf
```

**Variable 4:**
```
Key: ADMIN_EMAIL
Value: kushwahav912@gmail.com
```

### Step 4: Deploy Backend
1. Click **"Create Web Service"** button (bottom)
2. Wait 5-10 minutes for deployment
3. ✅ When it shows "Live", copy the URL
   - Example: `https://dentocare-backend.onrender.com`
   - **SAVE THIS URL** - you'll need it for frontend!

---

## 🎨 PART 2: FRONTEND DEPLOYMENT (10 minutes)

### Step 1: Create Static Site
1. Go back to: https://dashboard.render.com/
2. Click **"New +"** button
3. Select **"Static Site"**
4. Select repository: **vikash0064/doctor**

### Step 2: Configure Frontend Service
Fill the form with these EXACT values:

```
Name: dentocare-frontend
Branch: main
Root Directory: (leave EMPTY or type: ./)
Build Command: npm install && npm run build
Publish Directory: dist
```

### Step 3: Add Environment Variable
Scroll to **"Environment Variables"** section.

Click **"Add Environment Variable"**:

```
Key: VITE_API_URL
Value: <PASTE YOUR BACKEND URL HERE>
```

⚠️ **Important**: Use the backend URL from Part 1, Step 4
Example: `https://dentocare-backend.onrender.com`

### Step 4: Deploy Frontend
1. Click **"Create Static Site"** button
2. Wait 5-10 minutes for deployment
3. ✅ When it shows "Live", your site is ready!
   - Example: `https://dentocare-frontend.onrender.com`

---

## 🔧 PART 3: POST-DEPLOYMENT (Optional)

### Fix CORS (if needed)

If frontend can't connect to backend:

1. Go to your local project
2. Open: `server/server.js`
3. Find line with `app.use(cors())`
4. Replace with:
```javascript
app.use(cors({
    origin: 'https://dentocare-frontend.onrender.com', // your frontend URL
    credentials: true
}));
```
5. Commit and push:
```bash
git add .
git commit -m "fix: Update CORS for Render deployment"
git push origin main
```
6. Render will auto-redeploy backend

---

## ✅ SUCCESS CHECKLIST

After deployment, test these:

### Backend Testing:
- [ ] Visit: `https://your-backend.onrender.com/api/testimonials`
- [ ] Should show: `[]` or testimonials data
- [ ] No 404 error

### Frontend Testing:
- [ ] Visit your frontend URL
- [ ] Website loads properly
- [ ] Try booking an appointment
- [ ] Check if form submits successfully

---

## 🆘 TROUBLESHOOTING

### Backend "Missing script: start" error
**Problem**: You deployed frontend as Web Service
**Fix**: Set Root Directory to `server` in settings

### Frontend "Missing script: start" error  
**Problem**: You deployed frontend as Web Service instead of Static Site
**Fix**: Delete the service and create new Static Site

### CORS Error in Browser Console
**Problem**: Backend not allowing frontend requests
**Fix**: Update CORS in server.js (see Part 3 above)

### MongoDB Connection Error
**Problem**: Wrong MongoDB URL or IP not whitelisted
**Fix**: 
1. Go to MongoDB Atlas
2. Network Access → Add IP → Allow Access from Anywhere (0.0.0.0/0)

### Email Not Working
**Problem**: Wrong Gmail App Password
**Fix**: Regenerate Gmail App Password and update in Render

---

## 📝 IMPORTANT NOTES

### Free Tier Limitations:
- Services sleep after 15 minutes of inactivity
- First request after sleep takes ~30 seconds (cold start)
- 750 hours/month free (enough for 1 service 24/7)

### To Keep Service Awake:
Use a service like UptimeRobot to ping your backend every 10 minutes:
- URL to ping: `https://your-backend.onrender.com/api/testimonials`
- Interval: 10 minutes

---

## 🎉 DEPLOYMENT COMPLETE!

Your URLs:
- **Backend**: `https://dentocare-backend-xxxx.onrender.com`
- **Frontend**: `https://dentocare-frontend-xxxx.onrender.com`

Share your frontend URL with anyone! 🚀

---

## 📞 Need Help?

If stuck at any step:
1. Check Render logs (click "Logs" tab)
2. Look for error messages
3. Compare your settings with this guide
4. Make sure Root Directory is correct for backend

---

**Created**: January 8, 2026
**Project**: Dentocare Dental Clinic
**Author**: Antigravity AI Assistant
