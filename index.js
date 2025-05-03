function searchEvent() {
    let input = document.getElementById("searchBar").value.toLowerCase();
    let events = document.querySelectorAll(".event-card");

    events.forEach(event => {
        let title = event.querySelector("h3").textContent.toLowerCase();
        let location = event.querySelector("p:nth-of-type(2)").textContent.toLowerCase();
        let description = event.querySelector("p:nth-of-type(3)").textContent.toLowerCase();

        if (title.includes(input) || location.includes(input) || description.includes(input)) {
            event.style.display = "block"; // Affiche l'événement si trouvé
        } else {
            event.style.display = "none"; // Masque l'événement s'il ne correspond pas
        }
    });
}
