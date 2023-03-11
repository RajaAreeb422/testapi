const pool = require("../../config/database");

module.exports = {
  addVehicle: (data, callBack) => {
    pool.query(
      `insert into maz_ecommerce.vehicle set name=? , type=?, model=?, year=?`,
        [
        data.name,
        data.type,
        data.model,
        data.year
      ],
      (error, results, fields) => {
        if (error) {
          return callBack(error,null);
        }
        return callBack(null,results);
      }
    );
  },
  getAllVehicles: (callBack) => {
    pool.query(
      `select * from maz_ecommerce.vehicle`,
      [],
      (error, results, fields) => {
        if (error) {
          return callBack(error,null);
        }
        return callBack(null, results);
      }
    );
  },
  getParentCategories: (callBack) => {
    pool.query(
      `select * from maz_ecommerce.category where maz_ecommerce.category.parent is null`,
      [],
      (error, results, fields) => {
        if (error) {
          return callBack(error,null);
        }
        return callBack(null, results);
      }
    );
  },
  getVehicleById: (id, callBack) => {
    pool.query(
      `select * from maz_ecommerce.vehicle where id = ?`,
      [id],
      (error, results, fields) => {
        if (error) {
          return callBack(error,null);
        }
        return callBack(null, results[0]);
      }
    );
  },
  getCategoryByProductId: (id, callBack) => {
    pool.query(
      `select * from maz_ecommerce.category inner join maz_ecommerce.product on maz_ecommerce.category.id = maz_ecommerce.product.category_id where maz_ecommerce.product.id = ?`,
      [id],
      (error, results, fields) => {
        if (error) {
          return callBack(error,null);
        }
        return callBack(null, results);
      }
    );
  },

  updateVehicleById: (id,data, callBack) => {
    pool.query(
      `update maz_ecommerce.vehicle set `+Object.keys(data).map(key => `${key} = ?`).join(", ") +" where id =?",
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
  deleteVehicleById: (id, callBack) => {
    pool.query(
      `delete from maz_ecommerce.vehicle where id = ?`,
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
  deleteAllVehicles: (callBack) => {
    pool.query(
      `delete from maz_ecommerce.vehicle`,
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

  // uploadVehicleImage: (id, files, callBack) => {
  //   return new Promise((resolve,reject)=>
  //   {
  //     let sql = "INSERT INTO maz_ecommerce.product_images (product_id, path) values ";
  //     files.forEach((file) => {
  //       file.path = file.path.replace("\\", "//");
  //       // file.path = path.join(__dirname,file.path)
  
  //       sql += '("' + id + '","' + file.path + '"),';
  //     });
  //     sql = sql.slice(0, -1);
  //     pool.query(sql, [], (error, results, fields) => {
  //       if (error) {
  //         return reject(error);
  //       }
  //       console.log("image uploaded",results)
  //       return resolve(results);
  //     });
  //   })
    
 
  // },

  uploadVehicleImage: (id, files, callBack) => {
 
    let fPath=files[0];
   
    return new Promise((resolve,reject)=>
    {
      let sql = "UPDATE maz_ecommerce.vehicle set path=? where id=?";
     
    //  files.forEach((file) => {
        fPath.path = fPath.path.replace("\\", "//");
        // file.path = path.join(__dirname,file.path)
  
        console.log('fpath',fPath)
        //sql += '("' + id + '","' + files.path + '"),';
     // sql = sql.slice(0, -1);
      pool.query(sql, [fPath.path,id], 
        (error, results, fields) => {
        if (error) {
          console.log('error',error)
           return reject(error);
        }
        console.log("image uploaded",results)
          return resolve(results);
      });




    })
    
    


 
  },




};