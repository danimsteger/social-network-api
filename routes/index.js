const router = require('express').Router();
const apiRoutes = require('./api');

// Route for /api from index.js in 'api' folder
router.use('/api', apiRoutes);

router.use((req, res) => {
  res.send('Wrong Route!!');
});

module.exports = router;
