'use client'

import React, { useState, useEffect, useCallback } from 'react'
import type { JobPostForCandidate } from '@prisma/client'
import {
  getApplicationDate,
  getWeekStart,
  formatDateLabel,
  safeMapGet,
  safeMapSet,
  TIME_PERIODS,
  type TimePeriod,
} from './graphUtils'
import { TimePeriodSelector } from './TimePeriodSelector'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts'

type ChartDataPoint = {
  date: string
  count: number
  formattedDate: string
}

export function WeeklyApplicationsGraph({
  jobPosts,
}: {
  jobPosts: JobPostForCandidate[]
}) {
  const [timePeriod, setTimePeriod] = useState<TimePeriod>('ALL')
  const [chartData, setChartData] = useState<ChartDataPoint[]>([])
  const [dataError, setDataError] = useState<string | null>(null)

  // Process data - memoized to prevent unnecessary re-creation
  const processData = useCallback(() => {
    try {
      // Safety check - early return an empty array if no posts
      if (!jobPosts?.length) {
        console.log('No job posts found to process')
        return []
      }

      console.log('Found job posts:', jobPosts.length)

      // Map to store application counts by week
      const weeklyAppCounts = new Map<string, number>()
      let validDates = 0

      // Process each job post to count applications by week
      jobPosts.forEach((post, index) => {
        // Get application date from the post
        const appDate = getApplicationDate(post)

        if (!appDate) {
          if (index < 5)
            console.log(`No valid date for post ${post.id} (${post.company})`)
          return
        }

        validDates++

        // Get the start of the week for this application date
        const weekStart = getWeekStart(appDate)
        const weekKey = weekStart.toISOString().split('T')[0]

        // Increment the count for this week
        const currentCount = safeMapGet(weeklyAppCounts, weekKey, 0) ?? 0
        safeMapSet(weeklyAppCounts, weekKey, currentCount + 1)
      })

      console.log(`Processed ${validDates} posts with valid dates`)

      // Convert to array format
      let filteredData: [string, number][] = Array.from(
        weeklyAppCounts.entries(),
      )

      // Debug check
      if (filteredData.length === 0) {
        console.log('No weekly data found after processing')
        return []
      }

      console.log(`Found ${filteredData.length} unique weeks with data`)

      // Filter data based on selected time period
      if (TIME_PERIODS[timePeriod] > 0) {
        const cutoffDate = new Date()
        cutoffDate.setDate(cutoffDate.getDate() - TIME_PERIODS[timePeriod])

        const originalLength = filteredData.length
        filteredData = filteredData.filter(([weekKey]) => {
          return new Date(weekKey) >= cutoffDate
        })

        console.log(
          `Filtered from ${originalLength} to ${filteredData.length} weeks based on period ${timePeriod}`,
        )
      }

      // Sort by date (ascending)
      filteredData.sort(
        (a, b) => new Date(a[0]).getTime() - new Date(b[0]).getTime(),
      )

      // Format for Recharts
      const formattedChartData = filteredData.map(([date, count]) => ({
        date,
        count,
        formattedDate: formatDateLabel(date),
      }))

      console.log('Final chart data:', formattedChartData.length, 'weeks')
      return formattedChartData
    } catch (error) {
      console.error('Error processing weekly application data:', error)
      setDataError('Error processing data')
      return []
    }
  }, [jobPosts, timePeriod])

  // Process data whenever jobPosts or timePeriod changes
  useEffect(() => {
    console.log('Processing weekly application data. Posts:', jobPosts?.length)
    const newData = processData()

    setChartData(newData)
    setDataError(newData.length === 0 ? 'No application data to display' : null)
  }, [jobPosts, timePeriod, processData])

  // If no data to display
  if (!chartData?.length) {
    return (
      <div className="rounded-lg border bg-white p-4 dark:border-gray-800 dark:bg-gray-900">
        <div className="mb-2 flex flex-col space-y-2 sm:mb-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
          <h2 className="text-xl font-semibold">Weekly Applications</h2>
          <TimePeriodSelector
            selectedPeriod={timePeriod}
            onChange={setTimePeriod}
          />
        </div>
        <div className="flex h-64 flex-col items-center justify-center">
          <p className="text-gray-500">
            {dataError ??
              'No application data available for the selected period.'}
          </p>
          <p className="mt-2 text-sm text-gray-400">
            {jobPosts?.length
              ? `Try selecting a different time period such as "ALL".`
              : 'No job posts found.'}
          </p>
        </div>
      </div>
    )
  }

  // Custom tooltip component with better type safety
  const CustomTooltip = ({
    active,
    payload,
  }: {
    active?: boolean
    payload?: Array<{ payload: ChartDataPoint }>
  }) => {
    if (active && payload?.length) {
      const data = payload[0]?.payload
      return (
        <div className="rounded-md bg-gray-900 p-2 text-sm text-white shadow-lg">
          <p className="font-medium">{data?.formattedDate}</p>
          <p>
            {data?.count} application{data?.count !== 1 ? 's' : ''}
          </p>
        </div>
      )
    }
    return null
  }

  return (
    <div className="rounded-lg border bg-white p-4 dark:border-gray-800 dark:bg-gray-900">
      <div className="mb-2 flex flex-col space-y-2 sm:mb-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
        <h2 className="text-xl font-semibold">Weekly Applications</h2>
        <TimePeriodSelector
          selectedPeriod={timePeriod}
          onChange={setTimePeriod}
        />
      </div>

      {/* Recharts Bar Chart */}
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{ top: 5, right: 20, left: 10, bottom: 25 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="formattedDate"
              tick={{ fontSize: 12 }}
              interval="preserveStartEnd"
              tickMargin={10}
            />
            <YAxis
              tick={{ fontSize: 12 }}
              allowDecimals={false}
              // Only show integer ticks
              tickFormatter={(value) => String(Math.floor(Number(value)))}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ paddingTop: 10 }} />
            <Bar
              name="Applications"
              dataKey="count"
              fill="#60a5fa"
              radius={[4, 4, 0, 0]}
              animationDuration={500}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
