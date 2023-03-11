const pool = require("../../config/database");
const Sib = require('sib-api-v3-sdk')
const client = Sib.ApiClient.instance
const apiKey = client.authentications['api-key']
//apiKey.apiKey = process.env.API_KEY
apiKey.apiKey = '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';
const tranEmailApi = new Sib.TransactionalEmailsApi()
const tranEmailApi2 = new Sib.TransactionalEmailsApi()
let sender = {
    email: 'areebraja000@gmail.com',
    name: 'Areeb',
}
const sender1={
  email:'rajaareeb009@gmail.com',
  name:'Raja',
}
let receivers = [
    {
        email: 'areebraja000@gmail.com',
    },]


let receivers2 = [
  {
      email: 'areebraja000@gmail.com',
  },
]

module.exports = {
  addUser: (data, callBack) => {
    pool.query(
      `insert into maz_ecommerce.user set  email=?, password=? , type='user',role_id=? , created_at = now()`,
        [
        data.email,
        data.password,
        3
      ],
      (error, results, fields) => {
        if (error) {
          return callBack(error,null);
        }
        delete data.email;
        delete data.password;
        delete data.type;
        pool.query(
          `insert into maz_ecommerce.profile set user_id=${results.insertId}, `+Object.keys(data).map(key => `${key} = ?`).join(", ") +"",
            [
              ...Object.values(data)
          ],
          (error, result, fields) => {
            if (error) {
              return callBack(error,null);
            }
            result['user_id']=results.insertId
            return callBack(null,  result);
          }
        );
      }
    );
  },
  
  updateandRegisterUser: (data,user_id, callBack) => {
    pool.query(
      `update maz_ecommerce.user set  password=? , type='user', role_id=? , created_at = now() where id=?`,
        [
        data.password,
        3,
        user_id
      ],
      (error, results, fields) => {
        if (error) {
          return callBack(error,null);
        }
        delete data.email;
        delete data.password;
        delete data.type;
        console.log("results  are ",results)
        pool.query(
          `update maz_ecommerce.profile set `+Object.keys(data).map(key => `${key} = ?`).join(", ") +""+'where user_id=? ',
            [
              ...Object.values(data),
              user_id
          ],
          (error, result, fields) => {
            if (error) {
              return callBack(error,null);
            }
            result['user_id']=user_id
            return callBack(null,  result);
          }
        );
      }
    );
  },


  addAdminByAdmin: (data, callBack) => {
    let type='user'
    if(data.type!='admin')
    type='admin'
    pool.query(
      `insert into maz_ecommerce.user set  email=?, password=? ,role_id=?,supplier_id=?, type='${type}' , created_at = now()`,
        [
        data.email,
        data.password,
        data.role_id,
        data.supplier_id
      ],
      (error, results, fields) => {
        if (error) {
          return callBack(error,null);
        }
        delete data.email;
        delete data.password;
        delete data.type;
        console.log("results  are ",results)
        pool.query(
          `insert into maz_ecommerce.profile set user_id=${results.insertId}, `+Object.keys(data).map(key => `${key} = ?`).join(", ") +"",
            [
              ...Object.values(data)
          ],
          (error, result, fields) => {
            if (error) {
              console.log(error)
              return callBack(error,null);
            }
            result['user_id']=results.insertId
            return callBack(null,  result);
          }
        );
      }
    );
  },
  getUserByUserEmail: (email, callBack) => {
    pool.query(
      `select * from maz_ecommerce.user as u inner join maz_ecommerce.profile as p on u.id=p.user_id where email = ?`,
      [email],
      (error, results, fields) => {
        if (error) {
          return callBack(error,null);
        }
        return callBack(null, results[0]);
      }
    );
  },
  getRegUserByUserEmail: (email, callBack) => {
    pool.query(
      `select * from maz_ecommerce.user as u inner join maz_ecommerce.profile as p on u.id=p.user_id where email = ? and type=?`,
      [email,'user'],
      (error, results, fields) => {
        if (error) {
          return callBack(error,null);
        }
        
        return callBack(null, results[0]);
      }
    );
  },
  checkGuestUserByEmail: (email, callBack) => {
    pool.query(
      `select * from maz_ecommerce.user where email = ? and type='guest'`,
      [email],
      (error, results, fields) => {
        if (error) {
          return callBack(error,null);
        }
        return callBack(null, results[0]);
      }
    );
  },
  getUserByUserName: (username, callBack) => {
    pool.query(
      `select * from maz_ecommerce.user where user_name = ?`,
      [username],
      (error, results, fields) => {
        if (error) {
          return callBack(error,null);
        }
        return callBack(null, results[0]);
      }
    );
  },
  getUserByUserId: (id, callBack) => {
    pool.query(
      `select * from maz_ecommerce.user inner join maz_ecommerce.profile on maz_ecommerce.user.id=maz_ecommerce.profile.user_id where maz_ecommerce.user.id = ? `,
      [id],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },
  getAllUsers: (callBack) => {
       pool.query(
      `select * from maz_ecommerce.user inner join maz_ecommerce.profile on maz_ecommerce.user.id=maz_ecommerce.profile.user_id`,
        [],
      (error, results, fields) => {
        if (error) {
          return callBack(error,null);
        }
        return callBack(null, results);
      }
    );
  },
  getAllUserProfiles: (callBack) => {
    pool.query(
   `select * from maz_ecommerce.profile`,
     [],
   (error, results, fields) => {
     if (error) {
       return callBack(error,null);
     }
     return callBack(null, results);
   }
 );
},
  updateUserNameByUserId: (id,username, callBack) => {
    pool.query(
      `update maz_ecommerce.user set user_name=? where id =?`,
        [
          username,
          id
      ],
      (error, result, fields) => {
        if (error) {
          return callBack(error,null);
        }
        return callBack(null, result);
      }
    );
    
  },
  updatePasswordByUserId: (data, callBack) => {
    pool.query(
      `update maz_ecommerce.user set password=? where id = ?`,
      [
        data.password,
        data.id
      ],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },
  deleteUserByUserId: (id, callBack) => {
    pool.query(
      `delete from maz_ecommerce.user where id = ?`,
      [id],
      (error, results, fields) => {
        if (error) {
          console.log("error occured "+err)
          return callBack(error,null);
        }
        console.log("results are "+results[0])
        return callBack(null,results[0]);
      }
    );
  },
  updateLoginStatus: (login,status,rememberToken, callBack) => {
    if(login)
    {
    pool.query(
      `update maz_ecommerce.user set last_login=now(),isActive=?,remember_token=? where id = ?`,
      [
        status,
        rememberToken,
        id

      ],
      (error, results, fields) => {
        if (error) {
          console.log("error occured "+err)
          return callBack(error);
        }
        console.log("results are "+results[0])
        return callBack(null);
      }
    );
    }
    else{
      pool.query(
        `insert into maz_ecommerce.user set isActive=?,remember_token=? where id = ?`,
        [
          status,
          rememberToken,
          id
  
        ],
        (error, results, fields) => {
          if (error) {
            console.log("error occured "+err)
            return callBack(error);
          }
          console.log("results are "+results[0])
          return callBack(null);
        }
      );
    }
  },
  sendMail:(msg,body,token,callBack)=>
  {
   
    receivers =  [{
      email: body.email
      },]
  
    tranEmailApi
    .sendTransacEmail({
        sender,
        to:receivers,
        subject: 'Account Credientials for maz_ecommerce',
        textContent: `
       Your Account Credientials for maz_ecommerce are.
        `,
        htmlContent: `
        
        <p>Email:${body.email}</p><p>Password:${body.password}</p>
                `,
        params: {
            role: 'Frontend',
        },
    })
    .then(response=>{
     
        return callBack(null,response);
      }).catch((err)=>{
        console.log(err)
        return callBack(err,null);
      
      })

  },
 
  forgotPassword:(msg,mEmail,token,callBack)=>
  {
    receivers = [ {
      email: mEmail
      },]


    tranEmailApi
    .sendTransacEmail({
        sender,
        to: receivers,
        subject: 'Forgot Password Link',
        textContent: `  Your Link to Change password for Pernia is.`,
        htmlContent: `
        <h1>Click Link to change the Pernia account password </h1>
        <a href="https://www.perniacouture.pk/forgotPassword/${token}">Visit</a>
                `,
        params: {
            role: 'Frontend',
        },
    })
    .then(response=>{
      console.log("tokenn",token)
        return callBack(null,response);
      }).catch((err)=>{  
        return callBack(err,null);   
      })

  },


  activateUserAccount: (id, callBack) => {
    console.log("in activate account")
    pool.query(
      `update maz_ecommerce.user set isVerified=1 where id = ?`,
      [id],
      (error, results, fields) => {
        if (error) {
          return callBack(error,null);
        }
        return callBack(null,results);
      }
    );
  },

updateUserProfileByUserId: (id,data, callBack) => {
  pool.query(
    `update maz_ecommerce.profile set `+Object.keys(data).map(key => `${key} = ?`).join(", ") +" where id =?",
      [
        ...Object.values(data),
        id
    ],
    (error, result, fields) => {
      if (error) {
        return callBack(error,null);
      }
      return callBack(null, result);
    }
  );
},
deleteAllUsers: (callBack) => {
  pool.query(
    `delete from maz_ecommerce.user`,
    [],
    (error, results, fields) => {
      if (error) {
        console.log("error occured "+err)
        return callBack(error,null);
      }
      console.log("results are "+results)
      return callBack(null,results);
    }
  );
},
updatelastlogin: (date,id,callBack) => {
  pool.query(
    `update maz_ecommerce.user set last_login=? where id=?` ,
    [date,id],
    (error, results, fields) => {
      if (error) {
        console.log("error occured "+error)
        return callBack(error,null);
      }
      console.log("results are "+results)
      return callBack(null,results);
    }
  );
}
};