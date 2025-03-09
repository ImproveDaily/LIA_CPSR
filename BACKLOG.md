# CPSR Point Tracker Backlog

## Huidige Functionaliteiten
- ✅ Gebruikers authenticatie (login/logout)
- ✅ MongoDB database connectie
- ✅ Basis data modellen (Player, User, Reservation, Point, Raid)

## Te Ontwikkelen Features

### Hoogste Prioriteit
- [ ] Raid-specifiek Reserveringen Systeem
  - [ ] Database schema aanpassen voor raid-specifieke tabellen
    - [ ] Onyxia's Lair reserveringen
    - [ ] Molten Core reserveringen
    - [ ] Blackwing Lair reserveringen
    - [ ] Temple of Ahn'Qiraj reserveringen
    - [ ] Naxxramas reserveringen
    - [ ] Tower of Karazhan reserveringen
  - [ ] Aparte puntentellingen per raid
  - [ ] UI aanpassen voor raid-specifieke views

### Hoge Prioriteit
- [ ] Spelers Management
  - [ ] Spelers toevoegen
  - [ ] Spelers bewerken
  - [ ] Spelers verwijderen
  - [ ] Overzicht van alle spelers
  - [ ] Overzicht van speler's reserveringen per raid

- [ ] Reserveringen Systeem (Per Raid)
  - [ ] Nieuwe reservering maken met raid selectie
  - [ ] Reserveringen bekijken per speler per raid
  - [ ] Reserveringen importeren van CSV (met raid specificatie)
  - [ ] Reserveringen bewerken/verwijderen
  - [ ] Raid-specifieke item lijsten

- [ ] Punten Systeem (Per Raid)
  - [ ] Punten toekennen aan spelers binnen specifieke raid context
  - [ ] Gescheiden punten overzicht per raid
  - [ ] Punten historie per raid
  - [ ] Automatische puntentelling bij gemiste drops (raid-specifiek)

### Medium Prioriteit
- [ ] Raid Management
  - [ ] Raid instances configureren
    - [ ] Onyxia's Lair setup
    - [ ] Molten Core setup
    - [ ] Blackwing Lair setup
    - [ ] Temple of Ahn'Qiraj setup
    - [ ] Naxxramas setup
    - [ ] Tower of Karazhan setup
  - [ ] Bosses en loot tables per raid
  - [ ] Raid historie bijhouden
  - [ ] Loot tracking per raid instance

- [ ] Rapportages
  - [ ] Punten overzicht exporteren (per raid)
  - [ ] Reserveringen rapport (per raid)
  - [ ] Raid statistieken
  - [ ] Cross-raid analyses

### Lage Prioriteit
- [ ] UI Verbeteringen
  - [ ] Dark/Light mode
  - [ ] Responsive design verbeteren
  - [ ] Loading states toevoegen
  - [ ] Error handling verbeteren
  - [ ] Raid-specifieke kleurenschema's/iconen

- [ ] Extra Features
  - [ ] Email notificaties
  - [ ] Automatische backups
  - [ ] Audit logging
  - [ ] Raid progressie tracking

## Bugs & Issues
- [ ] Lijst van bekende bugs en issues

## Technische Schuld
- [ ] Database schema optimalisatie voor raid-specifieke data
- [ ] Code structuur voor raid-specifieke logica
- [ ] Performance optimalisatie voor grote datasets

## Voltooide Items
- ✅ Basic authentication system
- ✅ Database setup
- ✅ Initial project structure 