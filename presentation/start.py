import subprocess
import pychrome
import json
import os
import subprocess
import time

subprocess.run(["taskkill.exe", "/F", "/IM", "chrome.exe"])
chromeprocess = subprocess.Popen(["C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe", "--remote-debugging-port=9222", "--kiosk", "--autoplay-policy=no-user-gesture-required"])

# google-chrome-stable --remote-debugging-port=9222 --headless

url_opensea = "https://testnets.opensea.io/0xae97EDa493939137B20aD1E45Dd14cD82B2f3826"
url_douga = "file://" + os.path.dirname(os.path.abspath(__file__)).replace("\\", "/") + "/douga.html"

browser = pychrome.Browser(url="http://127.0.0.1:9222")
tab = browser.new_tab()
tab.start()
tab.Network.enable()

def douga(src):
    tab.Page.navigate(url=url_douga, _timeout=5)
    tab.wait(1)
    tab.Runtime.evaluate(expression="mainvideo.src='%s'" % src)
    tab.wait(1)
    tab.Runtime.evaluate(expression="mainvideo.play()")
    while True:
        end = tab.Runtime.evaluate(expression="mainvideo.ended")
        if end['result']['value'] == True:
            break
        tab.wait(1)

while True:
    douga('movies/1.mp4')
    douga('movies/2.mp4')

    tab.Page.navigate(url=url_opensea, _timeout=5)
    tab.wait(5)
    result = tab.Runtime.evaluate(expression="""
function scrollToSmoothly(pos, time) {
    var currentPos = window.pageYOffset;
    var start = null;
    if(time == null) time = 500;
    pos = +pos, time = +time;
    window.requestAnimationFrame(function step(currentTime) {
        start = !start ? currentTime : start;
        var progress = currentTime - start;
        if (currentPos < pos) {
            window.scrollTo(0, ((pos - currentPos) * progress / time) + currentPos);
        } else {
            window.scrollTo(0, currentPos - ((currentPos - pos) * progress / time));
        }
        if (progress < time) {
            window.requestAnimationFrame(step);
        } else {
            window.scrollTo(0, pos);
        }
    });
}""")
    
    for i in range(1):
        result = tab.Runtime.evaluate(expression="""
scrollToSmoothly(document.body.scrollHeight, 60000)
    """)
        tab.wait(100)
        tab.Runtime.evaluate(expression="""
scrollToSmoothly(0, 60000)
    """)
        tab.wait(100)
