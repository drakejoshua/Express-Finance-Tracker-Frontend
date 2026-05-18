/* 
    formatAsCurrency()

    This function is a utility function that formats a given numeric 
    value as a currency string in the specified preferred currency format
    to max 2 decimal places. It uses the built-in toLocaleString() method to
    convert the number to a localized currency string based on the provided
    preferred currency code (defaulting to "USD" if not specified).
    By using this function, we can ensure that all currency values displayed
    in the app are consistently formatted according to the user's preferred
    currency, improving the user experience and making it easier for users
    to understand and compare financial values throughout the app.
*/

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