function getPercentage(objetDate) {
    if (objetDate.estimate) {
        return (objetDate.estimate / objetDate.capacity) * 100;
    } else {
        return (objetDate.assistance / objetDate.capacity) * 100;
    }
}

function filterCategory(info, propInfo) {
    var infoCategory = [];
    var arrCat = [];
    
    info.forEach(function(event) {
        if (arrCat.indexOf(event.category) === -1) {
            arrCat.push(event.category);
            infoCategory.push({
                category: event.category,
                revenue: event.price * event[propInfo],
                capacity: event.capacity,
                assistance: event[propInfo],
                percentage: (event[propInfo]/event.capacity) *100
            });
        } else {
            var tmp = infoCategory.find(function(inf) { return inf.category === event.category; });
            tmp.revenue += event.price * event[propInfo];
            tmp.assistance += event[propInfo]
            tmp.capacity += event.capacity
            tmp.percentage = (tmp.assistance / tmp.capacity) * 100;
        }
    });

    return infoCategory;
}

function showStastCategory(idHtml, info) {
    info.forEach(function(event) {
        idHtml.innerHTML += `
            <tr>
                <td class= "text-center">${event.category}</td>
                <td class= "text-center">${event.revenue}</td>
                <td class= "text-center">${event.percentage}</td>
            </tr>
        `;
    });
}

function showPercent(idHtml, highAttendance, lowAttendance, cap) {
    idHtml.innerHTML += `
        <tr>
            <td class= "text-center">${highAttendance.name}</td>
            <td class= "text-center">${lowAttendance.name}</td>
            <td class= "text-center">${cap.name}</td>
        </tr>
    `;
}

function main() {
    var past = [];
    var upComing = [];

    var tablePercent = document.getElementById("tablaPorcentajes");
    var tablePast = document.getElementById("tablaPasados");
    var tableUp = document.getElementById("tablaProximos");

    fetch("https://aulamindhub.github.io/amazing-api/events.json")
        .then(function(res) { return res.json(); })
        .then(function(json) {
            json.events.forEach(function(element, index) {
                json.events[index].percentageAssists = getPercentage(element);
                if (element.date < json.currentDate) {
                    past.push(json.events[index]);
                } else {
                    upComing.push(json.events[index]);
                }
            });

            past.sort(function(eventA, eventB) { return eventB.percentageAssists - eventA.percentageAssists; });
            upComing.sort(function(eventA, eventB) { return eventB.percentageAssists - eventA.percentageAssists; });
            json.events.sort(function(eventA, eventB) { return eventB.capacity - eventA.capacity; });

            var highAttendance = past[0];
            var lowAttendance = past[past.length - 1];

            showPercent(tablePercent, highAttendance, lowAttendance, json.events[0]);

            var infoCategoryUp = filterCategory(upComing, "estimate");
            var infoCategoryPast = filterCategory(past, "assistance");

            showStastCategory(tableUp, infoCategoryUp);
            showStastCategory(tablePast, infoCategoryPast);
        });
}

main();
