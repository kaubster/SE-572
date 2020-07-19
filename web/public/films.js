var API = (() => {
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
                displayMessage("Please provide rating 0 to 100%.");
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
            fetch("http://localhost:3001/api/v1/films", {
                method: "POST",
                body: JSON.stringify({ name: record.name, rating: record.rating }),
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
            });
        } catch (e) {
            console.log(e);
            console.log("-----------------");
        }
    };

    var getFilms = () => {
        try {
            fetch("http://localhost:3001/api/v1/films", {
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
    };
})();