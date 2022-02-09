import fs from 'fs'
import path from 'path'
import {
    wrapAsync
} from '../utils'

const writeToFile = async (data) => {
    let rawData;

    const stringifiedData = fs.readFileSync(path.join(process.cwd(), 'data', 'data.json'))
    
    rawData = JSON.parse(stringifiedData)
    rawData.push(...data)

    fs.writeFile(path.join(process.cwd(), 'data', 'data.json'), JSON.stringify(rawData), err => {
        if (err) throw err
        console.log("fee configuration spec successfully added")
    })
}

const postFees = wrapAsync(async (req, res) => {
    const configSpecArray = req.body.FeeConfigurationSpec.split("\n")

    await writeToFile(configSpecArray)

    return res.status(201).json({
        status: "ok"
    })
})

export default postFees