import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import Axios from 'axios';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const Index = function ({user}) {
  const [ artists, setArtists ] = useState([]);

  useEffect(() => {
      (async () =>{
          await getArtists();
      })();
  }, []);

  const getArtists = async () => {
      const artistsResp = await Axios.get('/api/artists');
      if(artistsResp.status === 200) setArtists(artistsResp.data);
  };

  const deleteArtist = async artist => {
      try{
          const resp = await Axios.post('/api/artists/delete', {
              id: artist._id
          });

          if(resp.status === 200) toast("The artist was delete succesfully",{
              type: toast.TYPE.SUCCESS
          });

          await getArtists();
      }catch(error){
          toast("The was an error deleting this artist",{
              type: toast.TYPE.ERROR});
      }
  };
  return (
    <Container className="my-5">
      <header>
        <h1>Artists</h1>
      </header>

      <hr/>

      <div className="content">
        {artists && artists.map((artist, i) => (
          <div key={i} className="card my-3">
            <div className="card-header">
              <h5 className="card-title">
                {artist.name}
              </h5>
            </div>

            <div className="card-body">
              <p className="card-text">
                {artist.name} was born in {artist.dateOfBirth} and is a {artist.gender}.
              </p>
            </div>

            {user ? (
              <div className="card-footer">
                <Link to={{
                  pathname: "/artists/edit",
                  state: {
                    id: artist._id
                  }
                }}>
                  <i className="fa fa-edit"></i>
                </Link>

                <button type="button" onClick={() => deleteArtist(artist)}>
                  <i className="fa fa-trash"></i>
                </button>
              </div>
            ) : null}
          </div>
        ))}
      </div>
    </Container>
  );

};

export default Index;