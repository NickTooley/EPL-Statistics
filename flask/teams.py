from flask import (Blueprint, flash, g, redirect, render_template, request, url_for)
from werkzeug.exceptions import abort
from mongo import Data, DataTypes
from flask_mongoengine import MongoEngine

bp = Blueprint('teams', __name__)

@bp.route('/teams/<string:team>')
def show_team(team):
    teamdata = Data.objects(teamID=team).first()
    allData = Data.objects.all() 
    datatypes = DataTypes.objects.all()

    return render_template('teams/teams.html', dataset=allData, teamData=teamdata, dataTypes=datatypes)

@bp.route('/')
def show_league():
    allData = Data.objects.all() 

    return render_template('league/league.html', dataset=allData)
