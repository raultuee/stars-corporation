import { useParams } from "react-router-dom";
import { camisetas } from "../data/camisetas";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";

export function ProdutoPage() {
  const { slug } = useParams<{ slug: string }>();
  const camiseta = camisetas.find((c) => c.slug === slug);

  if (!camiseta) return <div>Camiseta não encontrada.</div>;

  return (
    <div className="mx-auto p-4 flex flex-col sm:flex-row gap-8 w-full items-center justify-center mt-10">
      <div className="">
        <img src={camiseta.imagem} alt={camiseta.nome} className="w-full max-w-md mx-auto mb-6" />
      </div>
      <div className="flex flex-col justify-center gap-2">
          <h1 className="text-3xl font-bold">{camiseta.nome}</h1>
          <Badge className="text-center w-[120px]">Coleção {camiseta.colecao}</Badge>
          <span className="text-2xl font-bold mb-4 block">R$ {camiseta.preco.toFixed(2)}</span>
          <div className="flex gap-2 items-center">
            <Button className="w-[200px]">Solicitar camiseta</Button>
            <Button variant="secondary"><Heart/></Button>
          </div>
      </div>
    </div>
  );
}