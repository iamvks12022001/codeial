const http = require("http");
const port = 8000;
const file = require("fs");
const server = http.createServer(fileSys);
function fileSys(req, res) {
  console.log(req.url);
  res.writeHead(200, { "Content-type": "text/html" });
  let path;
  switch (req.url) {
    case "/":
      path = "./file.html";
      break;
    case "/profile":
      path = "./file.html";
      break;
    default:
      // path = "./file.html";
      return res.end("<h1>404 NOT </h1>");
      break;
  }

  file.readFile(path, function (err, data) {
    if (err) {
      console.log("some error ", err);
      return res.end("<h1>404 NOT FOUND </h1>");
    }
    return res.end(data);
  });
}
server.listen(port, function (err) {
  if (err) {
    console.log("server is not running");
    return;
  }

  console.log("server is running on", port);
});
