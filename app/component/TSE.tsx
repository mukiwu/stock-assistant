'use client'
import React, { useEffect, useState, useTransition } from 'react'
import { fetchTSEIndex } from './TSEApi'
import axios from 'axios'
import { createChart } from 'lightweight-charts'

const apiKey = 'MWQzMGE0NzAtMGY0OS00MWJkLTkzZDAtNGEzNWQzNmNiYWUwIDQ3ODFlMjg2LWU5ZDUtNDM1OC1iZTQxLTU0ZDc4YjcyYWQ1YQ=='
const apiTSEIndexUrl = 'https://api.fugle.tw/marketdata/v1.0/stock/historical/candles/IX0001'
// https://www.twse.com.tw/exchangeReport/MI_INDEX?response=json&date=20211001&type=IX0001

const formatDate = (date: Date) => {
  const year = date.getFullYear()
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const day = date.getDate().toString().padStart(2, '0')

  return `${year}-${month}-${day}`
}

const TSE = () => {
  const [isPending, startTransition] = useTransition()
  const [tseIndex, setTSEIndex] = useState<any>([])

  useEffect(() => {
    startTransition(async () => {
      const response = await fetchTSEIndex()
      console.log('data', response.data)
      setTSEIndex(response.data)
    })
  }, [])

  useEffect(() => {
    const fetchChart = () => {
      const parentElement = document.getElementById('TSE') as HTMLElement
      const chartWidth = parentElement.clientWidth
      const chartHeight = parentElement.clientHeight

      const chart = createChart(parentElement, {
        width: chartWidth,
        height: chartHeight,
        layout: {
          background: {
            color: '#292E2F',
          },
          textColor: 'rgba(255, 255, 255, 0.6)',
        },
        grid: {
          vertLines: {
            color: '#3C4142',
          },
          horzLines: {
            color: '#3C4142',
          },
        }
      })
      const data = tseIndex.map((item: any) => {
        return {
          time: item.date,
          open: item.open,
          close: item.close,
          high: item.high,
          low: item.low,
          value: item.close,
        }
      })
      data.reverse()
      const candlestickSeries = chart.addCandlestickSeries({ upColor: '#EF5350', downColor: '#26A69A', borderVisible: false, wickUpColor: '#EF5350', wickDownColor: '#26A69A' })
      candlestickSeries.setData(data)
    }
    if (tseIndex.length === 0) return
    fetchChart()
  }, [tseIndex])

  return (
    <>
      <div id="TSE" className="bg-info h-96"></div>
    </>
  )
}

export default TSE