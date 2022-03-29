// Tests for '../helpers.mjs'
import { numberToU8ArrayOfLength, getPublicDataToSignByReferee, getDataToSignByWorker } from '../helpers.mjs';

describe('numberToU8ArrayOfLength', () => {
  it('length is 4 (as Rust u32 conversion)', () => {
    const expected = new Uint8Array([0, 14, 9, 192]);
    expect(numberToU8ArrayOfLength(920000, 4)).toStrictEqual(expected);
  })
  it('length is 16 (as Rust u128 conversion)', () => {
    const expected = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 31, 255, 255, 255, 255, 255, 255]);
    //Number.MAX_SAFE_INTEGER is 9007199254740991
    expect(numberToU8ArrayOfLength(Number.MAX_SAFE_INTEGER, 16)).toStrictEqual(expected);
  })
})

describe('getPublicDataToSignByReferee:', () => {
  it('Produces right bytes)', () => {
    const letterId = 1
    const refereeU8 = new Uint8Array([228, 167, 81, 18, 204, 23, 38, 108, 155, 194, 90, 41, 194, 163, 58, 60, 89, 176, 227, 117, 233, 66, 197, 106, 239, 232, 113, 141, 216, 124, 78, 49,])
    const workerU8 = new Uint8Array([178, 77, 57, 242, 36, 161, 83, 238, 138, 176, 187, 13, 7, 59, 100, 92, 45, 157, 163, 43, 133, 176, 199, 22, 118, 202, 133, 229, 161, 199, 255, 75,])
    const amount = 10
    const expected = new Uint8Array([0, 0, 0, 1, 228, 167, 81, 18, 204, 23, 38, 108, 155, 194, 90, 41, 194, 163, 58, 60, 89, 176, 227, 117, 233, 66, 197, 106, 239, 232, 113, 141, 216, 124, 78, 49, 178, 77, 57, 242, 36, 161, 83, 238, 138, 176, 187, 13, 7, 59, 100, 92, 45, 157, 163, 43, 133, 176, 199, 22, 118, 202, 133, 229, 161, 199, 255, 75, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10]);
    expect(getPublicDataToSignByReferee(letterId, refereeU8, workerU8, amount)).toStrictEqual(expected);
  })
})
describe('getDataToSignByWorker:', () => {
  it('Produces right bytes)', () => {
    const letterId = 1
    const refereeU8 = new Uint8Array([228, 167, 81, 18, 204, 23, 38, 108, 155, 194, 90, 41, 194, 163, 58, 60, 89, 176, 227, 117, 233, 66, 197, 106, 239, 232, 113, 141, 216, 124, 78, 49,])
    const workerU8 = new Uint8Array([178, 77, 57, 242, 36, 161, 83, 238, 138, 176, 187, 13, 7, 59, 100, 92, 45, 157, 163, 43, 133, 176, 199, 22, 118, 202, 133, 229, 161, 199, 255, 75,])
    const amount = 10
    const refereeSignatureU8 = new Uint8Array([96,20,15,21,11,137,10,192,129,3,154,34,203,118,28,19,176,54,165,181,227,156,70,197,73,86,226,111,137,243,69,95,41,74,25,254,228,34,212,189,141,134,194,44,229,172,27,43,67,73,73,58,61,63,37,176,120,195,153,198,46,42,231,129])
    const employerU8 = new Uint8Array([166, 82, 220, 58, 28, 232, 181, 15, 154, 161, 152, 109, 179, 47, 157, 32, 202, 28, 33, 243, 219, 161, 164, 110, 173, 174, 79, 180, 188, 244, 227, 86,])
    const expected = new Uint8Array([0, 0, 0, 1, 228, 167, 81, 18, 204, 23, 38, 108, 155, 194, 90, 41, 194, 163, 58, 60, 89, 176, 227, 117, 233, 66, 197, 106, 239, 232, 113, 141, 216, 124, 78, 49, 178, 77, 57, 242, 36, 161, 83, 238, 138, 176, 187, 13, 7, 59, 100, 92, 45, 157, 163, 43, 133, 176, 199, 22, 118, 202, 133, 229, 161, 199, 255, 75, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 96, 20, 15, 21, 11, 137, 10, 192, 129, 3, 154, 34, 203, 118, 28, 19, 176, 54, 165, 181, 227, 156, 70, 197, 73, 86, 226, 111, 137, 243, 69, 95, 41, 74, 25, 254, 228, 34, 212, 189, 141, 134, 194, 44, 229, 172, 27, 43, 67, 73, 73, 58, 61, 63, 37, 176, 120, 195, 153, 198, 46, 42, 231, 129, 166, 82, 220, 58, 28, 232, 181, 15, 154, 161, 152, 109, 179, 47, 157, 32, 202, 28, 33, 243, 219, 161, 164, 110, 173, 174, 79, 180, 188, 244, 227, 86])
    expect(getDataToSignByWorker(letterId, refereeU8, workerU8, amount, refereeSignatureU8, employerU8)).toStrictEqual(expected);
  })
})
