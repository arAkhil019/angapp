const app = import(`./dist/angapp/server/server.mjs`).then(server => server.app());
exports.handle = (req,res) => app.then(it => it(req,res));
