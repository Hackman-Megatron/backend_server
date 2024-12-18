const db = require("../database");

exports.getAllEvents = async (req, res, next) => {
    const queryReq = "Select * from events";
    db.query(queryReq, (err, data)=>{
        if(err) return res.json(err)
            return res.json(data)
    })
}


exports.postEvents = async (req, res) => {
    const {title, description, coverPath} = req.body;
    try {
       await db.query("insert into events(name, description, visual)values($1, $2, $3)", 
        [title, description, coverPath]
    )
    return res.status(201).json({
        success: true,
        message:"The registration was succesfull"
    })
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            error: error.message,
        })
    }
}





