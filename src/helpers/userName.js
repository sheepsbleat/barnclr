const { uniqueNamesGenerator, adjectives, colors, animals } = require('unique-names-generator');
 export default function name() {
    const randomName = uniqueNamesGenerator({ dictionaries: [adjectives, colors, animals] }); 
    return randomName.replace(/_/gm, " ");
}