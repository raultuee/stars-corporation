import starboy1Img from "../assets/produtos/starboy1.png";
import starboy2Img from "../assets/produtos/starboy2.png";
import starboy3Img from "../assets/produtos/starboy3.png";

import starboy1secImg from "../assets/produtos/starboy1-back.png";
import starboy2secImg from "../assets/produtos/starboy-2-back.png";

import street1Img from "../assets/produtos/street1.png";
import street2Img from "../assets/produtos/street2.png";

import street1secImg from "../assets/produtos/street-1-back.png";
import street2secImg from "../assets/produtos/street-2-back.png";

import tones1Img from "../assets/produtos/tones1.png";
import tones2Img from "../assets/produtos/tones2.png";
import tones3Img from "../assets/produtos/tones3.png";

import tones1secImg from "../assets/produtos/tones-1-back.png";
import tones2secImg from "../assets/produtos/tones-2-back.png";
import tones3secImg from "../assets/produtos/tones-3-back.png";

import geo1Img from "../assets/produtos/geo1.png";
import geo2Img from "../assets/produtos/geo2.png";

import geo1secImg from "../assets/produtos/geo-1-back.png";
import geo2secImg from "../assets/produtos/geo-2-back.png";




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
  {
    id: "4",
    slug: "street1",
    nome: "Camiseta Street #1",
    descricao: "Descrição da camiseta Street #1",
    preco: 99.9,
    imagem: street1Img,
    imagemSec: street1secImg,
    colecao: "Street",
  },
  {
    id: "5",
    slug: "street2",
    nome: "Camiseta Street #2",
    descricao: "Descrição da camiseta Street #2",
    preco: 99.9,
    imagem: street2Img,
    imagemSec: street2secImg,
    colecao: "Street",
  },
  {
    id: "6",
    slug: "tones1",
    nome: "Camiseta Tones #1",
    descricao: "Descrição da camiseta Tones #1",
    preco: 99.9,
    imagem: tones1Img,
    imagemSec: tones1secImg,
    colecao: "Tones",
  },
  {
    id: "7",
    slug: "tones2",
    nome: "Camiseta Tones #2",
    descricao: "Descrição da camiseta Tones #2",
    preco: 99.9,
    imagem: tones2Img,
    imagemSec: tones2secImg,
    colecao: "Tones",
  },
  {
    id: "8",
    slug: "tones3",
    nome: "Camiseta Tones #3",
    descricao: "Descrição da camiseta Tones #3",
    preco: 99.9,
    imagem: tones3Img,
    imagemSec: tones3secImg,
    colecao: "Tones",
  },
  {
    id: "9",
    slug: "geo1",
    nome: "Camiseta Geo #1",
    descricao: "Descrição da camiseta Geo #1",
    preco: 99.9,
    imagem: geo1Img,
    imagemSec: geo1secImg,
    colecao: "Geo",
  },
  {
    id: "10",
    slug: "geo2",
    nome: "Camiseta Geo #2",
    descricao: "Descrição da camiseta Geo #2",
    preco: 99.9,
    imagem: geo2Img,
    imagemSec: geo2secImg,
    colecao: "Geo",
  },
  // ...adicione mais camisetas aqui
];