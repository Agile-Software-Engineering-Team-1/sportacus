from django.http import HttpResponse
from django.template import loader
from sportsipy.nfl.teams import Teams
from sportsipy.nfl.teams import Team
from sportsipy.nfl.schedule import Schedule
import json
import os
from datetime import datetime, date
import argparse

last_season = str(int(date.today().year) - 1)
nfl_season_start = date(date.today().year, 9, 9)
#If today's date is AFTER the start of the NFL season, set the default year to THIS season
if(date.today() >= nfl_season_start):
    last_season = str(int(date.today().year))

json_dir = "sporticus/json-data/"
if(not os.path.exists(json_dir)):
    os.makedirs(json_dir)

teams = Teams(year=last_season)
team_abrvs = [team.abbreviation for team in teams]

#Takes in the file (full path) and the list of json data
#Writes the contents of the list to the .json file formatted properly for React to read
# ** This function WILL create the file if it does NOT exist **
def writeJsonToFile(json_file_path, json_list):
    if(os.path.splitext(json_file_path)[-1].lower() != ".json"):
        raise argparse.ArgumentTypeError("Not a json file! The first arg must be of type *.json")
        
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
#Writes the dictionary to a file in json format for displaying on the front end
def buildTeamDict(teams, year) :
    json_file_path = os.path.join(json_dir,"nfl-teams.json")
    team_dict = {}
    team_list = []
    x = 1
    for team in teams:
        team_dict[f"{x}"] = {"year":f"{year}", "abrv":f"{team.abbreviation}",
        "name":f"{team.name}", "rank":f"{team.rank}", "wins":f"{team.wins}", "losses":f"{team.losses}",
        "winpcnt":f"{round((team.wins / team.games_played) * 100, 2)}", "passtd":f"{team.pass_touchdowns}", "rushtd":f"{team.rush_touchdowns}",
        "tds":f"{team.pass_touchdowns + team.rush_touchdowns}", "yards":f"{team.yards}", "trnovs":f"{team.turnovers}",
        "fmbls":f"{team.fumbles}", "ints":f"{team.interceptions}", "ydspplay":f"{team.yards_per_play}"}
        x += 1
    
    for team in team_dict.values():
        team_list.append(json.dumps(team, indent=4))

    #Remove old data each time this function is called
    if(os.path.exists(json_file_path)):
        os.remove(json_file_path)
    
    try:
        writeJsonToFile(json_file_path, team_list)
    except argparse.ArgumentTypeError as e:
        print(e)

    return team_dict

#Takes in a list of team abbreviations and a year
#Builds a dictionary of the past 3 years (inclusive) for the teams in the list
#Writes dictionary to a file in json format for displaying on the front end
def buildTeamDictMultiYear(teams, year) :
    json_file_path = os.path.join(json_dir,"nfl-teams.json")
    year_dict = {}
    year_list = []

    if(int(year) > int(last_season)):
        year = last_season

    for season in range((year - 2), (year + 1)):
        team_dict = {}
        team_list = []
        x = 1
        for team in teams:
            team_stats = Team(team_name=team, year=season)

            team_dict[f"{x}"] = {"year":f"{season}", "abrv":f"{team_stats.abbreviation}",
            "name":f"{team_stats.name}", "rank":f"{team_stats.rank}", "wins":f"{team_stats.wins}", "losses":f"{team_stats.losses}",
            "winpcnt":f"{round((team_stats.wins / team_stats.games_played) * 100, 2)}", "passtd":f"{team_stats.pass_touchdowns}", "rushtd":f"{team_stats.rush_touchdowns}",
            "tds":f"{team_stats.pass_touchdowns + team_stats.rush_touchdowns}", "yards":f"{team_stats.yards}", "trnovs":f"{team_stats.turnovers}",
            "fmbls":f"{team_stats.fumbles}", "ints":f"{team_stats.interceptions}", "ydspplay":f"{team_stats.yards_per_play}"}
            x += 1
    
        for team in team_dict.values():
            team_list.append(team)

        year_dict[f"{season}"] = {"year":f"{season}", "teams":team_list}

    for season in year_dict.values():
        year_list.append(json.dumps(season, indent=4))

    #Remove old data each time this function is called
    if(os.path.exists(json_file_path)):
        os.remove(json_file_path)
    
    try:
        writeJsonToFile(json_file_path, year_list)
    except argparse.ArgumentTypeError as e:
        print(e)

    return year_dict

#Takes in a list of team abbreviations and a year
#Builds a dictionary of the schedules for each year (inclusive) for the teams in the list
#Writes the dictionaries to a file in json format for displaying on the front end
def buildNflSchedule(team_abrvs, year):
    json_file_path = os.path.join(json_dir, "nfl-schedules.json")
    year_dict = {}
    year_list = []

    if(int(year) > int(last_season)):
        year = last_season

    for season in range((year - 2), (year + 1)):
        schedule_dict = {}
        schedule_list = []
        x = 1
        for team in team_abrvs:
            schedule = Schedule(team, season)
            game_dict = {}
            game_list = []

            y = 1
            for game in schedule:
                field_goal_att = game.field_goals_attempted
                if(field_goal_att == 0):
                    field_goal_att = 1

                game_dict[f"game{y}"] = {"date":f"{game.date}", "year":f"{season}", "opponent":f"{game.opponent_name}",
                "scored":f"{game.points_scored}", "allowed":f"{game.points_allowed}",
                "fld_goal_pct":f"{round((game.field_goals_made / field_goal_att) * 100, 2)}", "fourth_down_attempts":f"{game.fourth_down_attempts}",
                "fourth_down_conv":f"{game.fourth_down_conversions}", "third_down_attempts":f"{game.third_down_attempts}",
                "third_down_conv":f"{game.third_down_conversions}", "pass_tds":f"{game.pass_touchdowns}",
                "pass_cmp_rate":f"{game.pass_completion_rate}", "pass_yards":f"{game.pass_yards}",
                "ints":f"{game.interceptions}", "rush_yds":f"{game.rush_yards}", "rush_tds":f"{game.rush_touchdowns}",
                "times_sacked":f"{game.times_sacked}"}

                found = False
                for dict in game_list:
                    if(dict["date"] == game_dict[f"game{y}"]["date"] and dict["opponent"] == game_dict[f"game{y}"]["opponent"]):
                        found = True
                if(not found):
                    game_list.append(game_dict[f"game{y}"])
                
                y += 1
        
            schedule_dict[f"{x}"] = {"team":f"{team}", "games":game_list}
            x += 1
    
        for sched in schedule_dict.values():
            schedule_list.append(sched)

        year_dict[f"{season}"] = {"year":f"{season}", "schedule":schedule_list}

    for season in year_dict.values():
        year_list.append(json.dumps(season, indent=4))
    
        #Remove old data each time this function is called
    if(os.path.exists(json_file_path)):
        os.remove(json_file_path)
    
    try:
        writeJsonToFile(json_file_path, year_list)
    except argparse.ArgumentTypeError as e:
        print(e)

    return year_dict

#View function to build the json data for all nfl teams
#Triggered when the home page of the website is fetched -> http://127.0.0.1:8000
def index(request):
    template = loader.get_template("index.html")
    return HttpResponse(template.render({ "team_data" : buildTeamDict(teams, last_season)}, request))

#View function to build the schedule and statistics for a requested team over the past 3 years
#Triggered when the /nfl/<team_abbrv>/<year>/ endpoint is fetched -> http://127.0.0.1:8000/nfl/phi/2021
def renderNflTeamStatsAndSchedule(request, abbrv, year=last_season):
    template = loader.get_template("index.html")
    
    team_abbrv = [abbrv.strip().upper()]
    if(team_abbrv[0] not in team_abrvs):
        print("Error: Team - " + team_abbrv[0] + " not found in nfl teams.")
        return HttpResponse(template.render({}, request))
        
    return HttpResponse(template.render({ "team_data" : buildNflSchedule(team_abbrv, year), "team_stats": buildTeamDictMultiYear(team_abbrv, year)}, request))