import syntaxJSX from 'babel-plugin-syntax-jsx';
import syntaxDynamicImport from 'babel-plugin-syntax-dynamic-import';
import checkES2015Constants from 'babel-plugin-check-es2015-constants';
import transformES2015ModulesCommonJS from 'babel-plugin-transform-es2015-modules-commonjs';
import transformES2015TemplateLiterals from 'babel-plugin-transform-es2015-template-literals';
import transformES2015Literals from 'babel-plugin-transform-es2015-literals';
import transformES2015FunctionName from 'babel-plugin-transform-es2015-function-name';
import transformES2015ArrowFunctions from 'babel-plugin-transform-es2015-arrow-functions';
import transformES2015BlockScopedFunctions from 'babel-plugin-transform-es2015-block-scoped-functions';
import transformES2015Classes from 'babel-plugin-transform-es2015-classes';
import transformES2015ObjectSuper from 'babel-plugin-transform-es2015-object-super';
import transformES2015ShorthandProperties from 'babel-plugin-transform-es2015-shorthand-properties';
import transformES2015DuplicateKeys from 'babel-plugin-transform-es2015-duplicate-keys';
import transformES2015ComputedProperties from 'babel-plugin-transform-es2015-computed-properties';
import transformES2015StickyRegex from 'babel-plugin-transform-es2015-sticky-regex';
import transformES2015UnicodeRegex from 'babel-plugin-transform-es2015-unicode-regex';
import transformES2015Spread from 'babel-plugin-transform-es2015-spread';
import transformES2015Parameters from 'babel-plugin-transform-es2015-parameters';
import transformES2015Destructuring from 'babel-plugin-transform-es2015-destructuring';
import transformES2015BlockScoping from 'babel-plugin-transform-es2015-block-scoping';
import transformES2015TypeofSymbol from 'babel-plugin-transform-es2015-typeof-symbol';
import transformFlowStripTypes from 'babel-plugin-transform-flow-strip-types';
import transformReactJSX from 'babel-plugin-transform-react-jsx';
import transformObjectRestSpread from 'babel-plugin-transform-object-rest-spread';
import transformExportExtensions from 'babel-plugin-transform-export-extensions';
import transformAsyncToGenerator from 'babel-plugin-transform-async-to-generator';
import transformRegenerator from 'babel-plugin-transform-regenerator';
import transformClassProperties from 'babel-plugin-transform-class-properties';
import transformPureClass from './transformPureClass';

function nodeTarget({ modules }) {
  return {
    plugins: [
      syntaxJSX,
      syntaxDynamicImport,
      checkES2015Constants,
      transformPureClass,
      transformClassProperties,
      transformFlowStripTypes,
      transformObjectRestSpread,
      transformExportExtensions,
      transformAsyncToGenerator,
      transformReactJSX,
      modules === 'cjs' && [transformES2015ModulesCommonJS, { loose: false }],
    ].filter(Boolean),
  };
}

function browserTarget({ modules }) {
  return {
    plugins: [
      syntaxJSX,
      syntaxDynamicImport,
      checkES2015Constants,
      transformPureClass,
      transformClassProperties,
      transformFlowStripTypes,
      [transformES2015TemplateLiterals, { loose: false, spec: false }],
      transformES2015Literals,
      transformES2015FunctionName,
      [transformES2015ArrowFunctions, { spec: false }],
      transformES2015BlockScopedFunctions,
      [transformES2015Classes, { loose: false }],
      transformES2015ObjectSuper,
      transformES2015ShorthandProperties,
      transformES2015DuplicateKeys,
      [transformES2015ComputedProperties, { loose: false }],
      transformES2015StickyRegex,
      transformES2015UnicodeRegex,
      [transformES2015Spread, { loose: false }],
      transformES2015Parameters,
      [transformES2015Destructuring, { loose: false }],
      transformES2015BlockScoping,
      transformES2015TypeofSymbol,
      transformObjectRestSpread,
      transformExportExtensions,
      transformAsyncToGenerator,
      transformRegenerator,
      transformReactJSX,
      modules === 'cjs' && [transformES2015ModulesCommonJS, { loose: false }],
    ].filter(Boolean),
  };
}

export default function buildPreset(context, options = {}) {
  const {
    target = 'browser',
    modules = 'cjs',
  } = options;

  switch (target) {
    case 'node':
      return nodeTarget({ modules });
    case 'browser':
    default:
      return browserTarget({ modules });
  }
}
