function showList() {
    var list = document.getElementById('list');
    var newUser = document.getElementById('new-user');

    if (!newUser) {
        var createUser = document.createElement('input');
        createUser.setAttribute('type', 'button');
        createUser.setAttribute('value', 'New user');
        createUser.setAttribute('id', 'new-user');
        createUser.classList.add('waves-effect');
        createUser.classList.add('waves-light');
        createUser.classList.add('btn');

        document.getElementById('mainBtn').parentNode.appendChild(createUser);
        createUser.onclick = createHandler;
    }

    list.innerHTML = '';

    for (var i = 0; i < users.length; i++) {
        var user = document.createElement('div');
        user.classList.add('flex-conteiner');
        user.setAttribute('data-index', i);

        var userId = document.createElement('div');
        userId.innerHTML = users[i].id;
        user.appendChild(userId);

        var userName = document.createElement('div');
        userName.innerHTML = users[i].name;
        user.appendChild(userName);

        var userLogin = document.createElement('div');
        userLogin.innerHTML = users[i].login;
        user.appendChild(userLogin);

        var userActions = document.createElement('div');
        var editBtn = document.createElement('input');
        editBtn.setAttribute('type', 'button');
        editBtn.setAttribute('value', 'Edit');
        editBtn.classList.add('edit-btn');
        editBtn.classList.add('waves-effect');
        editBtn.classList.add('waves-light');
        editBtn.classList.add('btn');
        userActions.appendChild(editBtn);
        editBtn.onclick = editHandler;

        var removeBtn = document.createElement('input');
        removeBtn.setAttribute('type', 'button');
        removeBtn.setAttribute('value', 'Remove');
        removeBtn.classList.add('waves-effect');
        removeBtn.classList.add('waves-light');
        removeBtn.classList.add('btn');
        userActions.appendChild(removeBtn);
        removeBtn.onclick = removeHandler;
        
        user.appendChild(userActions);

        list.appendChild(user);
    }
}

function editHandler(event) {
    var form = document.forms.edit_form;

    var index = event.target.parentNode.parentNode.getAttribute('data-index');

    form.elements.name.value = users[index].name;
    form.elements.login.value = users[index].login;
    form.elements.index.value = index;

    document.getElementById('update').style.display = 'block';
    document.getElementById('create').style.display = 'none';
}

function saveHandler() {
    var form = document.forms.edit_form;

    var name = form.elements.name.value;
    var login = form.elements.login.value;
    var index = form.elements.index.value;

    var patternName = /^[A-Z]{1}[а-яa-z]{3,20}$/;
    var patternLogin = /^(?=.{3,12})[a-z0-9]*[._-]?[a-z0-9]+$/;

    resetError(form.elements.name);
    if (!(name)) {
        errorMsg(form.elements.name, 'Введите имя');
        return;
    } else if (!(patternName.test(form.elements.name.value))) {
        if (form.elements.name.value[0] !== form.elements.name.value[0].toUpperCase()) {
            errorMsg(form.elements.name, 'Первая буква должна быть заглавной');
        } else if (form.elements.name.value.length < 3) {
            errorMsg(form.elements.name, 'Имя должно состоять не менее чем из 3-х букв');
        } else {
            errorMsg(form.elements.name, 'Имя может состоять только из букв русского и английского алфавитов');
        }
        return;
    }
    resetError(form.elements.login);
    if (!(login)) {
        errorMsg(form.elements.login, 'Введите логин');
        return;
    } else if (!(patternLogin.test(form.elements.login.value))) {
        if (form.elements.login.value.length < 3) {
            errorMsg(form.elements.login, 'Логин должен состоять не менее чем из 3-х символов');
        } else {
            errorMsg(form.elements.login, 'Вы ввели недопустимые символы');
        }
        return;
    }

    users[index].name = name;
    users[index].login = login;
    document.getElementById('update').style.display = 'none';
    resetError(form.elements.name);
    resetError(form.elements.login);

    showList();
}

function createHandler() {
    var form = document.forms.create_form;

    form.elements.name.value = '';
    form.elements.login.value = '';

    document.getElementById('create').style.display = 'block';
    document.getElementById('update').style.display = 'none';
}

function errorMsg(elem, msg) {
    var span = document.createElement('span');
    span.classList.add('js-error');
    span.innerHTML = msg;
    elem.parentNode.appendChild(span);
}

function resetError(element) {
    if (element.parentNode.lastElementChild.classList.contains('js-error')) {
        element.parentNode.lastElementChild.innerHTML = '';
    }
}

function formValidation(name, login) {
    var patternName = /^[а-яa-z]{3,20}$/;
    var patternLogin = /^(?=.{3,12})[a-z0-9]*[._-]?[a-z0-9]+$/;
    resetError(name);
    if (!(name.value)) {
        errorMsg(name, 'Введите имя');
        return;
    } else if (!(patternName.test(name.value))) {
        if (name.value.length < 3) {
            errorMsg(name, 'Имя должно состоять не менее чем из 3-х букв');
        } else {
            errorMsg(name, 'Имя может состоять только из букв русского и английского алфавитов');
        }
        return;
    }
    resetError(login);
    if (!(login.value)) {
        errorMsg(login, 'Введите логин');
        return;
    } else
    if (!(patternLogin.test(login.value))) {
        if (login.value.length < 3) {
            errorMsg(login, 'Логин должен состоять не менее чем из 3-х символов');
        } else {
            errorMsg(login, 'Вы ввели недопустимые символы');
        }
        return;
    }
    return 1;
}

function addUserHandler() {
    var form = document.forms.create_form;

    var name = form.elements.name.value;
    var login = form.elements.login.value;
    var id;

    if (!(formValidation(form.elements.name, form.elements.login))) {
        return;
    }

    if (!(users.length)) {
        id = 0;
    } else {
        id = users[users.length - 1].id;
    }

    var create = new function () {
        this.id = id + 1;
        this.name = name[0].toUpperCase() + name.substring(1, name.length);
        this.login = login;
    };

    users.push(create);
    document.getElementById('create').style.display = 'none';

    showList();
}

function removeHandler(event) {
    var update = document.getElementById('update').style.display;
    var create = document.getElementById('create').style.display;

    if (update === 'block') {
        document.getElementById('update').style.display = 'none';
    } else if (create === 'block') {
        document.getElementById('create').style.display = 'none';
    }

    var conf = confirm('Вы действительно хотите удалить данного пользователя?');
    if (!(conf)) return;

    var remove = event.target.parentNode.parentNode.getAttribute('data-index');
    var list = document.getElementById('list');

    list.removeChild(list.childNodes[remove]);
    users.splice(remove, 1);
    showList();
}