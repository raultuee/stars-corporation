import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Camiseta } from "@/data/camisetas";

interface CamisetaCardProps {
  camiseta: Camiseta;
  onLike: (id: string) => void;
  isLiked: boolean;
  likesCount: number;
  showBadge?: boolean;
  mobileSize?: boolean;
}

export function CamisetaCard({
  camiseta,
  onLike,
  isLiked,
  likesCount,
  showBadge = true,
}: CamisetaCardProps) {
  const handleNavigate = () => {
    window.location.href = `/produto/${camiseta.slug}`;
  };

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!isLiked) {
      onLike(camiseta.id);
    }
  };

  return (
    <>
      {/* Mobile: apenas no mobile */}
      <Card className="group w-[320px] h-[400px] flex flex-col items-center justify-center transition duration-300 hover:scale-105 relative sm:hidden border-0 shadow-md hover:shadow-xl bg-white">
        <div className="relative w-[220px] h-[220px] mb-4">
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
        </div>

        {showBadge && camiseta.colecao && (
          <Badge className="flex justify-center items-center animate-pulse cursor-pointer mb-2 border-0 bg-slate-900 text-white">
            {`Coleção ${camiseta.colecao}`}
          </Badge>
        )}

        <h2 className="text-lg font-bold text-center mt-5 mb-5 px-2 line-clamp-2">
          {camiseta.nome}
        </h2>

        <div className="flex gap-2 items-center px-2">
          <Button
            className="w-[140px] bg-slate-900 hover:bg-slate-800 text-white font-semibold border-0"
            onClick={handleNavigate}
            disabled={camiseta.esgotado}
          >
            {camiseta.esgotado
              ? "Esgotado"
              : camiseta.preco.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
          </Button>
          <Button
            variant={isLiked ? "default" : "secondary"}
            onClick={handleLike}
            disabled={isLiked}
            size="icon"
            className="border-0"
          >
            <Heart />
          </Button>
          <Badge variant="secondary" className="border-0">
            {likesCount}
          </Badge>
        </div>
      </Card>

      {/* Desktop: apenas no desktop */}
      <Card className="group hidden sm:flex w-[400px] h-[475px] flex-col items-center justify-center transition duration-300 hover:scale-105 hover:shadow-xl relative border-0 shadow-md bg-white">
        <div className="relative w-[300px] h-[300px] mb-4">
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
        </div>

        {showBadge && camiseta.colecao && (
          <Badge className="flex justify-center items-center animate-pulse cursor-pointer mb-2 border-0 bg-slate-900 text-white">
            {`Coleção ${camiseta.colecao}`}
          </Badge>
        )}

        <h2 className="text-xl font-bold text-center mt-5 mb-5 px-2 line-clamp-2">
          {camiseta.nome}
        </h2>

        <div className="flex gap-3 items-center px-2">
          <Button
            className="w-[200px] bg-slate-900 hover:bg-slate-800 text-white font-semibold border-0"
            onClick={handleNavigate}
            disabled={camiseta.esgotado}
          >
            {camiseta.esgotado
              ? "Esgotado"
              : camiseta.preco.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
          </Button>
          <Button
            variant={isLiked ? "default" : "secondary"}
            onClick={handleLike}
            disabled={isLiked}
            size="icon"
            className="border-0"
          >
            <Heart />
          </Button>
          <Badge variant="secondary" className="hidden md:block border-0">
            {likesCount} curtidas
          </Badge>
        </div>
      </Card>
    </>
  );
}
