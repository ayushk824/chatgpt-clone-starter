import { SignIn } from '@clerk/clerk-react'
import './signIn.css'

const SignInPage = () => {
  return (
    <div className='signIn'><SignIn path="/sign-in" signUpUrl='/sign-Up' forceRedirectUrl="/dashboard"/></div>
  )
}

export default SignInPage