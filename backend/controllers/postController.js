const createPost = async(req,res) =>{
    try{
        
    }catch(error){
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}
const deletePost = async(req,res) =>{
    try{

    }catch(error){
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

const getAllPost = async(req,res) =>{
    try{

    }catch(error){
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}
module.exports = {
    createPost,
    deletePost,
    getAllPost
}