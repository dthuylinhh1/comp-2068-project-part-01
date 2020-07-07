const viewPath = ('songs');

const Song = require('../models/Song');
const Artist = require('../models/Artist');
const User = require('../models/User');

exports.index = async (req, res) =>{
    try{
        const songs = await Song.find()
        .populate('user')
        .sort({updatedAt: 'desc'});
        
        res.render(`${viewPath}/index`,{
            pageTitle: 'List of Songs',
            songs: songs
        });
    }catch (error){
        req.flash('danger', `There was an error displaying a list: ${error}`);
        res.redirect('/');
    }
};

exports.show = async (req, res) =>{
    try {
        
        const song = await Song.findById(req.params.id).populate('user');
        console.log(mongoose.Schema.Types.ObjectId(song.artist));
        res.render(`${viewPath}/show`, {
            pageTitle: song.name,
            song: song,
            
        });
    }catch (error){
        req.flash('danger', `There was an error displaying this song: ${error}`);
        res.redirect('/songs');
    }   
};

exports.new = async (req, res) => {
    const artists = await Artist.find({});
    res.render(`${viewPath}/new`, {
        pageTitle: 'New Song',
        artists: artists
    });
};

exports.create = async (req, res) => {
    
    try{
        const {user: email} = req.session.passport;
        const user = await User.findOne({email: email});
        const song = await Song.create({user: user._id,...req.body});
        req.flash('success', 'Song created successfully');
        res.redirect(`/songs/${song.id}`);
    }catch(error){
        req.flash('danger', `There was an error creating this song: ${error} `);
        req.session.formData = req.body;
        res.redirect('/songs/new');
    }

};


exports.edit = async (req, res) =>{
    const artists = await Artist.find({});
    try{
        const song = await Song.findById(req.params.id);
        res.render(`${viewPath}/edit`, {
            pageTitle: song.name,
            formData: song,
            artists: artists
        });
    }catch(error){
        req.flash('danger', `There was an error accessing this song: ${error} `);
        res.redirect('/');
    }

};

exports.update = async (req, res) => {
    
    try {
      const { user: email } = req.session.passport;
      const user = await User.findOne({email: email});
       
    
      let song = await Song.findById(req.body.id);
      if (!song) throw new Error('Song could not be found');
  
      const attributes = {user: user._id, ...req.body};
      await Song.validate(attributes);
      await Song.findByIdAndUpdate(attributes.id, attributes);
  
      req.flash('success', 'The song was updated successfully');
      res.redirect(`/songs/${req.body.id}`);
    } catch (error) {
      req.flash('danger', `There was an error updating this song: ${error}`);
      res.redirect(`/songs/${req.body.id}/edit`);
    }
  };

  exports.delete = async (req, res) => {
    try {
      await Song.deleteOne({_id: req.body.id});
      req.flash('success', 'The song was deleted successfully');
      res.redirect(`/songs`);
    } catch (error) {
      req.flash('danger', `There was an error deleting this song: ${error}`);
      res.redirect(`/songs`);
    }
  };