const fs = require('fs')
const path = require('path');

const fn = process.argv[2];

const data = JSON.parse(fs.readFileSync(fn))


fs.writeFileSync("../frontend/src/artifacts/" + path.parse(fn).name + '.ts', "const e = " + JSON.stringify(data.abi) + " as const;\n export default e;")