import { Perfil } from "../enums/perfil.enum";

export interface User {
    nome: string;
    senha: string;
    perfil?: Perfil;
    token?: string;
}