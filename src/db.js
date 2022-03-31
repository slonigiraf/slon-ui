import Dexie from 'dexie';

export const db = new Dexie('SLON');
db.version(1).stores(
    { recommendationsIssuedByMe: '++id, cid, reimbursement, workerRecommendationSpecificPublicKeyHex, refereeSignOverPrivateData, refereeSignOverPublicData', },
    { recommendationsAboutMe: 'id, cid, reimbursement, refereePublicKeyHex, workerRecommendationSpecificPublicKeyHex, refereeSignOverPrivateData, refereeSignOverPublicData', },
    { recommendationsAboutMyWorkers: '++id, cid, reimbursement, refereePublicKeyHex, workerRecommendationSpecificPublicKeyHex, refereeSignOverPublicData, workerSign', },
);

const addRecommendationsIssuedByMe = async (id, event) => {
    event.preventDefault()
    const name = document.querySelector('.item-name').value
    const price = document.querySelector('.item-price').value
    await db.items.add({
      name,
      price: Number(price),
      itemHasBeenPurchased: false
    })
  }
  
  const removeItemFromDb = async id => {
    await db.items.delete(id)
  }
  
  const markAsPurchased = async (id, event) => {
    if (event.target.checked) {
      await db.items.update(id, {itemHasBeenPurchased: true})
    }
    else {
      await db.items.update(id, {itemHasBeenPurchased: false})
    }
  }