import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "lucide-react";
import { getTransactions } from "@/db/transactions-local";
import React from "react";

export function DayOrdersAmountCard() {
    const [amount, setAmount] = React.useState(0);
    const [diffFromYesterday, setDiffFromYesterday] = React.useState(0);

    React.useEffect(() => {
        const transactions = getTransactions();
        const today = new Date();
        const yesterday = new Date();
        yesterday.setDate(today.getDate() - 1);

        // Soma de hoje
        const sumToday = transactions
            .filter(t => {
                if (!t.createdAt) return false;
                const date = new Date(t.createdAt);
                return (
                    date.getDate() === today.getDate() &&
                    date.getMonth() === today.getMonth() &&
                    date.getFullYear() === today.getFullYear()
                );
            })
            .reduce((acc, t) => acc + (t.amount || 0), 0);

        // Soma de ontem
        const sumYesterday = transactions
            .filter(t => {
                if (!t.createdAt) return false;
                const date = new Date(t.createdAt);
                return (
                    date.getDate() === yesterday.getDate() &&
                    date.getMonth() === yesterday.getMonth() &&
                    date.getFullYear() === yesterday.getFullYear()
                );
            })
            .reduce((acc, t) => acc + (t.amount || 0), 0);

        setAmount(sumToday);

        // Calcula a diferença percentual em relação a ontem
        let diff = 0;
        if (sumYesterday > 0) {
            diff = Math.round(((sumToday - sumYesterday) / sumYesterday) * 100);
        } else if (sumToday > 0) {
            diff = 100;
        }
        setDiffFromYesterday(diff);
    }, []);

    return (
        <Card>
         <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
             <CardTitle className="text-base font-semibold">Receita total (diária)</CardTitle>
             <Calendar className="h-4 w-4 text-muted-foreground" />
         </CardHeader>
         <CardContent className="space-y-1">
            <span className="text-3xl font-bold tracking-tight">
                {amount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            </span>
            <p className="text-xs text-muted-foreground">
                {diffFromYesterday >= 0 ? (
                    <>
                    <span className="text-emerald-500 dark:text-emerald-400">+{diffFromYesterday}%</span>{' '}
                    em relação à ontem
                    </>
                ) : (
                    <>
                    <span className="text-rose-500 dark:text-rose-400">{diffFromYesterday}%</span>{' '}
                    em relação à ontem
                    </>
                )}
            </p>
         </CardContent>
        </Card>
    )
}