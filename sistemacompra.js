
function procesarCompra(cliente, productos) {
    try {
        // Validar el objeto cliente y asegurarse de que tenga las propiedades necesarias que se esperan
        // typeof verifica que cliente sea un objeto
        // !cliente.nombre y !cliente.correo verifica que existan esas propiedades
        if (!cliente || typeof cliente !== 'object' || !cliente.nombre || !cliente.correo) {
            throw new Error('Cliente inválido: debe tener nombre y correo.');
        }
        // Validar el arreglo de productos y asegurarse de que no esté vacío
        // array.isArray verifica que productos sea un arreglo
        if (!Array.isArray(productos) || productos.length === 0) {
            throw new Error('Productos inválidos: debe ser un arreglo no vacío.');
        }
        // Validar cada producto en el arreglo de productos 
        // for of itera sobre cada producto en el arreglo
        for (let producto of productos) {
            if (!producto || typeof producto !== 'object' || !producto.nombre || typeof producto.precio !== 'number') {
                throw new Error('Producto inválido: cada producto debe tener nombre y precio numérico.');
            }
        }
        // Crear una copia del objeto cliente para no mutar el original
        const nuevoCliente = { ...cliente };
        // Calcular el total de productos comprados
        const totalProductos = productos.length;
        // Calcular el precio total de los productos comprados usando reduce, en lugar de un bucle for debido a las restricciones
        // reduce itera sobre cada producto y acumula el precio total
        const precioTotal = productos.reduce((sum, producto) => sum + producto.precio, 0);
        // Separar el primer producto del resto
        const primerProducto = productos[0];
        // retornar el resto de los productos
        // slice(1) obtiene todos los productos excepto el primero y los guarda en un nuevo arreglo
        const restoProductos = productos.slice(1);
        // Retornar el nuevo objeto con la información necesaria para la compra
        return {
            cliente: nuevoCliente,
            totalProductos,
            precioTotal,
            primerProducto,
            restoProductos
        };
    } catch (error) {
        // Manejar cualquier error que ocurra durante el proceso
        return {
            error: error.message
        };
    }
}

// Ejemplo de uso:
const cliente = { nombre: 'Juan', correo: 'juan@example.com' };
const productos = [
{ nombre: 'Producto A', precio: 100 },
{ nombre: 'Producto B', precio: 200 },
{ nombre: 'Producto C', precio: 300 }
];
console.log(procesarCompra(cliente, productos));
