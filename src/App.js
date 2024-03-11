import React, { useState } from 'react';
import './App.css';

const APILINK =
  'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=a9dfa55de82d48c7971d318bdd7c2bfd&page=1';
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280';
const SEARCHAPI =
  'https://api.themoviedb.org/3/search/movie?&api_key=a9dfa55de82d48c7971d318bdd7c2bfd&query=';

function App() {
  const [movies, setMovies] = useState([]);

  const handleSearch = (e) => {
    e.preventDefault();
    const searchItem = e.target.elements.query.value;

    if (searchItem) {
      fetch(SEARCHAPI + searchItem)
        .then((res) => res.json())
        .then((data) => {
          setMovies(data.results);
        });
    }
  };

  React.useEffect(() => {
    fetch(APILINK)
      .then((res) => res.json())
      .then((data) => {
        setMovies(data.results);
      });
  }, []);

  return (
    <div className="App">
      <div class="topnav">
        <div class="random"></div>
        <a class="active" href="index.html">
          Cineflix
        </a>
        <div class="search-container">
          <form role="search" onSubmit={handleSearch}>
            <input type="search" id="query" name="query" placeholder="Search..." />
          </form>
        </div>
      </div>

      <div style={{ paddingLeft: '16px' }}>
        <section id="section">
          {movies.map((movie) => (
            <div key={movie.id} className="card">
              <div className="row">
                <div className="column">
                  <center>
                    <img className="thumbnail" src={IMG_PATH + movie.poster_path} alt={movie.title} />
                  </center>
                  <h3 id="title">{movie.title}</h3>
                </div>
              </div>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}

export default App;
