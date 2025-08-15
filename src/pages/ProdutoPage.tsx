import { useParams } from "react-router-dom";
import { getLikes } from "../utils/likes";
import { camisetas } from "../data/camisetas";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export function ProdutoPage() {
  const { slug } = useParams<{ slug: string }>();
  const camiseta = camisetas.find((c) => c.slug === slug);

  const [likes, setLikes] = useState(0);

  useEffect(() => {
    const allLikes = getLikes();
    if (camiseta) setLikes(allLikes[camiseta.id] || 0);
  }, [camiseta]);

  if (!camiseta) return <div>Camiseta não encontrada.</div>;

  return (
    <div className="mx-auto p-4 flex flex-col sm:flex-row gap-8 w-full items-center justify-center mt-10">
      <div className="flex flex-col items-center">
        <div className="relative w-full max-w-md mb-6 group">
          <img
            src={camiseta.imagem}
            alt={camiseta.nome}
            className={
              camiseta.imagemSec
                ? "absolute inset-0 w-full h-full object-cover transition-opacity duration-300 opacity-100 group-hover:opacity-0"
                : "absolute inset-0 w-full h-full object-cover transition-opacity duration-300 opacity-100 group-hover:opacity-100"
            }
          />
          {camiseta.imagemSec && (
            <img
              src={camiseta.imagemSec}
              alt={camiseta.nome + " costas"}
              className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300 opacity-0 group-hover:opacity-100"
            />
          )}
          {/* Para manter o espaço reservado */}
          <div className="invisible">
            <img src={camiseta.imagem} alt="" className="w-full max-w-md mx-auto" />
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-center gap-2">
        
        <h1 className="text-3xl font-bold">{camiseta.nome}</h1>
        <Badge className="flex justify-center items-center w-full cursor-pointer">{`Coleção ${camiseta.colecao}`}</Badge>
        <Badge variant="secondary" className="flex justify-center items-center w-full cursor-pointer">{likes} curtidas</Badge>
        <span className="text-2xl font-bold mb-4 block">R$ {camiseta.preco.toFixed(2)}</span>
        <div className="flex items-center">
          <Button className="w-full">Solicitar camiseta</Button>
        </div>
      </div>
    </div>
  );
}