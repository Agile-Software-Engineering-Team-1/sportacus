from django.http import HttpResponse
from django.template import loader
from sportsipy.nfl.teams import Teams

teams = Teams(year="2021")

#Takes in a list of the sports teams and the year (which season team data is from)
#Builds and returns a dictionary containing the teams and desired statistics
def buildTeamDict(teams, year) :
    team_dict = {}
    x = 1
    for team in teams:
        team_dict[f"Team{x}"] = {"year":f"{year}", "abrv":f"{team.abbreviation}",
        "name":f"{team.name}", "rushtd":f"{team.rush_touchdowns}"}
        x += 1
    
    return team_dict

def index(request):
    template = loader.get_template("index.html")
    return HttpResponse(template.render({ "data" : buildTeamDict(teams, "2021")}, request))