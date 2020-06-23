/**$(document).ready(function(){
    player.placeAt(8,3);
});**/

var visit_McGill = false;
var visit_grocery = false;
var visit_biodome = false;
var visit_bar = false;
var visit_notredame = false;

var ctx = null;
var gameMap = [
	0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 2, 4, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 2, 8, 0,
	0, 2, 7, 4, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 0,
	0, 2, 3, 1, 4, 4, 1, 1, 2, 2, 2, 2, 1, 1, 2, 1, 0, 2, 10, 0,
	0, 2, 3, 5, 1, 4, 4, 1, 2, 3, 3, 2, 19, 1, 2, 1, 0, 0, 0, 0,
	0, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 2, 2, 2, 2, 1, 1, 1, 1, 0,
	0, 9, 1, 1, 1, 2, 4, 6, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 0,
	0, 1, 1, 1, 1, 2, 4, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 0,
	0, 1, 1, 1, 1, 2, 4, 4, 4, 4, 4, 1, 1, 1, 2, 2, 2, 2, 1, 0,
	0, 1, 18, 1, 12, 2, 3, 2, 17, 1, 4, 1, 1, 1, 1, 3, 3, 2, 1, 0,
	0, 1, 2, 2, 2, 2, 1, 2, 1, 1, 4, 1, 1, 1, 1, 1, 3, 2, 1, 0,
	0, 1, 2, 3, 3, 2, 1, 2, 1, 1, 4, 4, 4, 4, 4, 4, 4, 2, 4, 4,
	0, 1, 2, 3, 3, 2, 13, 2, 1, 1, 1, 1, 1, 1, 1, 1, 6, 2, 1, 0,
	0, 1, 2, 3, 4, 2, 2, 2, 14, 1, 1, 1, 1, 1, 1, 0, 1, 2, 1, 0,
	0, 3, 2, 3, 4, 4, 1, 2, 2, 2, 2, 2, 2, 2, 1, 0, 1, 2, 1, 0,
	0, 3, 2, 3, 4, 4, 3, 2, 16, 1, 1, 1, 11, 2, 1, 1, 1, 2, 3, 0,
	0, 3, 2, 3, 4, 1, 3, 2, 1, 3, 1, 1, 1, 2, 1, 1, 1, 2, 3, 0,
	0, 5, 2, 2, 2, 2, 2, 2, 3, 3, 3, 1, 1, 2, 2, 2, 2, 2, 5, 0,
	0, 1, 1, 1, 1, 1, 1, 15, 3, 3, 3, 3, 1, 1, 1, 1, 1, 1, 4, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
];
var tileW = 40, tileH = 40;
var mapW = 20, mapH = 20;
var currentSecond = 0, frameCount = 0, framesLastSecond = 0, lastFrameTime = 0;

var tileset = null, tilesetURL = "tileset.png", tilesetLoaded = false;

var floorTypes = {
	solid	: 0,
	path	: 1,
	water	: 2,
	special   : 3
};

var tileTypes = {
	0 : { colour:"#685b48", floor:floorTypes.solid, sprite:[{x:0,y:0,w:40,h:40}]	}, //stone wall
	1 : { colour:"#5aa457", floor:floorTypes.solid,	sprite:[{x:40,y:0,w:40,h:40}]	}, //grass
	2 : { colour:"#e8bd7a", floor:floorTypes.path,	sprite:[{x:80,y:0,w:40,h:40}]	}, //path
	3 : { colour:"#286625", floor:floorTypes.solid,	sprite:[{x:120,y:0,w:40,h:40}]	}, //tree
	4 : { colour:"#678fd9", floor:floorTypes.water,	sprite:[{x:160,y:0,w:40,h:40}]	}, //water
	5 : { colour:"white", floor:floorTypes.special,	sprite:[{x:0,y:40,w:40,h:40}]	}, //airport (3)
	6 : { colour:"white", floor:floorTypes.special,	sprite:[{x:40,y:40,w:40,h:40}]	}, //restaurant (2)
	7 : { colour:"white", floor:floorTypes.special,	sprite:[{x:80,y:40,w:40,h:40}]	}, //information booth (1)
	8 : { colour:"white", floor:floorTypes.special,	sprite:[{x:120,y:40,w:40,h:40}]	}, //biodome (1)
	9 : { colour:"white", floor:floorTypes.special,	sprite:[{x:160,y:40,w:40,h:40}]	}, //hotel (1)
	10 : { colour:"white", floor:floorTypes.special,	sprite:[{x:0,y:80,w:40,h:40}]	}, //florist (1)
	11 : { colour:"white", floor:floorTypes.special,	sprite:[{x:40,y:80,w:40,h:40}]	}, //grocery store (1)
	12 : { colour:"white", floor:floorTypes.special,	sprite:[{x:80,y:80,w:40,h:40}]	}, //hospital
	13 : { colour:"white", floor:floorTypes.special,	sprite:[{x:120,y:80,w:40,h:40}]	}, //court (1)
	14 : { colour:"white", floor:floorTypes.special,	sprite:[{x:160,y:80,w:40,h:40}]	}, //notre dame (1)
	15 : { colour:"white", floor:floorTypes.special,	sprite:[{x:0,y:120,w:40,h:40}]	}, //currency (1)
	16 : { colour:"white", floor:floorTypes.special,	sprite:[{x:40,y:120,w:40,h:40}]	}, //museum (1)
	17 : { colour:"white", floor:floorTypes.special,	sprite:[{x:80,y:120,w:40,h:40}]	}, //bar (1)
	18 : { colour:"white", floor:floorTypes.special,	sprite:[{x:120,y:120,w:40,h:40}]	}, //store
	19 : { colour:"white", floor:floorTypes.special,	sprite:[{x:160,y:120,w:40,h:40}]	}, //university
};

var tileEvents = {
	5 : fly,
	6 : restaurant,
	7 : information,
	8 : biodome,
	9 : hotel,
	10 : florist,
	11 : grocery,
	12 : hospital,
	13 : court,
	14 : notredame,
	15 : currency,
	16 : museum,
	17 : bar,
	18 : store,
	19 : university

};

var keysDown = {
	37 : false,
	38 : false,
	39 : false,
	40 : false
};

// #region Event functions

function fly(c){
	let text = `<b>Pilote:</b> O&uacute; voudriez-vous aller aujourd'hui?<br>`;
	let options = "";

	if (positionEqual(c.tileTo, [3,4])){
		$('#messagebox').html("Vous &ecirc;tes &agrave; l'A&eacute;roport International Montr&eacute;al-Trudeau");
		options = `<div class="list-group airport" aria-labelledby="dropdownMenuButton">
						<span class='menu-header'>Choisissez une destination:</span>
						<a class="dropdown-item" role="button" value="hubert">L'a&eacute;roport de St-Hubert</a>
						<a class="dropdown-item" role="button" value="centre-ville">L'a&eacute;roport de Centre-Ville</a>
					</div>

					<audio id='sound'><source src="../audio/Airport1.m4a" type="audio/mpeg"></audio>
					<div id='response'></div>`;
	}
	else if (positionEqual(c.tileTo, [18,17])){
		$('#messagebox').html("Vous &ecirc;tes &agrave; l'A&eacute;roport de St-Hubert");
		options = `<div class="list-group airport" aria-labelledby="dropdownMenuButton">
						<span class='menu-header'>Choisissez une destination:</span>
						<a class="dropdown-item" role="button" value="trudeau">L'a&eacute;roport International Montr&eacute;al-Trudeau</a>
						<a class="dropdown-item" role="button" value="centre-ville">L'a&eacute;roport de Centre-Ville</a>
					</div>

					<audio id='sound'><source src="../audio/Airport2.m4a" type="audio/mpeg"></audio>
					<div id='response'></div>`;
	}
	else if (positionEqual(c.tileTo, [1,17])){
		$('#messagebox').html("Vous &ecirc;tes &agrave; l'A&eacute;roport de Centre-Ville");
		options = `<div class="list-group airport" aria-labelledby="dropdownMenuButton">
						<span class='menu-header'>Choisissez une destination:</span>
						<a class="dropdown-item" role="button" value="trudeau">L'a&eacute;roport International Montr&eacute;al-Trudeau</a>
						<a class="dropdown-item" role="button" value="hubert">L'a&eacute;roport de St-Hubert</a>
					</div>

					<audio id='sound'><source src="../audio/Airport3.m4a" type="audio/mpeg"></audio>
					<div id='response'></div>`;
	}

	$('#interactive').html(text + options);
}

function restaurant(c){
	if (positionEqual(c.tileTo, [7,6])){
		$('#messagebox').html("Vous &ecirc;tes au Restaurant Bonaparte");
	}
	else{
		$('#messagebox').html("Vous &ecirc;tes &agrave; La Banquise");
	}

	$('#interactive').html(`<img src='./groceries/closed.png' alt='Ferm&eacute;' width='200' class='img'>
	<br><br><br><b>Vous:</b> Ah non le restaurant est ferm&eacute; aujourd'hui! Quel dommage!
	<br><audio id='sound'><source src="../audio/Restaurant.m4a" type="audio/mpeg"></audio>`);
}

function information(){
	$('#messagebox').html("Vous &ecirc;tes &agrave; un bureau d'information touristique");
	$('#interactive').html(`<b>Guide touristique:</b> Comment pourrais-je vous aider?
							<br>
							<div class="list-group information" aria-labelledby="dropdownMenuButton">
								<span class='menu-header'>Demandez au guide:</span>
								<a class="dropdown-item" role="button" value="musee">Pourriez-vous me dire o&ugrave; est le Mus&eacute;e de la civilisation?</a>
								<a class="dropdown-item" role="button" value="restaurant">Est-ce qu'il y a un restaurant fran&ccedil;ais dans le coin?</a>
								<a class="dropdown-item" role="button" value="biodome">Pourriez-vous me dire o&ugrave; se trouve le bi&ocirc;dome?</a>
								<div class="dropdown-divider"></div>
								<a class="dropdown-item" role="button" value="rec">Avez-vous des recommandations?</a>
							</div>
							<div id='response'></div>
							<audio id='sound'><source src="../audio/Information.m4a" type="audio/mpeg"></audio>`)
}

function biodome(){
	visit_biodome = true;
	$('#messagebox').html("Vous &ecirc;tes au bi&ocirc;dome");
	$('#interactive').html(`<b>Guide touristique: </b>Bienvenue!
								&Eacute;t&eacute;, comme hiver, le <strong>Biod&ocirc;me de Montr&eacute;al</strong> est la sortie familiale id&eacute;ale! 
								Avec ses cinq &eacute;cosyst&egrave;mes des Am&eacute;riques sous un m&ecirc;me toit, le Biod&ocirc;me se visite comme une balade en nature. 
							<br><img src='./groceries/biodome.jpg' alt='Le bi&ocirc;dome' height='200' class='img' style='margin-left:100px'>
							<audio id='sound'><source src="../audio/Biodome.m4a" type="audio/mpeg"></audio>`);
}

function hotel(){
	$('#messagebox').html("Vous &ecirc;tes &agrave; l'h&ocirc;tel");
	$('#interactive').html(`<b>G&eacute;rant d'h&ocirc;tel:</b> Bienvenue au Reine &Eacute;lizabeth!
							Comment pourrais-je vous aider aujourd'hui?
							<br>
							<img src='./groceries/hotel.jpg' alt='Le couturier' height='250' class='img' style='margin-left:10px'>
							<audio id='sound'>
								<source src="../audio/Hotel.m4a" type="audio/mpeg">
						  	</audio>`);
}

function florist(){
	$('#messagebox').html("Vous &ecirc;tes chez le fleuriste");
	$('#interactive').html(`<b>Fleuriste: </b>Bonjour! J'ai des fleurs pour toutes les occassions!
							<br><img src='./groceries/flowers.PNG' alt='Les fleurs' height='300' class='img' style='margin-left:25px'>
							<audio id='sound'><source src="../audio/Florist.m4a" type="audio/mpeg"></audio>`);
}

function grocery(){
	visit_grocery = true;
	$('#messagebox').html("Vous &ecirc;tes &agrave; l'&eacute;picerie");
	$('#interactive').html(`<b>G&eacute;rante:</b> Bienvenue &agrave; votre &eacute;picier de quartier! Nous avons beaucoup de produits frais. N'h&eacute;sitez pas &agrave; me communiquer si vous avez des questions.
							<div class="food-group" role="group" aria-label="Des produits">
								<div class="btn-group btn-group-justified">
									<input type="image" class='btn-food' value="fromage" src="./groceries/fromage.png"/>
									<input type="image" class='btn-food'  value="homard" src="./groceries/homard.png"/>
									<input type="image" class='btn-food' value="agneau" src="./groceries/agneau.png"/>
								</div>
								<div class="btn-group btn-group-justified">
									<input type="image" class='btn-food' value="brochettes" src="./groceries/brochettes.jpg"/>
									<input type="image" class='btn-food' value="poivrons" src="./groceries/poivron.jpg"/>
									<input type="image" class='btn-food' value="pain" src="./groceries/pain.png"/>
								</div>
							</div>
							<div id='response'></div>
							<audio id='sound'><source src="../audio/Grocery.m4a" type="audio/mpeg"></audio>`);
}

function hospital(){
	$('#messagebox').html("Vous &ecirc;tes &agrave; l'h&ocirc;pital");
	$('#interactive').html(`<b>Docteur:</b>Bonjour! Alors, qu'est-ce qui ne va pas?
							<br><b>Vous:</b> Ah, je ne sais pas. Je ne me sens pas bien.
							<div class="list-group hospital" aria-labelledby="dropdownMenuButton">
								<span class='menu-header'>Decrivez votre maladie:</span>
								<a class="dropdown-item" role="button" value="headache">J'ai mal &agrave; la t&ecirc;te</a>
								<a class="dropdown-item" role="button" value="flu">Je fais de la fi&egrave;vre depuis une semaine, je me sens toujours fatigu&eacute; et je suis courbatur&eacute;</a>
								<a class="dropdown-item" role="button" value="itchy">J'ai des d&eacute;mangeaisons depuis deux jours!</a>
							</div>
							<div id='response'></div>
							<audio id='sound'><source src="../audio/Hospital.m4a" type="audio/mpeg"></audio>`);
}

function court(){
	$('#messagebox').html("Vous &ecirc;tes au palais de Justice");
	$('#interactive').html(`<img src='./groceries/closed.png' alt='Ferm&eacute;' width='200' class='img'>
							<br><br><br><b>Vous:</b> Ah non le palais de Justice est ferm&eacute; aujourd'hui! Quel dommage!
							<audio id='sound'><source src="../audio/Court.m4a" type="audio/mpeg"></audio>`);
}

function notredame(){
	visit_notredame = true;
	$('#messagebox').html("Vous &ecirc;tes &agrave; la basilique Notre-Dame");
	$('#interactive').html(`<b>Guide touristique: </b>Bienvenue &agrave; la basilique Notre-Dame!
								Cette &eacute;glise est la premi&egrave;re &eacute;glise de style n&eacute;o-gothique au Canada. 
								Son style architectural a marqu&eacute; un tournant dans la tradition religieuse et a &eacute;t&eacute; imit&eacute; par plusieurs paroisses.
								<br><img src='./groceries/notredame.jpg' alt='Les tarifs' width='200' class='img'>
								<audio id='sound'><source src="../audio/Notredame.m4a" type="audio/mpeg"></audio>`);
}

function currency(){
	$('#messagebox').html("Vous &ecirc;tes au bureau de change");
	$('#interactive').html(`<img src='./groceries/closed.png' alt='Ferm&eacute;' width='200' class='img'>
	<br><br><br><b>Vous:</b> Ah non le bureau de change est ferm&eacute; aujourd'hui! Quel dommage!
	<audio id='sound'><source src="../audio/Currency.m4a" type="audio/mpeg"></audio>`);
}

function museum(){
	$('#messagebox').html("Vous &ecirc;tes au Mus&eacute;e de la civilisation");
	$('#interactive').html(`<b>Guide touristique:</b>Bienvenue au Mus&eacute;e de la civilisation! Vous pouvez acheter des billet &agrave; l'entr&eacute;e.
							<br><img src='./groceries/museum.PNG' alt='Les tarifs' width='200' class='img'>
							<audio id='sound'><source src="../audio/Musee.m4a" type="audio/mpeg"></audio>`);
}

function bar(){
	visit_bar = true;
	$('#messagebox').html("Vous &ecirc;tes au bar");
	$('#interactive').html(`<b>Jean-Pierre: </b>Salut! Quoi de neuf? Tu es en retard, je t'ai attendu pendant une heure!
							<br><b>Vous: </b>Desol&eacute;! Pas mal. Je me suis perdu. Avez-vous command&eacute; quelque chose?
							<br><b>Jean-Pierre: </b>Non, sans toi??
							<br>...
							<br><b>Serveur: </b>Bonjour! Le menu est affich&eacute; l&agrave;-bas. Appellez-moi si vous avez des questions!
							<br><br><img src='./groceries/bar.PNG' alt='Le menu' height='200'>
							<audio id='sound'><source src="../audio/Bar.m4a" type="audio/mpeg"></audio>`);
}

function store(){
	$('#messagebox').html("Vous &ecirc;tes chez le couturier");
	$('#interactive').html(`<b>Couturier:</b> Bonjour! Je m'occupe de la r&eacute;paration de v&ecirc;tements.
							Comment pourrais-je vous aider aujourd'hui?
							<br><img src='./groceries/tailor.png' alt='Le couturier' height='325' class='img' style='margin-left:75px'>
							<audio id='sound'><source src="../audio/Tailor.m4a" type="audio/mpeg"></audio>`);
}

function university(){
	visit_McGill = true;
	$('#messagebox').html("Vous &ecirc;tes &agrave; l'universit&eacute; McGill");
	$('#interactive').html(`<b>Professeur:</b> Bonjour! Comment se passe votre fran&ccedil;ais? Vous &ecirc;tes pr&ecirc;ts pour l'examen?
							<br><br><button type='button' class='btn btn-danger' id='btn-openMatchingModal' clientidmode='static'>Les endroits</button>
							<br><br><button type='button' class='btn btn-danger' id='btn-jeudepairs' clientidmode='static'>Les &eacute;l&eacute;ments de la route</button>
							<br><br><br><i>Note: buttons open pop-up windows, please disable popups. Alternatively all mini-games are accessible through the navigation bar</i>
							<audio id='sound'><source src="../audio/Mcgill.m4a" type="audio/mpeg"></audio>`);
}

function positionEqual (a, b)
{
	for (var i = 0; i < a.length; ++i) {
	  if (a[i] !== b[i]) return false;
	}
	return true;
}



// #endregion


// #region Game board
var viewport = {
	screen		: [0,0],
	startTile	: [0,0],
	endTile		: [0,0],
	offset		: [0,0],
	update		: function(px, py) {
		this.offset[0] = Math.floor((this.screen[0]/2) - px);
		this.offset[1] = Math.floor((this.screen[1]/2) - py);

		var tile = [ Math.floor(px/tileW), Math.floor(py/tileH) ];

		this.startTile[0] = tile[0] - 1 - Math.ceil((this.screen[0]/2) / tileW);
		this.startTile[1] = tile[1] - 1 - Math.ceil((this.screen[1]/2) / tileH);

		if(this.startTile[0] < 0) { this.startTile[0] = 0; }
		if(this.startTile[1] < 0) { this.startTile[1] = 0; }

		this.endTile[0] = tile[0] + 1 + Math.ceil((this.screen[0]/2) / tileW);
		this.endTile[1] = tile[1] + 1 + Math.ceil((this.screen[1]/2) / tileH);

		if(this.endTile[0] >= mapW) { this.endTile[0] = mapW-1; }
		if(this.endTile[1] >= mapH) { this.endTile[1] = mapH-1; }
	}
};

var player = new Character();

function Character()
{
	this.tileFrom	= [1,1];
	this.tileTo		= [1,1];
	this.timeMoved	= 0;
	this.dimensions	= [30,30];
	this.position	= [45,45];
	this.delayMove	= 700;
}
Character.prototype.placeAt = function(x, y)
{
	this.tileFrom	= [x,y];
	this.tileTo		= [x,y];
	this.position	= [((tileW*x)+((tileW-this.dimensions[0])/2)),
		((tileH*y)+((tileH-this.dimensions[1])/2))];
};

Character.prototype.processMovement = function(t)
{
	if(this.tileFrom[0]==this.tileTo[0] && this.tileFrom[1]==this.tileTo[1]) { return false; }

	if((t-this.timeMoved)>=this.delayMove)
	{
		this.placeAt(this.tileTo[0], this.tileTo[1]);
		var tile = gameMap[toIndex(this.tileTo[0], this.tileTo[1])];
		//console.log(this.tileFrom, this.tileTo);
		if(typeof tileEvents[tile]!='undefined')
		{
			tileEvents[tile](this);
		} else{
			$('#messagebox').text("Explorez la ville!");

			var html = `Ahhh Montr&eacute;al!<br>J'ai h&acirc;te d'explorer la ville!
						<br><br>Quelques endroits que je voudrais visiter:`;

			html += `<div style='margin-left:15px'><i class='fa ${visit_notredame == true ? "fa-check-square-o" : "fa-square-o"}'></i> La basilique Notre-Dame`;
			html += `<br><i class='fa ${visit_biodome == true ? "fa-check-square-o" : "fa-square-o"}'></i> Le biod&ocirc;me`;
			html += `<br><i class='fa ${visit_grocery == true ? "fa-check-square-o" : "fa-square-o"}'></i> L'&eacute;picerie`;
			html += `<br><i class='fa ${visit_McGill == true ? "fa-check-square-o" : "fa-square-o"}'></i> L'universit&eacute; McGill`;
			html += `<br><i class='fa ${visit_bar == true ? "fa-check-square-o" : "fa-square-o"}'></i> Le bar</div>`;
			html += `<audio id='sound'><source src="../audio/Main.m4a" type="audio/mpeg"></audio>`;
			
			if (visit_notredame && visit_biodome && visit_grocery && visit_McGill && visit_bar) html += "<br></br>Hm...j'ai d&eacute;j&agrave; visit&eacute; tous les endroites sur ma list mais j'ai plus de temps."
			$('#interactive').html(html);
		}
	}
	else
	{
		this.position[0] = (this.tileFrom[0] * tileW) + ((tileW-this.dimensions[0])/2);
		this.position[1] = (this.tileFrom[1] * tileH) + ((tileH-this.dimensions[1])/2);

		if(this.tileTo[0] != this.tileFrom[0])
		{
			var diff = (tileW / this.delayMove) * (t-this.timeMoved);
			this.position[0]+= (this.tileTo[0]<this.tileFrom[0] ? 0 - diff : diff);
		}
		if(this.tileTo[1] != this.tileFrom[1])
		{
			var diff = (tileH / this.delayMove) * (t-this.timeMoved);
			this.position[1]+= (this.tileTo[1]<this.tileFrom[1] ? 0 - diff : diff);
		}

		this.position[0] = Math.round(this.position[0]);
		this.position[1] = Math.round(this.position[1]);
	}


	return true;
}

Character.prototype.canMoveTo = function(x, y)
{
	if(x < 0 || x >= mapW || y < 0 || y >= mapH) { return false; }
	if(tileTypes[gameMap[toIndex(x,y)]].floor == floorTypes.path || tileTypes[gameMap[toIndex(x,y)]].floor == floorTypes.special) { return true; }
	else return false;
};

Character.prototype.canMoveUp		= function() { return this.canMoveTo(this.tileFrom[0], this.tileFrom[1]-1); };
Character.prototype.canMoveDown 	= function() { return this.canMoveTo(this.tileFrom[0], this.tileFrom[1]+1); };
Character.prototype.canMoveLeft 	= function() { return this.canMoveTo(this.tileFrom[0]-1, this.tileFrom[1]); };
Character.prototype.canMoveRight 	= function() { return this.canMoveTo(this.tileFrom[0]+1, this.tileFrom[1]); };

Character.prototype.moveLeft	= function(t) { this.tileTo[0]-=1; this.timeMoved = t; };
Character.prototype.moveRight	= function(t) { this.tileTo[0]+=1; this.timeMoved = t; };
Character.prototype.moveUp		= function(t) { this.tileTo[1]-=1; this.timeMoved = t; };
Character.prototype.moveDown	= function(t) { this.tileTo[1]+=1; this.timeMoved = t; };

function toIndex(x, y)
{
	return((y * mapW) + x);
}

window.onload = function()
{
	ctx = document.getElementById('game').getContext("2d");
	requestAnimationFrame(drawGame);
	ctx.font = "bold 10pt sans-serif";

	window.addEventListener("keydown", function(e) {
		if(e.keyCode>=37 && e.keyCode<=40) { keysDown[e.keyCode] = true; }
	});
	window.addEventListener("keyup", function(e) {
		if(e.keyCode>=37 && e.keyCode<=40) { keysDown[e.keyCode] = false; }
	});

	viewport.screen = [document.getElementById('game').width,
		document.getElementById('game').height];

	tileset = new Image();
	tileset.onerror = function()
	{
		ctx = null;
		alert("Failed loading tileset.");
	};
	tileset.onload = function() { tilesetLoaded = true; };
	tileset.src = tilesetURL;
};

function drawGame()
{
	if(ctx==null) { return; }
	if(!tilesetLoaded) { requestAnimationFrame(drawGame); return; }

	var currentFrameTime = Date.now();
	var timeElapsed = currentFrameTime - lastFrameTime;

	var sec = Math.floor(Date.now()/1000);
	if(sec!=currentSecond)
	{
		currentSecond = sec;
		framesLastSecond = frameCount;
		frameCount = 1;
	}
	else { frameCount++; }

	if(!player.processMovement(currentFrameTime))
	{
		if(keysDown[38] && player.canMoveUp())			{ player.moveUp(currentFrameTime); }
		else if(keysDown[40] && player.canMoveDown())	{ player.moveDown(currentFrameTime); }
		else if(keysDown[37] && player.canMoveLeft())	{ player.moveLeft(currentFrameTime); }
		else if(keysDown[39] && player.canMoveRight())	{ player.moveRight(currentFrameTime); }
	}

	viewport.update(player.position[0] + (player.dimensions[0]/2),
		player.position[1] + (player.dimensions[1]/2));

	ctx.fillStyle = "#000000";
	ctx.fillRect(0, 0, viewport.screen[0], viewport.screen[1]);

	for(var y = viewport.startTile[1]; y <= viewport.endTile[1]; ++y)
	{
		for(var x = viewport.startTile[0]; x <= viewport.endTile[0]; ++x)
		{
			var tile = tileTypes[gameMap[toIndex(x,y)]];
			ctx.drawImage(tileset,
				tile.sprite[0].x, tile.sprite[0].y, tile.sprite[0].w, tile.sprite[0].h,
				viewport.offset[0] + (x*tileW), viewport.offset[1] + (y*tileH),
				tileW, tileH);
		}
	}

	ctx.fillStyle = "#0000ff";
	ctx.fillRect(viewport.offset[0] + player.position[0], viewport.offset[1] + player.position[1],
		player.dimensions[0], player.dimensions[1]);

	ctx.fillStyle = "#ff0000";
	ctx.fillText("FPS: " + framesLastSecond, 10, 20);

	lastFrameTime = currentFrameTime;
	requestAnimationFrame(drawGame);
}

// #endregion
