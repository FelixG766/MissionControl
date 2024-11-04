export const isEmptyString = (value) => {
    return !value || value === null || value.trim() === '';
}