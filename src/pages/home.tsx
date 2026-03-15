import { useKeenSlider } from "keen-slider/react"
import "keen-slider/keen-slider.min.css"

import BannerReturns from '../assets/banners/banner6.png'

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Heart } from "lucide-react"
import { useState, useEffect } from "react"
import { getLikes, setLikes as saveLikes } from "../utils/likes";
import { camisetas } from "../data/camisetas";
import { CamisetaCard } from "@/components/camiseta-card"


function Propagandas() {
  const [ref] = useKeenSlider<HTMLDivElement>({
    loop: true,
    created(slider) {
      setInterval(() => {
        if (slider) {
          slider.next();
        }
      }, 3500);
    },
  })
  return (
    <div ref={ref} className="keen-slider">
      <div className="keen-slider__slide number-slide2 text-center w-full max-h-[550px]"><img src={BannerReturns} alt="Banner 1" /></div>
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
    saveLikes(newLikes);
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
          className="p-2 bg-slate-100 hover:bg-slate-200 transition duration-300"
          aria-label="Anterior"
        >
          &#8592;
        </button>
        {top3.length > 0 && (
          <CamisetaCard
            camiseta={top3[current]}
            onLike={handleLike}
            isLiked={isLiked[top3[current].id] || false}
            likesCount={likes[top3[current].id] || 0}
            showBadge={false}
          />
        )}
        <button
          onClick={handleNext}
          className="p-2 bg-slate-100 hover:bg-slate-200 transition duration-300"
          aria-label="Próximo"
        >
          &#8594;
        </button>
      </div>
      {/* Desktop: todos os cards */}
      <div className="hidden sm:flex flex-wrap items-center justify-center gap-5">
        {top3.map((card) => (
          <CamisetaCard
            key={card.id}
            camiseta={card}
            onLike={handleLike}
            isLiked={isLiked[card.id] || false}
            likesCount={likes[card.id] || 0}
            showBadge={false}
          />
        ))}
      </div>
      <div className="flex w-full justify-center sm:justify-center md:justify-end lg:justify-end xl:justify-end">
        <Button variant="link" className="font-bold uppercase mt-10 xl:mr-[200px] text-lg" onClick={() => window.location.href = '/catalogo'}>
          VER CATÁLOGO COMPLETO
        </Button>
      </div>
    </div>
  );
}

function MaisRecentes() {
  const [likes, setLikesState] = useState<Record<string, number>>({});
  const [isLiked, setIsLiked] = useState<Record<string, boolean>>({});
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    setLikesState(getLikes());
  }, []);

  function handleLike(id: string) {
    const newLikes = { ...likes, [id]: (likes[id] || 0) + 1 };
    saveLikes(newLikes);
    setLikesState(newLikes);
    setIsLiked({ ...isLiked, [id]: true });
  }

  // Ordena as camisetas por ID (decrescente) e pega as 3 mais recentes
  const top3 = [...camisetas]
    .sort((a, b) => {
      const idA = parseInt(a.id);
      const idB = parseInt(b.id);
      return idB - idA;
    })
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
        Lançamentos
      </h1>
      {/* Mobile: apenas 1 card, com botões laterais */}
      <div className="flex items-center justify-center gap-5 sm:hidden">
        <button
          onClick={handlePrev}
          className="p-2 bg-slate-100 hover:bg-slate-200 transition duration-300"
          aria-label="Anterior"
        >
          &#8592;
        </button>
        {top3.length > 0 && (
          <CamisetaCard
            camiseta={top3[current]}
            onLike={handleLike}
            isLiked={isLiked[top3[current].id] || false}
            likesCount={likes[top3[current].id] || 0}
            showBadge={false}
          />
        )}
        <button
          onClick={handleNext}
          className="p-2 bg-slate-100 hover:bg-slate-200 transition duration-300"
          aria-label="Próximo"
        >
          &#8594;
        </button>
      </div>
      {/* Desktop: todos os cards */}
      <div className="hidden sm:flex flex-wrap items-center justify-center gap-5">
        {top3.map((card) => (
          <CamisetaCard
            key={card.id}
            camiseta={card}
            onLike={handleLike}
            isLiked={isLiked[card.id] || false}
            likesCount={likes[card.id] || 0}
            showBadge={false}
          />
        ))}
      </div>
      <div className="flex w-full justify-center sm:justify-center md:justify-end lg:justify-end xl:justify-end">
        <Button variant="link" className="font-bold uppercase mt-10 xl:mr-[200px] text-lg" onClick={() => window.location.href = '/catalogo'}>
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
    saveLikes(newLikes);
    setLikesState(newLikes);
    setIsLiked({ ...isLiked, [id]: true });
  }

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
          className="p-2 bg-slate-100 hover:bg-slate-200 transition duration-300"
          aria-label="Anterior"
        >
          &#8592;
        </button>
        {starboyItems.length > 0 && (
          <Card className="group w-[320px] h-[400px] flex flex-col items-center justify-center transition duration-300 hover:scale-105 relative">
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
              <Badge className="ml-2 hidden md:block lg:block xl:block" variant="secondary">
                {likes[starboyItems[current].id] || 0} curtidas
              </Badge>
            </div>
          </Card>
        )}
        <button
          onClick={handleNext}
          className="p-2 bg-slate-100 hover:bg-slate-200 transition duration-300"
          aria-label="Próximo"
        >
          &#8594;
        </button>
      </div>
      {/* Desktop: todos os cards */}
      <div className="hidden sm:flex flex-wrap items-center justify-center gap-5">
        {starboyItems.map((card) => (
          <Card
            key={card.id}
            className="group w-[400px] h-[475px] flex flex-col items-center justify-center transition duration-300 hover:scale-105"
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
                {card.preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
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
        <Button variant="link" className="font-bold uppercase mt-10 xl:mr-[200px] text-lg" onClick={() => window.location.href = '/catalogo'}>
          VER CATÁLOGO COMPLETO
        </Button>
      </div>
    </div>
  );
}

function CelestialCollection() {
  const [likes, setLikesState] = useState<Record<string, number>>({});
  const [isLiked, setIsLiked] = useState<Record<string, boolean>>({});
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    setLikesState(getLikes());
  }, []);

  function handleLike(id: string) {
    const newLikes = { ...likes, [id]: (likes[id] || 0) + 1 };
    saveLikes(newLikes);
    setLikesState(newLikes);
    setIsLiked({ ...isLiked, [id]: true });
  }

  const celestialItems = [...camisetas]
    .filter(camiseta => camiseta.colecao === "Celestial");

  function handlePrev() {
    setCurrent((prev) => (prev === 0 ? celestialItems.length - 1 : prev - 1));
  }

  function handleNext() {
    setCurrent((prev) => (prev === celestialItems.length - 1 ? 0 : prev + 1));
  }

  return (
    <div className="mt-20 w-full">
      <h1 className="text-2xl text-center sm:text-2xl sm:text-center md:text-3xl md:text-center lg:text-3xl lg:ml-[200px] lg:text-start lg:mb-[70px] xl:text-3xl xl:ml-[200px] xl:text-start xl:mb-[70px] font-bold uppercase mb-10">
        CELESTIAL COLLECTION
      </h1>
      {/* Mobile: apenas 1 card, com botões laterais */}
      <div className="flex items-center justify-center gap-5 sm:hidden">
        <button
          onClick={handlePrev}
          className="p-2 bg-slate-100 hover:bg-slate-200 transition duration-300"
          aria-label="Anterior"
        >
          &#8592;
        </button>
        {celestialItems.length > 0 && (
          <Card className="group w-[320px] h-[400px] flex flex-col items-center justify-center transition duration-300 hover:scale-105 relative">
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
          className="p-2 bg-slate-100 hover:bg-slate-200 transition duration-300"
          aria-label="Próximo"
        >
          &#8594;
        </button>
      </div>
      {/* Desktop: todos os cards */}
      <div className="hidden sm:flex flex-wrap items-center justify-center gap-5">
        {celestialItems.map((card) => (
          <Card
            key={card.id}
            className="group w-[400px] h-[475px] flex flex-col items-center justify-center transition duration-300 hover:scale-105"
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
                {card.preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
              </Button>
              <Button
                variant={isLiked[card.id] ? "default" : "secondary"}
                onClick={() => handleLike(card.id)}
                disabled={isLiked[card.id]}
              >
                <Heart />
              </Button>
              <Badge className="ml-2 hidden md:block lg:block xl:block" variant="secondary">
                {likes[card.id] || 0} curtidas
              </Badge>
            </div>
          </Card>
        ))}
      </div>
      <div className="flex w-full justify-center sm:justify-center md:justify-end lg:justify-end xl:justify-end">
        <Button variant="link" className="font-bold uppercase mt-10 xl:mr-[200px] text-lg" onClick={() => window.location.href = '/catalogo'}>
          VER CATÁLOGO COMPLETO
        </Button>
      </div>
    </div>
  );
}

function Fornecedores() {
  return (
    <div className="w-full">
      <img src={BannerReturns} alt="" />
    </div>
  )
}

export function Home() {
  return (
    <div className="min-w-screen min-h-screen flex flex-col gap-10 sm:gap-10 md:gap-20 lg:gap-20 xl:gap-20 items-center mb-[200px]">
      <Propagandas />
      <MaisRecentes />
      <MaisCurtidas />
      <Fornecedores />
      <StarboyCollection />
      <CelestialCollection />
    </div>
  )
}