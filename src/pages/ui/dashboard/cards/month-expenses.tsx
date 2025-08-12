import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingDown } from "lucide-react";
import { getTransactions } from "@/db/transactions-local";
import React from "react";

export function MonthCanceledOrdersAmountCard() {
    // Soma todas as transações de saída (type === false) do mês atual
    const [amount, setAmount] = React.useState(0);
    const [diffFromLastMonth, setDiffFromLastMonth] = React.useState(0);

    React.useEffect(() => {
        const transactions = getTransactions();
        const today = new Date();
        const currentMonth = today.getMonth();
        const currentYear = today.getFullYear();

        // Soma saídas do mês atual
        const sumCurrentMonth = transactions
            .filter(t => {
                if (!t.createdAt || t.type !== false) return false;
                const date = new Date(t.createdAt);
                return (
                    date.getMonth() === currentMonth &&
                    date.getFullYear() === currentYear
                );
            })
            .reduce((acc, t) => acc + (t.amount || 0), 0);

        // Soma saídas do mês passado
        const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1;
        const lastMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear;

        const sumLastMonth = transactions
            .filter(t => {
                if (!t.createdAt || t.type !== false) return false;
                const date = new Date(t.createdAt);
                return (
                    date.getMonth() === lastMonth &&
                    date.getFullYear() === lastMonthYear
                );
            })
            .reduce((acc, t) => acc + (t.amount || 0), 0);

        setAmount(Math.abs(sumCurrentMonth)); // Valor sempre positivo

        // Calcula a diferença percentual em relação ao mês passado
        let diff = 0;
        if (sumLastMonth > 0) {
            diff = Math.round(((sumCurrentMonth - sumLastMonth) / sumLastMonth) * 100);
        } else if (sumCurrentMonth > 0) {
            diff = 100;
        }
        setDiffFromLastMonth(diff);
    }, []);

    return (
        <Card>
         <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
             <CardTitle className="text-base font-semibold">Despesas (mês)</CardTitle>
             <TrendingDown className="h-4 w-4 text-muted-foreground" />
         </CardHeader>
         <CardContent className="space-y-1">
          <>
            <span className="text-3xl font-bold tracking-tight">
              {amount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            </span>
            <p className="text-xs text-muted-foreground">
              {diffFromLastMonth < 0 ? (
                <>
                  <span className="text-emerald-500 dark:text-emerald-400">
                    {diffFromLastMonth}%
                  </span>{' '}
                  em relação ao mês passado
                </>
              ) : diffFromLastMonth === 0 ? (
                <>
                  <span className="text-blue-400">
                    {diffFromLastMonth}%
                  </span>{' '}
                  em relação ao mês passado
                </>
              ) : (
                <>
                  <span className="text-rose-500 dark:text-rose-400">
                    +{diffFromLastMonth}%
                  </span>{' '} 
                  em relação ao mês passado
                </>
              )}
            </p>
          </>
         </CardContent>
        </Card>
    )
}