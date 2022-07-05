import express from "express";

const bodyParser = require("body-parser");
const cors = require('cors');
const xmlParser = require('express-xml-bodyparser')
import {registerActionsInExpressApp} from "controllers.ts/Factory"
import "./Controllers/Inventory"
const app = express();

app.use(xmlParser());
app.use(cors())

registerActionsInExpressApp(app);
app.listen(80);