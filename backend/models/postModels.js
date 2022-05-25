// Requêtes SQL préparées
const sqlRequests = {
    sqlGetAllPosts : "SELECT * FROM posts",
    sqlGetOnePost : "SELECT * FROM posts WHERE id = ?",
    sqlDeletePost : "DELETE * FROM posts WHERE id = ?",
    sqlUpdatePost : "UPDATE posts SET text = ?, image = ?, user_id = ? WHERE id = ?" ,
    sqlCreatePost : "INSERT INTO posts (text, image, user_id) VALUES (?, ?, ?)"

};

module.exports = sqlRequests;