import { parse } from 'svg-parser';
import { Compiler } from 'webpack';

class SvgParserPlugin {
  constructor(options) {
    this.options = options;
  }

  apply(compiler) {
    const parser = new parse();
    const baseDir = compiler.options.output.path;

    compiler.hooks.thisCompilation.tap('SvgParserPlugin', (Compilation) => {
      Compilation.hooks.processAssets.tap(
        {
          name: 'SvgParserPlugin',
          stage: Compilation.PROCESS_ASSETS_STAGE_OPTIMIZE,
        },
        (assets) => {
          Object.keys(assets).forEach((assetName) => {
            const assetPath = `${baseDir}/${assetName}`;
            const assetContent = assets[assetName].source();
            const svgContent = parser.parse(assetContent);

            if (svgContent.length > 0) {
              const svgFile = {
                filename: `${assetName}.svg`,
                source: svgContent,
                size: svgContent.length,
                contentHash: svgContent,
              };

              assets[assetName] = new Compiler.File({
                filename: `${assetName}.svg`,
                source: svgContent,
                size: svgContent.length,
                contentHash: svgContent,
              });

              delete assets[assetName];
              assets[assetName] = svgFile;
            }
          });
        }
      );
    });
  }
}

module.exports = SvgParserPlugin;