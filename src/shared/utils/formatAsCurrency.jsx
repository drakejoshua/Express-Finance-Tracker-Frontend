export function formatAsCurrency( value, preferredCurrency = "USD" ) {
    return value.toLocaleString(
        'en-US',
        {
            style: 'currency',
            currency: preferredCurrency,
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }
    )
}