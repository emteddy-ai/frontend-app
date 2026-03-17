// parser.js

import { URL } from 'url';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import { parse } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

interface Config {
  rootDir: string;
  baseUrl: string;
  fileExtensions: string[];
  filePathTemplate: string;
  fileNamesTemplate: string;
}

class Parser {
  private config: Config;

  constructor(config: Config) {
    this.config = {
      rootDir: config.rootDir || process.cwd(),
      baseUrl: config.baseUrl || '',
      fileExtensions: config.fileExtensions || ['js'],
      filePathTemplate: config.filePathTemplate || '{name}.{extension}',
      fileNamesTemplate: config.fileNamesTemplate || '{name}',
    };
  }

  getFileName(file: string): string {
    const filePath = resolve(this.config.rootDir, file);
    const fileStat = await this.getFileStat(filePath);
    if (!fileStat.isFile()) {
      return '';
    }
    const fileExtension = parse(filePath).ext.slice(1);
    const fileName = fileStat.name;
    const fileNames = fileName.match(/(.*)\.(.*)/);
    if (!fileNames) {
      return '';
    }
    const name = fileNames[1];
    return this.config.fileNamesTemplate.replace('{name}', name);
  }

  async getFileStat(file: string): Promise<DenysNodeFsStats> {
    const filePath = resolve(this.config.rootDir, file);
    return DenysNodeFsStats.stat(filePath);
  }

  async parse(file: string): Promise<{ fileName: string; filePath: string }> {
    const fileName = this.getFileName(file);
    const filePath = resolve(this.config.rootDir, file);
    if (!fileName) {
      return { fileName: '', filePath };
    }
    return { fileName, filePath };
  }
}

async function main() {
  const parser = new Parser({
    rootDir: resolve(__dirname, '..'),
    baseUrl: 'https://example.com',
    fileExtensions: ['js', 'ts'],
    filePathTemplate: '{name}.{extension}',
    fileNamesTemplate: '{name}',
  });

  const file = 'src/main.js';
  const result = await parser.parse(file);
  console.log(result);
}

main();
```

```javascript
// DenysNodeFsStats.ts
interface DenysNodeFsStats {
  stat: (path: string) => Promise<{
    dev: number;
    ino: number;
    mode: number;
    nlink: number;
    uid: number;
    gid: number;
    rdev: number;
    blksize: number;
    blocks: number;
    atimeMs: number;
    mtimeMs: number;
    atime: number;
    mtime: number;
    ctime: number;
    birthtimeMs: number;
    birthtime: number;
    size: number;
    blocksize: number;
    type: 'file'|'directory'|'characterDevice'|'blockDevice'|'fifo'|'socket';
    isFile(): boolean;
    isDirectory(): boolean;
    isBlockDevice(): boolean;
    isCharacterDevice(): boolean;
    isFIFO(): boolean;
    isSocket(): boolean;
  }>;
}