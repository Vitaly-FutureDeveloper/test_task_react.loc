function getCard(){
  return JSON.parse( localStorage.getItem('card') )
}

function setProductCard(id:number, color:string, size:number){
  //Проверка на уникальность - если нет товара в корзине
  const card = getCard() || []

  const unicProduct = card?.findIndex((product) => product.id == id && product.color == color && product.size == size)

  if(unicProduct === -1){
    card.push({id, color, size})
    localStorage.setItem('card', JSON.stringify( card ) )
		alert('Товар положен в корзину.')
  } else {
		alert('Товар уже есть в корзине. Выберите другой.')
	}
}

function deleteProductCard(id:number, color:string, size:number){
  //Проверка на уникальность - если нет товара в корзине
  const card = getCard()
  const totalProducts = card?.filter((product) => product.id !== id && product.name !== color && product.size !== size)

  localStorage.setItem('card', JSON.stringify( totalProducts ) )
}

export { getCard, setProductCard, deleteProductCard }