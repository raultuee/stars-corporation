import { useParams } from "react-router-dom";
import { getLikes } from "../utils/likes";
import { camisetas } from "../data/camisetas";
import { cupons } from "../data/cupons";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PlusCircle } from "lucide-react";
import { toast } from "sonner";

export function ProdutoPage() {
  const { slug } = useParams<{ slug: string }>();
  const camiseta = camisetas.find((c) => c.slug === slug);

  const [likes, setLikes] = useState(0);
  const [cupomInput, setCupomInput] = useState("");
  const [cupomAplicado, setCupomAplicado] = useState<{codigo: string, desconto: number} | null>(null);
  const [mensagemCupom, setMensagemCupom] = useState("");
  const [selectedSize, setSelectedSize] = useState(""); // Adicione para o tamanho
  const [selectedEstilo, setSelectedEstilo] = useState<"Oversized" | "Regular">("Oversized");
  const options = [
          { label: "Oversized", value: true },
          { label: "Regular", value: false },
        ];

  function SelecionarEstilo() {
    return (
      <div className="flex gap-3 mb-2">
        {options.map((opt) => (
          <Button
            className="w-1/2"
            key={opt.label}
            variant={selectedEstilo === opt.label ? "default" : "ghost"}
            onClick={() => setSelectedEstilo(opt.label as "Oversized" | "Regular")}
          >
            {opt.label}
          </Button>
        ))}
      </div>
    );
  }

  useEffect(() => {
    const allLikes = getLikes();
    if (camiseta) setLikes(allLikes[camiseta.id] || 0);
  }, [camiseta]);

  const validarCupom = () => {
    if (!cupomInput.trim()) {
      setMensagemCupom("Digite um código de cupom");
      return;
    }

    const cupomEncontrado = cupons.find(
      cupom => cupom.codigo.toLowerCase() === cupomInput.toLowerCase()
    );

    if (cupomEncontrado) {
      // Verifica se o cupom tem restrição de coleção
      if (cupomEncontrado.colecao && camiseta && cupomEncontrado.colecao !== camiseta.colecao) {
        setCupomAplicado(null);
        setMensagemCupom(`Este cupom é válido apenas para a coleção ${cupomEncontrado.colecao}`);
      } else {
        setCupomAplicado({
          codigo: cupomEncontrado.codigo,
          desconto: cupomEncontrado.desconto
        });
        setMensagemCupom(`Cupom aplicado! ${cupomEncontrado.desconto}% de desconto`);
        setCupomInput("");
      }
    } else {
      setCupomAplicado(null);
      setMensagemCupom("Cupom inválido ou não encontrado");
    }

    // Limpar mensagem após 3 segundos
    setTimeout(() => setMensagemCupom(""), 3000);
  };

  const calcularPrecoFinal = () => {
    if (!camiseta) return 0;
    if (cupomAplicado) {
      const desconto = (camiseta.preco * cupomAplicado.desconto) / 100;
      return camiseta.preco - desconto;
    }
    return camiseta.preco;
  };

  function handleAddToCart() {
    if (!selectedSize) {
      toast.error("Selecione o tamanho!");
      return;
    }
    if (!camiseta) {
      toast.error("Camiseta não encontrada!");
      return;
    }
    const carrinho = JSON.parse(localStorage.getItem("carrinho") || "[]");
    if (carrinho.length >= 3) {
      toast.error("O carrinho pode conter no máximo 3 itens.");
      return;
    }
    const item = {
      id: camiseta.id,
      nome: camiseta.nome,
      preco: calcularPrecoFinal(),
      tamanho: selectedSize,
      tipo: selectedEstilo, // Adiciona o estilo escolhido
      cupom: cupomAplicado ? cupomAplicado.codigo : "Nenhum cupom",
      colecao: camiseta.colecao,
    };
    carrinho.push(item);
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
    toast.success("Camiseta adicionada ao carrinho!");
  }

  if (!camiseta) return <div>Camiseta não encontrada.</div>;

  

  return (
    <div className="mx-auto p-4 flex flex-col sm:flex-row gap-8 w-full items-center justify-center mt-10 mb-[110px]">
      <div className="flex flex-col items-center mt-7">
        <div className="relative w-full max-w-md mb-6 group">
          <img
            src={camiseta.imagem}
            alt={camiseta.nome}
            className={
              camiseta.imagemSec
                ? "absolute inset-0 w-full h-full object-cover transition-opacity duration-300 opacity-100 group-hover:opacity-0"
                : "absolute inset-0 w-full h-full object-cover transition-opacity duration-300 opacity-100 group-hover:opacity-100"
            }
          />
          {camiseta.imagemSec && (
            <img
              src={camiseta.imagemSec}
              alt={camiseta.nome + " costas"}
              className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300 opacity-0 group-hover:opacity-100"
            />
          )}
          {/* Para manter o espaço reservado */}
          <div className="invisible">
            <img src={camiseta.imagem} alt="" className="w-full max-w-md mx-auto" />
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-center gap-2">
        
        <h1 className="text-3xl font-bold mt-16">{camiseta.nome}</h1>
        <Badge className="flex justify-center items-center w-full cursor-pointer animate-pulse">{`Coleção ${camiseta.colecao}`}</Badge>
        <Badge variant="secondary" className="flex justify-center items-center w-full cursor-pointer">{likes} curtidas</Badge>
        <p className="text-muted-foreground text-sm mt-2">{camiseta.descricao}</p>
        
        {/* Exibição do preço */}
        <div className="">
          {cupomAplicado && (
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg line-through text-muted-foreground">R$ {camiseta.preco.toFixed(2)}</span>
              <Badge variant="destructive" className="text-xs">{cupomAplicado.desconto}% OFF</Badge>
            </div>
          )}
          <span className="text-3xl font-bold block">R$ {calcularPrecoFinal().toFixed(2)}</span>
        </div>

        <div className="mb-2">
          <Select onValueChange={setSelectedSize}>
            <SelectTrigger className="">
              <SelectValue placeholder="Selecione o tamanho" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Tamanhos</SelectLabel>
                <SelectItem value="PP">PP</SelectItem>
                <SelectItem value="P">P</SelectItem>
                <SelectItem value="M">M</SelectItem>
                <SelectItem value="G">G</SelectItem>
                <SelectItem value="GG">GG</SelectItem>
                <SelectItem value="XG">XG</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <SelecionarEstilo/>

        <div className="flex items-center">
          <Button
            className="w-full flex rounded-xl items-center"
            onClick={handleAddToCart}
          >
            <PlusCircle className="mt-[1px]" /> Adicionar ao carrinho
          </Button>
        </div>
        
        <div className="flex flex-col gap-1 mt-2">
          <Label>Inserir cupom</Label>
          <div className="flex gap-2">
            <Input
              className="uppercase"
              value={cupomInput}
              onChange={(e) => setCupomInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && validarCupom()}
            />
            <Button onClick={validarCupom}>Ativar</Button>
          </div>
          {mensagemCupom && (
            <p className={`text-sm mt-1 ${
              mensagemCupom.includes('aplicado') 
                ? 'text-green-600' 
                : 'text-red-600'
            }`}>
              {mensagemCupom}
            </p>
          )}
          {cupomAplicado && (
            <Badge variant="outline" className="mt-2 w-fit">
              Cupom {cupomAplicado.codigo} ativo
              {cupons.find(c => c.codigo === cupomAplicado.codigo)?.colecao && 
                ` - ${cupons.find(c => c.codigo === cupomAplicado.codigo)?.colecao}`}
            </Badge>
          )}
        </div>
      </div>
    </div>
  );
}