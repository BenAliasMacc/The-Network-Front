export const dateParser = (num) => {
    const options = { hour: '2-digit', minute: '2-digit', second: '2-digit', year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date(num).toLocaleDateString('fr-FR', options)

    return date;
};

export const isEmpty = (value) => {
    return (
        value === undefined || 
        value === null ||
        (typeof value === "object" && Object.keys(value).length === 0) ||
        (typeof value === "string" && value.trim().length === 0)
    )
}