import React from "react";
import { MonthRevenueCard } from "./cards/month-revenue";
import { MonthOrdersAmountCard } from "./cards/month-earnings";
import { DayOrdersAmountCard } from "./cards/amount-day";
import { MonthCanceledOrdersAmountCard } from "./cards/month-expenses";
import { RevenueChart } from "./charts/revenue-chart";
import { PopularProductsChart } from "./charts/method-popular";
import { Separator } from "@/components/ui/separator";

export function Dashboard() {
  const [loading, setLoading] = React.useState(true);

  // Simulação: substitua por sua lógica real de busca de transações

  React.useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500); // 1.5s de delay global
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    // Aqui você pode retornar skeletons ou um spinner global
    return (
      <div className="flex flex-col w-full gap-6 p-14" style={{ height: "calc(100vh - 64px)" }}>
        {/* Exemplo de skeleton simples */}
        <div className="animate-pulse h-10 w-1/3 bg-muted rounded mb-6" />
        <div className="grid grid-cols-4 gap-7">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-32 bg-muted rounded" />
          ))}
        </div>
        <div className="flex gap-4 mt-4">
          <div className="h-[250px] w-full bg-muted rounded" />
          <div className="h-[250px] w-[374px] bg-muted rounded" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full gap-4 p-14 " style={{ height: "calc(100vh - 64px)" }}>
      <h1 className="text-4xl font-bold tracking-tight self-start">Dashboard</h1>
      <div className="grid grid-cols-4 gap-7">
        <MonthRevenueCard />
        <MonthOrdersAmountCard />
        <MonthCanceledOrdersAmountCard />
        <DayOrdersAmountCard />
      </div>
      <Separator />
      <div className="flex gap-4 mt-4">
        <RevenueChart />
        <PopularProductsChart />
      </div>
    </div>
  );
}
