import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Search, X } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { camisetas, Camiseta } from "../../../data/camisetas";

// Componente para exibir resultados da pesquisa
function SearchResults({ 
  results, 
  isVisible, 
  onClose, 
  onSelectItem 
}: {
  results: Camiseta[];
  isVisible: boolean;
  onClose: () => void;
  onSelectItem: (slug: string) => void;
}) {
  if (!isVisible) return null;

  return (
    <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-md shadow-lg max-h-96 overflow-y-auto z-50 mt-1">
      <div className="flex justify-between items-center p-3 border-b">
        <span className="text-sm font-medium text-gray-600">
          {results.length} resultado(s) encontrado(s)
        </span>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClose}
          className="h-6 w-6 p-0"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
      
      {results.length === 0 ? (
        <div className="p-4 text-center text-gray-500">
          Nenhum produto encontrado
        </div>
      ) : (
        <div className="max-h-80 overflow-y-auto">
          {results.map((camiseta) => (
            <div
              key={camiseta.id}
              className="flex items-center p-3 hover:bg-gray-50 cursor-pointer border-b last:border-b-0"
              onClick={() => onSelectItem(camiseta.slug)}
            >
              <img
                src={camiseta.imagem}
                alt={camiseta.nome}
                className="w-12 h-12 object-cover rounded mr-3"
              />
              <div className="flex-1">
                <h3 className="font-medium text-sm">{camiseta.nome}</h3>
                <p className="text-xs text-gray-500">Coleção {camiseta.colecao}</p>
                <p className="text-sm font-semibold text-green-600">
                  {camiseta.preco.toLocaleString('pt-BR', { 
                    style: 'currency', 
                    currency: 'BRL' 
                  })}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function HeaderSmall() {
  const [showSearch, setShowSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<Camiseta[]>([]);
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // Função para pesquisar nas camisetas
  const searchCamisetas = (term: string): Camiseta[] => {
    if (!term.trim()) return [];
    
    const lowercaseTerm = term.toLowerCase();
    return camisetas.filter((camiseta) =>
      camiseta.nome.toLowerCase().includes(lowercaseTerm) ||
      (camiseta.colecao && camiseta.colecao.toLowerCase().includes(lowercaseTerm)) ||
      camiseta.descricao.toLowerCase().includes(lowercaseTerm)
    );
  };

  // Effect para pesquisar quando o termo muda
  useEffect(() => {
    if (searchTerm.trim()) {
      const results = searchCamisetas(searchTerm);
      setSearchResults(results);
      setShowResults(true);
    } else {
      setSearchResults([]);
      setShowResults(false);
    }
  }, [searchTerm]);

  // Effect para fechar pesquisa ao clicar fora
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSearch(false);
        setShowResults(false);
        setSearchTerm("");
      }
    }

    if (showSearch) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showSearch]);

  const handleSelectItem = (slug: string) => {
    window.location.href = `/produto/${slug}`;
  };

  const handleCloseResults = () => {
    setShowResults(false);
    setSearchTerm("");
  };

  return (
    <div className="sticky top-0 z-50 flex flex-col justify-center items-center w-full bg-white border-b border-gray-200">
      <section className="flex items-center w-full px-4 py-3 gap-5">
        <a href="/">
          <h1 className="tracking-tight font-extrabold text-lg">T-SHIRT'S</h1>
        </a>

        <div className="relative ml-auto" ref={searchRef}>
          <Button
            size="icon"
            variant="ghost"
            onClick={() => setShowSearch((v) => !v)}
          >
            <Search />
          </Button>
          {showSearch && (
            <div className="relative">
              <Input
                autoFocus
                className="absolute right-0 top-12 w-48 shadow-lg"
                placeholder="Pesquisar..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onFocus={() => {
                  if (searchTerm.trim()) {
                    setShowResults(true);
                  }
                }}
              />
              <div className="absolute right-0 top-12 w-48 mt-10">
                <SearchResults
                  results={searchResults}
                  isVisible={showResults}
                  onClose={handleCloseResults}
                  onSelectItem={handleSelectItem}
                />
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export function Header() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<Camiseta[]>([]);
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // Função para pesquisar nas camisetas
  const searchCamisetas = (term: string): Camiseta[] => {
    if (!term.trim()) return [];
    
    const lowercaseTerm = term.toLowerCase();
    return camisetas.filter((camiseta) =>
      camiseta.nome.toLowerCase().includes(lowercaseTerm) ||
      (camiseta.colecao && camiseta.colecao.toLowerCase().includes(lowercaseTerm)) ||
      camiseta.descricao.toLowerCase().includes(lowercaseTerm)
    );
  };

  // Effect para pesquisar quando o termo muda
  useEffect(() => {
    if (searchTerm.trim()) {
      const results = searchCamisetas(searchTerm);
      setSearchResults(results);
      setShowResults(true);
    } else {
      setSearchResults([]);
      setShowResults(false);
    }
  }, [searchTerm]);

  // Effect para fechar pesquisa ao clicar fora
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    }

    if (showResults) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showResults]);

  const handleSelectItem = (slug: string) => {
    window.location.href = `/produto/${slug}`;
    setShowResults(false);
    setSearchTerm("");
  };

  const handleCloseResults = () => {
    setShowResults(false);
    setSearchTerm("");
  };

  const handleSearch = () => {
    if (searchTerm.trim() && searchResults.length > 0) {
      // Redireciona para o primeiro resultado ou para uma página de resultados
      handleSelectItem(searchResults[0].slug);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

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
            <div className="flex items-center justify-center relative" ref={searchRef}>
              <div className="relative">
                <Input 
                  className="w-[500px] h-[40px] ml-5 mr-5" 
                  placeholder="Procure aqui..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onFocus={() => {
                    if (searchTerm.trim()) {
                      setShowResults(true);
                    }
                  }}
                  onKeyPress={handleKeyPress}
                />
                <div className="absolute top-full left-5 right-5">
                  <SearchResults
                    results={searchResults}
                    isVisible={showResults}
                    onClose={handleCloseResults}
                    onSelectItem={handleSelectItem}
                  />
                </div>
              </div>
              <Button className="w-9 h-9" onClick={handleSearch}>
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