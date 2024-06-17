import express from "express"
import { addPost, deletePost, getAllPost, getPost } from "../controllers/posts.js"
import cookieParser from 'cookie-parser';
import multer from "multer";


const router = express.Router()
const app = express()
app.use(cookieParser())


  

router.get('/', getAllPost)
router.get('/:id',getPost)
router.post('/add',addPost)
router.delete('/:id',deletePost)
router.put('/:id',)
export default router;