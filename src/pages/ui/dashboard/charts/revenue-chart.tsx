/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import * as React from "react"
import { CartesianGrid, Line, LineChart, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { getTransactions } from "@/db/transactions-local"

const chartConfig = {
  views: {
    label: "Page Views",
  },
  entrada: {
    label: "Entrada",
    color: "hsl(var(--chart-2))",
  },
  saida: {
    label: "Saída",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig

function getDailySums(transactions: any[]) {
  // Agrupa por data e soma entradas e saídas
  const map: Record<string, { entrada: number; saida: number }> = {}
  transactions.forEach((t) => {
    if (!t.createdAt) return
    const date = new Date(t.createdAt)
    const key = date.toISOString().slice(0, 10) // yyyy-mm-dd
    if (!map[key]) map[key] = { entrada: 0, saida: 0 }
    if (t.type === true) {
      map[key].entrada += t.amount || 0
    } else if (t.type === false) {
      map[key].saida += t.amount || 0
    }
  })
  // Ordena por data
  return Object.entries(map)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([date, values]) => ({
      date,
      entrada: values.entrada,
      saida: values.saida,
    }))
}

export function RevenueChart() {
  const [activeChart, setActiveChart] =
    React.useState<keyof typeof chartConfig>("entrada")
  const [chartData, setChartData] = React.useState<
    { date: string; entrada: number; saida: number }[]
  >([])

  React.useEffect(() => {
    const transactions = getTransactions()
    setChartData(getDailySums(transactions))
  }, [])

  const total = React.useMemo(
    () => ({
      entrada: chartData.reduce((acc, curr) => acc + curr.entrada, 0),
      saida: chartData.reduce((acc, curr) => acc + curr.saida, 0),
    }),
    [chartData]
  )

  return (
    <Card className="w-[1400px]">
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>Gráfico Geral de Transações</CardTitle>
          <CardDescription>
            Aqui mostramos uma visão geral sobre as transações realizadas
          </CardDescription>
        </div>
        <div className="flex">
          {(["entrada", "saida"] as const).map((chart) => (
              <button
                key={chart}
                data-active={activeChart === chart}
                className="flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
                onClick={() => setActiveChart(chart)}
              >
                <span className="text-xs text-muted-foreground">
                  {chartConfig[chart].label}
                </span>
                <span className="text-lg font-bold leading-none sm:text-3xl">
                  {total[chart].toLocaleString()}
                </span>
              </button>
            ))}
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString("pt-BR", {
                  month: "short",
                  day: "numeric",
                })
              }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  nameKey={activeChart}
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("pt-BR", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })
                  }}
                />
              }
            />
            <Line
              dataKey={activeChart}
              type="monotone"
              stroke={`var(--color-${activeChart})`}
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
