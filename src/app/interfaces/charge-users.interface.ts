import { Usuario } from "../models/usuario.model";

export interface ChargeUser {
    total: number;
    usuarios: Usuario[]
}