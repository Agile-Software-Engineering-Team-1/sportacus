from django.http import HttpResponse
from django.template import loader
from sportsipy.nfl.teams import Teams
import json
import os

json_dir = "json-data/"
teams = Teams(year="2021")

#Takes in a list of the sports teams and the year (which season team data is from)
#Builds and returns a dictionary containing the teams and desired statistics
def buildTeamDict(teams, year) :
    json_file_path = os.path.join(json_dir,"nfl-teams.json")
    team_dict = {}
    x = 1
    for team in teams:
        team_dict[f"Team{x}"] = {"year":f"{year}", "abrv":f"{team.abbreviation}",
        "name":f"{team.name}", "rushtd":f"{team.rush_touchdowns}"}
        x += 1
    
    #Remove old data each time this function is called
    if(os.path.exists(json_file_path)):
        os.remove(json_file_path)
    
    with open(json_file_path, 'w') as json_file:
        json.dump(team_dict, json_file, indent=4)

    return team_dict

def index(request):
    template = loader.get_template("index.html")
    return HttpResponse(template.render({ "data" : buildTeamDict(teams, "2021")}, request))