import starboy1Img from "../assets/produtos/starboy1.png";
import starboy2Img from "../assets/produtos/starboy2.png";
import starboy3Img from "../assets/produtos/starboy3.png";

import starboy1secImg from "../assets/produtos/starboy1-back.png";
import starboy2secImg from "../assets/produtos/starboy-2-back.png";


export type Camiseta = {
  id: string;
  slug: string;
  nome: string;
  descricao?: string;
  preco: number;
  imagem: string;
  imagemSec?: string;
  colecao?: string;
  // Adicione outros campos necessários, como tamanhos, cores, etc.
};

export const camisetas: Camiseta[] = [
  {
    id: "1",
    slug: "starboy1",
    nome: "Camiseta Starboy #1",
    descricao: "Descrição da camiseta Starboy #1",
    preco: 99.9,
    imagem: starboy1Img,
    imagemSec: starboy1secImg,
    colecao: "Starboy",
  },
  {
    id: "2",
    slug: "starboy2",
    nome: "Camiseta Starboy #2",
    descricao: "Descrição da camiseta Starboy #1",
    preco: 99.9,
    imagem: starboy2Img,
    imagemSec: starboy2secImg,
    colecao: "Starboy",
  },
  {
    id: "3",
    slug: "starboy3",
    nome: "Camiseta Starboy #3",
    descricao: "Descrição da camiseta Starboy #1",
    preco: 99.9,
    imagem: starboy3Img,
    colecao: "Starboy",
  },
  // ...adicione mais camisetas aqui
];