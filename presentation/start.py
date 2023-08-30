import subprocess
import pychrome
import json

# google-chrome-stable --remote-debugging-port=9222 --headless

urls = [
    "https://testnets.opensea.io/0xae97EDa493939137B20aD1E45Dd14cD82B2f3826"
]

browser = pychrome.Browser(url="http://127.0.0.1:9222")
tab = browser.new_tab()
tab.start()
tab.Network.enable()

for url in urls:
    tab.Page.navigate(url=url, _timeout=5)
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
scrollToSmoothly(document.body.scrollHeight, 100000)
    """)
        tab.wait(100)
        tab.Runtime.evaluate(expression="""
scrollToSmoothly(0, 100000)
    """)
        tab.wait(100)
    