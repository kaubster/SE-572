var API = (() => {
    const NOT_FOUND = null;

    var films = [
        //// Some test data...
        // {
        //   name: "movie1",
        //   rating: 100,
        // },
        // {
        //   name: "movie3",
        //   rating: 100,
        // },
        // {
        //   name: "movie2",
        //   rating: 100,
        // },
    ];

    var displayMessage = (message) => {
        let messageBox = document.getElementById("message-display");
        messageBox.innerHTML = message;
    };

    var findFilmByName = (myArray, key) => {
        for (let i = 0; i < myArray.length; i++) {
            if (myArray[i].name === key) {
                return myArray[i];
            }
        }
    };

    var filmsExist = () => {
        if (films.length == 0) return false;
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
    };

    var createFilm = () => {
        let filmNameBx = document.getElementById("newFilmName");
        let name = filmNameBx.value;
        if (name) {
            if (NOT_FOUND == findFilmByName(films, name)) {
                let record = {
                    name: name,
                    rating: 100,
                };

                films.push(record);

                filmNameBx.value = "";

                displayMessage(record.name + " added.");
                return;
            }
            displayMessage(name + " already exists.");
            return false;
        }
        displayMessage("Please enter a film name.");
        return false;
    };

    var getFilms = () => {
        if (filmsExist()) {
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