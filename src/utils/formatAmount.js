
export default function formatAmount(amount) {
    const formattedTotal = new Intl.NumberFormat('en-US').format(amount);

    return (
        formattedTotal
    )
}
