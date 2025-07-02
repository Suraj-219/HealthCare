import React from 'react'

const AuthLayout = ( {children}) => {
  return (
    <div className='h-screen flex items-center justify-center bg-gray-900 overflow-hidden '>
      {children}
    </div>
  )
}

export default AuthLayout
