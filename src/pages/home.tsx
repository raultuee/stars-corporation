import { useKeenSlider } from "keen-slider/react"
import "keen-slider/keen-slider.min.css"
import { Card } from "@/components/ui/card"

import Banner1 from '../assets/banners/banner1.png'
import Banner2 from '../assets/banners/banner2.png'
import Banner3 from '../assets/banners/banner3.png'

import { Button } from "@/components/ui/button"
import { Heart } from "lucide-react"
import { useState, useEffect } from "react"
import { getLikes, setLikes } from "../utils/likes";
import { camisetas } from "../data/camisetas";
import { Badge } from "@/components/ui/badge"


function Propagandas() {
  const [ref] = useKeenSlider<HTMLDivElement>({
    loop: true,
    created(slider) {
      setInterval(() => {
        if (slider) {
          slider.next();
        }
      }, 4000);
    },
  })
  return (
    <div ref={ref} className="keen-slider">
      <div className="keen-slider__slide number-slide1 text-center w-full max-h-[550px]"><img src={Banner1} alt="Banner 1" /></div>
      <div className="keen-slider__slide number-slide2 text-center w-full max-h-[550px]"><img src={Banner2} alt="Banner 2" /></div>
      <div className="keen-slider__slide number-slide3 text-center w-full max-h-[550px]"><img src={Banner3} alt="Banner 3" /></div>
    </div>
  )
}

function MaisCurtidas() {
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
  const top3 = [...camisetas]
    .sort((a, b) => (likes[b.id] || 0) - (likes[a.id] || 0))
    .slice(0, 3);

  function handlePrev() {
    setCurrent((prev) => (prev === 0 ? top3.length - 1 : prev - 1));
  }

  function handleNext() {
    setCurrent((prev) => (prev === top3.length - 1 ? 0 : prev + 1));
  }

  return (
    <div className="mt-20 w-full">
      <h1 className="text-2xl text-center sm:text-2xl sm:text-center md:text-3xl md:text-center lg:text-3xl lg:ml-[200px] lg:text-start lg:mb-[70px] xl:text-3xl xl:ml-[200px] xl:text-start xl:mb-[70px] font-bold uppercase mb-10">
        Mais Curtidas
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
        {top3.length > 0 && (
          <Card className="group w-[320px] h-[400px] flex flex-col items-center justify-center transition duration-300 hover:scale-105 hover:shadow-lg relative">
            <div className="relative w-[220px] h-[220px] mb-4">
              <img
                src={top3[current].imagem}
                alt={top3[current].nome}
                className={
                  top3[current].imagemSec
                    ? "absolute inset-0 w-full h-full object-cover transition-opacity duration-300 opacity-100 group-hover:opacity-0"
                    : "absolute inset-0 w-full h-full object-cover transition-opacity duration-300 opacity-100 group-hover:opacity-100"
                }
              />
              {top3[current].imagemSec && (
                <img
                  src={top3[current].imagemSec}
                  alt={top3[current].nome + ' costas'}
                  className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300 opacity-0 group-hover:opacity-100"
                />
              )}
            </div>
            <h2 className="text-xl font-semibold text-center mt-5 mb-5">{top3[current].nome}</h2>
            <div className="flex gap-2 items-center">
              <Button
                className="w-[150px]"
                onClick={() => window.location.href = `/produto/${top3[current].slug}`}
              >
                {top3[current].preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
              </Button>
              <Button
                onClick={() => handleLike(top3[current].id)}
                variant={isLiked[top3[current].id] ? "default" : "secondary"}
                disabled={isLiked[top3[current].id]}
              >
                <Heart />
              </Button>
              <Badge className="ml-2" variant="secondary">
                  {likes[top3[current].id] || 0} curtidas
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
        {top3.map((card) => (
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
                {top3[current].preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
              </Button>
              <Button
                variant={isLiked[card.id] ? "default" : "secondary"}
                onClick={() => handleLike(card.id)}
                disabled={isLiked[card.id]}
              >
                <Heart />
              </Button>
              <Badge className="ml-2" variant="secondary">
                  {likes[card.id] || 0} curtidas
                </Badge>
            </div>
          </Card>
        ))}
      </div>
      <div className="flex w-full justify-center sm:justify-center md:justify-end lg:justify-end xl:justify-end">
        <Button variant="link" className="font-bold uppercase mt-10 xl:mr-[200px] text-lg" onClick={() => window.location.href = '/catalogo'}  >
            VER CATÁLOGO COMPLETO
          </Button>
      </div>
    </div>
  );
}

function StarboyCollection() {
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
  const starboyItems = [...camisetas]
    .filter(camiseta => camiseta.colecao === "Starboy");

  function handlePrev() {
    setCurrent((prev) => (prev === 0 ? starboyItems.length - 1 : prev - 1));
  }

  function handleNext() {
    setCurrent((prev) => (prev === starboyItems.length - 1 ? 0 : prev + 1));
  }

  return (
    <div className="mt-20 w-full">
      <h1 className="text-2xl text-center sm:text-2xl sm:text-center md:text-3xl md:text-center lg:text-3xl lg:ml-[200px] lg:text-start lg:mb-[70px] xl:text-3xl xl:ml-[200px] xl:text-start xl:mb-[70px] font-bold uppercase mb-10">
        STARBOY COLLECTION
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
        {starboyItems.length > 0 && (
          <Card className="group w-[320px] h-[400px] flex flex-col items-center justify-center transition duration-300 hover:scale-105 hover:shadow-lg relative">
            <div className="relative w-[220px] h-[220px] mb-4">
              <img
                src={starboyItems[current].imagem}
                alt={starboyItems[current].nome}
                className={
                  starboyItems[current].imagemSec
                    ? "absolute inset-0 w-full h-full object-cover transition-opacity duration-300 opacity-100 group-hover:opacity-0"
                    : "absolute inset-0 w-full h-full object-cover transition-opacity duration-300 opacity-100 group-hover:opacity-100"
                }
              />
              {starboyItems[current].imagemSec && (
                <img
                  src={starboyItems[current].imagemSec}
                  alt={starboyItems[current].nome + ' costas'}
                  className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300 opacity-0 group-hover:opacity-100"
                />
              )}
            </div>
            <h2 className="text-xl font-semibold text-center mt-5 mb-5">{starboyItems[current].nome}</h2>
            <div className="flex gap-2 items-center">
              <Button
                className="w-[150px]"
                onClick={() => window.location.href = `/produto/${starboyItems[current].slug}`}
              >
                {starboyItems[current].preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
              </Button>
              <Button
                onClick={() => handleLike(starboyItems[current].id)}
                variant={isLiked[starboyItems[current].id] ? "default" : "secondary"}
                disabled={isLiked[starboyItems[current].id]}
              >
                <Heart />
              </Button>
              <Badge className="ml-2" variant="secondary">
                  {likes[starboyItems[current].id] || 0} curtidas
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
        {starboyItems.map((card) => (
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
                {starboyItems[current].preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
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
      <div className="flex w-full justify-center sm:justify-center md:justify-end lg:justify-end xl:justify-end">
        <Button variant="link" className="font-bold uppercase mt-10 xl:mr-[200px] text-lg" onClick={() => window.location.href = '/catalogo'}  >
            VER CATÁLOGO COMPLETO
          </Button>
      </div>
    </div>
  );
}

function TonesCollection() {
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
  const tonesItems = [...camisetas]
    .filter(camiseta => camiseta.colecao === "Tones");

  function handlePrev() {
    setCurrent((prev) => (prev === 0 ? tonesItems.length - 1 : prev - 1));
  }

  function handleNext() {
    setCurrent((prev) => (prev === tonesItems.length - 1 ? 0 : prev + 1));
  }

  return (
    <div className="mt-20 w-full">
      <h1 className="text-2xl text-center sm:text-2xl sm:text-center md:text-3xl md:text-center lg:text-3xl lg:ml-[200px] lg:text-start lg:mb-[70px] xl:text-3xl xl:ml-[200px] xl:text-start xl:mb-[70px] font-bold uppercase mb-10">
        TONES COLLECTION
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
        {tonesItems.length > 0 && (
          <Card className="group w-[320px] h-[400px] flex flex-col items-center justify-center transition duration-300 hover:scale-105 hover:shadow-lg relative">
            <div className="relative w-[220px] h-[220px] mb-4">
              <img
                src={tonesItems[current].imagem}
                alt={tonesItems[current].nome}
                className={
                  tonesItems[current].imagemSec
                    ? "absolute inset-0 w-full h-full object-cover transition-opacity duration-300 opacity-100 group-hover:opacity-0"
                    : "absolute inset-0 w-full h-full object-cover transition-opacity duration-300 opacity-100 group-hover:opacity-100"
                }
              />
              {tonesItems[current].imagemSec && (
                <img
                  src={tonesItems[current].imagemSec}
                  alt={tonesItems[current].nome + ' costas'}
                  className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300 opacity-0 group-hover:opacity-100"
                />
              )}
            </div>
            <h2 className="text-xl font-semibold text-center mt-5 mb-5">{tonesItems[current].nome}</h2>
            <div className="flex gap-2 items-center">
              <Button
                className="w-[150px]"
                onClick={() => window.location.href = `/produto/${tonesItems[current].slug}`}
              >
                {tonesItems[current].preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
              </Button>
              <Button
                onClick={() => handleLike(tonesItems[current].id)}
                variant={isLiked[tonesItems[current].id] ? "default" : "secondary"}
                disabled={isLiked[tonesItems[current].id]}
              >
                <Heart />
              </Button>
              <Badge className="ml-2" variant="secondary">
                  {likes[tonesItems[current].id] || 0} curtidas
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
        {tonesItems.map((card) => (
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
                {tonesItems[current].preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
              </Button>
              <Button
                variant={isLiked[card.id] ? "default" : "secondary"}
                onClick={() => handleLike(card.id)}
                disabled={isLiked[card.id]}
              >
                <Heart />
              </Button>
              <Badge className="ml-2" variant="secondary">
                  {likes[card.id] || 0} curtidas
                </Badge>
            </div>
          </Card>
        ))}
      </div>
      <div className="flex w-full justify-center sm:justify-center md:justify-end lg:justify-end xl:justify-end">
        <Button variant="link" className="font-bold uppercase mt-10 xl:mr-[200px] text-lg" onClick={() => window.location.href = '/catalogo'}  >
            VER CATÁLOGO COMPLETO
          </Button>
      </div>
    </div>
  );
}


function Fornecedores() {
  return (
    <div className="w-full">
      <img src={Banner3} alt="" />
    </div>
  )
}

export function Home() {
  return (
    <div className="min-w-screen min-h-screen flex flex-col gap-10 sm:gap-10 md:gap-20 lg:gap-20 xl:gap-20 bg-white items-center mb-[200px]">
      <Propagandas/>
      <MaisCurtidas/>
      <Fornecedores/>
      <StarboyCollection/>
      <TonesCollection/>
    </div>
  )
}