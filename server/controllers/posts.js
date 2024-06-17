import db from "../config/db.js";
import jwt from 'jsonwebtoken'

export const getAllPost = (req, res) => {
    const { category } = req.query;
   
    try {
        const query1 = category ? 'SELECT * FROM Posts WHERE category=?' : 'SELECT * FROM Posts';
        const values = category ? [category] : [];
        db.query(query1, values, (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json(data);
        });
    } catch (err) {
        res.status(500).json(err);
    }
};


export const getPost = (req, res) => {
    
    const { id } = req.params;

    const query1 =     "SELECT p.id, `username`, `title`, `description`, p.img,`category`,`date` FROM users u JOIN posts p ON u.id = p.uid WHERE p.id = ? ";
    db.query(query1, [id], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json(data[0])
    })
}
export const addPost = async (req, res) => {

    const { title, description,category, img, date,token } = req.body;
    try {
        if (!token) return res.status(401).json("Not authenticated!");
  
        jwt.verify(token, "jwttoken", (err, userInfo) => {
         
            if (err) return res.status(403).json("Token is not valid!");
            const query1 = "INSERT INTO Posts (`title`,`description`,`img`,`date`,`category`,`uid`) Values(?) "
            const value = [
                title,
                description,
                img,
                date,
                category,
                userInfo.id
            ]
           
             db.query(query1, [value], (err, data) => {
                 if (err) {
                     console.log(err.sqlMessage)
                    return res.status(500).json({
                        success: false,
                        message: "Error in Uploading"
                    })
                }
                return res.status(200).json({
                    success: true,
                    message: "Post added !!",
                    data
                })
            })
        })
        
    } catch (err) {
        res.status(500).json({
            success: false,
            err
        })
    }
}

export const deletePost = (req, res) => {
    const { id } = req.params;
  
        const query1 = "Delete From Posts where `id`=? "
        
        db.query(query1, [id], (err, data) => {
            if (err) return res.status(500).json("You cannot delete the post")
            return res.status(200).json("Deleted Post Successfully")
        })

    
}