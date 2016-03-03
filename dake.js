var querystring = require('querystring');
var https = require('https');
var schedule = require('node-schedule');

var data = querystring.stringify({
  dakoku: 'syussya',
  timezone: 480,
  user_id: 'S146',
  password: '3533335qaz',
});

var options = {
  hostname: 'ckip.worksap.co.jp',
  port: 443,
  path: '/cws/cws/srwtimerec',
  method: 'POST',
  headers: {
    'Origin': 'https://ckip.worksap.co.jp',
    'Host': 'ckip.worksap.co.jp',
    'Referer': 'https://ckip.worksap.co.jp/cws/cws/srwtimerec',
    'Content-Type': 'application/x-www-form-urlencoded',
    'Content-Length': Buffer.byteLength(data)
  }
};

var req = https.request(options, function(res) {
  res.setEncoding('utf8');
    if (res.statusCode == 200) {
        console.log("打卡成功");
    }

});
var sendRequest = function() {
    req.write(data);
    req.end();
}



var rule = new schedule.RecurrenceRule();
//every monday to friday
rule.dayOfWeek = [new schedule.Range(1, 5)];
rule.hour = 10;

var schdeuledJob = schedule.scheduleJob(rule, function(){
  console.log('Today is recognized by Rebecca Black!');
  sendRequest();
});