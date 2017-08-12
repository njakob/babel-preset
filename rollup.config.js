import fs from 'fs';
import builtinModules from 'builtin-modules';
import { parseParcel } from '@njakob/parcel';
import * as hulk from '@njakob/hulk';
import rollupNodeResolve from 'rollup-plugin-node-resolve';
import rollupBabel from 'rollup-plugin-babel';
import rollupJSON from 'rollup-plugin-json';

const pkg = JSON.parse(fs.readFileSync('package.json', 'utf-8'));
const parcel = parseParcel(pkg);
const external = parcel.dependencies
  .map(dependency => dependency.name.fullName)
  .concat(builtinModules)
  ;

const commitHash = hulk.getCommitHash();

const banner = hulk.banner({
  commitHash,
  name: pkg.name,
  version: pkg.version,
  repository: pkg.homepage,
});

export default {
  entry: 'src/babelPreset.js',
  sourceMap: true,
  moduleName: pkg.name,
  banner,
  external,

  plugins: [
    rollupNodeResolve({
      jsnext: true
    }),
    rollupJSON(),
    rollupBabel({
      babelrc: true,
    }),
  ],

  targets: [
    { dest: 'lib/babelPreset.js', format: 'cjs' },
  ]
};
