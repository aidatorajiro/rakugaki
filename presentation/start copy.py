import subprocess
import pychrome
import os
import subprocess
import time

subprocess.run(["taskkill.exe", "/F", "/IM", "chrome.exe"])
chromeprocess = subprocess.Popen(["C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe", "--remote-debugging-port=9222", "--kiosk", "--autoplay-policy=no-user-gesture-required"])

url_opensea = "https://testnets.opensea.io/0xae97EDa493939137B20aD1E45Dd14cD82B2f3826"
url_douga = "file://" + os.path.dirname(os.path.abspath(__file__)).replace("\\", "/") + "/douga.html"

browser = pychrome.Browser(url="http://127.0.0.1:9222")
tab = browser.new_tab()
tab.start()
tab.Network.enable()

def douga(src):
    tab.Page.navigate(url=url_douga, _timeout=5)
    time.sleep(1)
    tab.Runtime.evaluate(expression="mainvideo.src='%s'" % src)
    time.sleep(1)
    tab.Runtime.evaluate(expression="mainvideo.play()")
    count = 0
    while True:
        end = tab.Runtime.evaluate(expression="mainvideo.ended")
        if end['result']['value'] == True:
            break
        count += 1
        time.sleep(1)

while True:
    douga('movies/1.mp4')
