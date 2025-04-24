export const getTimeString = () => {
    let currentDate = new Date();
    let year = currentDate.getFullYear();
    let month = String(currentDate.getMonth() + 1).padStart(2, '0');
    let day = String(currentDate.getDate()).padStart(2, '0');
    let hours = String(currentDate.getHours()).padStart(2, '0');
    let minutes = String(currentDate.getMinutes()).padStart(2, '0');
    let seconds = String(currentDate.getSeconds()).padStart(2, '0');

    let formattedDateString = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    return formattedDateString
}
// 字符串截取
export const cutString=(s:string, n:number, m:number) =>{
    if(!s) {
        return ''
    }
    // 先判断传入的n和m是否合理，如果n大于等于字符串本身长度，直接返回原字符串
    if (n >= s.length) {
        return s;
    }
    // 同理，如果m大于等于字符串本身长度，也直接返回原字符串
    if (m >= s.length) {
        return s;
    }
    // 使用slice方法截取前n位，slice(0, n)表示从索引0开始（包含索引0处的字符）截取到索引n处（不包含索引n处的字符）
    let frontPart = s.slice(0, n);
    // 使用slice方法截取后m位，slice(-m)表示从字符串末尾往前数m个字符开始截取到字符串末尾
    let backPart = s.slice(-m);
    // 将前n位、...以及后m位进行拼接并返回结果
    return frontPart + "..." + backPart;
}