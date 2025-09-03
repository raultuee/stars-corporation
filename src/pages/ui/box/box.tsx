import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { toast } from "sonner";

export function VerCarrinho() {
  return (
    <>
      <Button variant="outline" className="fixed bottom-6 left-6 rounded-full p-4 text-sm" onClick={() => toast.info('Em breve você poderá ver o carrinho de compras!')}>
        <ShoppingCart />  <p className="font-semibold ml-2">Ver carrinho</p>
        </Button>
    </>
  )
}
