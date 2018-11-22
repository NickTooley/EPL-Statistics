from flask import (Blueprint, flash, g, redirect, render_template, request, url_for)
from werkzeug.exceptions import abort
from mongo import Data, DataTypes
from flask_mongoengine import MongoEngine
import json

bp = Blueprint('teams', __name__)

@bp.route('/teams/<string:team>')
def show_team(team):
    teamdata = Data.objects(teamID=team).first()
    allData = Data.objects.all() 
    datatypes = DataTypes.objects.all()

    return render_template('teams/teams.html', dataset=allData, teamData=teamdata, dataTypes=datatypes)

@bp.route('/oldmethod')
def show_league():
    allData = Data.objects.all() 

    return render_template('league/league.html', dataset=allData)

@bp.route('/')
def show_react():
    allData = Data.objects.all() 

    return render_template('base2.html', dataset=allData)

@bp.route('/api/positions')
def show_positions():
    allData = Data.objects.all()
    
    toReturn = {}
    dataArr = []
    scales = [1,21]
    for data in allData:
        newobj = {}
        newobj['teamID'] = data.teamID
        newobj['teamName'] = data.teamName
        newobj['dataSet'] = data.position
        # jsonobj = json.dumps('teamID': data.teamID, 'teamName': data.teamName, 'dataSet': data.position)
        print(newobj)
        dataArr.append(newobj)

    toReturn['data'] = dataArr
    toReturn['scales'] = scales
    finaljson = json.dumps(toReturn)

    return finaljson

@bp.route('/api/points')
def show_points():
    allData = Data.objects.all()
    
    toReturn = {}
    dataArr = []
    scales = [100,0]
    for data in allData:
        newobj = {}
        newobj['teamID'] = data.teamID
        newobj['teamName'] = data.teamName
        newobj['dataSet'] = data.points
        # jsonobj = json.dumps('teamID': data.teamID, 'teamName': data.teamName, 'dataSet': data.position)
        print(newobj)
        dataArr.append(newobj)

    toReturn['data'] = dataArr
    toReturn['scales'] = scales
    finaljson = json.dumps(toReturn)

    return finaljson

@bp.route('/api/wins')
def show_wins():
    allData = Data.objects.all()
    
    toReturn = {}
    dataArr = []
    scales = [38,0]
    for data in allData:
        newobj = {}
        newobj['teamID'] = data.teamID
        newobj['teamName'] = data.teamName
        newobj['dataSet'] = data.wins
        # jsonobj = json.dumps('teamID': data.teamID, 'teamName': data.teamName, 'dataSet': data.position)
        print(newobj)
        dataArr.append(newobj)

    toReturn['data'] = dataArr
    toReturn['scales'] = scales
    finaljson = json.dumps(toReturn)

    return finaljson

@bp.route('/api/draws')
def show_draws():
    allData = Data.objects.all()
    
    toReturn = {}
    dataArr = []
    scales = [20,0]
    for data in allData:
        newobj = {}
        newobj['teamID'] = data.teamID
        newobj['teamName'] = data.teamName
        newobj['dataSet'] = data.draws
        # jsonobj = json.dumps('teamID': data.teamID, 'teamName': data.teamName, 'dataSet': data.position)
        print(newobj)
        dataArr.append(newobj)

    toReturn['data'] = dataArr
    toReturn['scales'] = scales
    finaljson = json.dumps(toReturn)

    return finaljson

@bp.route('/api/losses')
def show_losses():
    allData = Data.objects.all()
    
    toReturn = {}
    dataArr = []
    scales = [30,0]
    for data in allData:
        newobj = {}
        newobj['teamID'] = data.teamID
        newobj['teamName'] = data.teamName
        newobj['dataSet'] = data.losses
        # jsonobj = json.dumps('teamID': data.teamID, 'teamName': data.teamName, 'dataSet': data.position)
        print(newobj)
        dataArr.append(newobj)

    toReturn['data'] = dataArr
    toReturn['scales'] = scales
    finaljson = json.dumps(toReturn)

    return finaljson

@bp.route('/api/goalsfor')
def show_goalsfor():
    allData = Data.objects.all()
    
    toReturn = {}
    dataArr = []
    scales = [120,0]
    for data in allData:
        newobj = {}
        newobj['teamID'] = data.teamID
        newobj['teamName'] = data.teamName
        newobj['dataSet'] = data.goalsfor
        # jsonobj = json.dumps('teamID': data.teamID, 'teamName': data.teamName, 'dataSet': data.position)
        print(newobj)
        dataArr.append(newobj)

    toReturn['data'] = dataArr
    toReturn['scales'] = scales
    finaljson = json.dumps(toReturn)

    return finaljson

@bp.route('/api/goalsagainst')
def show_goalsagainst():
    allData = Data.objects.all()
    
    toReturn = {}
    dataArr = []
    scales = [100,0]
    for data in allData:
        newobj = {}
        newobj['teamID'] = data.teamID
        newobj['teamName'] = data.teamName
        newobj['dataSet'] = data.goalsagainst
        # jsonobj = json.dumps('teamID': data.teamID, 'teamName': data.teamName, 'dataSet': data.position)
        print(newobj)
        dataArr.append(newobj)

    toReturn['data'] = dataArr
    toReturn['scales'] = scales
    finaljson = json.dumps(toReturn)

    return finaljson

@bp.route('/api/goaldiff')
def show_goaldiff():
    allData = Data.objects.all()
    
    toReturn = {}
    dataArr = []
    scales = [80,-80]
    for data in allData:
        newobj = {}
        newobj['teamID'] = data.teamID
        newobj['teamName'] = data.teamName
        newobj['dataSet'] = data.goaldiff
        # jsonobj = json.dumps('teamID': data.teamID, 'teamName': data.teamName, 'dataSet': data.position)
        print(newobj)
        dataArr.append(newobj)

    toReturn['data'] = dataArr
    toReturn['scales'] = scales
    finaljson = json.dumps(toReturn)

    return finaljson