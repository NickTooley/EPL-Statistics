import express from 'express';
import { TeamName } from '../db';

const router = express.Router();

router.get('/positions', (req, res) => {
    TeamName.findAll({order: [['teamName', 'ASC']],
                        attributes: ['teamID', 'teamName', ['positions', 'dataSet']]}).then(teamData => {
        var type = req.query.type;
        res.send({data: teamData, scales: [1,21]});
    })
})

router.get('/points', (req, res) => {
    TeamName.findAll({order: [['teamName', 'ASC']],
                        attributes: ['teamID', 'teamName', ['points', 'dataSet']]}).then(teamData => {
            var type = req.query.type;
            res.send({data: teamData, scales: [100,0]});
        })
})

router.get('/wins', (req, res) => {
    TeamName.findAll({order: [['teamName', 'ASC']],
                        attributes: ['teamID', 'teamName', ['wins', 'dataSet']]}).then(teamData => {
            var type = req.query.type;
            res.send({data: teamData, scales: [40,0]});
        })
})

router.get('/draws', (req, res) => {
    TeamName.findAll({order: [['teamName', 'ASC']],
                        attributes: ['teamID', 'teamName', ['draws', 'dataSet']]}).then(teamData => {
            var type = req.query.type;
            res.send({data: teamData, scales: [40,0]});
        })
})

router.get('/losses', (req, res) => {
    TeamName.findAll({order: [['teamName', 'ASC']],
                        attributes: ['teamID', 'teamName', ['losses', 'dataSet']]}).then(teamData => {
            var type = req.query.type;
            res.send({data: teamData, scales: [40,0]});
        })
})

router.get('/goalsfor', (req, res) => {
    TeamName.findAll({order: [['teamName', 'ASC']],
                        attributes: ['teamID', 'teamName', ['goalsfor', 'dataSet']]}).then(teamData => {
            var type = req.query.type;
            res.send({data: teamData, scales: [100,0]});
        })
})

router.get('/goalsagainst', (req, res) => {
    TeamName.findAll({order: [['teamName', 'ASC']],
                        attributes: ['teamID', 'teamName', ['goalsagainst', 'dataSet']]}).then(teamData => {
            var type = req.query.type;
            res.send({data: teamData, scales: [100,0]});
        })
})

router.get('/goaldiff', (req, res) => {
    TeamName.findAll({order: [['teamName', 'ASC']],
                        attributes: ['teamID', 'teamName', ['goaldiff', 'dataSet']]}).then(teamData => {
            var type = req.query.type;
            res.send({data: teamData, scales: [80,-80]});
        })
})

export default router;