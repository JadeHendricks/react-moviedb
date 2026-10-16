import React, {Fragment, useEffect} from 'react';
import '../../styles/organisms/movie-main.scss';
import '../../styles/pages/details.scss';
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
    <section className="details">
      <div className="details__layout">
      <div className="details-side actorDetailSummary">
          <div className="actorDetailSummary__imageContanier">
              <MediaImage path={actor.profile_path} className="details-side__image" alt={actor.name} />
              <span className="actorDetailSummary__name">{actor.name}</span>
          </div>
          <div className="details-side__body">
              <h3 className="details__title">Actor Details</h3>
              <div className="details-info">
                  <div className="details-info__group">
                    <div className="details__title details__title--small">Biography</div>
                    <p className="details-info__text">
                        {actor.biography}
                    </p>
                  </div>

                  <div className="details-info__group">
                      <div className="details__title details__title--small">Occupation</div>
                      <p className="details-info__text">{actor.known_for_department}</p>
                  </div>

                  <div className="details-info__group">
                      <div className="details__title details__title--small">Gender</div>
                      <p className="details-info__text">{genderLabel(actor.gender)}</p>
                  </div>

                  <div className="details-info__group">
                      <div className="details__title details__title--small">Date of birth</div>
                      <p className="details-info__text">{ formatDate(actor.birthday) }</p>
                  </div>

                  <div className="details-info__group">
                      <div className="details__title details__title--small">Place of birth</div>
                      <p className="details-info__text">{actor.place_of_birth}</p>
                  </div>
              </div>
          </div>
      </div>

      <div className="details__content">
            <main className="movie-main">
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