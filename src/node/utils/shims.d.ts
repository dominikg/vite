declare module 'merge-source-map' {
  export default function merge(oldMap: object, newMap: object): object
}

declare module 'xxhash-addon' {
  export class XXHash3 {
    constructor(seed: number)
    update(buf: Buffer): void
    digest(type: string): Buffer
  }
}
