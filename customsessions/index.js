/**
 * @AUTHOR: Param - Jiaxi - Evan
 * @FILE: index.js
 * @Instructor: Ben Dicken
 * @ASSIGNMENT: Final Project - Wordle
 * @COURSE: CSc 337; Spring 2023
 * @Purpose: Holds custome session class for user
 * 			 authentication
 */

class CustomSessions {

	sessions = {};
	SESSION_LENGTH = 600000 * 5;

	constructor() { }

	addOrUpdateSession(user) {
		let sessionId = Math.floor(Math.random() * 100000);
		let sessionStart = Date.now();
		
		if (user in this.sessions) {
		this.sessions[user].start = sessionStart;
		
		sessionId = this.sessions[user].sid
		
		} else {
		this.sessions[user] = { 'sid': sessionId, 'start': sessionStart, 'dailyDone': false, 'challengeDone': false};
		}
		return sessionId;
	}

	doesUserHaveSession(user, sessionId) {
		let entry = this.sessions[user];
		if (entry != undefined) {
		return entry.sid == sessionId;
		}
		return false;
	}

	cleanupSessions() {
		let currentTime = Date.now();
		for (i in this.sessions) {
		let sess = this.sessions[i];
		if (sess.start + this.SESSION_LENGTH < currentTime) {
			console.log('removing session for user: ' + i);
			delete this.sessions[i];
		}
		}
	}

	startCleanup() {
		setInterval(this.cleanupSessions, 2000);
	}
}

exports.sessions = new CustomSessions();