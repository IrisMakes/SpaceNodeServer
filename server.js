/*server.js*/
const express = require("express");
const cors = require("cors");
var moment = require('moment');
var cron = require('node-cron');
const app = express();
app.use(cors());
const PORT = 8000;
var currentImage = [
  0, //0: Bridge
  0, //1: Mantinence
  0, //2: Lab
  0, //3: Captains Quarters
  0, //4: Crew Quarters A
  0, //5: Crew Quarters B
  0, //6: Mess
  0, //7: Lounge
  0, //8: Communications
  0 //9: Engine
]
var roomState = [
  0, //0: Bridge
  0, //1: Mantinence
  0, //2: Lab
  0, //3: Captains Quarters
  0, //4: Crew Quarters A
  0, //5: Crew Quarters B
  0, //6: Mess
  0, //7: Lounge
  0, //8: Communications
  1 //9: Engine
]
const bridgeImages = [
  { id: 1, image: "Bridge1.png", maps: [
    {coords: "63,66 507,66 507,389 63,389", title: "sound_test", type: "sound", link: "soundTest.mp3"}
  ]},
  { id: 2, image: "Bridge2.png", maps: [
    {coords: "807,537 1187,537 1187,849 807,849", title: "model_test", type: "model", link: "Poster.gltf"}
  ]},
  { id: 3, image: "Bridge3.png", maps: [
    {coords: "183,810 393,435 812,282 729,669", title: "image_test", type: "image", link: "crab.jpg"}
  ]},
];

const mainImages = [
  { id: 1, image: "Main1.png", maps: [
    {coords: "63,66 507,66 507,389 63,389", title: "sound_test", type: "sound", link: "soundTest.mp3"}
  ]},
  { id: 2, image: "Main2.png", maps: [
    {coords: "63,66 507,66 507,389 63,389", title: "sound_test", type: "sound", link: "soundTest.mp3"}
  ]},
  { id: 3, image: "Main3.png", maps: [
    {coords: "63,66 507,66 507,389 63,389", title: "sound_test", type: "sound", link: "soundTest.mp3"}
  ]},
];

const labImages = [
  { id: 1, image: "Lab1.png", maps: [
    {coords: "63,66 507,66 507,389 63,389", title: "sound_test", type: "sound", link: "soundTest.mp3"}
  ]},
  { id: 2, image: "Lab2.png", maps: [
    {coords: "63,66 507,66 507,389 63,389", title: "sound_test", type: "sound", link: "soundTest.mp3"}
  ]},
  { id: 3, image: "Lab3.png", maps: [
    {coords: "63,66 507,66 507,389 63,389", title: "sound_test", type: "sound", link: "soundTest.mp3"}
  ]},
];

const capImages = [
  { id: 1, image: "Cap1.png", maps: [
    {coords: "63,66 507,66 507,389 63,389", title: "sound_test", type: "sound", link: "soundTest.mp3"}
  ]},
  { id: 2, image: "Cap2.png", maps: [
    {coords: "63,66 507,66 507,389 63,389", title: "sound_test", type: "sound", link: "soundTest.mp3"}
  ]},
  { id: 3, image: "Cap3.png", maps: [
    {coords: "63,66 507,66 507,389 63,389", title: "sound_test", type: "sound", link: "soundTest.mp3"}
  ]},
];

const crewAImages = [
  { id: 1, image: "CrewA1.png", maps: [
    {coords: "63,66 507,66 507,389 63,389", title: "sound_test", type: "sound", link: "soundTest.mp3"}
  ]},
  { id: 2, image: "CrewA2.png", maps: [
    {coords: "63,66 507,66 507,389 63,389", title: "sound_test", type: "sound", link: "soundTest.mp3"}
  ]},
  { id: 3, image: "CrewA3.png", maps: [
    {coords: "63,66 507,66 507,389 63,389", title: "sound_test", type: "sound", link: "soundTest.mp3"}
  ]},
];

const crewBImages = [
  { id: 1, image: "CrewB1.png", maps: [
    {coords: "63,66 507,66 507,389 63,389", title: "sound_test", type: "sound", link: "soundTest.mp3"}
  ]},
  { id: 2, image: "CrewB2.png", maps: [
    {coords: "63,66 507,66 507,389 63,389", title: "sound_test", type: "sound", link: "soundTest.mp3"}
  ]},
  { id: 3, image: "CrewB3.png", maps: [
    {coords: "63,66 507,66 507,389 63,389", title: "sound_test", type: "sound", link: "soundTest.mp3"}
  ]},
];

const messImages = [
  { id: 1, image: "Mess1.png", maps: [
    {coords: "63,66 507,66 507,389 63,389", title: "sound_test", type: "sound", link: "soundTest.mp3"}
  ]},
  { id: 2, image: "Mess2.png", maps: [
    {coords: "63,66 507,66 507,389 63,389", title: "sound_test", type: "sound", link: "soundTest.mp3"}
  ]},
  { id: 3, image: "Mess3.png", maps: [
    {coords: "63,66 507,66 507,389 63,389", title: "sound_test", type: "sound", link: "soundTest.mp3"}
  ]},
];

const loungeImages = [
  { id: 1, image: "Lounge1.png", maps: [
    {coords: "63,66 507,66 507,389 63,389", title: "sound_test", type: "sound", link: "soundTest.mp3"}
  ]},
  { id: 2, image: "Lounge2.png", maps: [
    {coords: "63,66 507,66 507,389 63,389", title: "sound_test", type: "sound", link: "soundTest.mp3"}
  ]},
  { id: 3, image: "Lounge3.png", maps: [
    {coords: "63,66 507,66 507,389 63,389", title: "sound_test", type: "sound", link: "soundTest.mp3"}
  ]},
];

const commsImages = [
  { id: 1, image: "Comms1.png", maps: [
    {coords: "63,66 507,66 507,389 63,389", title: "sound_test", type: "sound", link: "soundTest.mp3"}
  ]},
  { id: 2, image: "Comms2.png", maps: [
    {coords: "63,66 507,66 507,389 63,389", title: "sound_test", type: "sound", link: "soundTest.mp3"}
  ]},
  { id: 3, image: "Comms3.png", maps: [
    {coords: "63,66 507,66 507,389 63,389", title: "sound_test", type: "sound", link: "soundTest.mp3"}
  ]},
];

const engineImages = [
  { id: 1, image: "Engine1.png", maps: [
    {coords: "63,66 507,66 507,389 63,389", title: "sound_test", type: "sound", link: "soundTest.mp3"}
  ]},
  { id: 2, image: "Engine2.png", maps: [
    {coords: "63,66 507,66 507,389 63,389", title: "sound_test", type: "sound", link: "soundTest.mp3"}
  ]},
  { id: 3, image: "Engine3.png", maps: [
    {coords: "63,66 507,66 507,389 63,389", title: "sound_test", type: "sound", link: "soundTest.mp3"}
  ]},
];

function getRandomImage(weights) {
    var i;

    for (i = 0; i < weights.length; i++)
        weights[i] += weights[i - 1] || 0;

    var random = Math.random() * weights[weights.length - 1];

    for (i = 0; i < weights.length; i++)
        if (weights[i] > random)
            break;

    return i;
}

app.use('/', express.static('public'));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
//Get hooks
app.get("/bridge", function (req, res) {
  res.status(200).json({ success: true, data: bridgeImages[currentImage[0]]});
});
app.get("/mantinence", function (req, res) {
  res.status(200).json({ success: true, data: mainImages[currentImage[1]]});
});
app.get("/lab", function (req, res) {
  res.status(200).json({ success: true, data: labImages[currentImage[2]]});
});
app.get("/cap", function (req, res) {
  res.status(200).json({ success: true, data: capImages[currentImage[3]]});
});
app.get("/crewA", function (req, res) {
  res.status(200).json({ success: true, data: crewAImages[currentImage[4]]});
});
app.get("/crewB", function (req, res) {
  res.status(200).json({ success: true, data: crewBImages[currentImage[5]]});
});
app.get("/mess", function (req, res) {
  res.status(200).json({ success: true, data: messImages[currentImage[6]]});
});
app.get("/lounge", function (req, res) {
  res.status(200).json({ success: true, data: loungeImages[currentImage[7]]});
});
app.get("/comms", function (req, res) {
  res.status(200).json({ success: true, data: commsImages[currentImage[8]]});
});
app.get("/engine", function (req, res) {
  res.status(200).json({ success: true, data: engineImages[currentImage[9]]});
});

setInterval(() =>{
  currentImage[0] = getRandomImage([1,1,1]);

  currentImage[1] = getRandomImage([1,1,1]);

  currentImage[2] = getRandomImage([1,1,1]);

  currentImage[3] = getRandomImage([1,1,1]);

  currentImage[4] = getRandomImage([1,1,1]);

  currentImage[5] = getRandomImage([1,1,1]);

  currentImage[6] = getRandomImage([1,1,1]);

  currentImage[7] = getRandomImage([1,1,1]);

  currentImage[8] = getRandomImage([1,1,1]);

  currentImage[9]++;
  if(currentImage[9] > engineImages.length - 1) currentImage[9] = 0;
}, 10000);

//Realtime hooks
app.get("/realtime_view", function (req, res) {
  res.writeHead(200, {
    Connection: "keep-alive",
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    "Access-Control-Allow-Origin": "*"
  });
  res.flushHeaders();
  setInterval(() => {
      var dateTime = moment().format('h:mm:ss');
    res.write(
      "data:" +
        JSON.stringify({
          time: dateTime,
          bridge: bridgeImages[currentImage[0]],
          main: mainImages[currentImage[1]],
          lab: labImages[currentImage[2]],
          cap: capImages[currentImage[3]],
          crewA: crewAImages[currentImage[4]],
          crewB: crewBImages[currentImage[5]],
          mess: messImages[currentImage[6]],
          lounge: loungeImages[currentImage[7]],
          comms: commsImages[currentImage[8]],
          engine: engineImages[currentImage[9]]
        })

    );
    res.write("\n\n");
  }, 10000);
});

app.listen(process.env.PORT || 8000, function () {
  console.log(`Server is running on ${PORT}`);
});
