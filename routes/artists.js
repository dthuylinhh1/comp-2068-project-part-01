const {new: _new, index, show, create, edit, update, delete:_delete} = require(`../controllers/ArtistsController`);

module.exports = router => {
    router.get('/artists', index); // public
    router.get('/artists/new',  _new); //authenticated
    router.post('/artists', create);//authenticated
    router.post('/artists/update', update);//authenticated
    router.post('/artists/delete', _delete);//authenticated
    router.get('/artists/:id/edit', edit);//authenticated
    router.get('/artists/:id', show); //public 
};
