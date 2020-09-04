auto();
events.observeNotification();
events.onNotification(function(notification){
  printNotification(notification);
  if(notification.getPackageName() == "com.tencent.mobileqq"){
    var tickerText = notification.tickerText;
    var username = tickerText.split(":")[0].trim();
    var message = tickerText.split(":")[1].trim();
    if(username == '我的电脑' && message == '打卡'){
      log("开始打卡");
      if(!device.isScreenOn()){
        log("手机屏幕锁定，亮屏");
        device.wakeUp();
        sleep(500);
      }
      unlock();
      log("解锁成功");
      sleep(1000);
      closeApp("钉钉");
      sleep(2000);
      var result = launchApp("钉钉");
      if(result == true){
        log("打开钉钉成功");
        sleep(2000);
        goResult();
        notification.click();
        sleep(1000);
        sendQQMessage();
        sleep(1000);
        home();
      }else {
        log("打开钉钉失败")
      }
    }
  }
});

function printNotification(notification){
  log("应用包名: " + notification.getPackageName());
  log("通知文本: " + notification.getText());
  log("通知优先级: " + notification.priority);
  log("通知目录: " + notification.category);
  log("通知时间: " + new Date(notification.when));
  log("通知数: " + notification.number);
  log("通知摘要: " + notification.tickerText);
}

function unlock() {
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
  function tan(angle) {
    return Math.tan(angle * Math.PI / 180);
  }
}

function closeApp(appName){
  openAppSetting(getPackageName(appName));
  text("结束运行").waitFor();
  log(text("结束运行").findOne().enabled());
  if(text("结束运行").findOne().enabled() == true){
    text("结束运行").findOne().click();
    text("确定").waitFor();
    text("确定").findOne().click();
  }
}

function goResult(){
  var activity = currentActivity()
  if(activity == 'android.widget.FrameLayout'){
    desc("工作台").waitFor();
    desc("工作台").click();
    sleep(1000);
    text("考勤打卡").waitFor();
    var button = text("考勤打卡").findOne();
    var b = button.bounds();
    var left = b.left;
    var right = b.right;
    var top = b.top;
    var bottom = b.bottom;
    var x = Math.random() * (right - left) + left;
    var y = top - 100;
    log(x,y);
    click(x,y);
    sleep(10000);
    jietu();
  }
}

function jietu() {
  gestures([350, [300, 400], [300, 1400]],
    [350, [600, 400], [600, 1400]],
    [350, [900, 400], [900, 1400]]);
}

function sendQQMessage() {
  id("com.tencent.mobileqq:id/gnt").findOne().click();
  sleep(1000);
  id("com.tencent.mobileqq:id/cg6").findOne().child(0).click();
  text("发送").waitFor();
  sleep(1000);
  text("发送").findOne().click();
}