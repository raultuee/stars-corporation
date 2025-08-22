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

import adrenaline1Img from "../assets/produtos/adrenaline1.png";
import adrenaline1secImg from "../assets/produtos/adrenaline-1-back.png";

import adrenaline2Img from "../assets/produtos/adrenaline2.png";
import adrenaline2secImg from "../assets/produtos/adrenaline-2-back.png";

import ceberusImg from "../assets/produtos/ceberus.png";
import ceberusSecImg from "../assets/produtos/ceberus-back.png";

import youreyesImg from "../assets/produtos/youreyes.png";
import youreyesSecImg from "../assets/produtos/youreyes-back.png";

import starboydlx1Img from "../assets/produtos/starboydlx1.png";
import starboydlx1secImg from "../assets/produtos/starboydlx-1-back.png";

import starboydlx2Img from "../assets/produtos/starboydlx2.png";
import starboydlx2secImg from "../assets/produtos/starboydlx-2-back.png";

import starboydlx3Img from "../assets/produtos/starboydlx3.png";
import starboydlx3secImg from "../assets/produtos/starboydlx-3-back.png";

import starboydlx4Img from "../assets/produtos/starboydlx4.png";
import starboydlx4secImg from "../assets/produtos/starboydlx-4-back.png";



export type Camiseta = {
  id: string;
  slug: string;
  nome: string;
  descricao: string;
  preco: number;
  imagem: string;
  imagemSec?: string;
  colecao?: string;
  likes: number;
  sexo: string;
};

export const camisetas: Camiseta[] = [
  {
    id: "1",
    slug: "starboy1",
    nome: "Camiseta Starboy #1",
    descricao: "Descrição da camiseta Starboy #1",
    preco: 74.90,
    imagem: starboy1Img,
    imagemSec: starboy1secImg,
    colecao: "Starboy",
    likes: 0,
    sexo: "Unissex"
  },
  {
    id: "2",
    slug: "starboy2",
    nome: "Camiseta Starboy #2",
    descricao: "Descrição da camiseta Starboy #1",
    preco: 74.90,
    imagem: starboy2Img,
    imagemSec: starboy2secImg,
    colecao: "Starboy",
    likes: 0,
    sexo: "Unissex"
  },
  {
    id: "3",
    slug: "starboy3",
    nome: "Camiseta Starboy #3",
    descricao: "Descrição da camiseta Starboy #1",
    preco: 79.90,
    imagem: starboy3Img,
    colecao: "Starboy",
    likes: 0,
    sexo: "Unissex"
  },
  {
    id: "4",
    slug: "street1",
    nome: "Camiseta Street #1",
    descricao: "Descrição da camiseta Street #1",
    preco: 74.90,
    imagem: street1Img,
    imagemSec: street1secImg,
    colecao: "Street",
    likes: 0,
    sexo: "Unissex"
  },
  {
    id: "5",
    slug: "street2",
    nome: "Camiseta Street #2",
    descricao: "Descrição da camiseta Street #2",
    preco: 74.90,
    imagem: street2Img,
    imagemSec: street2secImg,
    colecao: "Street",
    likes: 0,
    sexo: "Unissex"
  },
  {
    id: "6",
    slug: "tones1",
    nome: "Camiseta Tones #1",
    descricao: "Descrição da camiseta Tones #1",
    preco: 89.90,
    imagem: tones1Img,
    imagemSec: tones1secImg,
    colecao: "Tones",
    likes: 0,
    sexo: "Unissex"
  },
  {
    id: "7",
    slug: "tones2",
    nome: "Camiseta Tones #2",
    descricao: "Descrição da camiseta Tones #2",
    preco: 89.90,
    imagem: tones2Img,
    imagemSec: tones2secImg,
    colecao: "Tones",
    likes: 0,
    sexo: "Unissex"
  },
  {
    id: "8",
    slug: "tones3",
    nome: "Camiseta Tones #3",
    descricao: "Descrição da camiseta Tones #3",
    preco: 89.90,
    imagem: tones3Img,
    imagemSec: tones3secImg,
    colecao: "Tones",
    likes: 0,
    sexo: "Unissex"
  },
  {
    id: "11",
    slug: "adrenaline",
    nome: "Camiseta Adrenaline #1",
    descricao: "Descrição da camiseta Adrenaline #1",
    preco: 75.0,
    imagem: adrenaline1Img,
    imagemSec: adrenaline1secImg,
    colecao: "Adrenaline Limited",
    likes: 0,
    sexo: "Unissex"
  },
  {
    id: "12",
    slug: "adrenaline",
    nome: "Camiseta Adrenaline #2",
    descricao: "Descrição da camiseta Adrenaline #2",
    preco: 75.0,
    imagem: adrenaline2Img,
    imagemSec: adrenaline2secImg,
    colecao: "Adrenaline Limited",
    likes: 0,
    sexo: "Unissex"
  },
  {
    id: "13",
    slug: "ceberus",
    nome: "Camiseta Ceberus",
    descricao: "Descrição da camiseta Ceberus",
    preco: 75.0,
    imagem: ceberusImg,
    imagemSec: ceberusSecImg,
    colecao: "Limited",
    likes: 0,
    sexo: "Unissex"
  },
  {
    id: "14",
    slug: "youreyes",
    nome: "Camiseta Your Eyes",
    descricao: "Descrição da camiseta Your Eyes",
    preco: 75.0,
    imagem: youreyesImg,
    imagemSec: youreyesSecImg,
    colecao: "Limited",
    likes: 0,
    sexo: "Unissex"
  },
  {
    id: "15",
    slug: "starboydlx1",
    nome: "Camiseta Starboy Deluxe #1",
    descricao: "Descrição da camiseta Starboy Deluxe #1",
    preco: 90.0,
    imagem: starboydlx1Img,
    imagemSec: starboydlx1secImg,
    colecao: "Starboy Deluxe",
    likes: 0,
    sexo: "Unissex"
  },
  {
    id: "16",
    slug: "starboydlx2",
    nome: "Camiseta Starboy Deluxe #2",
    descricao: "Descrição da camiseta Starboy Deluxe #2",
    preco: 90.0,
    imagem: starboydlx2Img,
    imagemSec: starboydlx2secImg,
    colecao: "Starboy Deluxe",
    likes: 0,
    sexo: "Unissex"
  },
  {
    id: "17",
    slug: "starboydlx3",
    nome: "Camiseta Starboy Deluxe #3",
    descricao: "Descrição da camiseta Starboy Deluxe #3",
    preco: 90.0,
    imagem: starboydlx3Img,
    imagemSec: starboydlx3secImg,
    colecao: "Starboy Deluxe",
    likes: 0,
    sexo: "Unissex"
  },
  
  {
    id: "18",
    slug: "starboydlx4",
    nome: "Camiseta Starboy Deluxe #4",
    descricao: "Descrição da camiseta Starboy Deluxe #4",
    preco: 90.0,
    imagem: starboydlx4Img,
    imagemSec: starboydlx4secImg,
    colecao: "Starboy Deluxe",
    likes: 0,
    sexo: "Unissex"
  },
  // ...adicione mais camisetas aqui
];