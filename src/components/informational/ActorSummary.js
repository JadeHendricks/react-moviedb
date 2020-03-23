import React, {useEffect, useContext} from 'react';
import MovieCardItem from '../cards/MovieCardItem';
import moment from "moment";
import imageNotFound from "../../images/imageNotFound.jpg";
import ActorSummaryContext from "../../context/actorSummary/ActorSummaryContext";

function ActorSummary({match}) {

  const actorSummaryContext = useContext(ActorSummaryContext);
  const {getActor, getCredits, actor, credits} = actorSummaryContext;

  useEffect(() => {
    getActor(match.params.id);
    getCredits(match.params.id);
    window.scrollTo(0, 0);
    // eslint-disable-next-line
  }, []);


  const genderChecker = (gender) => {
    return gender === 2 ? "Male" : "Female";
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
                      <p className="misc__info">{ moment(actor.birthday).format("DD MMM YYYY") }</p>
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