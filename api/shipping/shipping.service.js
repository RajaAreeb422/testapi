const pool = require("../../config/database");

module.exports = {
  addShipping: (data, callBack) => {
    pool.query(
      `insert into maz_ecommerce.shipper set name=? , price=?, category=?,supplier_id=?, cartlimit=?`,
        [
        data.name,
        data.price,
        data.category,
        data.supplier_id,
        data.cartlimit
      ],
      (error, results, fields) => {
        if (error) {
          return callBack(error,null);
        }
        return callBack(null,results);
      }
    );
  },
  getAllShippings: (callBack) => {
    pool.query(
      `select * from maz_ecommerce.shipper`,
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
  getShippingById: (id, callBack) => {
    pool.query(
      `select * from maz_ecommerce.shipper where id = ?`,
      [id],
      (error, results, fields) => {
        if (error) {
          return callBack(error,null);
        }
        return callBack(null, results[0]);
      }
    );
  },
  getShippingByBrandId: (id, callBack) => {
    pool.query(
      `select * from maz_ecommerce.shipper where supplier_id = ?`,
      [id],
      (error, results, fields) => {
        if (error) {
          return callBack(error,null);
        }
        return callBack(null, results);
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

  updateShippingById: (id,data, callBack) => {
    pool.query(
      `update maz_ecommerce.shipper set `+Object.keys(data).map(key => `${key} = ?`).join(", ") +" where id =?",
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
  deleteShippingById: (id, callBack) => {
    pool.query(
      `delete from maz_ecommerce.shipper where id = ?`,
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
  deleteAllShippings: (callBack) => {
    pool.query(
      `delete from maz_ecommerce.shipper`,
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