import { useEffect, useState } from 'react';
import Cartaz from '../../assets/cartazes/starboy.png'
import { getLikes, setLikes as saveLikes } from '@/utils/likes';
import { camisetas } from '@/data/camisetas';
import { CamisetaCard } from '@/components/camiseta-card';

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
    <div className="mt-20 mb-20 w-full">
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
          <CamisetaCard
            camiseta={starboyItems[current]}
            onLike={handleLike}
            isLiked={isLiked[starboyItems[current].id] || false}
            likesCount={likes[starboyItems[current].id] || 0}
            showBadge={true}
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
        {starboyItems.map((card) => (
          <CamisetaCard
            key={card.id}
            camiseta={card}
            onLike={handleLike}
            isLiked={isLiked[card.id] || false}
            likesCount={likes[card.id] || 0}
            showBadge={true}
          />
        ))}
      </div>
    </div>
  );
}

export function Starboy() {
  return (
    <div>
      <img src={Cartaz} alt="" />
      <StarboyCollection />
    </div>
  )
}