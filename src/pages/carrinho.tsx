import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Check, House, X } from "lucide-react";
import { useEffect, useState } from "react";

type CarrinhoItem = {
    nome: string;
    tamanho: string;
    cupom: string;
    preco: number;
};

export function Carrinho() {
    const [itens, setItens] = useState<CarrinhoItem[]>([]);

    useEffect(() => {
        const carrinho = JSON.parse(localStorage.getItem("carrinho") || "[]");
        setItens(carrinho);
    }, []);

    return (
        <div className="min-w-screen flex flex-col gap-10 sm:gap-10 md:gap-20 lg:gap-20 xl:gap-20 bg-white">
            <div className="p-8 mt-[60px] md:ml-[200px] lg:ml-[200px] xl:ml-[200px]">
                <h1 className="font-bold text-2xl uppercase mb-7">Carrinho</h1>
                <div className="flex flex-col gap-4">
                    {itens.length === 0 && <p>Carrinho vazio.</p>}
                    {itens.map((item, idx) => (
                        <div className="flex items-center gap-2" key={idx}>
                            <Card key={idx} className="flex md:w-[500px] lg:w-[500px] xl:w-[500px] cursor-pointer hover:shadow-lg transition-shadow">
                                <CardHeader className="flex">
                                    <CardTitle>{item.nome}</CardTitle>
                                    <CardDescription className="flex gap-2">
                                        <Badge variant="default">Tamanho {item.tamanho}</Badge>
                                        <Badge variant="secondary">{item.cupom}</Badge>
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="flex flex-col text-center">
                                    <p className="font-semibold text-xl mt-8 ml-[100px]">R$ {item.preco.toFixed(2)}</p>
                                </CardContent>
                            </Card>
                            
                        <Button
                            variant="ghost"
                            onClick={() => {
                                const novoCarrinho = itens.filter((_, i) => i !== idx);
                                setItens(novoCarrinho);
                                localStorage.setItem("carrinho", JSON.stringify(novoCarrinho));
                            }}
                        >
                            <X/>
                        </Button>
                        </div>
                    ))}
                    
                </div>
                <div>
                    <Separator className="my-8 bg-neutral-200" />

                    <Dialog>
                        <DialogTrigger>
                            <Button variant="secondary"> <House/> Adicionar endereço</Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Adicione seu endereço</DialogTitle>
                                <DialogDescription>Os envios serão apenas entregues na cidade de Franca (São Paulo), com a taxa fixa de R$10,00.</DialogDescription>
                            </DialogHeader>

                            <form className="flex flex-col gap-4">

                                <div className="">
                                    <Label>CEP</Label>
                                    <Input required/>
                                </div>

                                <div className="">
                                    <Label>Logradouro</Label>
                                    <Input required/>
                                </div>

                                <div className="">
                                    <Label>Número</Label>
                                    <Input required/>
                                </div>

                                <div className="">
                                    <Label>Bairro</Label>
                                    <Input required/>
                                </div>

                                <div className="">
                                    <Label>Complemento</Label>
                                    <Input required/>
                                </div>

                                <div className="">
                                    <Label>Nome do Destinário</Label>
                                    <Input required/>
                                </div>

                                <Button>Confirmar</Button>
                            </form>
                        </DialogContent>
                    </Dialog>

                    <Button className="ml-4"><Check/> Finalizar pedido</Button>

                    <div className="flex justify-end mr-[100px] mt-4">
                       <p className="font-bold text-xl">
                            Total: R$ { 
                                itens.length === 0 
                                    ? "0.00" 
                                    : (itens.reduce((acc, item) => acc + item.preco, 0) + 10).toFixed(2) 
                            }
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}