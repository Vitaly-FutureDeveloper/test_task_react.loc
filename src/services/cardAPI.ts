function getCard(){
  return JSON.parse( localStorage.getItem('card') )
}

function setProductCard(id:number, color:string, size:number){
  //Проверка на уникальность - если нет товара в корзине
  const card = getCard()
  const unicProduct = card?.findIndex((product) => product.id === id && product.name === color && product.size === size)
  if(!card || unicProduct === -1){
    const products = card.push({id, color, size})
    localStorage.setItem('card', JSON.stringify( products ) )
  }
}

function deleteProductCard(id:number, color:string, size:number){
  //Проверка на уникальность - если нет товара в корзине
  const card = getCard()
  const totalProducts = card?.filter((product) => product.id !== id && product.name !== color && product.size !== size)

  localStorage.setItem('card', JSON.stringify( totalProducts ) )
}

export { getCard, setProductCard, deleteProductCard }