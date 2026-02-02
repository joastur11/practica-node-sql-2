import { Router, type Request, type Response } from "express";

const router = Router()

router.post('/', async (req: Request, res: Response) => {  
  res.send('ok!!!')  
})

export default router