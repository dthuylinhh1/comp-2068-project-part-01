const viewPath = ('artists');
const Artist = require('../models/Artist');
const User = require('../models/User');

const getUser = async req => {
    const {user: email} = req.session.passport;
    return await User.findOne({email:email});
}

exports.index = async (req, res) =>{
    try{
        const artists = await Artist.find()
        .populate('user')
        .sort({updatedAt: 'desc'});
        
        res.status(200).json(artists);
    
    }catch (error){
        console.log(error);
        res.status(400).json({
            message: ' There was an error fetching the artists', error
        });
    }
};

exports.show = async (req, res) =>{
    try {
        const artist = await Artist.findById(req.params.id).populate('user');
        res.status(200).json(artist);
    }catch (error){
        console.log(error);
        res.status(400).json({message:"There was an error editing this artist!"});
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
        res.status(200).json(artist);
    }catch(error){
        console.log(error);
        res.status(400).json({
            message: "There was an error creating this artist", error
        });
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
      const user = await getUser(req);
       
      let artist = await Artist.findOne({user: user._id, _id: req.body.id});
      if (!artist) throw new Error('Artist could not be found');
  
      const attributes = {user: user._id, ...req.body};
      await Artist.validate(attributes);

      await Artist.updateOne({_id: req.body.id, user: user._id}, {...req.body});
  
      res.status(200).json(artist);
    } catch (error) {
      console.log(error);
      res.status(400).json({status: 'failed', message: `There was an error updating this artist`, error});
    }
  };

  exports.delete = async (req, res) => {
    try {
      await Artist.deleteOne({_id: req.body.id});
      res.status(200).json({message:"Yay"});
    } catch (error) {
        res.status(400).json({message:"There was an error deleting this artist"});
    }
  };