import { useKeenSlider } from "keen-slider/react"
import "keen-slider/keen-slider.min.css"
import { Card } from "@/components/ui/card"

import GODISALIVELOGO from '../assets/GODISALIVE.png'
import THISHIRTSLOGO from '../assets/THISHIRTS.png'
import STREETLOGO from '../assets/STREET.png'

function Propagandas() {
  const [ref] = useKeenSlider<HTMLDivElement>({
    loop: true,
  })
  return (
    <div ref={ref} className="keen-slider">
      <div className="keen-slider__slide number-slide1 text-center w-full h-[450px] bg-green-500"></div>
      <div className="keen-slider__slide number-slide2 text-center w-full h-[450px] bg-red-500"></div>
      <div className="keen-slider__slide number-slide3 text-center w-full h-[450px] bg-orange-500"></div>
      <div className="keen-slider__slide number-slide4 text-center w-full h-[450px] bg-yellow-500"></div>
      <div className="keen-slider__slide number-slide5 text-center w-full h-[450px] bg-purple-500"></div>
      <div className="keen-slider__slide number-slide6 text-center w-full h-[450px] bg-blue-500"></div>
    </div>
  )
}

function Linhas() {
  return (
    <div className="mt-20 w-full">
      <h1 className="text-3xl font-bold mb-[70px] uppercase ml-[200px]">Linhas Lançamento</h1>
      <div className="flex grid-cols-3 items-center justify-center gap-5">
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

export function Home() {
  return (
    <div className="min-w-screen min-h-screen flex flex-col bg-white items-center">
      <Propagandas/>
      <Linhas/>
    </div>
  )
}