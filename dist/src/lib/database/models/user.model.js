import { Schema, model, models } from "mongoose";
var UserSchema = new Schema({
    clerkId: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    username: {
        type: String,
        unique: true,
    },
    photo: {
        type: String,
        required: true,
    },
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    planId: {
        type: Number,
        default: 1,
    },
    creditBalance: {
        type: Number,
        default: 3,
    },
});
var User = (models === null || models === void 0 ? void 0 : models.User) || model("User", UserSchema);
export default User;
// import { Schema, model, models, Document } from "mongoose"
// interface IUser extends Document {
//   clerkId: string
//   email: string
//   username?: string
//   photo: string
//   firstName?: string
//   lastName?: string
//   planId?: number
//   creditBalance?: number
// }
// const UserSchema = new Schema<IUser>(
//   {
//     clerkId: { type: String, required: true, unique: true },
//     email: { type: String, required: true, unique: true },
//     username: { type: String, unique: true },
//     photo: { type: String, required: true },
//     firstName: { type: String },
//     lastName: { type: String },
//     planId: { type: Number, default: 1 },
//     creditBalance: { type: Number, default: 3 },
//   }
//   // {
//   //   collectionOptions: {
//   //     vector: {
//   //       size: 1536,
//   //       function: "cosine",
//   //     },
//   //   },
//   // }
// )
// const User = models.User || model<IUser>("User", UserSchema)
// export default User
