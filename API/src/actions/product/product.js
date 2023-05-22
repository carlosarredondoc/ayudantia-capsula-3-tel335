
import { Products } from "../../models/product"
import {Op} from 'sequelize'

exports.getProducts = async () => {
    // Solo se retorna todos los productos directamente de la base de datos
    return await Products.findAll()
}

exports.addProduct = async (productData) => {
  // El ide ahora se crea auto incremental mediante el uso de modelo en la base dedatos  
    let product = await Products.create({  
        nombre: productData.nombre.toLowerCase(),
        precio: productData.precio,
        cantidad: productData.cantidad,
        categorias: productData.categorias.map((categoria)=> categoria.toLowerCase())
    })
    // se retorna el producto creado
    return product
}


exports.getProductsForCategory = async (category) => {
  // Se revisa si algun producto tiene la categoria
  let products_filter = await Products.findAll({ where: { categorias: { [Op.overlap]: [category.toLowerCase()]  }} }) //Op.overlap sirve para buscar una coincidencia en un arreglo https://sequelize.org/docs/v6/core-concepts/model-querying-basics/#postgres-only-range-operators
  // En caso de no existir ningun producto retorna -1 (equivalente a que no fue encontrado) (Para captar el error 404)
  if (products_filter.length == 0 ) return -1

  // Se retornan los productos
  return products_filter
}

exports.getProductsForCategoryAndOrder = async (category,order) => {
  // Se realiza el filtrado por categoria y el orden respectivo usando sequelize
  const products_filter =  await Products.findAll({ where: { categorias: { [Op.overlap]: [category.toLowerCase()]  }}, order: [['precio','ASC']] })
  // Se retorna -1 en caso de que no exista la categoria en algun producto
  if (products_filter.length == 0) return -1

  // se define una variable para el ordenamiento
  const productsOrder = products_filter
  //Condicional ascendente o de menor a mayor
  if (order == 'asc'){
    return productsOrder
  //Condicional descendente o de mayor a menor
  }else if (order=='desc'){
    //Se realiza un cambio de orden inverso a partir del ascendente ejemplo sencillo [1,2,3] - reverse() -> [3,2,1]
    //return productsOrder.reverse() O
    //Consulta equivalente para realizar orden descendente
    return await Products.findAll({ where: { categorias: { [Op.overlap]: [category.toLowerCase()]  }}, order: [['precio','DESC']] })
  }
}

exports.updateProduct = async (productId,productData) => {

  //Buscamos el producto por su id
  let product = await Products.findOne({where: {id: productId }})

  // si el producto existe lo actualizamos con sus respectivos datos
  if (product) {
    product.nombre = product.name ? productData.nombre.toLowerCase() : product.name
    product.precio = productData.precio ? productData.precio : product.precio
    product.cantidad = productData.cantidad ? productData.cantidad : product.cantidad
    product.categorias = productData.categorias ? productData.categorias.map((categoria)=> categoria.toLowerCase()) : product.categorias
    await product.save();
  } else {
    return [] // retornamos un elemento vacio, para detectar que dicho id no existe
  }
  return product
}

exports.removeProduct = async (productId) => {
    // Buscamos en los productos si existe el id
    let find_product_id = await Products.findOne({where: {id: productId }}) //Buscamos la coincidencia del id del producto
    // Condicional en caso de que el id del producto no exista, asi se puede capturar en el router
    if (find_product_id) {
      await find_product_id.destroy() // En caso de haberlo encontrado realizamos su eliminacion
    }else{
      return -1
    }
}
