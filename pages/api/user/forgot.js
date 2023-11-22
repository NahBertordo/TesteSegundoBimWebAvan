import { forgot } from "../../../services/user"

export default function handler(req, res) {
  try {
    const user = forgot(req.body)
    res.status(200).json(newUser)
  } catch (err) {
    res.status(400).json(err.message)
  }
}
