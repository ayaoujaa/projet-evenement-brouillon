document.addEventListener('DOMContentLoaded', function() {
    let currentMonth = new Date().getMonth();
    let currentYear = new Date().getFullYear();
    const monthNames = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", 
                       "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];

    function generateCalendar(month, year) {
        const calendar = document.getElementById('calendar');
        calendar.innerHTML = '';
        
        // En-têtes des jours
        const daysOfWeek = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];
        const headerRow = document.createElement('div');
        headerRow.className = 'calendar-header';
        
        daysOfWeek.forEach(day => {
            const dayElement = document.createElement('div');
            dayElement.textContent = day;
            headerRow.appendChild(dayElement);
        });
        
        calendar.appendChild(headerRow);
        
        // Jours du mois
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const daysInMonth = lastDay.getDate();
        
        let date = 1;
        for (let i = 0; i < 6; i++) {
            const weekRow = document.createElement('div');
            weekRow.className = 'calendar-week';
            
            for (let j = 0; j < 7; j++) {
                const dayCell = document.createElement('div');
                dayCell.className = 'day';
                
                if (i === 0 && j < firstDay.getDay()) {
                    // Cases vides avant le 1er jour
                    dayCell.classList.add('empty');
                } else if (date > daysInMonth) {
                    // Cases vides après le dernier jour
                    dayCell.classList.add('empty');
                } else {
                    // Jours du mois
                    const dayNumber = document.createElement('div');
                    dayNumber.className = 'day-number';
                    dayNumber.textContent = date;
                    dayCell.appendChild(dayNumber);
                    
                    // Vérifier si c'est aujourd'hui
                    const today = new Date();
                    if (date === today.getDate() && month === today.getMonth() && year === today.getFullYear()) {
                        dayCell.classList.add('today');
                    }
                    
                    // Ajouter les événements
                    const dayEvents = getEventsForDate(date, month, year); // Note: month est déjà 0-11
                    if (dayEvents.length > 0) {
                        dayCell.classList.add('event-day');
    
                        const eventBadge = document.createElement('div');
                        eventBadge.className = 'event-badge';
                        dayCell.appendChild(eventBadge);
    
                        // Ajouter un tooltip ou autre indication visuelle
                        dayCell.title = `${dayEvents.length} événement(s)`;
                    }
                    
                    date++;
                }
                
                weekRow.appendChild(dayCell);
            }
            
            calendar.appendChild(weekRow);
        }
        
        // Mettre à jour le mois affiché
        document.getElementById('currentMonth').textContent = `${monthNames[month]} ${year}`;
    }
    function getEventsForDate(day, month, year) {
        return events.filter(event => {
            const eventDate = new Date(event.date_debut);
            return eventDate.getDate() === day && 
                   eventDate.getMonth() === month && // Note: getMonth() retourne 0-11
                   eventDate.getFullYear() === year;
        });
    }
    
    function showEventDetails(event) {
        const details = document.getElementById('eventDetails');
        document.getElementById('eventTitle').textContent = event.titre;
        document.getElementById('eventDate').textContent = `Date: ${formatDate(event.date_debut)}`;
        document.getElementById('eventLocation').textContent = `Lieu: ${event.lieu}`;
        document.getElementById('eventDescription').textContent = event.description;
        
        const img = document.getElementById('eventImage');
        if (event.image_url) {
            img.src = event.image_url;
            img.style.display = 'block';
        } else {
            img.style.display = 'none';
        }
        
        details.style.display = 'block';
    }
    
    function formatDate(dateString) {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        return new Date(dateString).toLocaleDateString('fr-FR', options);
    }
    
    function changeMonth(offset) {
        currentMonth += offset;
        
        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear--;
        } else if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
        }
        
        generateCalendar(currentMonth, currentYear);
    }
    
    // Navigation au clic
    document.querySelectorAll('.arrow').forEach(arrow => {
        arrow.addEventListener('click', function() {
            const offset = parseInt(this.getAttribute('data-offset'));
            changeMonth(offset);
        });
    });
    
    // Générer le calendrier initial
    generateCalendar(currentMonth, currentYear);
});