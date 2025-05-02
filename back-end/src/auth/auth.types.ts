import type { User } from "@prisma/client";

export interface JwtPayload {
  id: string;
  email: string;
  username: string;
}

