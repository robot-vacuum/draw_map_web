import json
from collections import OrderedDict

import time

FILE_PATH = "public/data/"
FILE_NAME = "map.json"
def getLogFileName(id):
    return FILE_PATH + "map_" + str(id) + ".json"

def getJson():
    with open(FILE_PATH+FILE_NAME, 'r') as f:
        json_data = json.load(f, object_pairs_hook=OrderedDict)
        print(json_data)
        return json_data

def saveJson(data):
    json_obj = OrderedDict()

    for key in data:
        json_obj[key] = data[key]

    print("Map Data: ", json_obj)

    map_file = open(FILE_PATH+FILE_NAME, 'w', encoding="utf8")
    json.dump(json_obj, map_file, ensure_ascii=False, indent="\t")
    print("Map Save Complete")
    
    #log_file = open(getLogFileName(int(time.time())), 'w', encoding="utf8")
    #json.dump(json_obj, log_file, ensure_ascii=False, indent="\t")
    #print("Map Log Save Complete")

if __name__ == "__main__":
    saveJson({
        "size" : 5,
        "data": [
        [100.0, 100.0],
        [150.0, 200.0],
        [250.0, 300.0],
        [300.0, 250.0],
        [200.0, 550.0],
      ]
    })