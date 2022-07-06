// Requêtes SQL préparées
const sqlRequests = {
    sqlInsertUser : "INSERT INTO users (`mail`, `password`, `avatar`) VALUES (?, ?, ?)",
    sqlFindUserMail : "SELECT * FROM users WHERE mail = ?",
    sqlFindUserPassword : "SELECT password FROM users WHERE mail = ?",
    sqlFindUserId : "SELECT id FROM users WHERE mail = ?",
    // ------------------------ Profil ---------------------------
    sqlGetProfil: 'SELECT `prenom`, `nom`, `service`, `avatar` FROM users WHERE id = ?',
    sqlUpdateProfilFirstName: 'UPDATE users SET `prenom` = ? WHERE id = ?',
    sqlUpdateProfilLastName: 'UPDATE users SET `nom` = ? WHERE id = ?',
    sqlUpdateProfilService: 'UPDATE users SET `service` = ? WHERE id = ?',
    sqlUpdateProfilAvatar: 'UPDATE users SET `avatar` = ? WHERE id = ?',
    sqlUpdateProfilPassword : 'UPDATE users SET `password` = ? WHERE id = ?',
    sqlDeleteProfil : 'DELETE FROM users WHERE id = ?'
};

module.exports = sqlRequests;