const app = require("./app");

const port = app.get("port");

app.listen(port, () => {
    console.log(`running on port ${port}`);
    console.log(`------------------------------`);
});