const db = require("../database");

exports.commentIt = async (req, res) => {
    const {thePostId, currentUser, theComment} = req.body
     try {
         await db.query("insert into testcomment(post_id,username,comment)values($1,$2,$3)",
             [thePostId, currentUser, theComment]
         )
             return res.status(201).json({
                 success: true,
                 message:"Succesfully commentedg"
             })
     } catch (error) {
         console.log(error.message);
         return res.status(500).json({
             error: error.message,
         })
     }
 }
 

 exports.getComments = async (req, res) => {
    const {thePostId} = req.body
    try {
        const result =  await db.query("Select * from testcomment where post_id = $1",[thePostId]);
        return res.status(201).json({
            success: true,
            rows: result.rows,
            rowCount: result.rowCount,
            message:"we've gottit"
        })
            
    } catch (err) {
        console.log(err.message);
        return res.status(500).json({
            error: err.message,
        })
    }   
 }
 