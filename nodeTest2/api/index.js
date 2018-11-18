import express from 'express';
import { TeamName } from '../db';

const router = express.Router();

router.get('/data', (req, res) => {
    TeamName.findAll({order: [['teamName', 'ASC']],
                        attributes: ['teamID', 'teamName', ['positions', 'dataSet']]}).then(teamData => {
        var type = req.query.type;
        res.send(teamData); 
    })
})

export default router;