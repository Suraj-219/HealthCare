import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Button } from './ui/button'
import { checkUser } from '@/lib/checkuser'
import { Calendar, CreditCard, ShieldCheck, Stethoscope, User } from 'lucide-react'
import { checkAndAllocateCredits } from '@/actions/credits'
import { Badge } from './ui/badge'

const Header = async () => {

 const user = await checkUser()
 // Removed checkAndAllocateCredits from render to fix Next.js revalidatePath error.
 // If you need to allocate credits, do it in a server action, API route, or user-triggered event, not during render.
// if(user?.role === "PATIENT"){
//   await checkAndAllocateCredits(user)
// }


  return (
    <header className='fixed top-0 w-full bg-background/80 backdrop-blur-md z-10 supports-[backdrop-filter]:bg-background/60 border-b border-gray-200/20'>
      <nav className='container mx-auto px-6 h-20 flex items-center justify-between'>
        <Link href="/" className="flex items-center">
          <Image 
            src="/helthcare.png" 
            alt="HealthMate" 
            width={240} 
            height={72} 
            className='h-20 w-auto object-contain hover:opacity-90 transition-opacity'
            priority
          />
        </Link>

      <div className='flex items-center space-x-2'>


      <SignedIn>

                    {/* Admin Links */}
          {user?.role === "ADMIN" && (
              <Link href="/admin">
                <Button
                  variant="outline"
                  className="hidden md:inline-flex items-center gap-2"
                >
                  <ShieldCheck className="h-4 w-4" />
                  Admin Dashboard
                </Button>
                <Button variant="ghost" className="md:hidden w-10 h-10 p-0">
                  <ShieldCheck className="h-4 w-4" />
                </Button>
              </Link>
            )}

             {/* Doctor Links */}
             {user?.role === "DOCTOR" && (
              <Link href="/doctor">
                <Button
                  variant="outline"
                  className="hidden md:inline-flex items-center gap-2"
                >
                  <Stethoscope className="h-4 w-4" />
                  Doctor Dashboard
                </Button>
                <Button variant="ghost" className="md:hidden w-10 h-10 p-0">
                  <Stethoscope className="h-4 w-4" />
                </Button>
              </Link>
            )}

            {/* Patient Links */}
            {user?.role === "PATIENT" && (
              <Link href="/appointments">
                <Button
                  variant="outline"
                  className="hidden md:inline-flex items-center gap-2"
                >
                  <Calendar className="h-4 w-4" />
                  My Appointments
                </Button>
                <Button variant="ghost" className="md:hidden w-10 h-10 p-0">
                  <Calendar className="h-4 w-4" />
                </Button>
              </Link>
            )}

        {user?.role === "UNASSIGNED" && (
          <Link href="/onboarding">
            <Button variant="outline"
            className="hidden md:inline-flex items-center gap-2"
            >
              <User className='h-4 w-4'>
              </User>
              Complete Profile
            </Button>
            <Button variant="ghost" className='md:hidden w-10 h-10 p-0'>
                <User className="h-4 w-4"></User>
            </Button>
          </Link>
        )}
      </SignedIn>

          
      {(!user || user?.role !== "ADMIN") && (
            <Link href={user?.role === "PATIENT" ? "/pricing" : "/doctor"}>
              <Badge
                variant="outline"
                className="h-9 bg-emerald-900/20 border-emerald-700/30 px-3 py-1 flex items-center gap-2"
              >
                <CreditCard className="h-3.5 w-3.5 text-emerald-400" />
                <span className="text-emerald-400">
                  {user && user.role !== "ADMIN" ? (
                    <>
                      {user.credits}{" "}
                      <span className="hidden md:inline">
                        {user?.role === "PATIENT"
                          ? "Credits"
                          : "Earned Credits"}
                      </span>
                    </>
                  ) : (
                    <>Pricing</>
                  )}
                </span>
              </Badge>
            </Link>
          )}

            <SignedOut>
              <SignInButton>
                <Button variant="secondary" className="cursor-pointer bg-gradient-to-r from-[#fda4af] to-[#fef2f2] hover:from-[#fef2f2] hover:to-[#fda4af] text-white font-bold py-2 px-4 rounded-full transform transition-transform duration-200 hover:scale-110 hover:shadow-lg">Sign In</Button>
              </SignInButton>
              
            </SignedOut>
            <SignedIn>
              <UserButton 
              appearance={{
                elements: {
                  avatarBox: 'h-24 w-24',
                  userButtonPopoverCard: 'shadow-xl',
                  userPreviewMainIdentifier:"font-semibold text-lg",
                },
              }}
              />
            </SignedIn>
      </div>

      </nav>
    </header>
  )
}

export default Header
