// INSTRUCTIONS:
/*
  Create a new resource controller that uses the
  User as an associative collection (examples):
  - User -> Books
  - User -> Reservation

  The resource controller must contain the 7 resource actions:
  - index
  - show
  - new
  - create
  - edit
  - update
  - delete
*/
const viewPath = ('artists');

const Artist = require('../models/Artist');

const User = require('../models/User');

exports.index = async (req, res) =>{
    try{
        const artists = await Artist.find()
        .populate('user')
        .sort({updatedAt: 'desc'});
        
        res.render(`${viewPath}/index`,{
            pageTitle: 'List of Artists',
            artists: artists
        });
    }catch (error){
        req.flash('danger', `There was an error displaying a list: ${error}`);
        res.redirect('/');
    }
};

exports.show = async (req, res) =>{
    try {
        const artist = await Artist.findById(req.params.id).populate('user');
        res.render(`${viewPath}/show`, {
            pageTitle: artist.name,
            artist: artist
        });
    }catch (error){
        req.flash('danger', `There was an error displaying this artist: ${error}`);
        res.redirect('/artists');
    }   
};

exports.new = (req, res) => {
    res.render(`${viewPath}/new`, {
        pageTitle: 'New Artist'
    });
};

exports.create = async (req, res) => {
    
    try{
        const {user: email} = req.session.passport;
        const user = await User.findOne({email: email});
        const artist = await Artist.create({user: user._id ,...req.body});
        req.flash('success', 'Artist created successfully');
        res.redirect(`/artists/${artist.id}`);
    }catch(error){
        req.flash('danger', `There was an error creating this artist: ${error} `);
        req.session.formData = req.body;
        res.redirect('/artists/new');
    }

};

exports.edit = async (req, res) =>{
    try{
        const artist = await Artist.findById(req.params.id);
        res.render(`${viewPath}/edit`, {
            pageTitle: artist.name,
            formData: artist
        });
    }catch(error){
        req.flash('danger', `There was an error accessing this artist: ${error} `);
        res.redirect('/');
    }

};

exports.update = async (req, res) => {
    
    try {
      const { user: email } = req.session.passport;
      const user = await User.findOne({email: email});
       
    
      let artist = await Artist.findById(req.body.id);
      if (!artist) throw new Error('Artist could not be found');
  
      const attributes = {user: user._id, ...req.body};
      await Artist.validate(attributes);
      await Artist.findByIdAndUpdate(attributes.id, attributes);
  
      req.flash('success', 'The artist was updated successfully');
      res.redirect(`/artists/${req.body.id}`);
    } catch (error) {
      req.flash('danger', `There was an error updating this artist: ${error}`);
      res.redirect(`/artists/${req.body.id}/edit`);
    }
  };

  exports.delete = async (req, res) => {
    try {
      await Artist.deleteOne({_id: req.body.id});
      req.flash('success', 'The artist was deleted successfully');
      res.redirect(`/artists`);
    } catch (error) {
      req.flash('danger', `There was an error deleting this artist: ${error}`);
      res.redirect(`/artists`);
    }
  };