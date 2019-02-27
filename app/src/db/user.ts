import * as path from "path";
import { DataStoreOptions } from "nedb";
import {insert, find, isExist, findOne, getDB} from "./utils";
import Nedb = require("nedb");

const userDB: Nedb = getDB('user');
