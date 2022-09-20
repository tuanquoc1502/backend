const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("./connect");
const fileUpload = require("express-fileupload");
const port = process.env.PORT || 5600; app.use(cors());
let routerProduct = require('./router/productRouter')
let routerAuth = require('./router/authRouter')
app.use(express.json());

app.use(fileUpload({ useTempFiles: true }));

app.use(bodyParser.json({ limit: "50mb" }));app.use(  bodyParser.urlencoded({    limit: "50mb",    extended: true,  }));

app.get('/', (req, res) => {
    res.json('HOME')
})

app.use('/products/v1/', routerProduct);

app.use('/', routerAuth);

db.connect();app.listen(port, () => {  console.log("app running on port " + port);});


