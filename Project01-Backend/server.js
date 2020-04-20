import express from 'express';
import nunjucks from 'nunjucks';
import videos from './data';

const server = express();
server.use(express.static('public'));

server.set("view engine", "njk")

nunjucks.configure("views", {
    express: server, autoescape: false
})

server.get('/', function (req, res) {
    const data = {
        avatar_url: "https://avatars0.githubusercontent.com/u/6424894?s=460&u=c5dba596e2e62bafd2dc8dd2706cc4f0b4b6a165&v=4",
        name: "Rian Rabelo",
        role: "Estudante UFRPE",
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo <a href="https://github.com/riansco14" target="_blank">Github</a>',
        links: [
            { name: 'GitHub', url: 'https://github.com/riansco14' },
            { name: 'Twitter', url: 'twitter.com/riansco14' }
        ]
    }

    return res.render("about", { data: data })
});

server.get('/portfolio', function (req, res) {
    return res.render("portfolio", { items: videos });
});

server.get('/video', function (req, res) {
    const id = req.query.id;
    const video = videos.find(function (video) {
            return true;
    });

    if(!video){
        return res.send("Video not found");
    }

    return res.render("video",{item:video});
});

server.listen(5000);