import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"

const handler = NextAuth({

    // Providers for oAuth
  providers: [
    
    // Added oAuth provider for Google Authentication
    GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID ?? "",
        clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? ""
    })

    
  ]
})

export { handler as GET, handler as POST }