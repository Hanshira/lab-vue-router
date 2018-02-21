const Home = {
  template: `
<div>
<h1>Home</h1>
<br>
<router-link to="/movies">All movies</router-link>
</div>`
};

const AllMovies = {
  template: `
  <div>
  <h1>All movies</h1>
  <ul>
  <li v-for="movie in movies"> 
  <router-link :to="'/movies/'+movie.id" >{{movie.title }}  </router-link> 
  </li>
  </ul>
  <router-link  to="/movies/new">Add a movie</router-link>
  <router-link to="/">Home</router-link>
  </div>`,
  data() {
    return {
      movies: []
    };
  },
  created() {
    getAll().then(movies => {
      this.movies = movies;
    });
  }
};

const MovieCard = {
  props: {
    movie: Object
  },
  template: `
  
            <section>
              <h3> {{movie.title}} </h3>
              <p> Year: {{movie.year}} </p>
              <p> Director: {{movie.director}} </p>
              <p> Synopsis: {{movie.synopsis}} </p>
              <img :src="movie.poster" alt="poster" height="500px">
              <br>
              <br>
              <router-link to="/movies">All movies</router-link>
              <router-link to="/">Home</router-link>
              
            </section>
      `,
  methods: {
    created() {
      getOne(`${this.$route.params.id}`).then(movie => {
        this.movie = Object.assign({}, movie);
      });
    },
    delete(movie) {
      deleteOne(id).then(movie => {
        this.$router.push("/movies");
      });
    }
  }
};

const MovieForm = {
  template: `
  <movie-form @submit="saveMovie"></movie-form>`,
  methods: {
    saveMovie(movie) {
      addOne(movie).then(movie => {
        this.$router.push(`/movies/${movie.id}`);
      });
    }
  }
};

const routes = [
  { path: "/", component: Home },
  { path: "/movies", component: AllMovies },
  { path: "/movies/new", component: MovieForm },
  { path: "/movies/:id", component: MovieCard }
];

const router = new VueRouter({
  routes
});

const app = new Vue({
  router
}).$mount("#app");
