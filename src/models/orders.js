const connection = require('../configs/db')

const getAllOrder = () => {
  return new Promise((resolve, reject) => {
    connection.query('SELECT * FROM orders', (error, result) => {
      if (!error) {
        resolve(result)
      } else {
        reject(error)
      }
    })
  })
}

const getOrder = (id) => {
  return new Promise((resolve, reject) => {
    connection.query(
      'SELECT * FROM orders  WHERE id = ?',
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

const insertOrder = (data) => {
  return new Promise((resolve, reject) => {
    connection.query('INSERT INTO orders SET ?', data, (error, result) => {
      if (!error) {
        resolve(result)
      } else {
        reject(error)
      }
    })
  })
}

const updateOrder = (id, data) => {
  return new Promise((resolve, reject) => {
    connection.query(
      'UPDATE orders SET ? WHERE id = ?', [data, id],
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

const deleteOrder = (id) => {
  return new Promise((resolve, reject) => {
    connection.query('DELETE FROM orders WHERE id = ?', id, (error, result) => {
      if (!error) {
        resolve(result)
      } else {
        reject(error)
      }
    })
  })
}

module.exports = {
  getAllOrder,
  getOrder,
  insertOrder,
  updateOrder,
  deleteOrder
}
