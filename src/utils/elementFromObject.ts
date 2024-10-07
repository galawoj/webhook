export default function elementFromObject(ob: any, path: string[]){

return path.reduce((acc, key) => acc[key], ob);

}