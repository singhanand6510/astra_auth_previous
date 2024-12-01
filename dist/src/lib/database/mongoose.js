var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import mongoose from "mongoose";
import { driver, createAstraUri } from "stargate-mongoose";
export var connectToAstraDb = function () { return __awaiter(void 0, void 0, void 0, function () {
    var uri, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                uri = createAstraUri(process.env.ASTRA_DB_REGION, process.env.ASTRA_DB_APPLICATION_TOKEN, process.env.ASTRA_DB_KEYSPACE, process.env.ASTRA_DB_ID);
                if (!(mongoose.connection.readyState !== 0)) return [3 /*break*/, 2];
                return [4 /*yield*/, mongoose.disconnect()];
            case 1:
                _a.sent();
                console.log("Disconnected previous Mongoose connection.");
                _a.label = 2;
            case 2:
                // Set necessary Mongoose configurations
                mongoose.set("autoCreate", true);
                mongoose.setDriver(driver);
                // Establish the connection to AstraDB
                return [4 /*yield*/, mongoose.connect(uri, {
                        isAstra: true,
                    })];
            case 3:
                // Establish the connection to AstraDB
                _a.sent();
                console.log("Connected to AstraDB successfully.");
                return [3 /*break*/, 5];
            case 4:
                error_1 = _a.sent();
                console.error("Error connecting to AstraDB:", error_1);
                throw error_1;
            case 5: return [2 /*return*/];
        }
    });
}); };
// import mongoose, { Mongoose } from "mongoose"
// const MONGODB_URL = process.env.MONGODB_URL!
// interface MongooseConnection {
//   conn: Mongoose | null
//   promise: Promise<Mongoose> | null
// }
// let cached: MongooseConnection = (global as any).mongoose
// if (!cached) {
//   cached = (global as any).mongoose = {
//     conn: null,
//     promise: null,
//   }
// }
// export const connectToDatabase = async () => {
//   if (cached.conn) return cached.conn
//   if (!MONGODB_URL) throw new Error("MONGODB_URL not Defined")
//   cached.promise =
//     cached.promise ||
//     mongoose.connect(MONGODB_URL, {
//       dbName: "ASK-YT_db",
//       bufferCommands: false,
//       connectTimeoutMS: 30000,
//     })
//   cached.conn = await cached.promise
//   return cached.conn
// }
