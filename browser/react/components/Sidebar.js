import React from 'react';
import { Link } from 'react-router';

const Sidebar = ({ playlists }) => {
    return (
        <sidebar>
            <img src="juke.svg" className="logo" />
            <section>
                <h4 className="menu-item active">
                <Link to="/albums">ALBUMS</Link>
                </h4>
            </section>
            <section>
                <h4 className="menu-item">
                <Link to="/artists">ARTISTS</Link>
                </h4>
            </section>
            <hr />
            <section>
                <h4 className="text-muted">PLAYLISTS</h4>
                <ul className="list-unstyled">
                    {playlists.map(item => (
                      <li
                        className="playlist-item menu-item"
                        key={item.id}
                      >
                        <Link to={`/playlists/${item.id}`}>{item.name}</Link>
                      </li>
                    ))}
                </ul>

                <h4>
                    <Link className="btn btn-primary btn-block" to="/playlists">
                    <span className="glyphicon glyphicon-plus"></span> PLAYLIST
                    </Link>
                </h4>
            </section>
        </sidebar>
    );
}

export default Sidebar;
