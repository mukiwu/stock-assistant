import React from 'react'
import { render, screen } from '@testing-library/react'
import { useRouter } from 'next/navigation'
import Navigation from './Navigation'

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}))

describe('Navigation', () => {
  it('應該正確顯示並高亮當前頁面的連結', () => {
    (useRouter as jest.Mock).mockReturnValue({
      pathname: '/stock',
    })

    render(<Navigation />)

    const links = screen.getAllByRole('link')
    expect(links).toHaveLength(3)

    expect(links[0]).toHaveTextContent('Home')
    expect(links[0]).not.toHaveClass('text-red-500')

    expect(links[1]).toHaveTextContent('所有股票')
    expect(links[1]).toHaveClass('text-red-500')

    expect(links[2]).toHaveTextContent('登入 / 註冊')
    expect(links[2]).not.toHaveClass('text-red-500')
  })
})
