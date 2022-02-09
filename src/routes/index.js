import {Router} from 'express'
import feeComputation from '../controllers/computation'
import postFees from '../controllers/post.fees'

const router = Router()

router
.route("/fees")
.post(postFees)

router
.route("/compute-transaction-fee")
.post(feeComputation)

export default router

