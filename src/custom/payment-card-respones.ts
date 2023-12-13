export async function customCardResponse(data: any) {
  const cardObj = {
    cardId: data.id,
    type: data.type,
    brand: data.card.brand,
    exp_month: data.card.exp_month,
    exp_year: data.card.exp_year,
    last4: data.card.last4,
  };

  return cardObj;
}

export async function customCardCollectionResponse(data: any) {
  var cards = [];
  var i;
  for (i = 0; i < data.length; i++) {
    cards.push(await customCardResponse(data[i]));
  }
  return cards;
}
