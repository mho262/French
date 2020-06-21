var vocab = `avoir un bon sens de l’orientation = to have a good sense of direction
;se déplacer = to move around
;se repérer/ s’orienter = find your way, get your bearings, figure out where you are
;une carte routière = road map
;perdu = lost
;Festival Montréal en lumière = Montreal high lights festival
;se rendre à = to go/drive/fly… to, to visit…
;à l’intérieur = inside
;aller faire un tour = to go check out/ take a look
;la navette = shuttle
;brisé = broken
;faire le trajet = to travel/ ride/walk…
;une station-service = gas station
;un bureau de change = currency exchange
;une piste cyclable = bike lane
;un bureau d’information touristique = tourist information centre/ stand/ office
;une gare d’autobus =  bus terminal
;un stationnement = parking 
;un cordonnier, une cordonnière = shoemaker
;un couturier, une couturière = tailor, dressmaker
;une buanderie = laundry room
;une réparation = repair
;en libre-service = self-service
;nettoyage à sec = dry cleaning
;faire le plein d’essence = to fill up gas
;vous avez entendu parler de = you heard about
;une succursale = a branch
;une rue piétonne = pedestrian street
;retirer de l’argent = to withdraw cash
;qui est devenu.e = which became
;une place publique = a public square
;la voie ferrée = railway
;un coin = a corner
;dans le coin = in the neighborhood
;le trottoir = sidewalk
;un sens unique = one way
;une ruelle = alley, small street
;étroit = narrow
;un signal lumineux = light signal
;un panneau = a sign
;à l’arrière de = at the back of, behind
;un point de depart = starting point
;un point d’arrivée = destination
;c’est à deux ou trois coins de rues = it’s two or three blocks away `

var vocabArray = vocab.split(";").map(function(item){
    return item.trim();
})

var html = $("#vocabTable").html();
vocabArray.forEach(function(item){
    item.split(" = ")[0] == "avoir un bon sens de l’orientation" ? html += "<tr class='highlighted'>" : html += "<tr>";
    item.split(" = ").forEach(function(i){
        html += "<td class='item'>" + i + "</td>"
    });

    html += "</tr>"
});

$(document).ready(function(){
    $("#vocabTable").html(html);
})

$(document).on("click", ".item", function(){
    $(this).parent('tr').toggleClass('highlighted');
});