export default function capitalize(str : string) : string {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export function getNonce() {
    let text = "";
    const possible =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 0; i < 32; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

export function countChars(str : string, tgChar : string) : number {
  let result = 0;
  for (let i = 0;i<str.length;i++) {
    if(str[i]===tgChar) {
        result++;
    }
  }
  return result;
}