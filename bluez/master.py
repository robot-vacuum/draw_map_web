import bluetooth
from find import findAddr
from json_data.saveJson import saveJson, getJson

def make_num(str):
    num = 0
    for i in reversed(str):
        num *= 10
        num += int(i)
    print("make num: ", num)
    return num

def get_num(socket):
    num_s = ""
    c = socket.recv(1024).decode('utf-8')
    while c != '\n':
        print("get char: ", c)
        num_s += c
        c = socket.recv(1024).decode('utf-8')
    return make_num(num_s)

def start_bluetooth_master(server_address, port):
    socket = bluetooth.BluetoothSocket(bluetooth.RFCOMM)
    socket.connect((server_address, port))

    print(f"Bluetooth Classic 슬레이브와 연결되었습니다.")

    saveJson({})

    while True:
        received_message = socket.recv(1024).decode('utf-8')
        print(f"상대방: {received_message}")
        if received_message.lower() == 'exit' or received_message.lower() == '':
            print("연결을 종료합니다.")
            break
        if received_message.lower() == 's':
            x = get_num(socket)
            y = get_num(socket)
            map_json = getJson()
            map_data = []
            if map_json and map_json["data"]:
                map_data = map_json["data"]
            map_data.append([x/1000, y/1000])
            print(map_data)
            saveJson({
                "size": len(map_data),
                "data": map_data
            }) 

    socket.close()

if __name__ == "__main__":
    devices = findAddr()

    for index, value in enumerate(devices):
        addr, name = value
        print("{}. {} - {}".format(index, addr, name))

    choose = int(input("choose device: "))
    port = int(input("input port: "))
    
    addr, name = devices[choose]
    try:
        print("choose {}. {} - {} on port {}".format(choose, addr, name, port))
        start_bluetooth_master(addr, port)
    except Exception as e:
        print("wrong port ", port)
        print("----------")
        print(e)
        print("----------")
