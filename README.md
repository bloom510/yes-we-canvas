# yes-we-canvas
You're viewing a canvas experiment. Heavy mathematical operations are handled on the server side and sent back to the client via Socket.io (an abstraction layer built on top of WebSockets). Due to latency, Sockets will eventually be replaced by Google's new PaintWorklet API. The ultimate vision is to create an online GUI that not only blurs the boundaries between free-hand and purely algorithmic art, but persists projects in MongoDB and eventually will offer a customizable AI layer with TensorFlow.js as well as Web Audio features.