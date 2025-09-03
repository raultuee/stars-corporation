import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function Carrinho() {
    return (
        <div className="min-w-screen pt-[141px] h-[calc(100vh-141px)] flex flex-col gap-10 sm:gap-10 md:gap-20 lg:gap-20 xl:gap-20 bg-white">
            <div className="p-8 ml-[200px]">
                <h1 className="font-bold text-2xl uppercase mb-7">Carrinho</h1>
                <div className="flex flex-col gap-4">
                    <Card className="flex w-[500px] cursor-pointer hover:shadow-lg transition-shadow">
                        <CardHeader className="flex">
                            <CardTitle>Camiseta Starboy #1</CardTitle>
                            <CardDescription className="flex gap-2">
                                <Badge variant="default">Tamanho G</Badge>
                                <Badge variant="secondary">Nenhum cupom</Badge>
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="flex flex-col text-center">
                            <p className="font-semibold text-xl mt-8 ml-[100px]">R$ 79,90</p>
                        </CardContent>
                    </Card>
                    <Card className="flex w-[500px] cursor-pointer hover:shadow-lg transition-shadow">
                        <CardHeader className="flex">
                            <CardTitle>Camiseta Starboy #1</CardTitle>
                            <CardDescription className="flex gap-2">
                                <Badge variant="default">Tamanho G</Badge>
                                <Badge variant="secondary">Nenhum cupom</Badge>
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="flex flex-col text-center">
                            <p className="font-semibold text-xl mt-8 ml-[100px]">R$ 79,90</p>
                        </CardContent>
                    </Card>
                    <Card className="flex w-[500px] cursor-pointer hover:shadow-lg transition-shadow">
                        <CardHeader className="flex">
                            <CardTitle>Camiseta Starboy #1</CardTitle>
                            <CardDescription className="flex gap-2">
                                <Badge variant="default">Tamanho G</Badge>
                                <Badge variant="secondary">Nenhum cupom</Badge>
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="flex flex-col text-center">
                            <p className="font-semibold text-xl mt-8 ml-[100px]">R$ 79,90</p>
                        </CardContent>
                    </Card>
                </div>

                <div className="flex justify-end mt-10 mr-6 ">
                    <h1>Finalizar compra</h1>
                </div>
            </div>
        </div>
    )
}