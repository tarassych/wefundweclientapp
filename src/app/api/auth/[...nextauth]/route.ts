import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  pages: {
    signIn: "/auth/signin",
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        try {
          await dbConnect();
          // Check if user already exists
          const existingUser = await User.findOne({ email: user.email });
          if (!existingUser) {
            // Create new user
            const newUser = new User({
              email: user.email,
              name: user.name,
              image: user.image,
              isVerified: false, // Will be verified through email
            });
            await newUser.save();
            console.log('New user created:', newUser.email);
          } else {
            console.log('Existing user signed in:', existingUser.email);
          }
          return true;
        } catch (error) {
          console.error('Error during sign in:', error);
          return false;
        }
      }
      return true;
    },
    async session({ session }) {
      if (session.user?.email) {
        try {
          await dbConnect();
          // Get user data from database
          const userData = await User.findOne({ email: session.user.email });
          if (userData) {
            // Return updated session with database user data
            return {
              ...session,
              user: {
                ...session.user,
                id: userData._id.toString(),
                isVerified: userData.isVerified,
                name: userData.name || session.user.name || "",
                email: userData.email || session.user.email || "",
                image: userData.image || session.user.image || undefined,
              }
            };
          }
        } catch (error) {
          console.error('Error loading user data:', error);
        }
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
  },
});

export { handler as GET, handler as POST }; 