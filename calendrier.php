<?php
session_start();
require_once 'db_config.php';

// Redirection si non connecté
if (!isset($_SESSION['user_id'])) {
    header("Location: login.php");
    exit;
}

// Récupérer les événements du mois courant
$currentMonth = date('m');
$currentYear = date('Y');
$events = $conn->query("SELECT * FROM evenements 
                       WHERE (MONTH(date_debut) = $currentMonth 
                       OR MONTH(date_fin) = $currentMonth)
                       AND YEAR(date_debut) = $currentYear
                       ORDER BY date_debut");
?>
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Calendrier</title>
    <link rel="stylesheet" href="style6.css">
    <style>
        .event-day {
            position: relative;
        }
        .event-badge {
            position: absolute;
            bottom: 2px;
            right: 2px;
            width: 8px;
            height: 8px;
            background-color: #007bff;
            border-radius: 50%;
        }
    </style>
</head>
<body>
    <header>
        <div class="header-wrapper">
            <h1>Calendrier</h1>
            <div class="user-controls">
                <span>Connecté en tant que: <?= htmlspecialchars($_SESSION['user_prenom']) ?></span>
                <form action="logout.php" method="post">
                    <button type="submit" class="logout-btn">Déconnexion</button>
                </form>
            </div>
            <nav>
                <a href="index2.php">Accueil</a>
                <a href="espace_utilisateur.php">Mon Espace</a>
                <?php if($_SESSION['is_admin'] ?? false): ?>
                    <a href="ajout_evenement.php">Ajouter Événement</a>
                <?php endif; ?>
            </nav>
        </div>
    </header>

    <div class="calendar-container">
        <div class="month-navigation">
            <span class="arrow" onclick="changeMonth(-1)">&#9665;</span>
            <span id="currentMonth"><?= date('F Y') ?></span>
            <span class="arrow" onclick="changeMonth(1)">&#9655;</span>
        </div>
        
        <div class="calendar" id="calendar">
            <!-- Le calendrier sera généré par JavaScript -->
        </div>
        
        <div id="eventDetails">
            <h3 id="eventTitle"></h3>
            <p id="eventDate"></p>
            <p id="eventLocation"></p>
            <p id="eventDescription"></p>
            <img id="eventImage" src="" alt="Image de l'événement">
        </div>
    </div>

    <script>
    // Passer les événements PHP au JavaScript
    const events = <?= json_encode($events->fetch_all(MYSQLI_ASSOC)) ?>;
</script>
<script src="newcalendrier.js"></script>
</body>
</html>