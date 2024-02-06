const requiredVersion = 'v20.11.0'
const actualVersion = process.version

if (actualVersion !== requiredVersion) {
  console.error(
    `Required Node.js version is ${requiredVersion}, but you are using ${actualVersion}. Please switch to the recommended version.`
  )
  process.exit(1)
}
