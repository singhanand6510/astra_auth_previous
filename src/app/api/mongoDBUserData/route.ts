import { NextApiRequest, NextApiResponse } from "next"
// import { withAuth, getAuth } from "@clerk/nextjs/server";
import { getAuth } from "@clerk/nextjs/server"
import { getUserById } from "@/lib/database/actions/user.actions"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { userId } = getAuth(req)
    if (!userId) {
      return res.status(401).json({ error: "User not authenticated" })
    }

    const user = await getUserById(userId)
    if (!user) {
      return res.status(404).json({ error: "User not found" })
    }

    res.status(200).json(user)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Failed to retrieve user data" })
  }
}
// TODO: ask open_ai const this finction, an export default with name'fechedUser' so that it can be used in any other components as reusable function.
