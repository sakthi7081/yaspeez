export const changeKey = data => data.map(info => ({key: info.id.toString(), label: info.text}));
export const isJson = (str) => {
    try { JSON.parse(str); } catch (e) { return false; }
    return true;
}
