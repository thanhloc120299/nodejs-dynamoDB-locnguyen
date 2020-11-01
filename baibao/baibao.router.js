import express from "express";
const router = express.Router();
import * as controller from './baibao.controller';

router.get('/', (req, res) => {
    res.render("index");
})
router.post('/',(req, res) => {
    console.log(req.body)
})
router.get('/getbao', controller.getBaiBao);
router.post('/addbao', controller.addBaiBao);
router.delete('/:id', controller.xoabao);

export default router;
