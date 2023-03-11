const pool = require("../../config/database");

module.exports = {
  addRole: (data) => {
    return new Promise((resolve,reject)=>
    {
      pool.query(
        `insert into maz_ecommerce.roles set role=?`,
          [
          data.role,
         
        ],
        (error, results, fields) => {
          if (error) {
            reject ({err:error})
            console.log(error)
          }
          resolve ({results:results})
        }
      );

    })
  },

  
  getAllRoles: (callBack) => {
    pool.query(
      `select * from maz_ecommerce.roles`,
      [],
      (error, results, fields) => {
        if (error) {
          return callBack(error,null);
        }
        return callBack(null, results);
      }
    );
  },
  getRoleById: (id, callBack) => {
    pool.query(
      `select id , name,address,email,phone,description from maz_ecommerce.roles where id = ?`,
      [id],
      (error, results, fields) => {
        if (error) {
          return callBack(error,null);
        }
        return callBack(null, results[0]);
      }
    );
  },
 



  updateRoleById: (id,data, callBack) => {
    pool.query(
      `update maz_ecommerce.roles set `+Object.keys(data).map(key => `${key} = ?`).join(", ") +" where id =?",
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
  deleteRoleById: (id, callBack) => {
    pool.query(
      `delete from maz_ecommerce.roles where id = ?`,
      [id],
      (error, results, fields) => {
        if (error) {
          console.log("error occured "+err)
          return callBack(error,null);
        }
        console.log("results are "+results[0])
        return callBack(null,results);
      }
    );
  },
  deleteAllRoles: (callBack) => {
    pool.query(
      `delete from maz_ecommerce.roles`,
      [],
      (error, results, fields) => {
        if (error) {
          console.log("error occured "+err)
          return callBack(error,null);
        }
        console.log("results are "+results[0])
        return callBack(null,results);
      }
    );
  },

};