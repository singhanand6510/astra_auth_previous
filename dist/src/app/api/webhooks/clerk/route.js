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
import * as uuid from "uuid";
// import { v4 as uuidv4 } from 'uuid';
import { createUser, deleteUser, updateUser } from "@/lib/database/actions/user.actions";
import { clerkClient } from "@clerk/nextjs/server";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { Webhook } from "svix";
var uuidv4 = uuid.v4;
export function POST(req) {
    return __awaiter(this, void 0, void 0, function () {
        var WEBHOOK_SECRET, headerPayload, svix_id, svix_timestamp, svix_signature, payload, body, wh, evt, id, eventType, _a, email_addresses, image_url, first_name, last_name, username, user, newUser, error_1, _b, image_url, first_name, last_name, username, user, updatedUser, error_2, deletedUser, error_3;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;
                    if (!WEBHOOK_SECRET) {
                        throw new Error("Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local");
                    }
                    headerPayload = headers();
                    svix_id = headerPayload.get("svix-id");
                    svix_timestamp = headerPayload.get("svix-timestamp");
                    svix_signature = headerPayload.get("svix-signature");
                    if (!svix_id || !svix_timestamp || !svix_signature) {
                        return [2 /*return*/, new Response("Error occurred -- no svix headers", { status: 400 })];
                    }
                    return [4 /*yield*/, req.json()];
                case 1:
                    payload = _c.sent();
                    body = JSON.stringify(payload);
                    wh = new Webhook(WEBHOOK_SECRET);
                    try {
                        evt = wh.verify(body, {
                            "svix-id": svix_id,
                            "svix-timestamp": svix_timestamp,
                            "svix-signature": svix_signature,
                        });
                    }
                    catch (err) {
                        console.error("Error verifying webhook:", err);
                        return [2 /*return*/, new Response("Error occurred", { status: 400 })];
                    }
                    id = evt.data.id;
                    eventType = evt.type;
                    if (!(eventType === "user.created")) return [3 /*break*/, 6];
                    _a = evt.data, email_addresses = _a.email_addresses, image_url = _a.image_url, first_name = _a.first_name, last_name = _a.last_name, username = _a.username;
                    _c.label = 2;
                case 2:
                    _c.trys.push([2, 5, , 6]);
                    user = {
                        _id: uuidv4(), // UUID for _id
                        clerkId: id,
                        email: email_addresses[0].email_address,
                        username: username || "",
                        firstName: first_name || "",
                        lastName: last_name || "",
                        photo: image_url,
                        createdAt: new Date(), // Optional creation date
                    };
                    return [4 /*yield*/, createUser(user)];
                case 3:
                    newUser = _c.sent();
                    console.log("User created:", newUser);
                    return [4 /*yield*/, clerkClient.users.updateUserMetadata(id, {
                            publicMetadata: {
                                userId: newUser._id,
                            },
                        })];
                case 4:
                    _c.sent();
                    return [2 /*return*/, NextResponse.json({ message: "New user created", user: newUser })];
                case 5:
                    error_1 = _c.sent();
                    console.error("Error creating user in AstraDB:", error_1.message);
                    return [2 /*return*/, NextResponse.json({ success: false, message: error_1.message }, { status: 500 })];
                case 6:
                    if (!(eventType === "user.updated")) return [3 /*break*/, 10];
                    _b = evt.data, image_url = _b.image_url, first_name = _b.first_name, last_name = _b.last_name, username = _b.username;
                    _c.label = 7;
                case 7:
                    _c.trys.push([7, 9, , 10]);
                    user = {
                        firstName: first_name || "",
                        lastName: last_name || "",
                        username: username || "",
                        photo: image_url,
                    };
                    return [4 /*yield*/, updateUser(id, user)];
                case 8:
                    updatedUser = _c.sent();
                    return [2 /*return*/, NextResponse.json({ message: "User updated", user: updatedUser })];
                case 9:
                    error_2 = _c.sent();
                    console.error("Error updating user in AstraDB:", error_2.message);
                    return [2 /*return*/, NextResponse.json({ success: false, message: error_2.message }, { status: 500 })];
                case 10:
                    if (!(eventType === "user.deleted")) return [3 /*break*/, 14];
                    _c.label = 11;
                case 11:
                    _c.trys.push([11, 13, , 14]);
                    return [4 /*yield*/, deleteUser(id)];
                case 12:
                    deletedUser = _c.sent();
                    return [2 /*return*/, NextResponse.json({ message: "User deleted", user: deletedUser })];
                case 13:
                    error_3 = _c.sent();
                    console.error("Error deleting user in AstraDB:", error_3.message);
                    return [2 /*return*/, NextResponse.json({ success: false, message: error_3.message }, { status: 500 })];
                case 14: return [2 /*return*/, new Response("", { status: 200 })];
            }
        });
    });
}
