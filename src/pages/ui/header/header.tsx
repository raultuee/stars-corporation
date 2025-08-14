import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Search } from "lucide-react";
import { useState } from "react";

function HeaderSmall() {
  const [showSearch, setShowSearch] = useState(false);

  return (
    <div className="sticky top-0 z-50 flex flex-col justify-center items-center w-full bg-white border-b border-gray-200">
      {/* Conteúdo do header para mobile */}
      <section className="flex items-center w-full px-4 py-3 gap-5">
        <a href="/">
          <h1 className="tracking-tight font-extrabold text-lg">T-SHIRT'S</h1>
        </a>

        <div className="relative ml-auto">
          <Button
            size="icon"
            variant="ghost"
            onClick={() => setShowSearch((v) => !v)}
          >
            <Search />
          </Button>
          {showSearch && (
            <Input
              autoFocus
              className="absolute right-0 top-12 w-48 shadow-lg"
              placeholder="Pesquisar..."
              onBlur={() => setShowSearch(false)}
            />
          )}
        </div>
      </section>
    </div>
  );
}

export function Header() {
  return (
    <>
      <div className="block sm:hidden">
        <HeaderSmall />
      </div>
      <div className="hidden sm:block">
        <div className="sticky top-0 z-50 flex flex-col justify-center items-center w-full bg-white border-b border-gray-200">
          <section className="flex justify-center mt-5 mb-5">
            <a href="/">
              <section className="mr-10 flex text-center">
                <h1 className="mt-[7px] tracking-tight font-extrabold text-xl">T-SHIRT'S</h1>
              </section>
            </a>
            <Separator orientation="vertical" className="h-[40px]" />
            <div className="flex items-center justify-center">
              <Input className="w-[500px] h-[40px] ml-5 mr-5" placeholder="Procure aqui..." />
              <Button className="w-9 h-9">
                <Search />
              </Button>
            </div>
            <div>
              <a href="/catalogo">
                <Button className="w-[150px] mt-[2px] ml-5 mr-5">
                  Acessar catálogo
                </Button>
              </a>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}