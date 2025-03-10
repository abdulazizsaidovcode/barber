// text kesish uchun ikkita parametr kirib keladi birinchisi textni ozi ikkinchisi nechtasini kesish

export const truncateText = (text: string, length: number) => {
    return text?.toString().length > length ? text.toString().slice(0, length) + "..." : text;
};