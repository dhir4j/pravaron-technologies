import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import db from "./database";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "applicant-login",
      name: "Applicant Login",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password required");
        }

        const user = db.prepare('SELECT * FROM users WHERE email = ?').get(credentials.email) as any;
        
        if (!user) {
          throw new Error("No user found with this email");
        }

        if (!user.is_verified) {
          throw new Error("Please verify your email first");
        }

        const isValid = await bcrypt.compare(credentials.password, user.password);
        
        if (!isValid) {
          throw new Error("Invalid password");
        }

        return {
          id: user.id.toString(),
          email: user.email,
          name: user.full_name,
          role: "applicant"
        };
      }
    }),
    CredentialsProvider({
      id: "admin-login",
      name: "Admin Login",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password required");
        }

        const admin = db.prepare('SELECT * FROM admins WHERE email = ?').get(credentials.email) as any;
        
        if (!admin) {
          throw new Error("No admin found with this email");
        }

        const isValid = await bcrypt.compare(credentials.password, admin.password);
        
        if (!isValid) {
          throw new Error("Invalid password");
        }

        return {
          id: admin.id.toString(),
          email: admin.email,
          name: admin.full_name,
          role: "admin"
        };
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).role = token.role;
        (session.user as any).id = token.id;
      }
      return session;
    }
  },
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET || "pravaron-secret-key-change-in-production",
};
