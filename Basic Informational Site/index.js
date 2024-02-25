const fsPromise = require("fs").promises;
const fs = require("fs");
const http = require("http");
const path = require("path");

const PORT = process.env.PORT || 8080;

const serveFile = async (filePath, response) => {
  try {
    const data = await fsPromise.readFile(filePath, "utf8");
    response.writeHead(200, { "Content-Type": "text/html" });
    response.end(data);
  } catch (err) {
    console.log(err);
    response.statusCode = 500;
    response.end();
  }
};

const server = http.createServer((req, res) => {
  let filePath =
    req.url === "/"
      ? path.join(__dirname, "pages", "index.html")
      : req.url.slice(-1) === "/"
      ? path.join(__dirname, "pages", req.url, "index.html")
      : path.join(__dirname, "pages", req.url);

  if (req.url.slice(-1) !== "/") {
    filePath += ".html";
  }

  const fileExist = fs.existsSync(filePath);

  if (fileExist) {
    serveFile(filePath, res);
  } else {
    switch (path.parse(filePath).base) {
      case "old-page.html":
        res.writeHead(301, { Location: "/index.html" });
        res.end();
        break;
      case "www-page.html":
        res.writeHead(301, { Location: "/" });
        res.end();
        break;
      default:
        serveFile(path.join(__dirname, "pages", "404.html"), res);
    }
  }
});

server.listen(PORT, () => {});
