"use client"

import * as React from "react"
import { TrendingUp } from "lucide-react"
import { Pie, PieChart, Cell, Label } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
  payments: {
    label: "Pagamentos",
  },
  debit: {
    label: "Débito",
    color: "hsl(var(--chart-1))",
  },
  credit: {
    label: "Crédito",
    color: "hsl(var(--chart-2))",
  },
  pix: {
    label: "PIX",
    color: "hsl(var(--chart-3))",
  },
  money: {
    label: "Dinheiro",
    color: "hsl(var(--chart-4))",
  },
} satisfies ChartConfig

export function PopularProductsChart() {
  // Conta os métodos de pagamento mais usados no banco de dados
  const [chartData, setChartData] = React.useState<{ method: string; value: number }[]>([]);

  React.useEffect(() => {
    const transactions = getTransactions();
    const counts: Record<string, number> = {};
    for (const t of transactions) {
      if (t.method) {
        counts[t.method] = (counts[t.method] || 0) + 1;
      }
    }
    const data = Object.entries(counts).map(([method, value]) => ({ method, value }));
    setChartData(data);
  }, []);

  const total = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.value, 0)
  }, [chartData])

  return (
    <Card className="flex flex-col w-[374px] ml-auto">
      <CardHeader className="items-center pb-0">
        <CardTitle>Métodos de Pagamento</CardTitle>
        <CardDescription>Este mês</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="method"
              innerRadius={60}
              strokeWidth={5}
            >
              {chartData.map((entry) => (
                <Cell
                  key={entry.method}
                  fill={
                    ((): string | undefined => {
                      const config = chartConfig[entry.method as keyof typeof chartConfig];
                      return "color" in config ? config.color : undefined;
                    })()
                  }
                />
              ))}
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {total.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Pagamentos
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Método mais usado:&nbsp;
          {chartData.length > 0 ? (
            <>
              {
                chartConfig[
                  chartData.reduce((max, curr) =>
                    curr.value > (chartData.find(e => e.method === max)?.value ?? 0)
                      ? curr.method
                      : max,
                    chartData[0].method
                  ) as keyof typeof chartConfig
                ]?.label
              }
            </>
          ) : (
            "Nenhum"
          )}
          <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground text-center">
          Métodos de pagamento mais populares
        </div>
      </CardFooter>
    </Card>
  )
}
