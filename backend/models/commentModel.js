// Requêtes SQL préparées
const sqlRequests = {
    sqlCreateComment: 'INSERT INTO comments (`text`, `user_id`, `post_id`) VALUES (?, ?, ?)',
    sqlDeleteComment: 'DELETE FROM comments WHERE id = ?',
    sqlGetAllComments: 'SELECT * FROM comments WHERE post_id = ?'

};

module.exports = sqlRequests;