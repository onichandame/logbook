import HttpProxy from "http-proxy";
import Http from "http";

const backend = HttpProxy.createProxyServer({
  ws: true,
  target: `http://localhost:${process.env.BACKEND_PORT}`
});
const frontend = HttpProxy.createProxyServer({
  ws: true,
  target: `http://localhost:${process.env.FRONTEND_PORT}`
});

const isApiCall = (url?: string) => url?.startsWith(`/graphql`);

const server = Http.createServer(function (req, res) {
  if (isApiCall(req.url)) return backend.web(req, res);
  else return frontend.web(req, res);
});
server.on(`upgrade`, function (req, sock, head) {
  if (isApiCall(req.url)) return backend.ws(req, sock, head);
  else return frontend.ws(req, sock, head);
});

server.listen(process.env.PORT, () => {
  console.log(`proxy server listening on port ${process.env.PORT}`);
});
