// Requêtes SQL préparées
const sqlRequests = {
    sqlGetAllPosts : "SELECT * FROM posts",
    sqlGetOnePost : "SELECT * FROM posts WHERE id = ?",
    sqlDeletePost : "DELETE FROM posts WHERE id = ?",
    sqlUpdatePost : "UPDATE posts SET text = ?, image = ?, user_id = ? WHERE id = ?" ,
    sqlCreatePost : "INSERT INTO posts (text, image, user_id) VALUES (?, ?, ?)",
    sqlGetOneForDelete : "SELECT image FROM posts WHERE id = ?",
    sqlLikesDislikes : "SELECT * FROM likesdislikes WHERE post_id = ? AND user_id = ?",
    sqlCreatingLike : "INSERT INTO likesdislikes (post_id, user_id, values) VALUES (?, ?, ?)",
    sqlUpdateLike : "UPDATE likesdislikes SET value = ?"
};

module.exports = sqlRequests;