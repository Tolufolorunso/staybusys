import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        const response = await fetch("http://localhost:3005/api/v1/auth/login", {
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
    async jwt({ token, user,account }) {
      if (account && user) {
        token.accessToken = user.token;
        token.id = user._id;
      }
      return {...token, ...user};
    },
    async session({ session, token }) {     
      session.accessToken = token.accessToken;
      session.refreshToken = token.refreshToken;
      session.accessTokenExpires = token.accessTokenExpires;
      session.user.completed = token.completed
      return session;
    },
  },
});
