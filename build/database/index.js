"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.query = exports.connection = exports.updateRecord = exports.insertRecord = exports.executeQuery = void 0;
var mysql_1 = __importDefault(require("mysql"));
var Logger_1 = __importDefault(require("../core/Logger"));
var config_1 = require("../config");
var sql = mysql_1.default.createPool({
    host: config_1.db.host,
    user: config_1.db.user,
    password: config_1.db.password,
    database: config_1.db.name,
});
Logger_1.default.info('DBD connection done');
Logger_1.default.info(sql);
// If the Node process ends, close the MySQl connection
process.on('SIGINT', function () {
    Logger_1.default.info('DB Connection Close');
    process.exit(0);
});
var executeQuery = function (query) {
    return new Promise(function (resolve, error) {
        sql.query(query, function (err, res) {
            if (err) {
                error(err);
            }
            resolve(res);
        });
    });
};
exports.executeQuery = executeQuery;
var insertRecord = function (tableName, obj) {
    return new Promise(function (resolve, error) {
        sql.query("INSERT INTO ".concat(tableName, " SET ?"), obj, function (err, res) {
            if (err) {
                error(err);
            }
            resolve(__assign({ id: res.insertId }, obj));
        });
    });
};
exports.insertRecord = insertRecord;
var updateRecord = function (query, obj) {
    return new Promise(function (resolve, error) {
        sql.query(query, obj, function (err, res) {
            if (err) {
                error(err);
            }
            resolve(res);
        });
    });
};
exports.updateRecord = updateRecord;
var connection = function () {
    return new Promise(function (resolve, reject) {
        sql.getConnection(function (err, connection) {
            if (err)
                reject(err);
            console.log('MySQL pool connected: threadId ' + connection.threadId);
            var query = function (sql, binding) {
                return new Promise(function (resolve, reject) {
                    connection.query(sql, binding, function (err, result) {
                        if (err)
                            reject(err);
                        resolve(result);
                    });
                });
            };
            var release = function () {
                return new Promise(function (resolve, reject) {
                    if (err)
                        reject(err);
                    console.log('MySQL pool released: threadId ' + connection.threadId);
                    resolve(connection.release());
                });
            };
            resolve({ query: query, release: release });
        });
    });
};
exports.connection = connection;
var query = function (sq, binding) {
    return new Promise(function (resolve, reject) {
        sql.query(sq, binding, function (err, result, fields) {
            if (err)
                reject(err);
            resolve(result);
        });
    });
};
exports.query = query;
exports.default = { sql: sql, connection: exports.connection, query: exports.query };
//# sourceMappingURL=index.js.map