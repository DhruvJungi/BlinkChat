import './App.css'
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from '@clerk/react'

function App() {
  return (
    <>
      <h1>MY APP</h1>
      <header>
        <SignedOut>
          <SignInButton  />
          <SignUpButton  />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </header>
    </>
  )
}

export default App