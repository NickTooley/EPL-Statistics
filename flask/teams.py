from flask import (Blueprint, flash, g, redirect, render_template, request, url_for)
from werkzeug.exceptions import abort
from mongo import Data

bp = Blueprint('teams', __name__)

@bp.route('/teams/<string:team>')
def show_team(team):
    teamdata = Data.objects(teamID=team)

    return render_template('base.html')

@bp.route('/')
def show_league():
    allData = Data.objects.all()
    for data in allData:
        print(data.position)  

    return render_template('league/league.html', dataset=allData)
