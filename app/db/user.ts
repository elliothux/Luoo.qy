import * as path from "path";
import Nedb = require("nedb");
import { DataStoreOptions } from "nedb";
import { insert, find, isExist, findOne } from "./utils";

const userDB: Nedb = new Nedb({
    filename: path.join(__dirname, "../../static/db/user"),
    autoload: true
} as DataStoreOptions);


