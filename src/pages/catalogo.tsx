import { camisetas } from "../data/camisetas";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";
import { getLikes, setLikes } from "../utils/likes";

export function Catalogo() {
  const [likes, setLikesState] = useState<Record<string, number>>({});
  const [isLiked, setIsLiked] = useState<Record<string, boolean>>({});

  useEffect(() => {
    setLikesState(getLikes());
  }, []);

  function handleLike(id: string) {
    const newLikes = { ...likes, [id]: (likes[id] || 0) + 1 };
    setLikes(newLikes);
    setLikesState(newLikes);
    setIsLiked({ ...isLiked, [id]: true });
  }

  return (
    <div className="min-h-screen w-full flex flex-col px-4">
      <h1 className="text-3xl font-bold uppercase my-10 text-center sm:text-center md:ml-[200px] md:text-start lg:ml-[200px] lg:text-start xl:ml-[200px] xl:text-start">
        Catálogo de Camisetas
      </h1>
      <div className="flex flex-col items-center justify-center mb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-7xl">
          {camisetas.map((camiseta) => (
            <Card
              key={camiseta.id}
              className="group w-[400px] h-[475px] flex flex-col items-center justify-center transition duration-300 hover:scale-105 hover:shadow-lg mx-auto"
            >
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
              <Badge className="flex justify-center items-center cursor-pointer mb-2">{`Coleção ${camiseta.colecao}`}</Badge>
              <h2 className="text-xl font-semibold text-center mb-3">
                {camiseta.nome}
              </h2>
              <div className="flex gap-2 items-center">
                <Button
                  className="w-[200px]"
                  onClick={() => (window.location.href = `/produto/${camiseta.slug}`)}
                >
                  Visualizar item
                </Button>
                <Button
                  variant={isLiked[camiseta.id] ? "default" : "secondary"}
                  onClick={() => handleLike(camiseta.id)}
                  disabled={isLiked[camiseta.id]}
                >
                  <Heart />
                </Button>
                <Badge className="ml-2" variant="secondary">
                  {likes[camiseta.id] || 0} curtidas
                </Badge>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}