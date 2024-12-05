import { db } from './db.js';

export function addRecommendation(title, description, comment, image, callback) {
    const stmt = db.prepare("INSERT INTO recommendations (title, description, comment, image) VALUES (?, ?, ?, ?)");
    stmt.run([title, description, comment, image], function(err) {
        callback(err, this.lastID);
    });
}

export function getRecommendationsFromDB(callback) {
    db.all("SELECT * FROM recommendations ORDER BY date_created DESC", (err, rows) => {
        callback(err, rows);
    });
}
