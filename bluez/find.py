 # simple inquiry example
import bluetooth

def findAddr():
    nearby_devices = bluetooth.discover_devices(lookup_names=True)
    print("Found {} devices.".format(len(nearby_devices)))

    return nearby_devices

if __name__ == "__main__":
    devices = findAddr()
    print(devices)

    for addr, name in devices:
        print("  {} - {}".format(addr, name))