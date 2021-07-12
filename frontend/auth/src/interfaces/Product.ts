import { Departamento } from "../enums/departamento.enum";

export interface Product {
    id_product: string;
    nome: string;
    preco: number;
    departamento: Departamento;
}