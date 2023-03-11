  
require("dotenv").config();
const cors = require('cors')
const express = require("express");
const app = express();
const routes = require("./routes");
const { checkUser} = require("./auth/token_validation");
const { hashSync, genSaltSync, compareSync,bcrypt } = require("bcryptjs");
app.use(express.json());
// module.exports.bcrypt = bcrypt;
// module.exports.hashSync = hashSync;
// module.exports.genSaltSync = genSaltSync;
// module.exports.compareSync = compareSync;

const corsOptions ={
  origin:'*', 
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200
}
app.use(cors(corsOptions))
app.get('*',checkUser);
app.use(routes);

app.use(function(err,req,res,next){
  console.log(err);
  res.status(404).json({
    succes:0,
    message:"Something Went Wrong!!"
  });
})

const port = process.env.APP_PORT;
app.listen(port, () => {
  console.log("server up and running on PORT :", port);
});