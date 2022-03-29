// Tests that can't be run by Nest due to limitations in polkadot utils.
import { sign } from './helpers.mjs'
import { signatureVerify } from '@polkadot/util-crypto'
import { cryptoWaitReady } from '@polkadot/util-crypto'
import { Keyring } from '@polkadot/keyring'
import { hexToU8a } from '@polkadot/util'
import { getPublicDataToSignByReferee } from './helpers.mjs'

await cryptoWaitReady()

console.log("Example that should always work")
const refereeU8 = new Uint8Array([228, 167, 81, 18, 204, 23, 38, 108, 155, 194, 90, 41, 194, 163, 58, 60, 89, 176, 227, 117, 233, 66, 197, 106, 239, 232, 113, 141, 216, 124, 78, 49,])
const dataToSignU8 = new Uint8Array([0, 0, 0, 1, 228, 167, 81, 18, 204, 23, 38, 108, 155, 194, 90, 41, 194, 163, 58, 60, 89, 176, 227, 117, 233, 66, 197, 106, 239, 232, 113, 141, 216, 124, 78, 49, 178, 77, 57, 242, 36, 161, 83, 238, 138, 176, 187, 13, 7, 59, 100, 92, 45, 157, 163, 43, 133, 176, 199, 22, 118, 202, 133, 229, 161, 199, 255, 75, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10])
const rightSignatureU8 = new Uint8Array([96, 20, 15, 21, 11, 137, 10, 192, 129, 3, 154, 34, 203, 118, 28, 19, 176, 54, 165, 181, 227, 156, 70, 197, 73, 86, 226, 111, 137, 243, 69, 95, 41, 74, 25, 254, 228, 34, 212, 189, 141, 134, 194, 44, 229, 172, 27, 43, 67, 73, 73, 58, 61, 63, 37, 176, 120, 195, 153, 198, 46, 42, 231, 129])
const rightSignatureU8TestingResult = signatureVerify(dataToSignU8, rightSignatureU8, refereeU8)
console.log(rightSignatureU8TestingResult.isValid)
console.log("A test for sign function")
const keyring = new Keyring({ type: 'sr25519', ss58Format: 42 })
const signer = keyring.addFromUri('teacher')
const signatureU8 = sign(signer, dataToSignU8)
const signatureU8TestingResult = signatureVerify(dataToSignU8, signatureU8, refereeU8)
console.log(signatureU8TestingResult.isValid)

//----
/*
------------
UseInsurance.js:45 letterId 1
UseInsurance.js:46 refereeHex 0xd43593c715fdd31c61141abd04a99fd6822c8558854ccde39a5684e7a56da27d
UseInsurance.js:47 workerHex 0x8eaf04151687736326c9fea17e25fc5287613693c912909cb226aa4794f26a48
UseInsurance.js:48 employerHex 0xfe65717dad0447d715f660a0a58411de509b42e6efb8375f562f58a554d5860e
UseInsurance.js:49 amount 1000000000000000
UseInsurance.js:50 refereeSignatureHex 0xb86f5a8be457bdaa2eed33ce77f8daee2197749a7a2fe62da0105c59d3edd82b1dd89c53b0b2b5150be062954780c077e43ccf5c8570be74635ce9b395c4c282
UseInsurance.js:51 workerSignatureHex 0x1a2b24043b08460bac8326303fba42df86a0463d9cb12d6118d316b5ebb8d278f09c1e32617d14169b8cf66742bde5bd5c2cfc64b74606577748baf2497af986
UseInsurance.js:52 ------------
*/

console.log("--------- UI tests ------------")
const letterId_2 = 3
const refereeU8_2 = new Uint8Array([212, 53, 147, 199, 21, 253, 211, 28, 97, 20, 26, 189, 4, 169, 159, 214, 130, 44, 133, 88, 133, 76, 205, 227, 154, 86, 132, 231, 165, 109, 162, 125,])
const workerU8_2 = new Uint8Array([142, 175, 4, 21, 22, 135, 115, 99, 38, 201, 254, 161, 126, 37, 252, 82, 135, 97, 54, 147, 201, 18, 144, 156, 178, 38, 170, 71, 148, 242, 106, 72])
const employerU8_2 = hexToU8a("0xfe65717dad0447d715f660a0a58411de509b42e6efb8375f562f58a554d5860e")
const amount_2 = 1000000000000000
const dataToSignU8_2 = getPublicDataToSignByReferee(letterId_2, refereeU8_2, workerU8_2, amount_2)
console.log(dataToSignU8_2)
const signatureU8_2 = hexToU8a("0x2ad20fbab56624810104acb7a47d20ca7c41683f8b182047e797c51024dfc87f818d94c7a6f990be853a857ce8007a35872737f003a0a7d8be2ac5cba2598289")
const uiRefereeSignatureU8TestingResult = signatureVerify(dataToSignU8_2, signatureU8_2, refereeU8_2)
console.log(uiRefereeSignatureU8TestingResult.isValid)