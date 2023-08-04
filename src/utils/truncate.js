export const truncate = (words, maxlength) => {
    return `${words.slice(0, maxlength)}…`
}