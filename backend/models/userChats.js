import mongoose, { Types } from "mongoose";
const userchatsSchema  =  new mongoose.Schema({
    userId:{
        type : String,
        required : true
    },
    history:[
        {
            _id:{
                type:String,
                required:true,
            },
            title:{
                type:String,
                required:true,
            },
            createdAt:{
                type:Date,
                default: Date.now(),
            }
                
            
        },
    ],
},{timestamps:true});
 export default mongoose.models.userChats || mongoose.model("userChats",userchatsSchema)