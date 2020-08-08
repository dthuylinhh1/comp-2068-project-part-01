const router = require('express').Router();

(require('./routes/pages'))(router);
(require('./routes/users'))(router);
(require('./routes/sessions'))(router);
(require('./routes/artists'))(router);
//(require('./routes/songs'))(router);

module.exports = router;

