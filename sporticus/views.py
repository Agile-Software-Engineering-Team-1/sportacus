from django.http import HttpResponse
from django.template import loader
from sportsipy.nfl.teams import Teams
import json
import os

json_dir = "sporticus/json-data/"
teams = Teams(year="2021")

#Takes in the file (full path) and the list of json data
#Writes the contents of the list to the .json file formatted properly for React to read
# ** This function WILL create the file if it does NOT exist **
def writeJsonToFile(json_file_path, json_list):
    with open(json_file_path, 'w') as json_file:

        json_file.write("[\n")
        for x in range(len(json_list)):

            json_file.write(json_list[x])

            if(x != len(json_list) - 1):
                json_file.write(",")

            json_file.write("\n")

        json_file.write("]")

#Takes in a list of the sports teams and the year (which season team data is from)
#Builds and returns a dictionary containing the teams and desired statistics
def buildTeamDict(teams, year) :
    json_file_path = os.path.join(json_dir,"nfl-teams.json")
    team_dict = {}
    team_list = []
    x = 1
    for team in teams:
        team_dict[f"Team{x}"] = {"year":f"{year}", "abrv":f"{team.abbreviation}",
        "name":f"{team.name}", "rushtd":f"{team.rush_touchdowns}"}
        x += 1
    
    for team in team_dict.values():
        team_list.append(json.dumps(team, indent=4))

    #Remove old data each time this function is called
    if(os.path.exists(json_file_path)):
        os.remove(json_file_path)
    
    writeJsonToFile(json_file_path, team_list)

    return team_dict

def index(request):
    template = loader.get_template("index.html")
    return HttpResponse(template.render({ "data" : buildTeamDict(teams, "2021")}, request))