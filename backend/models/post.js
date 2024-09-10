const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    title:{
        type:String
    },
    image:{
        type:String,
    },
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    likes:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            default:[]
        }
    ],
    comments:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            default:[]
        }
    ],
    bookmarks:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            default:[]
        }
    ],

},{timestamps:true})

const Post = mongoose.model('Post',postSchema)

module.exports = Post