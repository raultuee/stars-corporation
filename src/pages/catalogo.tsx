import { camisetas } from "../data/camisetas";
import { useEffect, useState } from "react";
import { getLikes, setLikes } from "../utils/likes";
import { CamisetaCard } from "@/components/camiseta-card";

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
            <div key={camiseta.id} className="mx-auto">
              <CamisetaCard
                camiseta={camiseta}
                onLike={handleLike}
                isLiked={isLiked[camiseta.id] || false}
                likesCount={likes[camiseta.id] || 0}
                showBadge={true}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}