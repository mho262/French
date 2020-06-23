var name  = "Michelle";

window.addEventListener("keydown", function(e) {
    // space and arrow keys
    if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
    }
}, false);

$(document).ready(function(){
	name = prompt("Entrez votre nom");
    $("#name").html(name);
    
    $("#nav-placeholder").load("navbar.html");
});

$(document).on('click', '#btn-openMatchingModal', function(){
    window.open('cardgame.html' ,'_blank');
});

$(document).on('click', '#btn-jeudepairs', function(){
    window.open('dragdrop2.html', '_blank');
});

$(document).on('click', '#sound', function(){
    $('audio#sound')[0].play();
})

$(document).on('click', '#playAudio', function(){
    $('audio')[0].play();
})

$(document).on("click", ".dropdown-item", function(){
    let choice = $(this).attr('value');
    let $situation = $(this).parent('div');

    let response = "";

    if($situation.hasClass('information')){
        switch(choice){
            case "musee":
                response = "Allez au centre-ville."; //to do
                break;
            case "restaurant":
                response = `Oui, Le Restaurant Bonaparte est pr&egrave;s d'ici!
                                    <br>Allez tout droit, puis tournez &agrave; gauche et continuez tout droit &agrave; travers la rivi&egrave;re.
                                    <br>Le restaurant sera &agrave; droite.`;
                break;
            case "biodome":
				response = `Allez tout droit, puis tournez &agrave; gauche et continuez tout droit &agrave; travers la rivi&egrave;re.
                            <br>Continuez tout droit. C'est un peu loin, mais le biod&ocirc; sera &agrave; la fin de la route`;                                    
                break;
            case "rec":
                response = `Allez &agrave; l'universit&eacute; pour practiquer le fran&ccedil;ais!`;
                break;
        }

        $("#response").html("<b>Guide touristique:</b><br>" + response)
    } else if ($situation.hasClass('airport')){
		sleep(1000).then(() => {
			switch (choice){
				case 'trudeau':
					player.placeAt(3,4);	
					$('#messagebox').html("Vous &ecirc;tes &agrave; l'A&eacute;roport International Montr&eacute;al-Trudeau");
					break;
				case 'hubert':
					player.placeAt(18,17);
					$('#messagebox').html("Vous &ecirc;tes &agrave; l'A&eacute;roport de St-Hubert");
					break;
				case 'centre-ville':
					player.placeAt(1,17);
					$('#messagebox').html("Vous &ecirc;tes &agrave; l'A&eacute;roport de Centre-Ville");
					break;
			}

			$('#interactive').html("<b>Pilote:</b> Nous sommes arriv&eacute;s &agrave; destination!<br>&emsp;&emsp;&emsp;&emsp;Bon voyage!<br><audio id='sound'><source src='../audio/Airport3.m4a' type='audio/mpeg'></audio>");
		});
    } else if ($situation.hasClass('hospital')){
		switch(choice){
			case "headache":
				response = "Vous avez besoin de repos! Hydratez-vous et me consultez &agrave; nouveau si votre mal de t&ecirc;te s'aggrave."
				break;
			case "flu":
				response = "Vous avez la grippe. Je vous fais une ordonnance. Prenez ce sirop toutes les 4 heures pendant 3 jours."
				break;
			case "itchy":
				response = "Appliquez cette cr&egrave;me matin et soir. C'est en vente libre, une ordonnance n'est pas necessaire."
				break;
		}
		$("#response").html("<b>Docteur:</b><br>" + response)
	}
});



$(document).on("click", ".btn-food", function(){
	let response = "";
	let you = "";

	switch($(this).val()){
		case "fromage":
			you = "Pardon, combien, le <b>fromage suisse</b>?"
			response = "4.98$ la livre. C'est biologique!"
			break;
		case "homard":
			you = "Excusez-moi, vous les vendez combien, vos <b>queues de homard</b>?"
			response = "C'est 11.99$ chacun. Ils viennent de Qu&eacute;bec, ils<br>sont tr&egrave;s frais."
			break;
		case "agneau":
			you = "Pardon, avez-vous du <b>carr&eacute; d'agneau</b>?"
			response = "Oui! C'est 14,99$ la livre. Nous les avons import&eacute;s de Nouvelle-Z&eacute;lande."
			break;
		case "brochettes":
			you = "Vos <b>brochettes</b>, ils co&ucirc;tent combien?"
			response = "5.99$ la livre."
			break;
		case "poivrons":
			you = "Combien sont les <b>poivrons</b>?"
			response = "1.99$ la livre."
			break;
		case "pain":
			you = "Votre <b>pain</b>, il co&ucirc;te combien?"
			response = "C'est trois pour cinq piastres!"
			break;
	}
	
	$("#response").html("<span style='font-size: small'><b>Vous: </b>" + you + "<br><b>G&eacute;rante:</b> " + response + "</span>");
});


function getEventTarget(e){
    e = e || window.event;
    return e.target || e.srcElement;
}


function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
  }