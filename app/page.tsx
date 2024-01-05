'use client'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import dayjs from 'dayjs'

import Container from '@mui/material/Container'
import { styled } from '@mui/material/styles'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import { DataGrid, GridToolbar, GridColDef, gridPageCountSelector, GridPagination, useGridApiContext, useGridSelector } from '@mui/x-data-grid'
import LinearProgress from '@mui/material/LinearProgress'
import { TablePaginationProps } from '@mui/material/TablePagination'
import MuiPagination from '@mui/material/Pagination'
import TSE from './component/TSE'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.info.main,
    color: theme.palette.secondary.main,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}))

const CustomizedPagination = styled(MuiPagination)`
  & .MuiPagination-ul {
    flex-wrap: nowrap;
  }
`

const columns: GridColDef[] = [
  { field: 'symbol', headerName: '股票代碼', width: 100 },
  { field: 'name', headerName: '股票名稱', width: 150 },
  { field: 'closePrice', headerName: '當前價', width: 120, type: 'number' },
  { field: 'openPrice', headerName: '開盤價', width: 120, type: 'number' },
  { field: 'highPrice', headerName: '最高價', width: 120, type: 'number' },
  { field: 'lowPrice', headerName: '最低價', width: 120, type: 'number' },
  { field: 'change', headerName: '今日漲跌', width: 120, type: 'number' },
  { field: 'changePercent', headerName: '漲跌幅', width: 120, headerAlign: 'right', align: 'right' },
]

const apiSnapshotQuotesUrl = 'https://api.fugle.tw/marketdata/v1.0/stock/snapshot/quotes'

const Page = () => {
  const [hydrated, setHydrated] = useState(false)
  const [lastUpdated, setLastUpdated] = useState<Date>()
  const [quote, setQuote] = useState<any>([])
  const [page, setPage] = useState(1)
  const rowsPerPage = 15

  const fetchSnapshot = async () => {
    try {
      const headers = {
        'X-API-KEY': process.env.API_KEY as string
      }
      const response = await axios.get(`${apiSnapshotQuotesUrl}/TSE`, {
        headers: headers
      })
      const data = response.data.data
      data.forEach((item: any) => {
        item.id = item.symbol
      })
      setQuote(data)
    } catch (error) {
      console.error('API 請求錯誤:', error)
    }
  }

  const Pagination = ({ page, onPageChange }: Pick<TablePaginationProps, 'page' | 'onPageChange'>) => {
    const apiRef = useGridApiContext()
    const pageCount = useGridSelector(apiRef, gridPageCountSelector)
    return (
      <CustomizedPagination color="primary" shape="rounded" size="small" count={pageCount} page={page + 1}
        onChange={(event, newPage) => {
          onPageChange(event as any, newPage - 1);
        }}
      />
    )
  }

  const CustomPagination = (props: any) => {
    return <GridPagination ActionsComponent={Pagination} {...props} />
  }

  const handleChangePage = (_: React.ChangeEvent<unknown>, newPage: number) => {
    setPage(newPage)
  }

  useEffect(() => {
    setHydrated(true)
  }, [])

  useEffect(() => {
    if (hydrated) {
      fetchSnapshot()
      setLastUpdated(new Date())
    }

  }, [hydrated])

  if (!hydrated) return null

  return (
    <>
      <TSE />
      <Container maxWidth="xl">
        <div className="my-4 flex justify-between">
          <h1 className="text-lg">台股即時報價</h1>
          <div className="flex items-center text-sm">
            <button
              className="px-2 py-1 bg-blue-500 text-white text-xs rounded-md transition-colors hover:bg-blue-400"
              onClick={() => fetchSnapshot()}
            >
              重新整理
            </button>
            <div className="ml-2">最後更新時間：{dayjs(lastUpdated).format('YYYY-MM-DD HH:mm:ss')}</div>
          </div>
        </div>

        <DataGrid density='compact' rows={quote} columns={columns}
          slots={{
            pagination: CustomPagination,
            toolbar: GridToolbar,
            loadingOverlay: LinearProgress
          }}
          initialState={{
            pagination: { paginationModel: { pageSize: 12 } },
          }}
          loading={quote.length === 0}
        />

        <TableContainer>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="a quote table">
            <TableHead>
              <TableRow>
                <StyledTableCell>股票代碼</StyledTableCell>
                <StyledTableCell>股票名稱</StyledTableCell>
                <StyledTableCell align="right">當前價</StyledTableCell>
                <StyledTableCell align="right">開盤價</StyledTableCell>
                <StyledTableCell align="right">最高價</StyledTableCell>
                <StyledTableCell align="right">最低價</StyledTableCell>
                <StyledTableCell align="right">今日漲跌</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(quote.slice((page - 1) * rowsPerPage, (page - 1) * rowsPerPage + rowsPerPage)).map((row: any) => (
                <TableRow key={row.symbol}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">{row.symbol}</TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell align="right">{row.closePrice}</TableCell>
                  <TableCell align="right">{row.openPrice}</TableCell>
                  <TableCell align="right">{row.highPrice}</TableCell>
                  <TableCell align="right">{row.lowPrice}</TableCell>
                  <TableCell align="right">{row.change}({row.changePercent})</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <CustomizedPagination className="my-6 flex justify-center" count={Math.ceil(quote.length / rowsPerPage)} page={1} variant="outlined" shape="rounded" onChange={handleChangePage} />
      </Container>
    </>
  )
}

export default Page
