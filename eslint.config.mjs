// eslint 9 flat config. eslint-config-next 16 ships flat configs directly, so
// these are imported rather than wrapped in FlatCompat - the compat shim crashes
// on a circular reference against this version.
import coreWebVitals from 'eslint-config-next/core-web-vitals'
import typescript from 'eslint-config-next/typescript'

const config = [
  { ignores: ['.next/**', 'node_modules/**', 'next-env.d.ts'] },
  ...(Array.isArray(coreWebVitals) ? coreWebVitals : [coreWebVitals]),
  ...(Array.isArray(typescript) ? typescript : [typescript]),
]

export default config
