export type Cupons = {
  id: string;
  codigo: string;
  desconto: number; // Desconto em porcentagem
  colecao?: string;
};

export const cupons: Cupons[] = [
  {
    id: "1",
    codigo: "ETECUPOM",
    desconto: 30, 
  },
  {
    id: "1",
    codigo: "TSHIRTS",
    desconto: 20, 
  },
  {
    id: "2",
    codigo: "STAR",
    desconto: 30,
    colecao: "Starboy"
  },
];