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
  addGuestUser: (data, callBack) => {
    console.log("email",data.email)
    pool.query(
      `insert into maz_ecommerce.user set email=?, type='guest' , created_at = now()`,
        [
        data.email
      ],
      (error, results, fields) => {
        if (error) {
          console.log("eoooooooo",error)
          return callBack(error,null);
        }
        delete data.email;
        delete data.user_name;
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
              console.log("erooottoo",error)
              return callBack(error,null);
            }
            result['user_id']=results.insertId
            return callBack(null, result);
          }
        );
      }
    );
  },
  updateGuestUser: (data,user_id, callBack) => {   
    //update maz_ecommerce.profile set `+Object.keys(data).map(key => `${key} = ?`).join(", ") +"",
   
        pool.query(
          `update maz_ecommerce.profile set first_name=? , last_name=? where user_id=?`,
            [
              data.first_name,
              data.last_name,
              user_id
            ],
          (error, result, fields) => {
            if (error) {
              console.log("erooottoo",error)
              return callBack(error,null);
            }
            result['user_id']=user_id
            
            return callBack(null, result);
          }
        );
  },
  sendMail:(invoice)=>
  {
    console.log("sending mail");
    return new Promise((resolve, reject)=>
    {
      const mailgun = require("mailgun-js");
      const DOMAIN = "sandbox4c656a09d3e34e0db52944f28a922d5f.mailgun.org";
      const mg = mailgun({
        apiKey: "cb29bdfc53d33a8895033abb2c1ea31b-45f7aa85-25443ef7",
        domain: DOMAIN,
      });
      const data = {
        from: "noreply@ecommerce.pk",
        to: 'faizanafridibwp@gmail.com',
        subject: "Email Verification",
        html:`<h1>sggsgsy</h1>`,
        attachment:new mg.Attachment({data: Buffer.from(invoice,'base64'),filename:"invoice.pdf"})
      };
      mg.messages().send(data, (err,result)=> {
        if (err) {
          console.log("error",err)
          return reject(err)
        }
        return resolve(result)
        
      });
    })
  },
 
  sendOrderDetails:(data,eemail,orderId,products,callBack)=>
  {
    console.log("to",eemail)
    receivers =  [{
      email: eemail
      },]
  
    tranEmailApi
    .sendTransacEmail({
        sender,
        to:receivers,
        subject: 'Your Order Details on Pernia',
        textContent: `
        Your Order Details on Pernia'
        `,
        htmlContent: `
        <h2>Order Id: ${orderId}</h2>
        <h2>Total Items:${data.orderInfo.total_items}</h2>
        <h2>Total Amount:${data.orderInfo.total_amount}</h2>
        <h2>Products Details</h2>
        ${products.map(it=>(
          `<div>
          <p>Product Id:${it.product_id}</p>
          <p>Product Name:${it.product_name}</p>
          <p>Variant Name:${it.product_variant_name}</p>
          <p>Quantity:${it.quantity}</p>
          <p>Price:${it.price}</p>
          </div>`
          
        ))}
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


  addUserOrder: (data) => {
    return new Promise((resolve,reject)=>
    {
    pool.query(
      `insert into maz_ecommerce.order set user_id=?, total_amount=? , shipping_id=? , billing_id=?, date = now(),total_items=?,delivery_method=?, payment_method=?, fulfillment_status='unfulfilled',payment_status='pending'`,
        [
        data.user_id,
        data.total_amount,
        data.shipping_id,
        data.billing_id,
        data.total_items,
        data.delivery_method,
        data.payment_method
      ],
      (error, results, fields) => {
        if (error) {
          return reject(error);
        }
        return resolve(results);
      }
    );
  })
  },
  addUserAddress: (user_id,data,type) => {
    return new Promise((resolve,reject)=>
    {
    pool.query(
      `insert into maz_ecommerce.address set user_id=${user_id}, user_address=?, type='${type.toString()}', name=?, city=?, used_at = now(), province=?, postal_code=?, country=?`,
        [
        data.user_address,
        data.name,
        data.city,
        data.province,
        data.postal_code,
        data.country
      ],
      (error, results, fields) => {
        if (error) {
          console.log("error",error)
          return reject(error);
        }
        return resolve(results);
      }
    );
  })
  },
  updateUserAddressByAddressId: (id) => {
    return new Promise((resolve,reject)=>
    {
      pool.query(
        `update maz_ecommerce.address set used_at=now() where id =?`,
          [
            id
        ],
        (error, result, fields) => {
          if (error) {
            return reject(error);
          }
          return resolve(result);
        }
      );

    })
  },
  addOrderDetails: (products,order_id) => {
    return new Promise((resolve ,reject)=>
    {

    let sql = 'INSERT INTO maz_ecommerce.order_details (order_id,product_id,product_variant_id,quantity,price,supplier_id,product_name,product_variant_name,path) values '
    products.forEach(product => {
      sql += `(${order_id} ,${product.product_id}, ${product.product_variant_id} , ${product.quantity} , ${product.price}, ${product.supplier_id}, "${product.product_name}", "${product.product_variant_name}" , "${product.path}" ),`
    })
    sql = sql.slice(0,-1)
    pool.query(
      sql,
      (error, results, fields) => {
        if (error) {
          return reject(error);
        }
        results['order_id']=order_id
        return resolve(results);
      }
    );
  })
  },
  getAllOrders: (callBack) => {
    
    pool.query(
      'SELECT * FROM maz_ecommerce.order',
      [],
      (error, results, fields) => {
        if (error) {
          return callBack(error,null);
        }
        return callBack(null, results);
      }
    );
  },
  getAllOrdersByUserId: (id,callBack) => {
    
    pool.query(
      'SELECT * from maz_ecommerce.order where user_id =?',
      [id],
      (error, results, fields) => {
        if (error) {
          return callBack(error,null);
        }
        return callBack(null, results);
      }
    );
  },
  
  getOrderById: (id, callBack) => {
    pool.query(
`select o.*,s.*,
 GROUP_CONCAT( distinct 
   CONCAT(COALESCE( od.product_variant_id,"null"),",",od.product_id,",",od.product_name,",",COALESCE( od.product_variant_name,"null"),",",od.price,",",od.quantity,",",od.path)
   SEPARATOR ":" ) AS products from maz_ecommerce.order_details as od
left outer join maz_ecommerce.order as o on od.order_id=o.id
inner join maz_ecommerce.address as s on o.shipping_id=s.id
where o.id = ? GROUP BY o.id`,
      [id],
      (error, results, fields) => {
        if (error) {
          return callBack(error,null);
        }
        return callBack(null, results);
      }
    );
  },
  getOrderByMonth: (callBack) => {
    pool.query(
`SELECT date,id,total_items FROM maz_ecommerce.order where  date >= DATE_SUB(CURDATE(), INTERVAL 1 MONTH)`,
      
      (error, results) => {
        if (error) {
          return callBack(error,null);
        }
        return callBack(null, results);
      }
    );
  },
  getOrderByPrevMonth: (callBack) => {
    pool.query(
`SELECT * FROM  maz_ecommerce.order WHERE MONTH( DATE ) = MONTH( DATE_SUB(CURDATE(),INTERVAL 1 MONTH )) 
AND 
YEAR( DATE ) = YEAR( DATE_SUB(CURDATE( ),INTERVAL 1 MONTH ))`,
      
      (error, results) => {
        if (error) {
          return callBack(error,null);
        }
        return callBack(null, results);
      }
    );
  },
  getOrderBycurrWeek: (callBack) => {
    pool.query(
`SELECT * FROM maz_ecommerce.order WHERE WEEKOFYEAR(date)=WEEKOFYEAR(CURDATE())`,
      
      (error, results) => {
        if (error) {
          return callBack(error,null);
        }
        return callBack(null, results);
      }
    );
  },
  getOrderByYear: (callBack) => {
    pool.query(
`select year(date),month(date),sum(total_items)
from maz_ecommerce.order
group by year(date),month(date)
order by year(date),month(date);`,
      
      (error, results) => {
        if (error) {
          return callBack(error,null);
        }
        return callBack(null, results);
      }
    );
  },
  updateOrderById: (id,data, callBack) => {
    pool.query(
      `update maz_ecommerce.order set `+Object.keys(data).map(key => `${key} = ?`).join(", ") +" where id =?",
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
  updateOrderDetailsByOrderId: (id,data, callBack) => {
    pool.query(
      `update maz_ecommerce.order_details set `+Object.keys(data).map(key => `${key} = ?`).join(", ") +" where order_id =?",
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
  deleteOrderById: (id, callBack) => {
    id = parseInt(id)
    pool.query(
      `delete  from maz_ecommerce.order where id = ?`,
      [id],
      (error, results, fields) => {
        if (error) {
          console.log("error occured "+error)
          return callBack(error,null);
        }
        console.log("results are "+results[0])
        return callBack(null,results);
      }
    );
  },
  deleteAllOrders: (callBack) => {
    pool.query(
      `delete from maz_ecommerce.order`,
      [],
      (error, results, fields) => {
        if (error) {
          return callBack(error,null);
        }
        console.log("results are "+results[0])
        return callBack(null,results);
      }
    );
  },

};