const {new: _new, index, show, create, edit, update, delete:_delete} = require(`../controllers/SongsController`);

function auth(req, res, next){
    if(!req.isAuthenticated()){
        req.flash('danger', 'You need to login first.');
        return res.redirect('/login');
    }
    next();
}

module.exports = router => {
    router.get('/songs', index); // public
    router.get('/songs/new', auth, _new); //authenticated
    router.post('/songs', auth, create);//authenticated
    router.post('/songs/update', auth, update);//authenticated
    router.post('/songs/delete', auth, _delete);//authenticated
    router.get('/songs/:id/edit', auth, edit);//authenticated
    router.get('/songs/:id', show); //public 
};
