import { XXHash3 } from 'xxhash-addon'

const SEED = 0xdeadc0de

//hashes should be safe for url and filename usage so restrict them to safe characters
//for full windows compat, remove uppercase chars, but imho this is ok
// a) it only increases the risk for collisions slighly  b) windows can be configured to use case-sensitive filenames
const SAFE_CHARSET = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(
  ''
)
const BASE = BigInt(SAFE_CHARSET.length)

function toSafeStr(hex: string): string {
  let num: bigint = BigInt('0x' + hex)
  let out: string[] = []

  while (num > 0) {
    out.unshift(SAFE_CHARSET[Number(num % BASE)])
    num = num / BASE
  }
  return out.join('')
}

export function hash(content: Buffer) {
  const hasher = new XXHash3(SEED)
  hasher.update(content)
  const digest = hasher.digest('buffer')
  const hex = digest.toString('hex')
  const hash = toSafeStr(hex)
  console.log('hash', { hash, hex })
  console.log('')
  return hash
}
