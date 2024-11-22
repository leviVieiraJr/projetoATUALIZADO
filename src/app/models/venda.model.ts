export interface Venda {
  id: number;
  produto: string;
  quantidade: number;
  valorUnitario: number;
  valorTotal: number; // Adiciona o campo valorTotal
  data: string; // ou Date, dependendo do formato usado
}
