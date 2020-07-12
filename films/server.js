const app = require("./app");

const { DB_URI } = require("./src/config");
const mongoose = require("mongoose");

// Fix deprication warnings, see https://mongoosejs.com/docs/deprecations.html
mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
mongoose.set("useUnifiedTopology", true);

mongoose.connect(DB_URI);

const port = app.get("port");

app.listen(port, () => {
    console.log(`running on port ${port}`);
    console.log(`------------------------------`);
});