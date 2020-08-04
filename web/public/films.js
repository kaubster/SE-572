var API = (() => {

    var checkLogin = () => {
        const loginBtn = document.getElementById("LoginBtn");
        const loginName = document.getElementById("loginName").value;
        if (loginName) {
            loginBtn.disabled = false;
        } else {
            loginBtn.disabled = true;
        }
    }

    var jwtToken;
    var doLogin = () => {
        const val = document.getElementById("loginName").value;
        const pwd = document.getElementById("password").value;

        if (!val) {
            displayMessage("Please provide login.");
            return false;
        }

        if (!pwd) {
            displayMessage("Please provide password.");
            return false;
        }

        // TO DO: Validate Username and Password against satabase.

        try {
            fetch("http://localhost:8080/api/v1/login", {
                    method: "POST",
                    body: JSON.stringify({
                        username: val,
                    }),
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    },
                })
                .then((resp) => resp.json())
                .then((data) => {
                    jwtToken = data.token;
                    displayMessage("Login successful.");

                    let filmControls = document.getElementById("film-div");
                    filmControls.style.visibility = "visible";
                });
        } catch (e) {
            console.log(e);
            displayMessage("Login error.");

            let filmControls = document.getElementById("film-div");
            filmControls.style.visibility = "hidden";

            console.log("-------------------");
        }
        return false;
    };

    var displayMessage = (message) => {
        let messageBox = document.getElementById("message-display");
        messageBox.innerHTML = message;
    };

    var filmsExist = (films) => {
        if (!films || films.length == 0) return false;
        return true;
    };

    var clearTable = (table) => {
        if (table) {
            while (table.hasChildNodes()) {
                table.removeChild(table.firstChild);
            }
        }
    };

    var generateTable = (table, arrayOfFilms) => {
        if (arrayOfFilms) {
            for (var r = 0; r < arrayOfFilms.length; r++) {
                var x = table.insertRow(r);

                var left = x.insertCell(0);
                left.innerHTML = arrayOfFilms[r].name;

                var right = x.insertCell(1);
                right.innerHTML = arrayOfFilms[r].rating;
            }

            /** Would rather define this within CSS class film-table.
             * However, adding border:2; within CSS class film-table
             * does not appear to work. Using EJS syntax to generate
             * tables at somepoint may be a fix.
             */
            table.setAttribute("border", "2");
        }
    };

    var validRating = (rating) => {
        if (rating) {
            return true;
        }
        return false;
    };

    var validRatingRange = (rating) => {
        if (rating && rating >= 0 && rating <= 100) {
            return true;
        }
        return false;
    };

    var createFilm = () => {
        let filmNameBx = document.getElementById("newFilmName");
        let name = filmNameBx.value;

        if (name) {
            let filmRatingBx = document.getElementById("newFilmRating");
            let rating = filmRatingBx.value;

            if (!validRating(rating)) {
                displayMessage("Please provide a rating score (0 to 100%).");
                return;
            }

            if (!validRatingRange(rating)) {
                displayMessage("Please rate 0 to 100%.");
                return;
            }

            let record = {
                name: name,
                rating: rating,
            };

            addFilm(record);

            filmNameBx.value = "";
            filmRatingBx.value = 0;

            displayMessage(record.name + " added.");
            return;
        }
        displayMessage("Please enter a film name.");
        return false;
    };

    var addFilm = (record) => {
        try {
            fetch("http://localhost:8080/api/v1/films", {
                method: "POST",
                body: JSON.stringify({ name: record.name, rating: record.rating }),
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + jwtToken,
                },
            }).then((resp) => {
                setTimeout(function() {
                    if (resp.status == 200) {
                        displayMessage("Id Verified. Film Was Added.");
                    } else if (resp.status == 400) {
                        displayMessage("Film exists, please add another film.");
                    } else {
                        displayMessage(
                            "Login Error (Error Code: " + resp.status + " " + resp.statusText + "). Did you login?"
                        );
                    }
                }, 0);
            });
        } catch (e) {
            console.log(e);
            console.log("-----------------");
        }
    };

    var getFilms = () => {
        try {
            fetch("http://localhost:8080/api/v1/films", {
                    method: "GET",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    },
                })
                .then((resp) => resp.json())
                .then((films) => {
                    displayFilms(films);
                });
        } catch (e) {
            console.log(e);
            console.log("-----------------");
        }
    };

    var displayFilms = (films) => {
        if (filmsExist(films)) {
            let table = document.getElementById("film-listing");

            clearTable(table);

            generateTable(table, films);

            displayMessage("Displayed film DB.");
            return false;
        }
        displayMessage("Film DB empty. Please enter a film name.");
        return false;
    };

    return {
        createFilm,
        getFilms,
        doLogin,
        checkLogin,
    };
})();