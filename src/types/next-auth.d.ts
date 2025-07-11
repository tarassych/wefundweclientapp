declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      image?: string;
      isVerified: boolean;
    };
  }

  interface User {
    id: string;
    name: string;
    email: string;
    image?: string;
    isVerified: boolean;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
  }
} 