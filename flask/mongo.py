from flask_mongoengine import MongoEngine
from datetime import datetime
import csv

mdb = MongoEngine()

class Data(mdb.Document):
    teamID = mdb.StringField(max_length=3, required=True)
    teamName = mdb.StringField(required=True)
    position = mdb.ListField(min_value=1, max_value=21, required=True)
    points = mdb.ListField(required=True)
    wins = mdb.ListField(required=True)
    draws = mdb.ListField(required=True)
    losses = mdb.ListField(required=True)
    goalsfor = mdb.ListField(required=True)
    goalsagainst = mdb.ListField(required=True)
    goaldiff = mdb.ListField(required=True)
    meta = {
        'collection': 'premdata',
    }

class DataTypes(mdb.Document):
    typeName = mdb.StringField(required=True)
    color = mdb.StringField(required=True)
    scaleupper = mdb.IntField()
    scalelower = mdb.IntField()
    meta = {
        'collection': 'premdatatypes',
    }

def init_data(csv2):
    if(DataTypes.objects.count() == 0):
        DataTypes(typeName="position", color="#e90052", scaleupper=1, scalelower=21).save()
        DataTypes(typeName="points", color="#9604ff", scaleupper=100, scalelower=0).save()
        DataTypes(typeName="wins", color="#04f5ff", scaleupper=100, scalelower=0).save()
        DataTypes(typeName="draws", color="#ffffff", scaleupper=100, scalelower=0).save()
        DataTypes(typeName="losses", color="#00ff85", scaleupper=100, scalelower=0).save()
        DataTypes(typeName="goalsfor", color="#EAFF04", scaleupper=100, scalelower=0).save()
        DataTypes(typeName="goalsagainst", color="#e94a00", scaleupper=100, scalelower=0).save()
        DataTypes(typeName="goaldiff", color="#3785fa", scaleupper=80, scalelower=-80).save()
    if(Data.objects.count() == 0):
        print("We here")
        years = []
        for i in range(1993, 2019):
            years.append(i)
        with open('static/premdata.csv', 'rt') as csvfile:
            datareader = csv.reader(csvfile, delimiter=',')
            initialteam = None
            i=0
            #for row in datareader:
            row = next(datareader, None)
            teamname = row[0] 
            while 1 == 1:
                #row = datareader.next() 
                #row = next(datareader, None) 
                if row is None:
                    break;   
                if teamname != initialteam:
                    
                    i = 0
                    initialteam = teamname
                    teamid = row[1]
                    positions = []
                    points = []
                    wins = []
                    draws = []
                    losses = []
                    goalsfor = []
                    goalsagainst = []
                    goaldiff = []
                    for i in range (0,len(years)):
                        positions.append(21)
                        points.append(0)
                        wins.append(0)
                        draws.append(0)
                        losses.append(0)
                        goalsfor.append(0)
                        goalsagainst.append(0)
                        goaldiff.append(0)
                        

                while teamname == initialteam:
                    
                    year = int(row[2])
                    index = years.index(year)
                    positions[index] = int(row[3])
                    points[index] = int(row[10])
                    wins[index] = int(row[4])
                    draws[index] = int(row[5])
                    losses[index] = int(row[6])
                    goalsfor[index] = int(row[7])
                    goalsagainst[index] = int(row[8])
                    goaldiffnum = int(float(row[9]))
                    goaldiff[index] = goaldiffnum
            
                    row = next(datareader, None)
                    if row is None:
                        break
                    teamname = row[0]
                newData = Data(teamID=teamid, teamName=initialteam, position=positions, points=points, wins=wins, draws=draws, losses=losses, goalsfor=goalsfor, goalsagainst=goalsagainst, goaldiff=goaldiff).save()
            # newData = Data(teamID=teamid, teamName=initialteam, position=positions, points=points, wins=wins, draws=draws, losses=losses, goalsfor=goalsfor, goalsagainst=goalsagainst, goaldiff=goaldiff).save()







