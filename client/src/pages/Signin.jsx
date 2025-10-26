import React from 'react'
import { assets } from '../assets/assets'
import { Star } from 'lucide-react'
import { SignIn } from '@clerk/clerk-react'

const Signin = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col lg:flex-row" style={{ fontFamily: 'Outfit, sans-serif' }}>
      {/* Background Image */}
      <div 
        className="absolute inset-0 w-full h-full"
        style={{
          background: `url(${assets.bgImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      />
      
      {/* Left Side - Content */}
      <div className="flex-1 relative z-10 flex flex-col justify-between p-6 lg:p-16">
        {/* Logo - Top Left */}
        <div className="flex items-center gap-2 mb-8 lg:mb-0">
          <img src={assets.favicon} alt="Linkora" className="h-8 lg:h-12 w-auto" />
          <span className="text-xl lg:text-2xl font-bold text-indigo-600">Linkora</span>
        </div>

        {/* Main Content - Centered */}
        <div className="flex-1 flex flex-col justify-center max-w-2xl">
          {/* User Testimonials with Stars and Text in Column */}
          <div className="flex items-center gap-3 mb-8">
            <img src={assets.group_users} alt="Users" className="h-8 lg:h-10 w-auto" />
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i}
                    className="w-4 h-4 lg:w-5 lg:h-5" 
                    style={{ 
                      fill: '#FD9A00',
                      color: '#FD9A00'
                    }} 
                  />
                ))}
              </div>
              <div 
                className="text-sm lg:text-base"
                style={{
                  fontFamily: 'Outfit',
                  fontWeight: 500,
                  color: '#1C398E'
                }}
              >
                Used by 12k+ developers
              </div>
            </div>
          </div>

          {/* Main Heading */}
          <h1 
            className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-6 leading-tight"
            style={{
              fontFamily: 'Outfit',
              background: 'linear-gradient(90deg, #1E1A4D 0%, #372AAC 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}
          >
            More than just friends truly connect
          </h1>

          {/* Subtitle */}
          <p 
            className="text-lg sm:text-xl lg:text-2xl xl:text-3xl leading-relaxed"
            style={{
              fontFamily: 'Outfit',
              fontWeight: 400,
              color: '#312C85'
            }}
          >
            connect with global community<br />
            on Linkora.
          </p>
        </div>

        {/* Spacer for mobile */}
        <div className="lg:hidden h-8"></div>
      </div>

      {/* Right Side - Sign In Form */}
      <div className="flex-1 relative z-10 flex items-center justify-center p-6 lg:p-16">
        <div className="w-full max-w-md">
          <SignIn />
        </div>
      </div>
    </div>
  )
}

export default Signin