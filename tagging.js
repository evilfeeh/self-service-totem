const tag = process.argv[2]
const versionMeasure = process.argv[3].toUpperCase()

const splitedTag = tag.substring(0,6).match(/\d/g).map((number) => parseInt(number))

switch (versionMeasure) {
    case 'MAJOR':
        splitedTag[0]++
        break
    case 'MINOR':
        splitedTag[1]++
        break
    case 'PATCH':
        splitedTag[2]++
        break
}

console.log(`v${splitedTag.join('.')}`)
