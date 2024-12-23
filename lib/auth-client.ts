import { createAuthClient } from "better-auth/react"

export const authClient = createAuthClient({
    // If your auth server is on the same domain, you don't need to specify baseURL
    // baseURL: "http://localhost:3000"
})

// Export commonly used methods for convenience
export const { 
    signIn, 
    signUp, 
    signOut, 
    useSession 
} = authClient; 