import { SignIn } from '@clerk/nextjs'

export default function Page() {
  return <div className='h-screen w-screen flex items-center justify-center top-0 left-0 fixed bg-gray-100'>
  <SignIn />
  </div>
}