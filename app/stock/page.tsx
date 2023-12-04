'use client'
import React, { useEffect, useState } from 'react'

export default function Page() {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/fav')
        const data = await response.json()
        console.log('data', data)
      } catch (error) {
        console.error('Failed to fetch data:', error)
      }
    }
    fetchData()
  }, [])

  return <h1>所有股票</h1>
}