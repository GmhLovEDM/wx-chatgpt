"use strict";

function parseBodyData(req) {
  return new Promise(function (resolve, reject) {
    var _req$body;
    if ((_req$body = req.body) !== null && _req$body !== void 0 && _req$body.data) {
      console.log('if');
      //能正确解析 json 格式的post参数
      resolve(bodyData);
    } else {
      console.log('else');
      var body = '',
        jsonStr;
      req.on('data', function (chunk) {
        body += chunk; //读取参数流转化为字符串
      });

      req.on('end', function () {
        //读取参数流结束后将转化的body字符串解析成 JSON 格式
        try {
          console.log('try', body);
          jsonStr = JSON.parse(body);
        } catch (err) {
          console.log('catch', err);
          jsonStr = null;
        }
        resolve(jsonStr);
        // jsonStr ? res.send({"status":"success", "name": jsonStr.data.name, "age": jsonStr.data.age}) : res.send({"status":"error"});
      });
    }
  });
}

module.exports = {
  parseBodyData: parseBodyData
};