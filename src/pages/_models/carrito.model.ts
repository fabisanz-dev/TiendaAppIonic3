export class Carrito{
    constructor(
        public codigo: any,
        public producto: any,
        public linea: any,
        public linea_id: number,
        public proveedor: any,
        public descripcion: any,
        public precio_compra: any,
        public cantidad: number,
        public subtotal: number
    ){}
}