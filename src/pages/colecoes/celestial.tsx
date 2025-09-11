import { Button } from '@/components/ui/button';
import Cartaz from '../../assets/cartazes/celestial.png'
import { Heart } from 'lucide-react';
import { useEffect, useState } from 'react';
import { getLikes, setLikes } from '@/utils/likes';
import { camisetas } from '@/data/camisetas';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

function CelestialCollection() {
  const [likes, setLikesState] = useState<Record<string, number>>({});
  const [isLiked, setIsLiked] = useState<Record<string, boolean>>({});
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    setLikesState(getLikes());
  }, []);

  function handleLike(id: string) {
    const newLikes = { ...likes, [id]: (likes[id] || 0) + 1 };
    setLikes(newLikes);
    setLikesState(newLikes);
    setIsLiked({ ...isLiked, [id]: true });
  }

  // Ordena as camisetas por likes (decrescente) e pega as 3 mais curtidas
  const celestialItems = [...camisetas]
    .filter(camiseta => camiseta.colecao === "Celestial");

  function handlePrev() {
    setCurrent((prev) => (prev === 0 ? celestialItems.length - 1 : prev - 1));
  }

  function handleNext() {
    setCurrent((prev) => (prev === celestialItems.length - 1 ? 0 : prev + 1));
  }

  return (
    <div className="mt-20 mb-20 w-full">
      <h1 className="text-2xl text-center sm:text-2xl sm:text-center md:text-3xl md:text-center lg:text-3xl lg:ml-[200px] lg:text-start lg:mb-[70px] xl:text-3xl xl:ml-[200px] xl:text-start xl:mb-[70px] font-bold uppercase mb-10">
        CELESTIAL COLLECTION
      </h1>
      {/* Mobile: apenas 1 card, com botões laterais */}
      <div className="flex items-center justify-center gap-5 sm:hidden">
        <button
          onClick={handlePrev}
          className="p-2 rounded-full bg-gray-200 hover:bg-gray-300"
          aria-label="Anterior"
        >
          &#8592;
        </button>
        {celestialItems.length > 0 && (
          <Card className="group w-[320px] h-[400px] flex flex-col items-center justify-center transition duration-300 hover:scale-105 hover:shadow-lg relative">
            <div className="relative w-[220px] h-[220px] mb-4">
              <img
                src={celestialItems[current].imagem}
                alt={celestialItems[current].nome}
                className={
                  celestialItems[current].imagemSec
                    ? "absolute inset-0 w-full h-full object-cover transition-opacity duration-300 opacity-100 group-hover:opacity-0"
                    : "absolute inset-0 w-full h-full object-cover transition-opacity duration-300 opacity-100 group-hover:opacity-100"
                }
              />
              {celestialItems[current].imagemSec && (
                <img
                  src={celestialItems[current].imagemSec}
                  alt={celestialItems[current].nome + ' costas'}
                  className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300 opacity-0 group-hover:opacity-100"
                />
              )}
            </div>
            <h2 className="text-xl font-semibold text-center mt-5 mb-5">{celestialItems[current].nome}</h2>
            <div className="flex gap-2 items-center">
              <Button
                className="w-[150px]"
                onClick={() => window.location.href = `/produto/${celestialItems[current].slug}`}
              >
                {celestialItems[current].preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
              </Button>
              <Button
                onClick={() => handleLike(celestialItems[current].id)}
                variant={isLiked[celestialItems[current].id] ? "default" : "secondary"}
                disabled={isLiked[celestialItems[current].id]}
              >
                <Heart />
              </Button>
              <Badge className="ml-2 hidden md:block lg:block xl:block" variant="secondary">
                  {likes[celestialItems[current].id] || 0} curtidas
                </Badge>
            </div>
          </Card>
        )}
        <button
          onClick={handleNext}
          className="p-2 rounded-full bg-gray-200 hover:bg-gray-300"
          aria-label="Próximo"
        >
          &#8594;
        </button>
      </div>
      {/* Desktop: todos os cards */}
      <div className="hidden sm:flex grid-cols-3 items-center justify-center gap-5">
        {celestialItems.map((card) => (
          <Card
            key={card.id}
            className="group w-[400px] h-[475px] flex flex-col items-center justify-center transition duration-300 hover:scale-105 hover:shadow-lg"
          >
            <div className="relative w-[300px] h-[300px] mb-4">
              <img
                src={card.imagem}
                alt={card.nome}
                className={
                  card.imagemSec
                    ? "absolute inset-0 w-full h-full object-cover transition-opacity duration-300 opacity-100 group-hover:opacity-0"
                    : "absolute inset-0 w-full h-full object-cover transition-opacity duration-300 opacity-100 group-hover:opacity-100"
                }
              />
              {card.imagemSec && (
                <img
                  src={card.imagemSec}
                  alt={card.nome + ' costas'}
                  className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300 opacity-0 group-hover:opacity-100"
                />
              )}
            </div>
            <h2 className="text-xl font-semibold text-center mt-5 mb-5">{card.nome}</h2>
            <div className="flex gap-2 items-center">
              <Button
                className="w-[200px]"
                onClick={() => window.location.href = `/produto/${card.slug}`}
              >
                {celestialItems[current].preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
              </Button>
              <Button
                variant={isLiked[card.id] ? "default" : "secondary"}
                onClick={() => handleLike(card.id)}
                disabled={isLiked[card.id]}
              >
                <Heart />
              </Button>
              <Badge className="ml-2 hidden sm:hidden md:block lg:block xl:block" variant="secondary">
                  {likes[card.id] || 0} curtidas
                </Badge>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}


export function Celestial() {
    return (
        <div>
            <img src={Cartaz} alt="" />
            <CelestialCollection/>
        </div>
    )
}