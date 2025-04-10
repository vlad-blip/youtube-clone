import NextAuth from "next-auth";
import PostgresAdapter from "@auth/pg-adapter";
import { Pool } from "pg";

import Google from "next-auth/providers/google";

const pool = new Pool({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [Google],
  adapter: PostgresAdapter(pool),
  debug: true,
  session: {
    strategy: "database",
  },
});
