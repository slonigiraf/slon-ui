import { numberToU8a, stringToU8a } from '@polkadot/util'

// Converts a JS numbr to a byte array of specified length
export function numberToU8ArrayOfLength(number, length) {
    const shortResult = numberToU8a(number)
    if (shortResult.length < length) {
        const firstZeros = new Array(length - shortResult.length).fill(0)
        var concatArray = new Uint8Array([...firstZeros, ...shortResult])
        return concatArray
    } else {
        return shortResult
    }
}
// Converts a recommendation letter public info to a byte array to be signed by a referee
export function getPublicDataToSignByReferee(letterId, refereeU8, workerU8, amount) {
    return new Uint8Array([...numberToU8ArrayOfLength(letterId, 4), ...refereeU8, ...workerU8, ...numberToU8ArrayOfLength(amount, 16)])
}
// Converts a recommendation letter private info to a byte array to be signed by a referee
export function getPrivateDataToSignByReferee(textHash, letterId, refereeU8, workerU8, amount) {
    return new Uint8Array([...stringToU8a(textHash), ...numberToU8ArrayOfLength(letterId, 4), ...refereeU8, ...workerU8, ...numberToU8ArrayOfLength(amount, 16)])
}
// Converts a recommendation letter info to a byte array to be signed by worker to enable employer to penalize a referee
export function getDataToSignByWorker(letterId, refereeU8, workerU8, amount, refereeSignatureU8, employerU8) {
    return new Uint8Array([...numberToU8ArrayOfLength(letterId, 4), ...refereeU8, ...workerU8, ...numberToU8ArrayOfLength(amount, 16), ...refereeSignatureU8, ...employerU8])
}
// Just signs data
export function sign(signer, data) {
    return signer.sign(data)
}
// A helper wrapper to get IPFS CID from a text
export async function getIPFSContentID(ipfs, content) {
    const file = await ipfs.add(content)
    return file.cid
}
// A helper wrapper to get a text from IPFS CID
export async function getIPFSDataFromContentID(ipfs, cid) {
    const text = []
    for await (const chunk of ipfs.cat(cid)) {
        text.push(chunk)
    }
    return text.toString()
}