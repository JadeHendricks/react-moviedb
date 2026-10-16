import React, {Fragment, useEffect} from 'react';
import '../../styles/organisms/media-strip.scss';
import { useParams } from "react-router";
import MovieCardItem from '../cards/MovieCardItem';
import { formatDate } from "../../utils/formatDate";
import { genderLabel } from "../../utils/gender";
import MediaImage from "../media/MediaImage";
import { usePerson, usePersonMovieCredits } from "../../api/queries";
import { useLoadingOverlay } from "../../hooks/useLoadingOverlay";
import type { Person } from "../../types/tmdb";
import Loader from "../layout/Loader";

const NO_ACTOR: Partial<Person> = {};
const NO_CREDITS: never[] = [];

function ActorSummary() {
  const params = useParams();

  // Keyed by the route id, so opening another actor refetches once and never loops.
  const {data: actor = NO_ACTOR, isPending: personPending} = usePerson(params.id);
  const {data: credits = NO_CREDITS, isPending: creditsPending} = usePersonMovieCredits(params.id);

  const loading = useLoadingOverlay(personPending || creditsPending, params.id ?? "");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [params.id]);

  return (
    <Fragment>
    {loading ? <Loader /> : ""}
    <section className="movieDetails">
      <div className="movieDetails__wrapper">
      <div className="movieDetailSummary actorDetailSummary">
          <div className="actorDetailSummary__imageContanier">
              <MediaImage path={actor.profile_path} className="movieDetailSummary__image" alt={actor.name} />
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
                      <p className="misc__info">{genderLabel(actor.gender)}</p>
                  </div>

                  <div className="misc__box">
                      <div className="movieDetails__title movieDetails__title--smaller">Date of birth</div>
                      <p className="misc__info">{ formatDate(actor.birthday) }</p>
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
              <section className="media-strip">
                  <h3 className="media-strip__title">Popular Roles</h3>
                  <div className="media-strip__items">
                    {credits && credits.map(movie => <MovieCardItem key={movie.id} movie={movie} compact />)}
                  </div>
              </section>
            </main>
        </div>
    </div>
    </section>
    </Fragment>
  )
}

export default ActorSummary;