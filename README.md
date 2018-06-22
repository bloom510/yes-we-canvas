# yes-we-canvas
Refactoring an app in progress to increase canvas performance by storing object prototypes on the server and instantiations of those objects on the client.  All computationally heavy operations are fulfilled on the the back-end through a sort of client-server observer design pattern where Socket.io is used to facilitate an event-driven dialog using dynamically generated data.
