# ⚡ Quick Deploy Cheat Sheet

## 🔴 BACKEND (Web Service)

**Render Settings:**
```
Root Directory: server
Build: npm install  
Start: npm start
```

**Environment Variables (4 total):**
```env
MONGO_URI=mongodb+srv://Dentocare_db:Vikash0064@dentocare.bsca8mg.mongodb.net/dentocare?retryWrites=true&w=majority&appName=Dentocare
EMAIL_USER=vikashkushwaha726@gmail.com
EMAIL_PASS=gdceyvufevsz jopf
ADMIN_EMAIL=kushwahav912@gmail.com
```

---

## 🔵 FRONTEND (Static Site)

**Render Settings:**
```
Root Directory: (empty)
Build: npm install && npm run build
Publish: dist
```

**Environment Variable (1 total):**
```env
VITE_API_URL=https://your-backend-url.onrender.com
```

---

## ✅ Checklist

- [ ] Backend deployed first
- [ ] Backend URL copied
- [ ] Frontend deployed with backend URL
- [ ] Both services showing "Live" status
- [ ] Website working in browser

---

## 🆘 Common Fixes

**"Missing script: start"**
→ Wrong service type or missing Root Directory

**CORS Error**  
→ Update `server/server.js` with frontend URL in cors()

**Can't connect to MongoDB**
→ Check MongoDB Atlas IP whitelist (use 0.0.0.0/0)
