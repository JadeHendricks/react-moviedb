import React, {useEffect, useState} from 'react';
import MovieCardItem from '../cards/MovieCardItem';
import imageNotFound from "../../images/imageNotFound.jpg";

function ActorSummary({match}) {

  const [actor, setActor] = useState({});
  const [credits, setCredits] = useState([]);

  useEffect(() => {
    getActor(match.params.id);
    getCredits(match.params.id);
  }, []);

  const getActor = async (id) => {
    const response = await fetch(`https://api.themoviedb.org/3/person/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`);
    const data = await response.json();
    data && setActor(data);
  }

  const genderChecker = (gender) => {
    return gender === 2 ? "Male" : "Female";
  }

  const getCredits = async (id) => {
    const response = await fetch(`https://api.themoviedb.org/3/person/${id}/movie_credits?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`);
    const data = await response.json();

    const sortByMostPopular = data.cast
    .sort((a, b) => b.vote_average - a.vote_average)
    .filter(movie =>  movie.poster_path !== null);
    
    sortByMostPopular && setCredits(sortByMostPopular.slice(0, 24));
  }

  return (
    <section className="movieDetails">
      <div className="movieDetails__wrapper">
      <div className="movieDetailSummary actorDetailSummary">
          <div className="actorDetailSummary__imageContanier">
              {actor.profile_path ? <img src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`} className="movieDetailSummary__image" alt={actor.name} /> : <img src={imageNotFound} className="movieDetailSummary__image" alt={actor.name} />}
              <span className="actorDetailSummary__name">{actor.name}</span>
          </div>
          <div className="movieDetailSummary__wrapper">
              <h3 className="movieDetails__title">Actor Details</h3>
              <div className="misc">
                  <div className="misc__box">
                    <div className="movieDetails__title movieDetails__title--smaller">Biography</div>
                    <p className="misc__info">
                        {actor.biography}
                    </p>
                  </div>

                  <div className="misc__box">
                      <div className="movieDetails__title movieDetails__title--smaller">Occupation</div>
                      <p className="misc__info">{actor.known_for_department}</p>
                  </div>

                  <div className="misc__box">
                      <div className="movieDetails__title movieDetails__title--smaller">Gender</div>
                      <p className="misc__info">{genderChecker(actor.gender)}</p>
                  </div>

                  <div className="misc__box">
                      <div className="movieDetails__title movieDetails__title--smaller">Date of birth</div>
                      <p className="misc__info">{actor.birthday}</p>
                  </div>

                  <div className="misc__box">
                      <div className="movieDetails__title movieDetails__title--smaller">Place of birth</div>
                      <p className="misc__info">{actor.place_of_birth}</p>
                  </div>
              </div>
          </div>
      </div>

      <div className="movieDetailsMaincontent">
            <main className="movieMain">
              <section className="moreMovies">
                  <h3 className="moreMovies__title">Popular Roles</h3>
                  <div className="moreMovies__titles">
                    {credits && credits.map(movie => <MovieCardItem key={movie.id} movie={movie} />)}
                  </div>
              </section>
            </main>
        </div>
    </div>
    </section>
  )
}

export default ActorSummary;