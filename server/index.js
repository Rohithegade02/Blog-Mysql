import express from "express";
import Blog from "./models/blog.js";
import authRoutes from './routes/auth.js'
import cookieParser from "cookie-parser";
import PostRoutes from './routes/posts.js'
import cors from 'cors'
import multer from "multer";
const app = express();
app.use(cookieParser())
app.use(express.json())

app.use(cors({
  origin: 'http://localhost:5173', // Your frontend URL
  credentials: true
}));

app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/posts',PostRoutes)
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../client/public/upload');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

app.post('/upload', upload.single('file'), (req, res) => {

  if (!req.file) {
    return res.status(400).json({ success: false, message: 'No file uploaded' });
  }
  return res.status(200).json({ success: true, data: req.file.filename });
});


app.listen(4000, () => {
    console.log(`Server is running on port 4000`);
    try {
        Blog.createTable().then(() => {       //checks whether table is created or not
          console.log('Blog table created or already exists.');
        }).catch(err => {
          console.error('Error creating activities table:', err);
        });
      } catch (err) {
        console.log(err)
      }
});