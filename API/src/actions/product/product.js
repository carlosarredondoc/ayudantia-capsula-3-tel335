
//import productsJSON from './../../data/products.json'
//let products = [] //Sustituir [] por la carga del archivo ubicado en data/products.js
//products = productsJSON

import products from "../../models/products"

exports.getProducts = async () => {
    // Solo se retorna todos los productos directamente del archivo
    return await products.find() // Solicitamos todos los elementos de dicho esquema (Schema)
}

exports.addProduct = async (productData) => {
    const product = {
        nombre: productData.nombre.toLowerCase(),
        precio: productData.precio,
        cantidad: productData.cantidad,
        categorias: productData.categorias.map((categoria)=> categoria.toLowerCase())
    }
    // Se agrega el producto creado a la base de datos
    
    await products.create(product)

    return product
}


exports.getProductsForCategory = async (category) => {
  // Se revisa si algun producto tiene la categoria
  let products_filter = await products.find({categorias: category.toLowerCase()})

  // En caso de no existir ningun producto retorna -1 (equivalente a que no fue encontrado) (Para captar el error 404)
  if (products_filter.length == 0 ) return -1

  // Se retornan los productos
  return products_filter
}

exports.getProductsForCategoryAndOrder = async (category,order) => {
  // Se realiza el filtrado por categoria
  const products_filter_and_order =  await products.find({categorias: category.toLowerCase()}).sort({precio:1}) // Podemos anexar mas funciones de mongoose, aqui esta buscar y ordenar, en este caso precio es la llave a ordenar y -1 es de menor a mayor y 1 de mayor a menor
  
  // Se retorna -1 en caso de que no exista la categoria en algun producto
  if (products_filter_and_order.length == 0) return -1

  //Condicional ascendente o de menor a mayor
  if (order.toLowerCase() == 'asc'){
    return products_filter_and_order
  //Condicional descendente o de mayor a menor
  }else if (order.toLowerCase() =='desc'){
    //Se realiza un cambio de orden inverso a partir del ascendente ejemplo sencillo [1,2,3] - reverse() -> [3,2,1]
    //return products_filter_and_order.reverse() O
    return await products.find({categorias: category}).sort({precio:-1}) // busca la categoria y ordena de mayor a menor (-1)
  }
}

exports.updateProduct = async (productId,productData) => {
  // Se itera producto por producto
  let product_find = await products.findByIdAndUpdate(productId,{
    nombre: productData.nombre.toLowerCase(),
    precio: productData.precio,
    cantidad: productData.cantidad, 
    categorias: productData.categorias.map((categoria)=> categoria.toLowerCase())},
    {new:true}) // O products.findOneAndUpdate({_id: productId},{nombre: productData.nombre,precio: productData.precio, cantidad: productData.cantidad, categorias: productData.categorias},{new:true})) new: true retorna el objeto ya actualizado
  return product_find
}

exports.removeProduct = async (productId) => {
    // Buscamos en los productos si existe el id
    let find_product_id = await products.findByIdAndDelete(productId)
    // Condicional en caso de que el id del producto no exista, asi se puede capturar en el router
    if (find_product_id == null ) return -1
    
    return await products.find()
    
}
