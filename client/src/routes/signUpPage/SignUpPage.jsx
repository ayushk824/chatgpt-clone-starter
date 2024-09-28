import { SignUp } from '@clerk/clerk-react'
import './signUp.css'

const SignUpPage = () => {
  return (
    <div className='signOut'> <SignUp path="/sign-up" signInUrl='/sign-in'/></div>
  )
}

export default SignUpPage