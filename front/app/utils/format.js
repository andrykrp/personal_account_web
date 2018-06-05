export function formatWalletNumber(value) {
    const
        partOne = String(value).substring(0, 3),
        partTwo = String(value).substring(3, 6),
        partThree = String(value).substring(6);

    return partOne + '-' + partTwo + '-' + partThree;
}

export function formatPhone(value) {
    const
        partOne = String(value).substring(0, 1),
        partTwo = String(value).substring(1);

    return '(+' + partOne + ')' + partTwo;
}