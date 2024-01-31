import express from 'express';
import listEndpoints from 'express-list-endpoints';

const router = express.Router();

router.get('/', (req, res) => {
    const endpoints = listEndpoints(req.app);
    res.render('endpoints', { endpoints });
});

export default router;
