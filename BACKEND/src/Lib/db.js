import mongoose from "mongoose"

export const connectDb =async ()=>{
try {
   const conn= await mongoose.connect(process.env.MONGO_URI)
    console.log(`mongo db connected :${conn.connection.host}`)

} catch (error) {
 console.log("error  in connecting to the db", error)
 process.exit(1)   
}
}