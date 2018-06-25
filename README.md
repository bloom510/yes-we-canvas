# yes we canvas!
You're viewing a canvas experiment. 

My purpose in embarking on this journey is twofold:

1) To build my own creative coding library for multimedia art which allows me to quickly bootstrap projects.

2) To test out a sort of client-server observer pattern. Heavy mathematical operations are handled on the server side and sent back to the client via Socket.io (an abstraction layer built on top of WebSockets). Due to latency, another solution must be worked out. Some ideas:
    a) Implement the node-canvas npm package to do 100% of all canvas operations on the server, then pipe back results to the client through      node data streams.

    b) Attempt the Paint API, however this may not allow pixel manipulation.

    c) Just accept regular ol' canvas

The ultimate vision is to create an online GUI that not only blurs the boundaries between free-hand and purely algorithmic art, but persists projects in MongoDB and eventually will offer a customizable AI layer with TensorFlow.js as well as Web Audio features.

If you have any qestions, commments, feedback, or would like to get involved, feel free to contact me at bloom510.protonmail.com