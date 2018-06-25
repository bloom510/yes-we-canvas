const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { 
    title: 'Express', scripts: 
      [
        {script: '/socket.io/socket.io.js'},
        {script:'../javascripts/client.js'}, 
        {script:'../javascripts/canvas.js'}
      ]
  }); 
});

module.exports = router;
