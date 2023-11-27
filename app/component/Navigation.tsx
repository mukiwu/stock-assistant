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
    { href: '/', name: '首頁' },
    { href: '/stock', name: '股票管理' },
    { href: '/notify', name: '股票通知' },
    { href: '/login', name: '登入 / 註冊' },
  ]
  return (
    <>
      <div className="py-8 text-right">
        {navLinks.map(link => {
          const isActive = pathname === link.href
          return (
            <Link href={link.href} key={link.href} className={`px-4 ${isActive ? 'text-primary' : 'text-info'}`}
            >
              {link.name}
            </Link>
          )
        })}
      </div>

    </>
  )
}

export default Navigation