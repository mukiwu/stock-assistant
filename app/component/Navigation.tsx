'use client'
import React from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'

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
      <div className="flex py-3 justify-between items-center">
        {/* <a href="https://www.freepik.com/search?format=search&last_filter=type&last_value=icon&query=stock%20logo&selection=1&type=icon">Icon by Alfredo Creates</a> */}
        <Image src="/logo.png " alt="logo" width="32" height="32" />
        <div>
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
      </div>

    </>
  )
}

export default Navigation