import { storageService } from '../../../services/storageService.js';
import { utilService } from '../../../services/utilService.js';

export const emailService = {
    query,
    getEmailById,
    markAsRead,
    markAsUnRead,
    remove,
    add,
};

const EMAIL_KEY = 'emails';

// app data
let gEmails;

_createEmails();

function createEmail(sender, receivers, subject, body) {
    return {
        id: utilService.makeId(),
        sender,
        receivers,
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

function add(email) {
    email['id'] = utilService.makeId();
    email['sender'] = 'Me';
    gEmails.push(email);
    storageService.save(gEmails, EMAIL_KEY);
    return Promise.resolve();
}

function remove(emailId) {
    gEmails = gEmails.filter((email) => email.id !== emailId);
    storageService.save(gEmails, EMAIL_KEY);
    return Promise.resolve();
}

function markAsRead(emailId) {
    getEmailById(emailId).then((email) => {
        email.isRead = true;
        storageService.save(gEmails, EMAIL_KEY);
    });
    return Promise.resolve();
}

function markAsUnRead(emailId) {
    getEmailById(emailId).then((email) => {
        email.isRead = false;
        storageService.save(gEmails, EMAIL_KEY);
    });
    return Promise.resolve();
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
