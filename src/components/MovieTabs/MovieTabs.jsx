import React from 'react';
//import cn from 'classnames';
import './MovieTabs.scss'

class MovieTabs extends React.Component {
    render() {
        const {sort_by, updateSortBy} = this.props;
        const handleClick = value => () => {
            updateSortBy(value)
        };
        const getClassName = value => {
            return `nav-link ${
                    sort_by === value ? "active" : ""
            }`
        }

        return (
                <ul className="tabs nav nav-pills">
                    <li className="nav-item">
                        <div className={getClassName("popularity.desc")}
                             onClick={handleClick("popularity.desc")}
                        >
                            Popularity Desc
                        </div>
                    </li>
                    <li className="nav-item">
                        <div className={getClassName("revenue.desc")}
                             onClick={handleClick("revenue.desc")}
                        >
                            Revenue Asc
                        </div>
                    </li>
                    <li className="nav-item">
                        <div className={getClassName("vote_average.desc")}
                             onClick={handleClick("vote_average.desc")}
                        >
                            Vote Average Desc
                        </div>
                    </li>
                </ul>
        )
    }
}

export default MovieTabs;
