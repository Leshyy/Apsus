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
        inbox: true,
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
    email['sentAt'] = Date.now();
    email['inbox'] = false;
    email['isRead'] = false;
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
        createEmail('Tamir', ['Eran'], 'help', 'how do i make a footer?'),
        createEmail('Eran', ['Tamir'], 'help', 'ani mevulbal'),
        createEmail('Tamir', ['Eran'], 'hungry', 'im hungry...'),
    ];
}
