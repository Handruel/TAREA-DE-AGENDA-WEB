document.addEventListener('DOMContentLoaded', function () {
    const contactsContainer = document.getElementById('contacts');
    const addContactForm = document.getElementById('addContactForm');

    fetchContacts();

    addContactForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const nombre = document.getElementById('nombre').value;
        const apellido = document.getElementById('apellido').value;
        const telefono = document.getElementById('telefono').value;

        addContact({ nombre, apellido, telefono });
    });

    function fetchContacts() {
        fetch('http://www.raydelto.org/agenda.php')
            .then(response => response.json())
            .then(data => {
                renderContacts(data);
            })
            .catch(error => console.error('Error al obtener contactos:', error));
    }

    function addContact(contact) {
        fetch('http://www.raydelto.org/agenda.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(contact)
        })
            .then(response => response.json())
            .then(data => {
                console.log('Contacto agregado:', data);
                fetchContacts(); // Actualizar lista de contactos después de agregar uno nuevo
            })
            .catch(error => console.error('Error al agregar contacto:', error));
    }

    function renderContacts(contacts) {
        contactsContainer.innerHTML = '';
        contacts.forEach(contact => {
            const contactElement = document.createElement('div');
            contactElement.classList.add('contact');
            contactElement.innerHTML = `
                <p><strong>Nombre:</strong> ${contact.nombre}</p>
                <p><strong>Apellido:</strong> ${contact.apellido}</p>
                <p><strong>Teléfono:</strong> ${contact.telefono}</p>
            `;
            contactsContainer.appendChild(contactElement);
        });
    }
});
