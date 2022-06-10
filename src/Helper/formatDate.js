function formatMonth(month) {
    const months = [
        "januari",
        "februari",
        "maret",
        "april",
        "mei",
        "juni",
        "juli",
        "agustus",
        "september",
        "oktober",
        "november",
        "desember"
    ]

    return months[month]
}


function formatDate(date) {
    return date.getDate() + " " + formatMonth(date.getMonth()) + " " + date.getFullYear()
}

export default formatDate

