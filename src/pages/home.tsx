import { useKeenSlider } from "keen-slider/react"
import "keen-slider/keen-slider.min.css"
import { Card } from "@/components/ui/card"

import GODISALIVELOGO from '../assets/GODISALIVE.png'
import THISHIRTSLOGO from '../assets/THISHIRTS.png'
import STREETLOGO from '../assets/STREET.png'

import Banner1 from '../assets/banners/banner1.png'

import MaisVendido1 from '../assets/mais-vendidos/starboy1.png'
import MaisVendido2 from '../assets/mais-vendidos/starboy2.png'
import MaisVendido3 from '../assets/mais-vendidos/starboy3.png'

import MaisVendido1Costas from '../assets/produtos/starboy1-back.png'
import MaisVendido2Costas from '../assets/produtos/starboy-2-back.png'

import { Button } from "@/components/ui/button"
import { Heart } from "lucide-react"
import { useState } from "react"


function Propagandas() {
  const [ref] = useKeenSlider<HTMLDivElement>({
    loop: true,
  })
  return (
    <div ref={ref} className="keen-slider">
      <div className="keen-slider__slide number-slide1 text-center w-full max-h-[450px] bg-green-500"><img src={Banner1} alt="Banner 1" /></div>
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
  const [current, setCurrent] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  const cards = [
    {
      img: MaisVendido1,
      imgSec: MaisVendido1Costas,
      title: "Camiseta Starboy #1",
      url: "/produto/starboy1",
    },
    {
      img: MaisVendido2,
      imgSec: MaisVendido2Costas,
      title: "Camiseta Starboy #2",
      url: "/produto/starboy2",
    },
    {
      img: MaisVendido3,
      title: "Camiseta Starboy #3",
      url: "/produto/starboy3",
    },
  ];

  const handlePrev = () => setCurrent((prev: number) => (prev === 0 ? cards.length - 1 : prev - 1));
  const handleNext = () => setCurrent((prev: number) => (prev === cards.length - 1 ? 0 : prev + 1));

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
        <Card className="group w-[320px] h-[400px] flex flex-col items-center justify-center transition duration-300 hover:scale-105 hover:shadow-lg relative">
          <div className="relative w-[220px] h-[220px] mb-4">
            <img
              src={cards[current].img}
              alt={cards[current].title}
              className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300 opacity-100 group-hover:opacity-0"
            />
            {cards[current].imgSec && (
              <img
                src={cards[current].imgSec}
                alt={cards[current].title + ' costas'}
                className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300 opacity-0 group-hover:opacity-100"
              />
            )}
          </div>
          <h2 className="text-xl font-semibold text-center mt-5 mb-5">{cards[current].title}</h2>
          <div className="flex gap-2">
            <Button
              className="w-[150px]"
              onClick={() => window.location.href = cards[current].url}
            >
              Visualizar item
            </Button>
            <Button
              onClick={() => setIsLiked(!isLiked)}
              variant={isLiked ? "default" : "secondary"}
            >
              <Heart />
            </Button>
          </div>
        </Card>
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
        {cards.map((card, idx) => (
          <Card
            key={idx}
            className="group w-[400px] h-[475px] flex flex-col items-center justify-center transition duration-300 hover:scale-105 hover:shadow-lg"
          >
            <div className="relative w-[300px] h-[300px] mb-4">
              <img
                src={card.img}
                alt={card.title}
                className={
                  card.imgSec
                    ? "absolute inset-0 w-full h-full object-cover transition-opacity duration-300 opacity-100 group-hover:opacity-0"
                    : "absolute inset-0 w-full h-full object-cover transition-opacity duration-300 opacity-100 group-hover:opacity-100"
                }
              />
              {card.imgSec && (
                <img
                  src={card.imgSec}
                  alt={card.title + ' costas'}
                  className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300 opacity-0 group-hover:opacity-100"
                />
              )}
            </div>
            <h2 className="text-xl font-semibold text-center mt-5 mb-5">{card.title}</h2>
            <div className="flex gap-2">
              <Button
                className="w-[200px]"
                onClick={() => window.location.href = card.url}
              >
                Visualizar item
              </Button>
              <Button variant="secondary">
                <Heart />
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}


export function Home() {
  return (
    <div className="min-w-screen min-h-screen flex flex-col gap-10 sm:gap-10 md:gap-20 lg:gap-20 xl:gap-20 bg-white items-center mb-[200px]">
      <Propagandas/>
      <Linhas/>
      <MaisCurtidas/>

      
        <a href="/catalogo" className="ml-10 sm:block md:hidden lg:hidden xl:hidden">
          <Button variant="outline">Catálogo</Button>
        </a>
    </div>
  )
}