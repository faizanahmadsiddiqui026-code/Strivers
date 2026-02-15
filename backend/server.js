const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { MongoClient, ObjectId } = require('mongodb');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors({
  origin: 'https://strivers-pmvi.vercel.app//',
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());

let db, userCollection, vendorCollection;

MongoClient.connect(process.env.MONGO_URI)
  .then(client => {
    db = client.db('Striver');
    userCollection = db.collection('users');
    vendorCollection = db.collection('vendors'); // 👈 add this
    console.log("Connected to MongoDB");
  })
  .catch(err => console.error(err));


/* ================= JWT ================= */

const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );
};

const authMiddleware = (roles = []) => {
  return (req, res, next) => {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: 'Unauthorized' });

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      if (roles.length && !roles.includes(decoded.role)) {
        return res.status(403).json({ message: 'Forbidden' });
      }

      req.user = decoded;
      next();
    } catch (err) {
      res.status(403).json({ message: 'Invalid token' });
    }
  };
};

app.get('/', async (req, res) => {
  res.json({ message: "Welcome to the Striver backend API" });
});



/* ================= SIGNUP ================= */

app.post('/user/signup', async (req, res) => {
  try {
    const { name, email, phone, password, address } = req.body;

    const existingUser = await userCollection.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: 'Email already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
      name,
      email,
      phone,
      address,
      password: hashedPassword,
      createdAt: new Date()
    };

    const result = await userCollection.insertOne(newUser);

    const token = generateToken({ ...newUser, _id: result.insertedId });

    res.cookie('token', token, {
      httpOnly: true,
      secure: false, // set true in production (HTTPS)
      sameSite: 'lax',
      maxAge: 60 * 60 * 1000
    });

    res.status(201).json({ message: 'User registered successfully' });

  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

/* ================= VENDOR SIGNUP ================= */

app.post('/vendor/signup', async (req, res) => {
  try {
    const {
      shopName,
      ownerName,
      email,
      phone,
      location,
      operatingHours,
      upiId,
      password
    } = req.body;

    const existingVendor = await vendorCollection.findOne({ email });
    if (existingVendor)
      return res.status(400).json({ message: 'Vendor email already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newVendor = {
      shopName,
      ownerName,
      email,
      phone,
      location,
      operatingHours,
      upiId,
      password: hashedPassword,
      role: "vendor",
      createdAt: new Date()
    };

    const result = await vendorCollection.insertOne(newVendor);

    const token = jwt.sign(
      { id: result.insertedId, email, role: "vendor" },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.cookie('token', token, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      maxAge: 60 * 60 * 1000
    });

    res.status(201).json({ message: 'Vendor registered successfully' });

  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});




/* ================= LOGIN ================= */

app.post('/user/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userCollection.findOne({ email });
    if (!user)
      return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: 'Invalid credentials' });

    const token = generateToken(user);

    res.cookie('token', token, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      maxAge: 60 * 60 * 1000
    });

    res.json({ message: 'Login successful' });

  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});


/* ================= VENDOR LOGIN ================= */

app.post('/vendor/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const vendor = await vendorCollection.findOne({ email });
    if (!vendor)
      return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, vendor.password);
    if (!isMatch)
      return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign(
      { id: vendor._id, email: vendor.email, role: "vendor" },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.cookie('token', token, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      maxAge: 60 * 60 * 1000
    });

    res.json({ message: 'Vendor login successful' });

  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});


/* ================= LOGOUT ================= */

app.post('/user/logout', (req, res) => {
  res.clearCookie('token');
  res.json({ message: "Logged out" });
});

/* ================= PROTECTED ROUTE ================= */

app.get('/user/me', authMiddleware, (req, res) => {
  res.json({ id: req.user.id, email: req.user.email });
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK' });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
