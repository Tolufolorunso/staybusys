import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const createOptions = (req) => ({
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        const url = process.env.API_URL + "/api/v1/auth/login";
        const response = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: credentials.email, password: credentials.password }),
        });

        const user = await response.json();
        if (user.status) {
          return { ...user.user, token: user.token };
        } else {
          throw new Error(user.message);
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      if (req.url === "/api/auth/session?update") {
        const url = process.env.API_URL + "/api/v1/users/me";
        const response = await fetch(url, {
          method: "GET",
          headers: { authorization: `Bearer ${token.accessToken}` },
        });
        const updatedProfile = await response.json();
        return { ...token, ...updatedProfile.user, hello: "hello there" };
      }
      if (account && user) {
        token.accessToken = user.token;
        token.id = user._id;
      }

      console.log(41, user);

      return { ...token, ...user };
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.refreshToken = token.refreshToken;
      session.accessTokenExpires = token.accessTokenExpires;
      session.user = { ...token };
      return session;
    },
  },
});

export default async (req, res) => {
  return NextAuth(req, res, createOptions(req));
};
