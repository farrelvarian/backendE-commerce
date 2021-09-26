const connection = require('../configs/db')

const paginationPayment = (numPerPage, page,id) => {
  let paramId = "";
  if(id){paramId = `WHERE user_id = '${id}'`;}
  console.log(paramId);
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT count(*) as numRows FROM payments ${paramId} `,
      (error, result) => {
        if (!error) {
          resolve(result);
        } else {
          reject(error);
        }
      }
    );
  });
};

const getAllPayment = (field, sort, limit) => {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT payments.id,payments.user_id,payments.createdAt,payments.total,users.name FROM payments INNER JOIN users ON payments.user_id=users.id  ORDER BY payments.${field} ${sort} LIMIT ${limit} `,
      (error, result) => {
        if (!error) {
          resolve(result);
        } else {
          reject(error);
        }
      }
    );
  });
};

const getPayment = (id, field, sort, limit) => {

  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT payments.id,payments.user_id,payments.createdAt,payments.total,users.name FROM payments INNER JOIN users ON payments.user_id=users.id WHERE user_id = '${id}' ORDER BY payments.${field} ${sort} LIMIT ${limit}`,
      (error, result) => {
        if (!error) {
          resolve(result);
        } else {
          reject(error);
        }
      }
    );
  });
};

const insertPayment = (data) => {
  return new Promise((resolve, reject) => {
    connection.query('INSERT INTO payments SET ?', data, (error, result) => {
      if (!error) {
        resolve(result)
      } else {
        reject(error)
      }
    })
  })
}

const updatePayment = (id, data) => {
  return new Promise((resolve, reject) => {
    connection.query(
      'UPDATE payments SET ? WHERE id = ?', [data, id],
      (error, result) => {
        if (!error) {
          resolve(result)
        } else {
          reject(error)
        }
      }
    )
  })
}

const deletePayment = (id) => {
  return new Promise((resolve, reject) => {
    connection.query(
      'DELETE FROM Payments WHERE id = ?',
      id,
      (error, result) => {
        if (!error) {
          resolve(result)
        } else {
          reject(error)
        }
      }
    )
  })
}

module.exports = {
  paginationPayment,
  getAllPayment,
  getPayment,
  insertPayment,
  updatePayment,
  deletePayment
}
