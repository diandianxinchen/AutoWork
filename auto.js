# 基于Auto.js的钉钉自动打卡脚本
# 实现了
# 1.手机滑动解锁
# 2.打开钉钉
# 待实现:
# - 获取打卡状态并发送给用户
# - 失败重试

function unlock() {
  if (!device.isScreenOn()) {
    device.wakeUp();
    sleep(1000);
    doUnlock();
  }
}

// 滑动解锁 
function doUnlock() {
  var xyArr = [220]
  var x0 = device.width / 2
  var y0 = device.height / 4 * 3
  var angle = 0
  var x = 0
  var y = 0
  for (let i = 0; i < 30; i++) {
    y = x * tan(angle)
    if ((y0 - y) < 0) {
      break
    }
    var xy = [x0 + x, y0 - y]
    xyArr.push(xy)
    x += 5;
    angle += 3
  }
  gesture.apply(null, xyArr)
}

function tan(angle) {
  return Math.tan(angle * Math.PI / 180);
}

function openDingDing() {
  home();
  var launchAppResult = launchApp("钉钉");
  if (launchAppResult) {
	  log("打开钉钉成功");
  }else {
    log("打开钉钉失败");
  }
}
