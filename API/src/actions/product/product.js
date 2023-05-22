
import { Products } from "../../models/product"
import {Op} from 'sequelize'

exports.getProducts = async () => {
    // Solo se retorna todos los productos directamente del archivo
    return await Products.findAll()
}

exports.addProduct = async (productData) => {
  //Se crea un nuevo objecto de producto con sus respectivos datos, pero id es 1 en caso de que no exista ningun producto dentro del arreglo y en caso de que exista un producto, tomara el ultimo producto obtendra su id y le sumara 1
    
    let product = await Products.create({  
        nombre: productData.nombre.toLowerCase(),
        precio: productData.precio,
        cantidad: productData.cantidad,
        categorias: productData.categorias.map((categoria)=> categoria.toLowerCase())
    })
    // Se agrega el producto creado al arreglo
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
  // Se realiza el filtrado por categoria
  const products_filter =  await Products.findAll({ where: { categorias: { [Op.overlap]: [category.toLowerCase()]  }}, order: [['precio','ASC']] })
  // Se retorna -1 en caso de que no exista la categoria en algun producto
  if (products_filter.length == 0) return -1

  // Se realiza el ordenamiento de menor a mayor a partir del precio de los productos
  const productsOrder = products_filter
  //Condicional ascendente o de menor a mayor
  if (order == 'asc'){
    return productsOrder
  //Condicional descendente o de mayor a menor
  }else if (order=='desc'){
    //Se realiza un cambio de orden inverso a partir del ascendente ejemplo sencillo [1,2,3] - reverse() -> [3,2,1]
    //return productsOrder.reverse() O
    return await Products.findAll({ where: { categorias: { [Op.overlap]: [category.toLowerCase()]  }}, order: [['precio','DESC']] })
  }
}

exports.updateProduct = async (productId,productData) => {
  let product = await Products.findOne({where: {id: productId }})

  if (product) {
    product.nombre = productData.nombre.toLowerCase()
    product.precio = productData.precio
    product.cantidad = productData.cantidad
    product.categorias = productData.categorias.map((categoria)=> categoria.toLowerCase())
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
