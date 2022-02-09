import fs from 'fs'
import path from 'path'
import {
    getComputationData,
    extractFeeValue,
    calculateFee,
    wrapAsync,
    ErrorResponse
} from '../utils'

const readFileData = () => {
    const stringifiedData = fs.readFileSync(path.join(process.cwd(), 'data', 'data.json'))
    const rawData = JSON.parse(stringifiedData)

    return rawData
}



const feeComputation = wrapAsync(async (req, res, next) => {
    const { PaymentEntity, Amount, Currency, Customer: { BearsFee } } = req.body

    if (Currency !== "NGN") return next(new ErrorResponse("No fee configuration for USD transactions.", 422))

    const data = readFileData()

    const computation = getComputationData(PaymentEntity, data)
    if (!computation) return next(ErrorResponse("We don not have a valid transaction for this payment details", 404))

    const feeObject = extractFeeValue(computation)

    const transactionFee = calculateFee(feeObject, Amount)

    const appliedFee = Number(Amount) + Number(transactionFee)
    const merchantFee = Number(Amount) - Number(transactionFee)

    return res.status(200).json({
        AppliedFeeID: feeObject.fee_id,
        AppliedFeeValue: transactionFee,
        ChargeAmount: BearsFee ? appliedFee : Amount,
        SettlementAmount: BearsFee ? Amount : merchantFee
    })
})

export default feeComputation