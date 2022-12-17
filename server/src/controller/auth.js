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
      const { fullName, username, password, phoneNumber } = req.body;
      const userId = crypto.randomBytes(16).toString('hex');
      console.log(req.body)
      const serverClient = connect(key, secret, id);

      const hashedPassword = await bcrypt.hash(password, 10);
      const token = serverClient.createUserToken(userId);
      console.log(serverClient,token)
      res.status(200).json({
         token, fullName, username, userId, hashedPassword, phoneNumber
      })
   } catch (error) {
      console.log(error);
      res.status(500).json({ message: error })
   }
};
exports.signin = async (req, res) => {
   try {
      const { username , password} = req.body;
      
      const serverClient = connect(key,secret,id);
      // console.log(key,secret);
      const client = StreamChat.getInstance(key,secret);
      const {users} = await client.queryUsers({name:username});
      // console.log(users)

      if(!users.length) return res.status(400).json({message:"User not found!!"});
      const success = await bcrypt.compare(password,users[0].hashedPassword);
      const token = serverClient.createUserToken(users[0].id);

      if(success){
         res.status(200).json({token , fullName:users[0].fullName , username , userId:users[0].id , pas:users[0].hashedPassword})
      }
      else{
         res.status(500).json({message:"Incorreact password"});
      }
       

   } catch (error) {
      console.log(error);
      res.status(500).json({ message: error })
   }
}
