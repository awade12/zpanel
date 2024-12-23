'use client'

import { useSession, signOut } from "@/lib/auth-client"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Loader2 } from "lucide-react"

export default function PanelPage() {
  const { data: session, isPending } = useSession()

  if (isPending) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <Loader2 className="h-8 w-8 animate-spin text-[hsl(351.3,94.5%,71.4%)]" />
      </div>
    )
  }

  if (!session) {
    return null // Will be handled by middleware
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-black p-4">
      <Card className="w-full max-w-2xl bg-zinc-900 border-zinc-800 text-white">
        <CardHeader>
          <CardTitle>Welcome to your Panel</CardTitle>
          <CardDescription className="text-zinc-400">
            You are signed in as {session.user.email}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">Account Details</h3>
              <div className="space-y-2 text-sm text-zinc-400">
                <p>Email: {session.user.email}</p>
                <p>Name: {session.user.name}</p>
                <p>Account created: {session.user.createdAt && new Date(session.user.createdAt).toLocaleDateString()}</p>
              </div>
            </div>
            <Button
              onClick={() => signOut()}
              className="bg-[hsl(351.3,94.5%,71.4%,0.1)] text-[hsl(351.3,94.5%,71.4%)] border border-[hsl(351.3,94.5%,71.4%,0.2)] hover:bg-[hsl(351.3,94.5%,71.4%,0.2)]"
            >
              Sign Out
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}