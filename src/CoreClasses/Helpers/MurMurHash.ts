export class MurMurHash {

    static ToMurMurHash(str: string, seed: number = 0): number {
        let hash = seed ^ str.length;
        let i = 0;
      
        while (i < str.length) {
          let k = str.charCodeAt(i++);
          k &= 0xff;
      
          k *= 0xcc9e2d51;
          k = (k << 15) | (k >>> 17);
          k *= 0x1b873593;
      
          hash ^= k;
          hash = (hash << 13) | (hash >>> 19);
          hash = hash * 5 + 0xe6546b64;
        }
      
        hash ^= str.length;
        hash ^= (hash >>> 16);
        hash *= 0x85ebca6b;
        hash ^= (hash >>> 13);
        hash *= 0xc2b2ae35;
        hash ^= (hash >>> 16);
      
        return hash >>> 0;  // Return unsigned 32-bit integer
      }

}

