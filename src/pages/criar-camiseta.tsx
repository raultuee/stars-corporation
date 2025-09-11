import React, { useState, useRef, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { 
  Upload, 
  Trash2, 
  ShoppingCart,
  Palette,
  Shirt,
  RefreshCw
} from 'lucide-react';

const SHIRT_COLORS = [
  { name: 'Branco', value: '#FFFFFF', border: '#E5E5E5' },
  { name: 'Preto', value: '#1F1F1F' },
  { name: 'Azul Marinho', value: '#1E3A8A' },
  { name: 'Cinza', value: '#6B7280' },
  { name: 'Vermelho', value: '#DC2626' },
  { name: 'Verde', value: '#16A34A' },
  { name: 'Rosa', value: '#EC4899' },
  { name: 'Roxo', value: '#7C3AED' },
];

const SIZES = ['PP', 'P', 'M', 'G', 'GG', 'XG'];

interface DesignElement {
  id: string;
  image: string;
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
}

export default function DesignerCamiseta() {
  const [shirtColor, setShirtColor] = useState('#FFFFFF');
  const [selectedSize, setSelectedSize] = useState('M');
  const [currentSide, setCurrentSide] = useState<'front' | 'back'>('front');
  const [frontElements, setFrontElements] = useState<DesignElement[]>([]);
  const [backElements, setBackElements] = useState<DesignElement[]>([]);
  const [selectedElement, setSelectedElement] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const frontFileRef = useRef<HTMLInputElement>(null);
  const backFileRef = useRef<HTMLInputElement>(null);

  const currentElements = currentSide === 'front' ? frontElements : backElements;
  const setCurrentElements = currentSide === 'front' ? setFrontElements : setBackElements;

  const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const newElement: DesignElement = {
        id: Date.now().toString(),
        image: e.target?.result as string,
        x: 50,
        y: 50,
        width: 100,
        height: 100,
        rotation: 0,
      };

      setCurrentElements(prev => [...prev, newElement]);
    };
    reader.readAsDataURL(file);
  }, [setCurrentElements]);

  const handleMouseDown = (e: React.MouseEvent, elementId: string) => {
    e.preventDefault();
    setSelectedElement(elementId);
    setIsDragging(true);
    
    const rect = e.currentTarget.getBoundingClientRect();
    setDragStart({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging || !selectedElement) return;

    const containerRect = e.currentTarget.getBoundingClientRect();
    const newX = e.clientX - containerRect.left - dragStart.x;
    const newY = e.clientY - containerRect.top - dragStart.y;

    setCurrentElements(prev => prev.map(el => 
      el.id === selectedElement 
        ? { ...el, x: Math.max(0, Math.min(250, newX)), y: Math.max(0, Math.min(300, newY)) }
        : el
    ));
  }, [isDragging, selectedElement, dragStart, setCurrentElements]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const updateElement = (id: string, updates: Partial<DesignElement>) => {
    setCurrentElements(prev => prev.map(el => 
      el.id === id ? { ...el, ...updates } : el
    ));
  };

  const removeElement = (id: string) => {
    setCurrentElements(prev => prev.filter(el => el.id !== id));
    setSelectedElement(null);
  };

  const selectedElementData = currentElements.find(el => el.id === selectedElement);

  const calculatePrice = () => {
    const basePrice = 45.00;
    const frontDesigns = frontElements.length;
    const backDesigns = backElements.length;
    const additionalCost = (frontDesigns + backDesigns) * 8.00;
    return basePrice + additionalCost;
  };

  const addToCart = () => {
    const designData = {
      shirtColor,
      size: selectedSize,
      frontElements,
      backElements,
      price: calculatePrice(),
      timestamp: Date.now()
    };
    
    // Simular adição ao carrinho
    const existingCart = JSON.parse(localStorage.getItem('carrinho') || '[]');
    const cartItem = {
      nome: 'Camiseta Personalizada',
      tamanho: selectedSize,
      cupom: 'Personalizada',
      preco: calculatePrice()
    };
    
    existingCart.push(cartItem);
    localStorage.setItem('carrinho', JSON.stringify(existingCart));
    localStorage.setItem('design_' + designData.timestamp, JSON.stringify(designData));
    
    alert('Camiseta adicionada ao carrinho!');
  };

  return (
    <div className="min-h-screen p-4">
      <div className="container mx-auto max-w-7xl">

        <h1 className="text-3xl font-bold uppercase my-10 text-center sm:text-center lg:text-start xl:text-start">
        Criar sua Camiseta
      </h1>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Painel de Design */}
          <div className="xl:col-span-2">
            <Card className="h-fit">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Shirt className="h-5 w-5" />
                    Visualização da Camiseta
                  </CardTitle>
                  <div className="flex gap-2">
                    <Button
                      variant={currentSide === 'front' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setCurrentSide('front')}
                    >
                      Frente
                    </Button>
                    <Button
                      variant={currentSide === 'back' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setCurrentSide('back')}
                    >
                      Costas
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {/* Canvas da Camiseta */}
                <div className="flex justify-center">
                  <div className="relative">
                    {/* Silhueta da Camiseta */}
                    <svg
                      width="350"
                      height="400"
                      viewBox="0 0 350 400"
                      className="drop-shadow-lg"
                    >
                      {/* Camiseta Base */}
                      <path
                        d="M75 80 L75 60 Q75 40 95 40 L120 40 Q130 30 170 30 L180 30 Q220 30 230 40 L255 40 Q275 40 275 60 L275 80 L320 100 Q340 110 340 130 L340 160 Q340 170 330 170 L320 170 L320 380 Q320 390 310 390 L40 390 Q30 390 30 380 L30 170 L20 170 Q10 170 10 160 L10 130 Q10 110 30 100 L75 80 Z"
                        fill={shirtColor}
                        stroke={shirtColor === '#FFFFFF' ? '#E5E5E5' : 'transparent'}
                        strokeWidth="1"
                      />
                      {/* Área de Design */}
                      <rect
                        x="50"
                        y="100"
                        width="250"
                        height="300"
                        fill="transparent"
                        stroke="#00000015"
                        strokeWidth="1"
                        strokeDasharray="5,5"
                        className="pointer-events-none"
                      />
                    </svg>

                    {/* Área de Design Interativa */}
                    <div
                      className="absolute top-[100px] left-[50px] w-[250px] h-[300px] cursor-crosshair"
                      onMouseMove={handleMouseMove}
                      onMouseUp={handleMouseUp}
                      onMouseLeave={handleMouseUp}
                    >
                      {currentElements.map((element) => (
                        <div
                          key={element.id}
                          className={`absolute cursor-move transition-all ${
                            selectedElement === element.id ? 'ring-2 ring-blue-500 ring-offset-1' : ''
                          }`}
                          style={{
                            left: element.x,
                            top: element.y,
                            width: element.width,
                            height: element.height,
                            transform: `rotate(${element.rotation}deg)`,
                          }}
                          onMouseDown={(e) => handleMouseDown(e, element.id)}
                          onClick={() => setSelectedElement(element.id)}
                        >
                          <img
                            src={element.image}
                            alt="Design element"
                            className="w-full h-full object-contain pointer-events-none select-none"
                            draggable={false}
                          />
                          {selectedElement === element.id && (
                            <div className="absolute -top-8 -right-8 bg-white rounded-full p-1 shadow-md">
                              <Button
                                variant="ghost"
                                size="sm"
                                className="p-1 h-6 w-6"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  removeElement(element.id);
                                }}
                              >
                                <Trash2 className="h-3 w-3 text-red-500" />
                              </Button>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Upload de Imagens */}
                <div className="mt-6 text-center">
                  <input
                    ref={currentSide === 'front' ? frontFileRef : backFileRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <Button
                    onClick={() => currentSide === 'front' ? frontFileRef.current?.click() : backFileRef.current?.click()}
                    variant="outline"
                    className="w-full sm:w-auto"
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Adicionar Imagem na {currentSide === 'front' ? 'Frente' : 'Parte de Trás'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Painel de Controles */}
          <div className="space-y-6">
            {/* Configurações da Camiseta */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="h-5 w-5" />
                  Configurações
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Cores */}
                <div>
                  <Label className="text-sm font-medium mb-3 block">Cor da Camiseta</Label>
                  <div className="grid grid-cols-4 gap-2">
                    {SHIRT_COLORS.map((color) => (
                      <button
                        key={color.value}
                        className={`w-12 h-12 rounded-lg border-2 transition-all hover:scale-105 ${
                          shirtColor === color.value ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-200'
                        }`}
                        style={{ 
                          backgroundColor: color.value,
                          borderColor: color.border || color.value
                        }}
                        onClick={() => setShirtColor(color.value)}
                        title={color.name}
                      />
                    ))}
                  </div>
                </div>

                {/* Tamanhos */}
                <div>
                  <Label className="text-sm font-medium mb-3 block">Tamanho</Label>
                  <div className="grid grid-cols-3 gap-2">
                    {SIZES.map((size) => (
                      <Button
                        key={size}
                        variant={selectedSize === size ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setSelectedSize(size)}
                      >
                        {size}
                      </Button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Controles de Elemento Selecionado */}
            {selectedElementData && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Editar Elemento</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label className="text-sm">Tamanho</Label>
                    <Slider
                      value={[selectedElementData.width]}
                      onValueChange={([value]) => 
                        updateElement(selectedElementData.id, { 
                          width: value, 
                          height: value 
                        })
                      }
                      max={200}
                      min={20}
                      step={5}
                      className="mt-2"
                    />
                    <span className="text-xs text-gray-500">{selectedElementData.width}px</span>
                  </div>

                  <div>
                    <Label className="text-sm">Rotação</Label>
                    <Slider
                      value={[selectedElementData.rotation]}
                      onValueChange={([value]) => 
                        updateElement(selectedElementData.id, { rotation: value })
                      }
                      max={360}
                      min={0}
                      step={15}
                      className="mt-2"
                    />
                    <span className="text-xs text-gray-500">{selectedElementData.rotation}°</span>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => updateElement(selectedElementData.id, { rotation: 0 })}
                    >
                      <RefreshCw className="h-3 w-3 mr-1" />
                      Reset
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => removeElement(selectedElementData.id)}
                    >
                      <Trash2 className="h-3 w-3 mr-1" />
                      Remover
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Resumo e Finalização */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Resumo do Pedido</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Camiseta base:</span>
                    <span>R$ 45,00</span>
                  </div>
                  {frontElements.length > 0 && (
                    <div className="flex justify-between">
                      <span>Designs frente ({frontElements.length}):</span>
                      <span>R$ {(frontElements.length * 8).toFixed(2)}</span>
                    </div>
                  )}
                  {backElements.length > 0 && (
                    <div className="flex justify-between">
                      <span>Designs costas ({backElements.length}):</span>
                      <span>R$ {(backElements.length * 8).toFixed(2)}</span>
                    </div>
                  )}
                  <Separator />
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total:</span>
                    <span className="text-green-600">R$ {calculatePrice().toFixed(2)}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Badge variant="outline" className="w-full justify-center">
                    Tamanho: {selectedSize}
                  </Badge>
                  <Badge variant="outline" className="w-full justify-center">
                    Cor: {SHIRT_COLORS.find(c => c.value === shirtColor)?.name}
                  </Badge>
                </div>

                <Button 
                  onClick={addToCart} 
                  className="w-full"
                  disabled={frontElements.length === 0 && backElements.length === 0}
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Adicionar ao Carrinho
                </Button>

                {frontElements.length === 0 && backElements.length === 0 && (
                  <p className="text-xs text-gray-500 text-center">
                    Adicione pelo menos uma imagem para continuar
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}