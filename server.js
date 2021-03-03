let express = require('express');
let path = require('path');
let fs = require('fs');
let cors = require('cors');

let app = express();
let port = process.env.PORT || 8091;
let contentPath = path.resolve(__dirname + '/dist');
let compiler;
let corsOptions = {
    origin: [
        'http://localhost:8081',
        'http://127.0.0.1:8081',
    ]
};
let config = require('./appConfig');

app.use(cors(corsOptions));

console.log(process.env.NODE_ENV);

if (process.env.NODE_ENV === 'development') {
    let webpack = require('webpack');
    let webpackConfig = require('./webpack.config');
    compiler = webpack(webpackConfig);

    app.use(require("webpack-dev-middleware")(compiler, {
        noInfo: false,
        publicPath: webpackConfig.output.publicPath,
        stats: true
    }));
    app.use(require("webpack-hot-middleware")(compiler));
    app.use(express.static(contentPath));
} else {
    const expressStaticGzip = require("express-static-gzip");
    app.use("/", expressStaticGzip(contentPath));
}

app.get('/config', function (req, res) {
    res.json(config)
});

app.get('/health', function (req, res) {
    res.status(200).send("Everything is up and running!");
});

app.get('*', function (req, res) {
    if (process.env.NODE_ENV === 'development') {
        let filename = path.join(compiler.outputPath, 'index.html');
        compiler.outputFileSystem.readFile(filename, function (err, result) {
            if (err) {
                return next(err);
            }
            res.set('content-type', 'text/html');
            res.send(result);
            res.end();
            console.log("Interny app loaded");
        });
    } else {
        let indexHtml = fs.readFileSync(path.join(contentPath, 'index.html'), 'utf8');
        console.log("Interny app loaded");
        res.send(indexHtml)
    }
});

app.listen(port, function () {
    console.log("Interny app is listening on port " + port + "!");
});
