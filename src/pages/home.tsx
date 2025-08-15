import { useKeenSlider } from "keen-slider/react"
import "keen-slider/keen-slider.min.css"
import { Card } from "@/components/ui/card"

import GODISALIVELOGO from '../assets/GODISALIVE.png'
import THISHIRTSLOGO from '../assets/THISHIRTS.png'
import STREETLOGO from '../assets/STREET.png'

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
      <div className="keen-slider__slide number-slide1 text-center w-full max-h-[450px]"><img src={Banner1} alt="Banner 1" /></div>
      <div className="keen-slider__slide number-slide2 text-center w-full max-h-[450px]"><img src={Banner2} alt="Banner 2" /></div>
      <div className="keen-slider__slide number-slide3 text-center w-full max-h-[450px]"><img src={Banner3} alt="Banner 3" /></div>
    </div>
  )
}

function Linhas() {
  return (
    <div className="mt-20 w-full">
      <h1 className="text-2xl text-center sm:text-2xl sm:text-center md:text-3xl md:text-center lg:text-3xl lg:ml-[200px] lg:text-start lg:mb-[70px] xl:text-3xl xl:ml-[200px] xl:text-start xl:mb-[70px] font-bold uppercase mb-10">Linhas Lançamento</h1>
      <div className="flex lg:grid-cols-3 xl:grid-cols-3 items-center justify-center gap-5">
        <Card className="w-[370px] h-[100px] flex items-center justify-center transition duration-300 hover:scale-105 hover:shadow-lg">
          <img src={GODISALIVELOGO} alt="GODISALIVELOGO" className="mt-4"/>
        </Card>
        <Card className="w-[370px] h-[100px] flex items-center justify-center transition duration-300 hover:scale-105 hover:shadow-lg">
          <img src={THISHIRTSLOGO} alt="THISHIRTSLOGO" className="mt-2"/>
        </Card>
        <Card className="w-[370px] h-[100px] flex items-center justify-center transition duration-300 hover:scale-105 hover:shadow-lg">
          <img src={STREETLOGO} alt="STREETLOGO" className=""/>
        </Card>
      </div>
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
                Visualizar item
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
                Visualizar item
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
      <Linhas/>
      <MaisCurtidas/>
      <Fornecedores/>

      <a href="/catalogo" className="ml-10 sm:block md:hidden lg:hidden xl:hidden">
        <Button variant="outline">Catálogo</Button>
      </a>
    </div>
  )
}