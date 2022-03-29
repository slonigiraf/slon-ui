import Dexie from 'dexie';

export const db = new Dexie('SLON');
db.version(1).stores(
    { issuedRecommendations: '++id, cid, workerPublicKeyHex, reimbursement, refereeSignOverPrivateData, refereeSignOverPublicData', },
);