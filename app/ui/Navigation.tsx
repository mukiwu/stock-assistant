'use client'
import React from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

type NavLink = {
  href: string
  name: string
}

const Navigation = () => {
  const pathname = usePathname()
  const navLinks: NavLink[] = [
    { href: '/', name: 'Home' },
    { href: '/stock', name: '所有股票' },
    { href: '/login', name: '登入 / 註冊' },
  ]
  return (
    <>
      {navLinks.map(link => {
        const isActive = pathname === link.href
        return (
          <Link href={link.href} key={link.href} className={isActive ? 'text-red-500' : 'text-neutral-800'}>
            {link.name}
          </Link>
        )
      })}
    </>
  )
}

export default Navigation