let APP_ADDRESS = "localhost"; // 192.168.0.77
//let APP_ADDRESS = "192.168.0.134";
let DB_URI = "mongodb://" + APP_ADDRESS + ":27017/mydb";

if (process.env.MONGO_DB_URI) {
    DB_URI = process.env.MONGO_DB_URI;
}

module.exports = {
    DB_URI,
};