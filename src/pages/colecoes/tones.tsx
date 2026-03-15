import Cartaz from '../../assets/cartazes/tones.png'
import { useEffect, useState } from 'react';
import { getLikes, setLikes } from '@/utils/likes';
import { camisetas } from '@/data/camisetas';
import { CamisetaCard } from '@/components/camiseta-card';

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
    <div className="mt-20 mb-20 w-full">
      <h1 className="text-2xl text-center sm:text-2xl sm:text-center md:text-3xl md:text-center lg:text-3xl lg:ml-[200px] lg:text-start lg:mb-[70px] xl:text-3xl xl:ml-[200px] xl:text-start xl:mb-[70px] font-bold uppercase mb-10">
        TONES COLLECTION
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
        {tonesItems.length > 0 && (
          <CamisetaCard
            camiseta={tonesItems[current]}
            onLike={handleLike}
            isLiked={isLiked[tonesItems[current].id] || false}
            likesCount={likes[tonesItems[current].id] || 0}
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
        {tonesItems.map((card) => (
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


export function Tones() {
    return (
        <div>
            <img src={Cartaz} alt="" />
            <TonesCollection/>
        </div>
    )
}