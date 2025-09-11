import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { ChevronDown, Search, X } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { camisetas, Camiseta } from "../../../data/camisetas";

import Logotipo from '../../../assets/logo.png';

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
  const [isUnstuck, setIsUnstuck] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
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

  // Effect para controlar o scroll
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        // Scrolling down and past threshold - unstick
        if (!isUnstuck) {
          setIsUnstuck(true);
        }
      } else if (currentScrollY < lastScrollY && currentScrollY < 30) {
        // Scrolling up and near top - stick back
        if (isUnstuck) {
          setIsUnstuck(false);
        }
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY, isUnstuck]);

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
    <div 
      className={`
        ${isUnstuck ? 'fixed' : 'sticky'} 
        top-0 z-50 flex flex-col justify-center items-center w-full bg-[#141414] border-b border-neutral-700
        transition-all duration-500 ease-out
        ${isUnstuck 
          ? 'transform -translate-y-1 shadow-xl backdrop-blur-sm bg-[#141414]/95' 
          : 'transform translate-y-0 shadow-none bg-[#141414]'
        }
      `}
      style={{
        transform: isUnstuck 
          ? 'translateY(-4px) scale(0.98)' 
          : 'translateY(0px) scale(1)',
        opacity: isUnstuck ? 0.95 : 1,
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
      }}
    >
      <section className="flex items-center w-full px-4 py-3 gap-5">
        <a href="/">
          <img src={Logotipo} alt="Logotipo" className="w-[80px] mt-1"/>
        </a>

        <div className="relative ml-auto" ref={searchRef}>
          <Button
            size="icon"
            variant="ghost"
            onClick={() => setShowSearch((v) => !v)}
          >
            <Search color="white" />
          </Button>
          {showSearch && (
            <div className="relative">
              <Input
                autoFocus
                className="absolute right-0 top-12 w-48 shadow-lg bg-white"
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
  const [isUnstuck, setIsUnstuck] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
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

  // Effect para controlar o scroll
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > lastScrollY && currentScrollY > 120) {
        // Scrolling down and past threshold - unstick
        if (!isUnstuck) {
          setIsUnstuck(true);
        }
      } else if (currentScrollY < lastScrollY && currentScrollY < 60) {
        // Scrolling up and near top - stick back
        if (isUnstuck) {
          setIsUnstuck(false);
        }
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY, isUnstuck]);

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
        <div 
          className={`
            ${isUnstuck ? 'fixed' : 'sticky'} 
            top-0 z-50 flex flex-col justify-center items-center w-full bg-[#141414] border-b border-neutral-800
            transition-all duration-500 ease-out
            ${isUnstuck 
              ? 'shadow-2xl backdrop-blur-sm bg-[#141414]/95' 
              : 'shadow-none bg-[#141414]'
            }
          `}
          style={{
            transform: isUnstuck 
              ? 'translateY(-6px) scale(0.97)' 
              : 'translateY(0px) scale(1)',
            opacity: isUnstuck ? 0.96 : 1,
            transition: 'all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
          }}
        >
          <section className="flex justify-center mt-5 mb-5">
            <a href="/">
              <section className="mr-10 flex text-center">
                <img src={Logotipo} alt="" className="w-[80px] mt-1"/>
              </section>
            </a>
            <Separator orientation="vertical" className="h-[40px] mt-[4px] mr-[20px] bg-neutral-700" />
            <div className="flex items-center justify-center relative" ref={searchRef}>
              <div className="relative">
                <Input 
                  className="w-[500px] h-[40px] ml-5 mr-5 bg-[#2A2B2A] border-[#141414] text-white" 
                  placeholder="Procure por camisetas..." 
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
              <Button className="w-9 h-9 bg-[#2A2B2A]" onClick={handleSearch}>
                <Search color="white" />
              </Button>
            </div>
            <div>
            </div>
          </section>
          <section className="text-white mb-4 flex gap-3">
            <a href="/colecoes/starboy"><Button variant="ghost" className="font-semibold">STARBOY <ChevronDown/></Button></a>
            <a href="/colecoes/tones"><Button variant="ghost" className="font-semibold">TONES <ChevronDown/></Button></a>
            <a href="/colecoes/celestial"><Button variant="ghost" className="font-semibold">CELESTIAL <ChevronDown/></Button></a>
            <a href="/catalogo"><Button variant="ghost" className="font-semibold">CATÁLOGO <ChevronDown/></Button></a>
            <a href="/criar-camiseta"><Button variant="ghost" className="font-semibold">CRIE SUA PRÓPRIA CAMISETA <ChevronDown/></Button></a>
          </section>
        </div>
      </div>
    </>
  );
}