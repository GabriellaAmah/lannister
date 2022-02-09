

const FeeLocale = Object.freeze({
    INTERNATIONAL: "INTL",
    LOCALE: "LOCL"
})

const FeeType = Object.freeze({
    FLAT_PERC: "FLAT_PERC",
    FLAT: "FLAT",
    PERC: "PERC"
})

const calculateFee = ({ fee_type, fee_value }, transactionAmount) => {
    let amount;
    switch (fee_type) {
        case FeeType.FLAT:
            amount = 50
            break
        case FeeType.PERC:
            amount = (+fee_value * +transactionAmount) / 100
            break
        case FeeType.FLAT_PERC:
            fee_value = fee_value.split(":")
            amount = +fee_value[0] + ((+fee_value[1] * +transactionAmount) / 100)
            break
    }

    return amount
}

const extractFeeValue = (str) => {
    const feeArray = str.split(" ")
    return {
        fee_type: feeArray[feeArray.length - 2],
        fee_value: feeArray[feeArray.length - 1],
        fee_id: feeArray[0]
    }
}

const searchSpecificity = ({ type, locale, specificity }, data) => {
    let possibleCombination;

    if (specificity) {
        possibleCombination = [
            `${locale} ${type}(${specificity})`,
            `${locale} *(${specificity})`,
            `* ${type}(${specificity})`
                `* *(${specificity})`,
            `* *(*)`
        ]
    }

    if (!specificity && type) {
        possibleCombination = [
            `${locale} ${type}(*)`,
            `* ${type}(*)`,
            `* *(*)`
        ]
    }

    if (!specificity && !type && locale) {
        possibleCombination = [`${locale} *(*)`, `* *(*)`]
    }

    const finalPossibility = possibleCombination || [`* *(*)`]

    console.log(finalPossibility)

    let computation;

    for (let str of data) {
        for (let phrase of finalPossibility) {
            if (str.includes(phrase)) computation = str
        }
    }

    return computation

}

const getComputationData = ({ Country, Type, Issuer, Number, Brand }, data) => {
    console.log(data)
    const feeLocale = Country === "NG" ? FeeLocale.LOCALE : FeeLocale.INTERNATIONAL

    const NumberExist = data.every((fcs) => !fcs.includes(`${(Number)}`))
    if (!NumberExist) return searchSpecificity({ type: Type, locale: feeLocale, specificity: Number }, data)

    const IssuerExist = data.every((fcs) => !fcs.includes(`${(Issuer)}`))
    if (!IssuerExist) return searchSpecificity({ type: Type, locale: feeLocale, specificity: Issuer }, data)

    const BrandExist = data.every((fcs) => !fcs.includes(`${(Brand)}`))
    if (!BrandExist) return searchSpecificity({ type: Type, locale: feeLocale, specificity: Brand }, data)

    const typeExist = data.every((fcs) => !fcs.includes(` ${Type}(*)`))
    if (!typeExist) return searchSpecificity({ type: Type, locale: feeLocale }, data)

    return searchSpecificity({ locale: feeLocale }, data)
}

module.exports =  {
    calculateFee,
    extractFeeValue,
    getComputationData
}