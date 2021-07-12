const connection = require('../configs/db')

const getAllPayment = () => {
  return new Promise((resolve, reject) => {
    connection.query('SELECT * FROM payments', (error, result) => {
      if (!error) {
        resolve(result)
      } else {
        reject(error)
      }
    })
  })
}

const getPayment = (id) => {
  return new Promise((resolve, reject) => {
    connection.query(
      'SELECT * FROM payments  WHERE id = ?',
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
  getAllPayment,
  getPayment,
  insertPayment,
  updatePayment,
  deletePayment
}
