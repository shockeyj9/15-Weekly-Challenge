const router = require('express').Router();
const apiRoutes = require('./api');

router.use('/api', apiRoutes);

router.use((req, res) => {
  return res.send('Valid route not found. Please use a valid route.');
});

module.exports = router;