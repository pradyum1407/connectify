import { StreamChat } from "stream-chat";
import 'dotenv/config'

const apikey = process.env.Stream_Api_key;
const apisecret= process.env.Stream_Api_Secret;

if(!apikey || !apisecret){
    console.error("Stream API key or Secret is missing");
}

const  streamClient = StreamChat.getInstance(apikey,apisecret);

export  const upsertStreamUser= async(userdata)=>{
try {
    await streamClient.upsertUsers([userdata]);
    return userdata;

} catch (error) {
 console.log("error while upserting the  users",error)
}
}
