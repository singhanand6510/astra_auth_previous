import { clerkMiddleware } from "@clerk/nextjs/server";
export default clerkMiddleware();
export var config = {
    matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
