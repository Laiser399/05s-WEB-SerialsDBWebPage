

export function prepareDate(date) {
    let day = date.getDate() < 10 ? `0${date.getDate()}` : `${date.getDate()}`;
    let month = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : `${date.getMonth() + 1}`;

    return `${day}.${month}.${date.getFullYear()}`;
}
