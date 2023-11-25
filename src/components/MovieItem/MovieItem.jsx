import React from 'react';
import './MovieItem.scss';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import {Favorite, FavoriteBorderOutlined} from '@material-ui/icons';

class MovieItem extends React.Component {
    constructor() {
        super();

        this.state = {
            watched: false
        }
    }

    render() {
        const {movie, removeMovie, addMovieFromWishlist, removeMovieFromWishlist} = this.props;
        return (
                <div className="card">
                    <div className="card-img">
                        <img className="card-img-top"
                             src={movie.backdrop_path || movie.poster_path ?
                                     `https://image.tmdb.org/t/p/w500${movie.poster_path || movie.backdrop_path}`
                                     : process.env.PUBLIC_URL + '/img/no-poster.png'
                             }
                             alt=""
                        />
                    </div>
                    <div className="card-body">
                        <h6 className="card-title">{movie.title}</h6>
                        <div className="d-flex justify-content-between align-items-center mb-2">
                            <p className="mb-0">Rating: {movie.vote_average}</p>
                            <progress min={0} max={100} value={movie.vote_average*10} />
                        </div>
                        <div className="card-group d-flex justify-content-between">
                        <button
                            type="button"
                            className="btn btn-secondary d-flex align-items-center col-12 mb-2"
                            onClick={removeMovie.bind(null, movie)}>
                                <DeleteIcon fontSize="small" />
                                Delete Movie
                        </button>
                        {this.state.watched ?
                                    (<button type="button"
                                            className="btn btn-success d-flex align-items-center col-12"
                                             onClick={() => {
                                                 this.setState({
                                                     watched: false
                                                 });
                                                 removeMovieFromWishlist(movie)}
                                             }
                                    >
                                        <FavoriteBorderOutlined fontSize="small" />
                                         Remove from Wishlist
                                    </button>) :
                                    (<button type="button"
                                            className="btn btn-secondary d-flex align-items-center col-12 mb-1"
                                            onClick={() => {
                                                this.setState({
                                                    watched: true
                                                });
                                                addMovieFromWishlist(movie)}
                                            }
                                    >
                                        <Favorite fontSize="small" />
                                         Add to Wishlist
                                    </button>)
                            }
                        </div>
                    </div>
                </div>
        );
    }
}

export default MovieItem;
