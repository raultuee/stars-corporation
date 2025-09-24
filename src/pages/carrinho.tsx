import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Check, House, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

type CarrinhoItem = {
    id: string;
    slug?: string;
    nome: string;
    tamanho: "P" | "M" | "G" | "GG";
    tipo: "Oversized" | "Regular";
    // cupom: boolean;
    preco: number;
};

type EnderecoForm = {
    cep: string;
    rua: string;
    numero: string;
    bairro: string;
    complemento?: string;
    nomeDestinatario: string;
    telefone: string;
    formaPagamento: "Cartão" | "PIX" | "Dinheiro";
};

// O novo tipo de Pedido
export type Pedido = {
    data_pedido: Date | string;
    nome_destinario: string;
    telefone_contato: string;
    cep: string;
    rua: string;
    numero: number;
    bairro: string;
    complemento?: string;
    forma_pagamento: "Cartão" | "PIX" | "Dinheiro";
    valor_total: number;
    // Note que 'itens' agora é uma propriedade com todos os itens do pedido
    itens: Array<{
        id_camiseta: string;
        slug?: string;
        tamanho: "P" | "M" | "G" | "GG";
        tipo_camiseta: "Oversized" | "Regular";
        // cupom: boolean;
        preco: number;
    }>;
};

export function Carrinho() {
    const [itens, setItens] = useState<CarrinhoItem[]>([]);
    const [enderecoAdicionado, setEnderecoAdicionado] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setValue,
    } = useForm<EnderecoForm>();

    useEffect(() => {
        const carrinho = JSON.parse(localStorage.getItem("carrinho") || "[]");
        setItens(carrinho);
        
        const endereco = localStorage.getItem("endereco");
        if (endereco) {
            setEnderecoAdicionado(true);
        }
    }, []);

    const onSubmitEndereco = (data: EnderecoForm) => {
        localStorage.setItem("endereco", JSON.stringify(data));
        setEnderecoAdicionado(true);
        setDialogOpen(false);
        reset();
    };

    const removerItem = (index: number) => {
        const novoCarrinho = itens.filter((_, i) => i !== index);
        setItens(novoCarrinho);
        localStorage.setItem("carrinho", JSON.stringify(novoCarrinho));
    };

    const subtotal = itens.reduce((acc, item) => acc + item.preco, 0);
    const total = subtotal + (itens.length > 0 ? 10 : 0);

    async function finalizarPedido() {
        if (itens.length === 0 || !enderecoAdicionado) return;

        const endereco = JSON.parse(localStorage.getItem("endereco") || "{}");

        // Transforma o array de CarrinhoItem para o novo formato de PedidoItem
        const pedidoItens = itens.map(item => ({
            id_camiseta: item.id,
            slug: item.slug,
            tamanho: item.tamanho,
            tipo_camiseta: item.tipo,
            // cupom: item.cupom,
            preco: item.preco
        }));

        // Cria um único objeto de pedido com o array de itens
        const pedido: Pedido = {
            itens: pedidoItens,
            data_pedido: new Date().toISOString(),
            nome_destinario: endereco.nomeDestinatario,
            telefone_contato: endereco.telefone,
            cep: endereco.cep,
            rua: endereco.rua,
            numero: parseInt(endereco.numero),
            bairro: endereco.bairro,
            complemento: endereco.complemento,
            forma_pagamento: endereco.formaPagamento,
            valor_total: total
        };

        try {
            // Envia um único pedido com todos os itens
            const response = await fetch("http://localhost:3000/pedidos", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(pedido)
            });

            if (response.ok) {
                toast.success("Pedido enviado com sucesso! A loja entrará em contato para confirmar a entrega.");
                localStorage.removeItem("carrinho");
                localStorage.removeItem("endereco");
                setItens([]);
                setEnderecoAdicionado(false);
            } else {
                toast.error("Erro ao enviar o pedido.");
            }
        } catch (err) {
            console.error(err);
            toast.error("Erro de conexão com o servidor.");
        }
    }

    return (
        <div className="min-h-screen bg-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-16 md:pt-20">
                <div className="mb-8">
                    <h1 className="font-bold text-2xl sm:text-3xl uppercase">Carrinho</h1>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                        <div className="space-y-4">
                            {itens.length === 0 ? (
                                <div className="text-center py-12">
                                    <p className="text-gray-500 text-lg">Carrinho vazio.</p>
                                </div>
                            ) : (
                                itens.map((item, idx) => (
                                    <div key={idx} className="flex items-start gap-3 group">
                                        <Card className="flex-1 cursor-pointer hover:shadow-lg transition-all duration-200 group-hover:border-gray-300">
                                            <div className="flex flex-col sm:flex-row">
                                                <CardHeader className="flex-1 pb-3 sm:pb-6">
                                                    <CardTitle className="text-lg sm:text-xl">{item.nome}</CardTitle>
                                                    <CardDescription className="flex flex-wrap gap-2 mt-2">
                                                        <Badge variant="default" className="text-xs">
                                                            Tamanho {item.tamanho}
                                                        </Badge>
                                                        <Badge variant="default" className="text-xs">
                                                            {item.tipo}
                                                        </Badge>
                                                        {/* <Badge variant={item.cupom ? "secondary" : "outline"} className="text-xs">
                                                            {item.cupom ? "Com cupom" : "Sem cupom"}
                                                        </Badge> */}
                                                    </CardDescription>
                                                </CardHeader>
                                                <CardContent className="flex items-center justify-center sm:justify-end pt-3 sm:pt-6 pb-6">
                                                    <p className="font-semibold text-xl text-green-600">
                                                        R$ {item.preco.toFixed(2)}
                                                    </p>
                                                </CardContent>
                                            </div>
                                        </Card>
                                        
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => {
                                                removerItem(idx);
                                                toast.success("Item removido do carrinho");
                                            }}
                                            className="mt-2 p-2 hover:bg-red-50 hover:text-red-600 transition-colors"
                                        >
                                            <X className="h-4 w-4" />
                                        </Button>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>

                    <div className="lg:col-span-1">
                        <div className="sticky top-4">
                            <Card className="p-6">
                                <h2 className="font-bold text-xl mb-6">Resumo do Pedido</h2>
                                
                                <div className="mb-6">
                                    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                                        <DialogTrigger asChild>
                                            <Button 
                                                variant={enderecoAdicionado ? "outline" : "secondary"}
                                                className="w-full justify-start"
                                            >
                                                <House className="mr-2 h-4 w-4" />
                                                {enderecoAdicionado ? "Alterar dados" : "Adicionar dados"}
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent className="sm:max-w-[425px] max-h-[80vh] overflow-y-auto">
                                            <DialogHeader>
                                                <DialogTitle>Dados para entrega</DialogTitle>
                                                <DialogDescription>
                                                    Os envios serão apenas entregues na cidade de Franca (São Paulo), 
                                                    com a taxa fixa de R$10,00.
                                                </DialogDescription>
                                            </DialogHeader>

                                            <form onSubmit={handleSubmit(onSubmitEndereco)} className="space-y-4">
                                                {/* Dados pessoais */}
                                                <div>
                                                    <Label htmlFor="nomeDestinatario">Nome do Destinatário *</Label>
                                                    <Input
                                                        id="nomeDestinatario"
                                                        {...register("nomeDestinatario", { required: "Nome é obrigatório" })}
                                                        className={errors.nomeDestinatario ? "border-red-500" : ""}
                                                    />
                                                    {errors.nomeDestinatario && (
                                                        <p className="text-red-500 text-sm mt-1">{errors.nomeDestinatario.message}</p>
                                                    )}
                                                </div>

                                                <div>
                                                    <Label htmlFor="telefone">Telefone de Contato *</Label>
                                                    <Input
                                                        id="telefone"
                                                        {...register("telefone", { 
                                                            required: "Telefone é obrigatório",
                                                        })}
                                                        className={errors.telefone ? "border-red-500" : ""}
                                                    />
                                                    {errors.telefone && (
                                                        <p className="text-red-500 text-sm mt-1">{errors.telefone.message}</p>
                                                    )}
                                                </div>

                                                {/* Endereço */}
                                                <div className="grid grid-cols-2 gap-4">
                                                    <div className="col-span-1">
                                                        <Label htmlFor="cep">CEP *</Label>
                                                        <Input
                                                            id="cep"
                                                            {...register("cep", { 
                                                                required: "CEP é obrigatório",
                                                                pattern: {
                                                                    value: /^\d{5}-?\d{3}$/,
                                                                    message: "CEP inválido"
                                                                }
                                                            })}
                                                            placeholder="00000-000"
                                                            className={errors.cep ? "border-red-500" : ""}
                                                        />
                                                        {errors.cep && (
                                                            <p className="text-red-500 text-sm mt-1">{errors.cep.message}</p>
                                                        )}
                                                    </div>

                                                    <div className="col-span-1">
                                                        <Label htmlFor="numero">Número *</Label>
                                                        <Input
                                                            id="numero"
                                                            {...register("numero", { required: "Número é obrigatório" })}
                                                            className={errors.numero ? "border-red-500" : ""}
                                                        />
                                                        {errors.numero && (
                                                            <p className="text-red-500 text-sm mt-1">{errors.numero.message}</p>
                                                        )}
                                                    </div>
                                                </div>

                                                <div>
                                                    <Label htmlFor="rua">Rua/Logradouro *</Label>
                                                    <Input
                                                        id="rua"
                                                        {...register("rua", { required: "Rua é obrigatória" })}
                                                        className={errors.rua ? "border-red-500" : ""}
                                                    />
                                                    {errors.rua && (
                                                        <p className="text-red-500 text-sm mt-1">{errors.rua.message}</p>
                                                    )}
                                                </div>

                                                <div>
                                                    <Label htmlFor="bairro">Bairro *</Label>
                                                    <Input
                                                        id="bairro"
                                                        {...register("bairro", { required: "Bairro é obrigatório" })}
                                                        className={errors.bairro ? "border-red-500" : ""}
                                                    />
                                                    {errors.bairro && (
                                                        <p className="text-red-500 text-sm mt-1">{errors.bairro.message}</p>
                                                    )}
                                                </div>

                                                <div>
                                                    <Label htmlFor="complemento">Complemento</Label>
                                                    <Input
                                                        id="complemento"
                                                        {...register("complemento")}
                                                        placeholder="Apartamento, bloco, etc."
                                                    />
                                                </div>

                                                {/* Forma de pagamento */}
                                                <div>
                                                    <Label htmlFor="formaPagamento">Forma de Pagamento *</Label>
                                                    <Select onValueChange={(value) => setValue("formaPagamento", value as "Cartão" | "PIX" | "Dinheiro")}>
                                                        <SelectTrigger className={errors.formaPagamento ? "border-red-500" : ""}>
                                                            <SelectValue placeholder="Selecione a forma de pagamento" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="PIX">PIX</SelectItem>
                                                            <SelectItem value="Cartão">Cartão</SelectItem>
                                                            <SelectItem value="Dinheiro">Dinheiro</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                    {errors.formaPagamento && (
                                                        <p className="text-red-500 text-sm mt-1">{errors.formaPagamento.message}</p>
                                                    )}
                                                </div>

                                                <Button type="submit" className="w-full">
                                                    Confirmar Dados
                                                </Button>
                                            </form>
                                        </DialogContent>
                                    </Dialog>
                                </div>

                                <Separator className="mb-6" />

                                <div className="space-y-2 mb-6">
                                    <div className="flex justify-between text-sm">
                                        <span>Subtotal:</span>
                                        <span>R$ {subtotal.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span>Frete:</span>
                                        <span>R$ {itens.length > 0 ? "10.00" : "0.00"}</span>
                                    </div>
                                    <Separator />
                                    <div className="flex justify-between font-bold text-lg">
                                        <span>Total:</span>
                                        <span className="text-green-600">R$ {total.toFixed(2)}</span>
                                    </div>
                                </div>

                                <Button 
                                    className="w-full" 
                                    disabled={itens.length === 0 || !enderecoAdicionado}
                                    onClick={finalizarPedido}
                                >
                                    <Check className="mr-2 h-4 w-4" />
                                    Finalizar Pedido
                                </Button>
                                
                                {!enderecoAdicionado && itens.length > 0 && (
                                    <p className="text-sm text-gray-500 text-center mt-2">
                                        Adicione os dados para finalizar
                                    </p>
                                )}
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}