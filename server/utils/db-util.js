const config = require('../../config').database
const mysql = require('mysql')

// 创建数据库连接池
const pool = mysql.createPool({
  host: config.HOST,
  user: config.USERNAME,
  password: config.PASSWORD,
  database: config.DATABASE
})

let query = (sql, values) => {
  return new Promise((resolve, reject) => {
    pool.getConnection(function (err, connection) {
      if (err) {
        return reject(err)
      }
      connection.query(sql, values, function (err, results, fields) {
        if (err) {
          return reject(err)
        }
        resolve(results)
        connection.release()
      })
    })
  })
}

let createTable = (sql) => {
  return query(sql, [])
}

let findDataById = function (table, id) {
  let _sql = "SELECT * FROM ?? WHERE id = ? "
  return query(_sql, [table, id, start, end])
}


let findDataByPage = function (table, keys, start, end) {
  let _sql = "SELECT ?? FROM ??  LIMIT ? , ?"
  return query(_sql, [keys, table, start, end])
}


let insertData = function (table, values) {
  let _sql = "INSERT INTO ?? SET ?"
  return query(_sql, [table, values])
}


let updateData = function (table, values, id) {
  let _sql = "UPDATE ?? SET ? WHERE id = ?"
  return query(_sql, [table, values, id])
}


let deleteDataById = function (table, id) {
  let _sql = "DELETE FROM ?? WHERE id = ?"
  return query(_sql, [table, id])
}


let select = function (table, keys) {
  let _sql = "SELECT ?? FROM ?? "
  return query(_sql, [keys, table])
}

let count = function (table) {
  let _sql = "SELECT COUNT(*) AS total_count FROM ?? "
  return query(_sql, [table])
}

module.exports = {
  query,
  createTable,
  findDataById,
  findDataByPage,
  deleteDataById,
  insertData,
  updateData,
  select,
  count,
}
