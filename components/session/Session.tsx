"use client"
import { SessionProvider } from 'next-auth/react'
import React from 'react'

function CustomSessionProvider({ children }: { children: React.ReactNode }) {
    return (
        <SessionProvider>
            {children}
        </SessionProvider>
    )
}

export default CustomSessionProvider