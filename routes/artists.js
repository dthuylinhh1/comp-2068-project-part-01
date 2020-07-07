const {new: _new, index, show, create, edit, update, delete:_delete} = require(`../controllers/ArtistsController`);

function auth(req, res, next){
    if(!req.isAuthenticated()){
        req.flash('danger', 'You need to login first.');
        return res.redirect('/login');
    }
    next();
}

module.exports = router => {
    router.get('/artists', index); // public
    router.get('/artists/new', auth, _new); //authenticated
    router.post('/artists', auth, create);//authenticated
    router.post('/artists/update', auth, update);//authenticated
    router.post('/artists/delete', auth, _delete);//authenticated
    router.get('/artists/:id/edit', auth, edit);//authenticated
    router.get('/artists/:id', show); //public 
};
