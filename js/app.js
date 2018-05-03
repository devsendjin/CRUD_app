var users = [
    {
        id: 1,
        name: 'Ivan',
        login: 'ivan123'
    },
    {
        id: 2,
        name: 'George',
        login: 'geo'
    }
];

document.getElementById('mainBtn').onclick = showList;

document.getElementById('saveBtn').onclick = saveHandler;

document.getElementById('addBtn').onclick = addUserHandler;