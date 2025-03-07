document.addEventListener('DOMContentLoaded', () => {

    const container = document.createElement('div');
    container.style.display = 'flex';
    container.style.flexDirection = 'column';
    container.style.alignItems = 'center';
    container.style.justifyContent = 'center';
    container.style.height = '100vh';

    const fetchButton = document.createElement('button');
    fetchButton.textContent = 'Consultar usuarios';
    fetchButton.onclick = fetchUsers;
    const resultsContainer = document.createElement('div');
    resultsContainer.id = 'results';

    container.appendChild(fetchButton);
    container.appendChild(resultsContainer);
    document.body.appendChild(container);
});

function fetchUsers() {
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = 'Cargando usuarios...';

    fetch('https://randomuser.me/api/?results=50')
        .then(response => response.json())
        .then(data => {
            const resultsContainer = document.getElementById('results')
            resultsContainer.style.width = '80%';
            resultsContainer.style.height = '100vh';
            resultsContainer.style.margin = '0 auto';
            resultsContainer.style.overflow = 'auto';
            resultsContainer.style.display = 'grid';
            resultsContainer.style.gridTemplateColumns = 'repeat(3, 1fr)';
            resultsContainer.style.gap = '10px';
            resultsContainer.innerHTML = '';
            
            data.results.forEach(user => {
                const userElement = document.createElement('div');
                userElement.innerHTML = `
                    <p>Nombre: ${user.name.first} ${user.name.last}</p>
                    <p>Email: ${user.email}</p>
                    <img src="${user.picture.medium}" alt="${user.name.first}" width="100px" />
                `;

                userElement.style.border = '1px solid #ccc';
                userElement.style.padding = '10px';
                userElement.style.borderRadius = '16px';
                userElement.style.textAlign = 'center';

                resultsContainer.appendChild(userElement);
            });
            document.querySelector('button:nth-of-type(2)').style.display = 'block';
        })
        .catch(error => console.error('Error al consultar usuarios:', error));
}



function clearResults() {
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = '';
    document.querySelector('button:nth-of-type(2)').style.display = 'none';
}