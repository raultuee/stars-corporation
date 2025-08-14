import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Search } from "lucide-react";

export function Header() {
  return (
    <div className="sticky top-0 z-50 flex flex-col justify-center items-center w-full bg-white border-b border-gray-200">
      <section className="flex justify-center mt-5 mb-5">
        <a href="/landing-page">
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
          <Button className="w-[150px] mt-[2px] ml-5 mr-5">
            Apoiar equipe
          </Button>
        </div>
      </section>
    </div>
  );
}