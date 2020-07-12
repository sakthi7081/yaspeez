export const changeKey = data => data.map(info => ({key: info.id.toString(), label: info.text}));
