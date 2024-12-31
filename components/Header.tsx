'use client'
import { useUser, SignedOut, SignInButton, SignedIn, UserButton} from "@clerk/nextjs";

function Header() {
  const { user } = useUser()
  return (
    <div className="flex items-center justify-between p-5">
      {user && (
        <h1 className="text-2xl">{user.firstName}{`'s`} Space</h1>
      )}

      {/* Bread Crumbs */}

      <div>
        <SignedOut>
          <SignInButton />
        </SignedOut>

        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </div>
  )
}

export default Header