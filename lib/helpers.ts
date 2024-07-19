import { currencies } from "./currencies"

export function dateToUTCDate(date: Date) {
    return new Date(
        Date.UTC(
            date.getFullYear(),
            date.getMonth(),
            date.getDate(),
            date.getHours(),
            date.getMinutes(),
            date.getSeconds(),
            date.getMilliseconds()
        )
    )
}

// export function formatCurrecncy(currency:string) {
//     // const locale = currencies.find(c => c.value===currency)?.locale;
//     // return new Intl.NumberFormat(locale, {
//     //     style: "currency",
//     //     currency,
//     // })
//     return new Intl.NumberFormat("en-IN", {
//         style: "currency",
//         currency,
//     });
// }
export const formatCurrency = (value:number) => {
    return new Intl.NumberFormat('en-IN', {maximumFractionDigits: 2, minimumFractionDigits: 2}).format(
        value,
    );
}