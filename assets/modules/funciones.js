let data = {}
let fatherCards = undefined
let categories = undefined

// Mostrar eventos iniciales
export function displayInitialEvents() {
    eventCards(data.events);
  }
  
  // Generar filtros de categorías
 export function generateCategoryFilters(info, cate, car, time) {
    data = info
    fatherCards = car
    categories = cate
    const categoriesSet = [...new Set(data.events.map(event => event.category))];
    categories.innerHTML = '';
  
    categoriesSet.forEach(category => {
      const checkbox = document.createElement('div');
      checkbox.className = "form-check ms-2";
      checkbox.innerHTML = `
        <input class="form-check-input" type="checkbox" value="${category}" id="${category}">
        <label class="form-check-label" for="${category}">${category}</label>
      `;
      categories.appendChild(checkbox);
    });
  }
  
  
export  function applyEventFilters() {
    const searchTerm = document.querySelector('input[type="search"]').value.toLowerCase();
    const selectedCategories = Array.from(document.querySelectorAll('.form-check-input:checked')).map(checkbox => checkbox.value);
  
    const filteredEvents = data.events.filter(event => {
      const matchesSearch = event.name.toLowerCase().includes(searchTerm) || event.description.toLowerCase().includes(searchTerm);
      const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(event.category);
      return matchesSearch && matchesCategory;
    });
    
    eventCards(filteredEvents);
  }
  
  
  function eventCards(events) {
    let pag = document.title
    
    if (events.length === 0) {
      fatherCards.innerHTML = '<p class="text-center min-h">No se encontraron eventos que coincidan con tu búsqueda.</p>';
      return;
    }
  
    const cardsHTML = events.map(event => `
      <div class="card cards-heigth">
        <img src="${event.image}" class="card-img-top img-card object-fit-cover" alt="${event.name}">
        <div class="card-body d-flex flex-column justify-content-between">
          <h5 class="card-title">${event.name}</h5>
          <p class="card-text">${event.description}</p>
          <div class="d-flex flex-row justify-content-between">
            <p>Price: ${event.price}$</p>
            <a href=${pag == "Home" ? "./views/details.html" : "./details.html"}?id=${event._id} class="btn btn-primary">Details</a>
          </div>
        </div>
      </div>
    `)
    fatherCards.innerHTML = cardsHTML;
  }
  