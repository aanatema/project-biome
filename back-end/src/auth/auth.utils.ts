import type { User } from "@prisma/client";

export function sanitizeUser(user: User){
  const { password: _password, ...userWithoutPassword } = user;
  return userWithoutPassword;
}
