const service = axios.create({
  baseURL: "http://localhost:3000/movies"
});

function getAll() {
  return service
    .get("/")
    .then(res => res.data)
    .catch(err => {
      throw err;
    });
}

function getOne(id) {
  return service
    .get(`/${id}`)
    .then(res => res.data)
    .catch(err => {
      throw err;
    });
}

function addOne(info) {
  return service
    .post("/", info)
    .then(res => res.data)
    .catch(err => {
      throw err;
    });
}

function editOne(id, info) {
  return service
    .patch(`/${id}`, info)
    .then(res => res.data)
    .catch(err => {
      throw err;
    });
}

function deleteOne(id) {
  return service.delete(`/${id}`).catch(err => {
    throw err;
  });
}

// getOne: id => null, // Return instead a promise containing one movie,
// addOne: info => null, // Make the request to add amovie and return a promise containing the added movie,
// editOne: (id, info) => null, // Make the request to edit a movie and return a promise containing the edited movie,
// deleteOne: id => null, // Make the request to delete a movie
