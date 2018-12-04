 export function formatNumber(num, type) {
    let numSplit, int, des;
    num = Math.abs(num);
    num = num.toFixed(1);

    numSplit = num.split(".");
    int = numSplit[0];

    if (int.length > 3) {
        int = int.substr(0, int.length - 3) + "," + int.substr(int.length - 3, int.length);
    }
    des = numSplit[1];

    return (type === 'expense' ? '-' : '+') + ' ' + int + '.' + des;
}
