import { camisetas } from "../data/camisetas";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";

export function Catalogo() {
  return (
    <div className="min-h-screen w-full flex flex-col px-4">
      <h1 className="text-3xl font-bold uppercase my-10 text-start ml-[200px]">Catálogo de Camisetas</h1>
      <div className="flex flex-col items-center justify-center mb-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-7xl">
            {camisetas.map((camiseta) => (
              <Card
                key={camiseta.id}
                className="w-[400px] h-[475px] flex flex-col items-center justify-center transition duration-300 hover:scale-105 hover:shadow-lg mx-auto"
              >
                <img
                  src={camiseta.imagem}
                  alt={camiseta.nome}
                  className="w-[300px] h-[300px] object-cover mb-4"
                />
                <h2 className="text-xl font-semibold text-center mt-5 mb-5">{camiseta.nome}</h2>
                <div className="flex gap-2">
                  <Button
                    className="w-[200px]"
                    onClick={() => window.location.href = `/produto/${camiseta.slug}`}
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
    </div>
  );
}