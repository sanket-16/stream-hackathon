const { connect } = require('getstream');
const bcrypt = require('bcrypt');
const StreamChat = require('stream-chat').StreamChat;
const crypto = require('crypto');

require("dotenv").config();

const key = process.env.STREAM_API_KEY
const secret = process.env.STREAM_API_SECRET
const id = process.env.STREAM_APP_ID

exports.signup = async (req, res) => {
          
   try {
      const { fullname, username, password, phone } = req.body;
      const userID = crypto.randomBytes(16).toString('hex');

      const serverClient = connect(key, secret, id);

      const hashPassword = await bcrypt.hash(password, 10);
      const token = serverClient.createUserToken(userID);
      res.status(200).json({
         token, fullname, username, userID, hashPassword, phone
      })
   } catch (error) {
      console.log(error);
      res.status(400).json({ message: error })
   }
};
exports.singin = async (req, res) => {
   try {
      const { username , password} = req.body;
      
      const serverClient = connect(key,secret,id);
      console.log(key,secret);
      const client = StreamChat.getInstance(key,secret);
      const {users} = await client.queryUsers({name:username});
      console.log(users)

      if(!users.length) return res.status(400).json({message:"User not found"});
      const sucess = await bcrypt.compare(password,users[0].hashedPassword);
      const token = serverClient.createUserToken(users[0].id);

      if(sucess){
         res.status(200).json({token , fullname:users[0].fullname , username , userID:users[0].id , pass: users[0].hashedPassword})
      }
      else{
         res.status(500).json({message:"Incorreact password"});
      }
       

   } catch (error) {
      console.log(error);
      res.status(400).json({ message: error })
   }
}
