import { Router } from 'express';
import test from './test'

const router = Router()

router.use('/test', test)

export default router