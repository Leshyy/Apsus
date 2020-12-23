import { storageService } from '../../../services/storageService.js';
import { utilService } from '../../../services/utilService.js';

export const emailService = {
    query,
    getEmailById,
};

const EMAIL_KEY = 'emails';

// app data
let gEmails;

_createEmails();

function createEmail(sender, receiver, subject, body) {
    return {
        id: utilService.makeId(),
        sender,
        receiver,
        subject,
        body,
        isRead: false,
        sentAt: Date.now(),
    };
}

function query() {
    return Promise.resolve(gEmails);
}

function getEmailById(emailId) {
    const email = gEmails.find((email) => emailId === email.id);
    return Promise.resolve(email);
}

function add() {}

function remove(emailId) {
    gEmails = gEmails.filter((email) => email.id !== emailId);
    storageService.save(gEmails, EMAIL_KEY);
    // return Promise.resolve(gEmails);
}

function markAsRead(emailId) {
    const email = getEmailById(emailId);
    email.isRead = true;
    storageService.save(gEmails, EMAIL_KEY);
}

function _createEmails() {
    // Try loading from localStorage
    gEmails = storageService.load(EMAIL_KEY);
    if (!gEmails || !gEmails.length) {
        // Nothing in localStorage, use demo data
        gEmails = _getDemoEmails();
        storageService.save(gEmails, EMAIL_KEY);
    }
}

function _getDemoEmails() {
    return [
        createEmail('Tamir', ['Eran'], 'hello', 'hi, nice to meet you'),
        createEmail('Eran', ['Tamir'], 'hiya', 'hi, zoom meeting today'),
        createEmail('Margad', ['Tamir', 'Eran'], 'team', 'hi, nice cmps'),
    ];
}
