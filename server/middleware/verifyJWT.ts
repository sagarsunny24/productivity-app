import jwt , {  type JwtPayload} from 'jsonwebtoken'

export default function verifyJWT(token:string) {
  const secret = process.env.ACCESS_TOKEN_SECRET!
  const decoded = jwt.verify(token,secret) as JwtPayload
  return decoded.userId
}
