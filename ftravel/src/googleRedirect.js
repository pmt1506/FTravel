fetch("http://localhost:9999/account/google/callback")
  .then((response) => response.json())
  .then((data) => {
    // Handle the data received from the server
    console.log(data);

    // Redirect the user to http://localhost:3000/
    window.location.href = "http://localhost:3000/";
  })
  .catch((error) => console.error(error));
