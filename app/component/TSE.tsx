'use client'
import React, { useEffect, useState, useTransition } from 'react'
import Fade from '@mui/material/Fade'
import CircularProgress from '@mui/material/CircularProgress'
import { fetchTSEIndex } from '../api/TSE.action'
import { createChart } from 'lightweight-charts'

const TSE = () => {
  const [isPending, startTransition] = useTransition()
  const [loading, setLoading] = useState(true)
  const [tseIndex, setTSEIndex] = useState<any>([])

  const fetchTSEData = async () => {
    setLoading(true)
    try {
      const response = await fetchTSEIndex()
      setTSEIndex(response.data.data)
    } catch (error: any) {
      const errorData = JSON.parse(error.message)
      console.log('errorData', errorData)
    } finally {
      setTimeout(() => {
        setLoading(false)
      }, 1000)
    }
  }

  useEffect(() => {
    startTransition(fetchTSEData)
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
    if (loading) return
    fetchChart()
  }, [tseIndex, loading])

  return (
    <>
      <Fade in={loading} timeout={0} unmountOnExit={true}>
        <div className="flex items-center justify-center bg-info h-96">
          <CircularProgress color='secondary' size={20} />
          <h2 className="text-white text-center ml-2">資料載入中...</h2>
        </div>
      </Fade>
      <Fade in={!loading} timeout={0} unmountOnExit={true}>
        {(tseIndex.length === 0) ?
          <div className="flex flex-col items-center justify-center bg-info h-96">
            <h2 className="text-white text-center">OOPS！資料有誤，暫時無法顯示</h2>
            <button
              className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-400"
              onClick={() => { fetchTSEData() }}
            >
              重新整理
            </button>
            <div className="text-secondary text-center text-xs mt-4">如果錯誤持續發生，請聯繫管理員</div>
          </div> :
          <div id="TSE" className="bg-info h-96"></div>
        }
      </Fade>
    </>
  )
}

export default TSE