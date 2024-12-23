// signup component

'use client'

import { useState } from 'react'
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Mail, Lock, Loader2 } from 'lucide-react'
import { signUp, signIn } from "@/lib/auth-client"
import { useRouter } from 'next/navigation'

export default function AuthComponent() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isSignUp, setIsSignUp] = useState(true)
  const router = useRouter()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsLoading(true)
    setError(null)

    const formData = new FormData(event.currentTarget)
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    try {
      if (isSignUp) {
        const { error: signUpError } = await signUp.email({
          email,
          password,
          name: email.split('@')[0], // Using part of email as name
        })

        if (signUpError) {
          setError(signUpError.message || 'An error occurred during signup')
          setIsLoading(false)
          return
        }
      } else {
        const { error: signInError } = await signIn.email({
          email,
          password,
        })

        if (signInError) {
          setError(signInError.message || 'Invalid email or password')
          setIsLoading(false)
          return
        }
      }

      // Redirect to panel on success
      router.push('/panel')
    } catch (err) {
      setError(`An error occurred during ${isSignUp ? 'signup' : 'signin'}. Please try again.`)
      setIsLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="flex flex-col items-center">
        <div className="relative group">
          <div className="absolute -top-2 -left-2 w-full h-full bg-zinc-800 border border-zinc-700 transition-transform group-hover:-translate-x-1"></div>
          <div className="absolute -top-1 -left-1 w-full h-full bg-zinc-850 border border-zinc-700 transition-transform group-hover:-translate-x-0.5"></div>
          <Card className="relative w-full min-w-[400px] max-w-3xl bg-zinc-900 border-zinc-800 shadow-lg rounded-none transition-transform">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold text-center text-white">
                {isSignUp ? 'Sign up' : 'Sign in'}
              </CardTitle>
              <CardDescription className="text-center text-zinc-400">
                {isSignUp ? 'Create an account to get started' : 'Welcome back! Sign in to continue'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-white">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-500" />
                      <Input 
                        id="email"
                        name="email"
                        placeholder="m@example.com" 
                        type="email" 
                        required
                        className="pl-10 bg-zinc-800 border-zinc-700 text-white placeholder-zinc-500 focus:ring-[hsl(351.3,94.5%,71.4%,0.3)] focus:border-[hsl(351.3,94.5%,71.4%,0.5)] rounded-none"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-white">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-500" />
                      <Input 
                        id="password"
                        name="password"
                        type="password" 
                        required
                        className="pl-10 bg-zinc-800 border-zinc-700 text-white placeholder-zinc-500 focus:ring-[hsl(351.3,94.5%,71.4%,0.3)] focus:border-[hsl(351.3,94.5%,71.4%,0.5)] rounded-none"
                      />
                    </div>
                  </div>
                  {error && (
                    <div className="text-[hsl(351.3,94.5%,71.4%)] text-sm mt-2">
                      {error}
                    </div>
                  )}
                </div>
                <CardFooter className="flex flex-col items-center justify-center mt-6 p-0 space-y-4">
                  <Button 
                    type="submit" 
                    className={cn(
                      "w-full bg-[hsl(351.3,94.5%,71.4%,0.1)] text-[hsl(351.3,94.5%,71.4%)] border border-[hsl(351.3,94.5%,71.4%,0.2)]",
                      "hover:bg-[hsl(351.3,94.5%,71.4%,0.2)] hover:border-[hsl(351.3,94.5%,71.4%,0.3)]",
                      "focus:ring-2 focus:ring-[hsl(351.3,94.5%,71.4%,0.5)] focus:ring-offset-2 focus:ring-offset-zinc-900",
                      "transition-all duration-200 ease-in-out"
                    )}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Please wait
                      </>
                    ) : (
                      isSignUp ? 'Sign up' : 'Sign in'
                    )}
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    className="text-zinc-400 hover:text-white"
                    onClick={() => {
                      setIsSignUp(!isSignUp)
                      setError(null)
                    }}
                  >
                    {isSignUp ? 'Already have an account? Sign in' : "Don't have an account? Sign up"}
                  </Button>
                </CardFooter>
              </form>
            </CardContent>
          </Card>
        </div>
        <div className="mt-6 text-xs text-zinc-600 text-center space-y-1">
          <p>Auth provided by better-auth v1.0</p>
          <p>Powered by wadedesignco</p>
        </div>
      </div>
    </div>
  )
}

