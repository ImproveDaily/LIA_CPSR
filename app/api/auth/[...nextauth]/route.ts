import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import { compare } from "bcryptjs";
import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface User {
    username: string;
    role: string;
  }
  
  interface Session {
    user: {
      username: string;
      role: string;
    } & DefaultSession["user"]
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    username: string;
    role: string;
  }
}

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Gebruikersnaam", type: "text" },
        password: { label: "Wachtwoord", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          throw new Error("Gebruikersnaam en wachtwoord zijn verplicht");
        }

        const user = await prisma.user.findFirst({
          where: {
            username: credentials.username,
          },
        });

        if (!user) {
          throw new Error("Gebruiker niet gevonden");
        }

        const isValid = await compare(credentials.password, user.password);

        if (!isValid) {
          throw new Error("Ongeldig wachtwoord");
        }

        return {
          id: user.id,
          username: user.username,
          role: user.role,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.username = user.username;
      }
      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.role = token.role;
        session.user.username = token.username;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 dagen
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
});

export { handler as GET, handler as POST };

export const dynamic = 'force-static'
export const revalidate = 0 