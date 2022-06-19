from django.http import HttpResponse
from django.template import loader
from sportsipy.ncaaf.teams import Team
from sportsipy.ncaaf.teams import Teams
from sportsipy.ncaaf.conferences import Conferences
from sportsipy.ncaaf.schedule import Schedule
import json
import os
import argparse
from datetime import datetime, date

last_season = str(int(date.today().year) - 1)
nfl_season_start = date(date.today().year, 9, 9)

json_dir = "sporticus/json-data/"
if (not os.path.exists(json_dir)):
    os.makedirs(json_dir)

conf = Conferences(year=last_season)
teams = conf.conferences['big-ten']['teams']
team_abrvs = [team.upper() for team in teams]

#conference = Conferences('big-12','2021')
#teams = Teams(year="2021")

# Takes in the file (full path) and the list of json data
# Writes the contents of the list to the .json file formatted properly for React to read
# ** This function WILL create the file if it does NOT exist **
def writeJsonToFile(json_file_path, json_list):
    if (os.path.splitext(json_file_path)[-1].lower() != ".json"):
        raise argparse.ArgumentTypeError("Not a json file! The first arg must be of type *.json")

    with open(json_file_path, 'w') as json_file:

        json_file.write("[\n")
        for x in range(len(json_list)):

            json_file.write(json_list[x])

            if (x != len(json_list) - 1):
                json_file.write(",")

            json_file.write("\n")

        json_file.write("]")

def build_team_stats_dict(year):
    #conf = Conferences(year)
    #college_teams = conf.conferences['big-ten']['teams']
    json_file_path = os.path.join(json_dir, "ncaaf-teams.json")
    team_dict = {}
    team_list = []
    x = 1

    for k,v in teams.items():
        team = Team(k.upper())

    #for team in teams:
        team_dict[f"{x}"] = {"year": f"{year}", "abrv": f"{team.abbreviation}",
                             "name": f"{team.name}", "rank": f"{'NA'}", "wins": f"{team.wins}",
                             "losses": f"{team.losses}",
                             "winpcnt": f"{round((team.wins / team.games) * 100, 2)}",
                             "passtd": f"{team.pass_touchdowns}", "rushtd": f"{team.rush_touchdowns}",
                             "tds": f"{team.pass_touchdowns + team.rush_touchdowns}", "yards": f"{team.yards}",
                             "trnovs": f"{team.turnovers}",
                             "fmbls": f"{team.fumbles_lost}", "ints": f"{team.interceptions}",
                             "ydspplay": f"{team.yards_per_play}"}
        x += 1

    for team in team_dict.values():
        team_list.append(json.dumps(team, indent=4))

    # Remove old data each time this function is called
    if (os.path.exists(json_file_path)):
        os.remove(json_file_path)

    try:
        writeJsonToFile(json_file_path, team_list)
    except argparse.ArgumentTypeError as e:
        print(e)

    return team_dict


def buildNCAAFSchedule(year):
    json_file_path = os.path.join(json_dir, "ncaaf-schedules.json")
    year_dict = {}
    year_list = []

    if (int(year) > int(last_season)):
        year = last_season

    for season in range((int(year) - 2), (int(year) + 1)):
        conf = Conferences(year)
        college_teams = conf.conferences['big-ten']['teams']
        team_abrvs = [x.upper() for x in college_teams]
        schedule_dict = {}
        schedule_list = []
        x = 1
        for team in team_abrvs:
            schedule = Schedule(team, season)
            game_dict = {}
            game_list = []

            y = 1
            for game in schedule:
                #field_goal_att = game.field_goals_attempted
                #if (field_goal_att == 0):
                field_goal_att = 1

                game_dict[f"game{y}"] = {"date": f"{game.date}", "year": f"{season}",
                                         "opponent": f"{game.opponent_name}",
                                         "scored": f"{game.points_for}", "allowed": f"{game.points_against}",
                                         "result": f"{game.result}", "wins": f"{game.wins}", "losses": f"{game.losses}"
                                         #"fld_goal_pct": f"{round((game.field_goals_made / field_goal_att) * 100, 2)}",
                                         #"fourth_down_attempts": f"{game.fourth_down_attempts}",
                                         #"fourth_down_conv": f"{game.fourth_down_conversions}",
                                         #"third_down_attempts": f"{game.third_down_attempts}",
                                         #"third_down_conv": f"{game.third_down_conversions}",
                                         #"pass_tds": f"{game.pass_touchdowns}",
                                         #"pass_cmp_rate": f"{game.pass_completion_rate}",
                                         #"pass_yards": f"{game.pass_yards}",
                                         #"ints": f"{game.interceptions}", "rush_yds": f"{game.rush_yards}",
                                         #"rush_tds": f"{game.rush_touchdowns}",
                                         #"times_sacked": f"{game.times_sacked}"}
                                         }

                found = False
                for dict in game_list:
                    if (dict["date"] == game_dict[f"game{y}"]["date"] and dict["opponent"] == game_dict[f"game{y}"][
                        "opponent"]):
                        found = True
                if (not found):
                    game_list.append(game_dict[f"game{y}"])

                y += 1

            schedule_dict[f"{x}"] = {"team": f"{team}", "games": game_list}
            x += 1

        for sched in schedule_dict.values():
            schedule_list.append(sched)

        year_dict[f"{season}"] = {"year": f"{season}", "schedule": schedule_list}

    for season in year_dict.values():
        year_list.append(json.dumps(season, indent=4))

        # Remove old data each time this function is called
    if (os.path.exists(json_file_path)):
        os.remove(json_file_path)

    try:
        writeJsonToFile(json_file_path, year_list)
    except argparse.ArgumentTypeError as e:
        print(e)

    return year_dict

def index(request):
    template = loader.get_template("index.html")
    return HttpResponse(template.render({"data": build_team_stats_dict("2021")}, request))


def renderCollegeFootballTeamStatsAndSchedule(request, abbrv, year=last_season):
    template = loader.get_template("index.html")

    team_abbrv = [abbrv.strip().upper()]
    if (team_abbrv[0] not in team_abrvs):
        print("Error: Team - " + team_abbrv[0] + " not found in nfl teams.")
        return HttpResponse(template.render({}, request))

    return HttpResponse(template.render(
        {"team_data": buildNCAAFSchedule(year), "team_stats": build_team_stats_dict(year)},
        request))
