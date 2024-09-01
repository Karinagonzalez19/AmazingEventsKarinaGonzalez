const getUrlParam = (nameParam) =>{
    let url = window.location.href
    let objUrl = new URL(url)
    let params = objUrl.searchParams;
  
    return params.get(nameParam)
  }
  
  
  const filterEvent = (id, data)=>{
    return data.events.find(even => even._id == id)
  }
  
  const showCard = (events, idHtml)=>{
    idHtml.innerHTML = `
                          <div class="row g-0 col-12">
                              <div class="col-md-5 d-flex flex-column align-items-center justify-content-center">
                              <img src=${events.image} class="img-fluid rounded-start align-middle" alt="...">
                              </div>
                              <div class="col-md-5">
                              <div class="card-body mx-3">
                                  <h5 class="card-title">${events.name}</h5>
                                  <p class="card-text">${events.description}</p>
                                  <p class="card-text">Date: ${events.date}</p>
                                  <p class="card-text">Place: ${events.place}</p>
                                  <p class="card-text">capacity: ${events.capacity}</p>
                                  ${events.estimate ? `<p class="card-text"><small class="text-body-secondary">Estimate: ${events.estimate}</small></p>`:""}
                                  ${events.assistance ? `<p class="card-text"><small class="text-body-secondary">Assistance: ${events.assistance}</small></p>`:""}                              
                                  <p class="card-text">Price: ${events.price}</p>
                              </div>
                              </div>
                          </div>
  `
  }  
  const noFundEvent = (idHtml, message)=>{
    idHtml.innerHTML = `<p>${message}</p>`
  }
  
  const main = ()=>{
    const containerHtml = document.getElementById("conten")
    const idEvent = getUrlParam("id")
    fetch("https://aulamindhub.github.io/amazing-api/events.json")
    .then(res => res.json())
    .then(info => {
        const event = filterEvent(idEvent, info)
        event != undefined ? showCard(event, containerHtml) : noFundEvent(containerHtml, "The event you want to see is not available" )
    })
  }
  main()
  