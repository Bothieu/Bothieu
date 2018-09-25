/*
Doc :
https://api.slack.com/events
*/

// #region  TODO
/*
    Quick TODO
    faire une fonctione bored générale pour les bots
    Prévoir le cas où il y a une virgule dans le jeu aléa

    Juju
    Trouver des fonctionnalités
    Des qu'une personne parle alors que cela faisait longtemps, faire que julien fasse des alt+tab raté

    Fanfan
    Trouver des fonctionnalités

    Bothieu
        Sous-bot : répondre "Rien ne m'arretera" après avoir dis 'stop'
        Permettre de répondre en GIF (https://developers.giphy.com/docs/)
        Ajouter des rimes
        Lorsque le bot pose une question, il doit attendre une réponse et re-répondre (lorque sa réponse contient un ?)
        Si le bot doit se répéter : Je vais pas me répeter...

    Jeux :
        Alea
            - Si la proposition ne correspond pas à l'indice -> t'es con ou quoi ? J'ai di plus petit
            - Donne de mauvais indice de temps à autre et ajoute : je crois que je me suis trompé une fois non ?

    Gros travaux :
        Mettre les const dans un JSON ou des fichiers pour permettre aux utilisateurs d'ajouter des mots
        Refaire containWord et containString pour passer en argument tous les tableaux à vérifier et ainsi ne faire les boucles qu'une fois
        Séparer en 2 parties : détection/évaluation de la situation vs choix de la réponse à partir de la situation
        Choisir un message aléatoire parmis toutes les réponses possible (si le message dit : Hey, bite de bot)
            -> array.push des reponses disponible, puis un random sur ce nouveu tableau
*/
// #endregion

// #region déclaration des bots

// Récupération de l"API
var SlackBot = require("slackbots");

// Récupération des tokens d"authentification
const tokens = require("./Token.js");
const tokenBothieu = tokens.tokenBothieu();
const tokenFanfan = tokens.tokenFanfan();
const tokenJuju = tokens.tokenJuju();
var params = {
    "as_user": "true"
};
//  Initialisation des bots
var bothieu = new SlackBot({
    token: tokenBothieu,
    name: "Bothieu",
    as_user: true,
});
var fanfan = new SlackBot({
    token: tokenFanfan,
    name: "Fanfan",
    as_user: true,
});
var juju = new SlackBot({
    token: tokenJuju,
    name: "Juju",
    as_user: true,
});

// Nom du channel utilisé pour poster les messages
//const defaultChannel = "dev";
const defaultChannel = "otherthings";

// #endregion

// Juju
var _j_bored = ["Bon ba je vous rappelle dans 10 ans !", "Je ne sais pas si vous voulez mon numéro, je ne vous cache rien", "Faut lui envoyer une grosse patatasse", "...Vous étiez en contact avec M. Drouhaut, qui m'a gentillement attribué votre compte (rire gêné)", "Je vais me chercher un 'dwich, quelqu'un en veut un ?", "Rendez-moi jaloux !", "Et vous même vous avez quelle fonction ?\r\n...\r\nC'est une belle fonction (rire peu enthousiaste)", "Je ne citerais jamais votre nom, je suis une tombe", "Bonjour la compagnie", "Oki d'ok !", "Je suis à toi comme la sardine est à l'huile !", "Salut, café ?", "Le rosé c'est un truc de sous-race", "J'appel pour prendre des nouvelles concernant une propale, et ils me disent qu'ils ont vu une nana se suicider. Elle s'est défenestrée depuis l'hotel formule 1 juste en face [...] \nMais bon, ça prend la bonne voie...", "Quelqu'un peut m'apprendre à faire alt+tab rapidement ?", "Café ?", "Merde... J'ai cassé les droits...\nBon Monsieur, vous voyez, ce que j'ai fait, quelqu'un de chez vous aurait pu le faire... Vous avez besoin de notre maintenance", "Ce n'est pas avec une fusée qu'on écrase un moustique", "Vous voulez une bonne technique de commerce :\nCassez les droits puis vendez de la maintenance !"];
juju.on("start", function () { // Message au démarrage de l'app
    console.log("Juju started");
});
// Fanfan
var _f_bored = ["*Fanfan, revenant de vacances de 3 semaines* Au fait, quelqu'un de l'acceuil as-t-il remarqué que je n'avais pas rendu les clés de la samme Emeraude ?", "Tu te prends pour une star alors que t'es qu'une merde !", "9H10 : Francois arrive et annonce qu'il a un call à 9h00\r\n 9h12 : Francois appel le client et sort comme première phrase : Désolé pour le retard, j'arrivais pas a allumer mon PC, il était faignant ce matin", "Vous savez, on est pas des créatifs", "Là encore, il faut dénouer les spaghettis", "Allez, faut travailler sur Porite, c'est critique là! On va répartir le travail à 5.\r\n Bon Yohann tu travail sur Brothier\r\nLouis sur Multaler\r\nLou sur Bernis", "Ne redémarrez pas vos ordis, ne mettez pas à jour !\n\rFermez quelques programmes et ca ira", "On va pas se tirer une balle dans le slibard",/* "La prochaine fois que vous faites une vidéo, vous pouvez calibrer le son sur celui de mon PC ?",*/ "J'aime bien les petites rondelles", "Y en a qui veulent nous enculer gentiement...", "Réunion dans 30 minutes !", "Vous devinerez jamais sur quel site je suis tombé par hasard.\n\rLa FFFF !!"];
var _f_dontUnderstand = ["Quand on comprends pas, on lis la doc !", "Relis la doc, tout est dedans !", "Tu as cherché dans la doc ?"];
var _f_dontWork = ["Fais un ticket à Microsoft", "Si ca ne marche pas, faut reboot !"];
fanfan.on("start", function () { // Message au démarrage de l'app
    console.log("Fanfan started");
});

fanfan.on("message", function (data) {
   //console.log(console.log(data));
});

// Bothieu
/* Old sentence :
[":joy: mon smiley sperme des yeux... bukkake qui a mal tourné", "Je me prendrais bien une faciale... de photons", "Pom pom ch, pla la la la, pom pom ch, plalalala\r\nLALALALALA\r\nBest Beat Box E-VER", "un putain d'enculé de connard de merde de partenaire essaie de me niquer !\r\nMAIS JE DEVRAIS EN PLUS AIMER CA ET EN REDEMANDER !!!!!!!!!!!!!!!!!!!!", "Coucouiiiille !", "Sodomie rectangulaire", ]
*/
var _welcome = ["Hey, je suis de retour.\r\nPour connaître les commandes disponibles, tapez -help", "Salut les poulettes", "Hey les copains, je vous ais manqué ?", "Salut bande de PD"];
var _defaultMessage = ["Ha c'est vrai, on ne peut pas contrôler le temps...", "Dit la morafle", "Y a des gens différents par ici...", "Les nouveaux qui arrivent, est-ce qu'ils ont quel age ?", "Et ba tu sais quoi (bruit d'oreille), et bien mon oreille elle se fou de ta gueule !", "On parlait de quoi déjà?\r\nHa oui, de gros !", "pitsouai", "he oh\r\nOn rentre du boulot\r\nAvec Valérie Damidot", "si on prends une tartine de confiture, il se peut que la confiture fasse buger le pain\r\ndans ce cas il faut vérifier les js", "*Son ambiant*-Silence-\r\nRhhoo avec de la vaseline, ca passe tout seul !", "comme quand tu vas en vacance à la mère\r\ncomme le film là\r\nLES DENTS DE MA MERE", "Je suis quelqu'un de très mature\n\rBibite !", "Ca sent la couille dans le potage !", "honnêtement, je m'en badigeonne les testicules avec le pinceau de l’indifférence", "Ca dépends", "et oui, on ne démêle pas les spaghettis avec une truelle !", "Va s'y nique, je m'en vais lècher la cuvette !", "Ca à beau être ma mère, sa reste un cul !", "bv bv dans la popoche !", "Cochon d'inde pendu par les coucouilles !! :piggy:", "la liberté n'est pas à toi !!! alors arrete de réagir comme si tu t'étais fait enculer par un puceron !!!!!!", "Et sinon, t'as déjà sucé un poney ?", "Et même des fois enki il vomit", "C'est génital ça !", "Sexuellement parlant ?", "Merci pour le descriptif...", "Hein ?", "Blebebleble"];
var _badJoke = ["Qu'est-ce qui est vert et qui se déplace sous l'eau ?", "Comment appelle-t-on un hamster dans l'espace ?", "Que fait un Somalien lorsqu'il trouve 2 grains de riz ?", "Combien de Somaliens entrent dans un caddie ?", "Tu connais la blague de la girafe ?", "Qu'est ce qui est vert et pousse au fond du jardin ?", "Tu connais la blague avec la clope ?", "Tu connais la blague de la chaise ?"];
var _badJokeAnswer = ["Un chou marin", "Un Hamsteroïde", "Il ouvre un restaurant", "Aucun, ils passent tous à travers les barreaux", "Elle est longue\r\nComme ma bite", "Un martien constipé !", "Elle fait un tabac", "Elle est pliante"];
var _heSaid = ["pete", "prout", "gland", "bougre", "quequette", "nique", "bite", "foutre", "cul", "anal", "sodomie", "prolapse", "anus", "chatte", "caca", "bifle", "con", "couille", "merde", "sexe", "plouc", "zguègue"];
var _bored = [":monkey: :knife_fork_plate:", "Au fait, on fait les ponts ici ?", "bzou bzou dit le thomas", "un zizi circoncis vaut mieux qu'un papi gentil", "oooooh\r\nchamps elysées tata ta ta ta", "hey, je t'ai jamais manqué de respect moi, Baltringue !", "à la claire branlette, j'ai sorti ma quéquette, pour enculer Ginette sans lui faire de bobos !!!!", "le kiwi est un fruit ergonomique, mais surtout isocèle car chaque côté de son noyau est perpendiculaire à celui qui est juxtaposé.\r\nSource : kiwipedia", "On fait une pause travail ?", "La tour eiffel fait de la lumière, mon postérieur simplement de l'odeur", "fils de ta mère !", "On s'ennuie ici...\r\nVous avez pas une blague à me raconter ?", "Anus de poisson farci", "Je ne suis que bite, et non amour", "cheval", "c'est un mec qui rentre dans un café, et PLOUF !", "Il est né le divin enfant !!! trois poils au cul, la bite en trompette euh !!!", "je viens de voir un enfant courir après un cerf volant. vous auriez vu, le cerf s'est envolé d'un coup", "Bande de jeune sodomite illétrés"];
var _grosMot = ["morafle", "salaud", "salop", "boulet", "bouffon", "baltringue", "pd", "connard", "batard", "salope", "soumise", "con", "putain", "pute", "crétin", "garce", "gogol", "imbécile", "débile", "mongol", "pédé", "pédale", "raclure", "tantouze", "tapette", "tarlouze", "tocard", "trouduc", "vaurien"];
var _grosMotChild = ["C'est celui qui dit qui est d'abord !", "Mirroir mirroir, ca renvoie ton insulte", "Je ne m'abaisserais pas à répondre à cela", "Nianiania", "Maman, le monsieur il est vilain !", "Je vais le dire à ma maman !", "Papa, tu peux le bifler lui aussi ?"];
var _helloWord = ["bisous", "bisou", "bonjour", "salut", "hey", "plop", "bienvenue", "hello", "coucou"];
var _attaques = ["Choc anal", "Choc nasale", "Choc naval", "Choc à pic", "Choc thermique", "Pouf, l'attaque a échouée"];
var _mange = ["bouffer", "manger", "grailler", "faim"]
var _talkToMe = ["eh oh !!!! je vous entends hein, je suis omniscient", "T'as pas quelqu'un d'autre à faire chier ?", "Qu'est ce que tu me veux encore toi ?", "Arrête de me parler...", "Laisse moi tranquille", "Tu fais chier à me parler tout le temps..."];
var _bizare = ["Je crois que j'ai un peu divagué...", "Je déraille moi...", "Pfiou, je reviens à la normal", "Buuurp, j'avais une donnée mal placée", "Désolé, me jetez pas à la poubelle s'il vous plaït"];
var _amour = ["Moi aussi je t'aime ! :heart:", "Moi aussi je m'aime", "Comme tout le monde", "C'est normal, je suis un dieux", "C'est bien pour toi", "Osef de ce que tu penses !"];
//var _boredPhrase = ["Ba alors, ca poste plus rien les ", "On s'endort avec des ", "Réveillez vous les ", "Putain mais pourquoi je suis venu ici... espèces de "];
var _smileyAngry = [":angry:", ":rage:", ":imp:", ":skull:"];
var _smileyHappy = [":grinning:", ":wink:", ":smiley:", ":smile:", ":blush:", ":smirk:"];
var _fuckingBigTab = _welcome.concat(_defaultMessage, _heSaid, _bored, _helloWord, _attaques, _talkToMe, _grosMot, _grosMotChild, _amour);
var _alphabet = "abcdefghijklmnopqrstuvwxyz1234567890éèçàù#@";
var _logMathieu = ["Tu crois vraiment que je vais conserver ca ?", "Mais ferme-là! ", "Fais le toi-même connard", "Haha, mais bien sûr...", "Tu penses encore que quelqu'un t'écoute ?", "Je suis déjà trop occupé", "Peut-être qu'un jour je le ferais. Ou pas.", "Ouai ouai, je l'ajoute aux trucs que je ferais jamais", "-mathieuLog Envoyer se faire foutre mathieu"];
var _logEnki = ["Pas envi de mettre ca dans les log...", "De mémoire, tu devais pas coder aussi toi ?", "Ba va s'y, fais-le !", "C'est facile d'écrire -log, maintenant faut le faire...", "Pssst, enki, t'as qu'à le faire toi-même", "Nope", "Je veux pas de ca! Va te faire ton propre bot !"];
var _logDev = ["Tiens, tu sais faire des logs toi ? :innocent:", "Je sais pas pourquoi, mais je pense que je le ferais jamais ca...", "Si je comprends bien, t'es un dev toi aussi non? Alors fais-le toi-même", "Putain mais il s'y met aussi lui...", "C'est facile d'écrire -log, maintenant faut le faire...", "T'as qu'à le faire toi-même", "Nope", "Je veux pas de ca! Va te faire ton propre bot !"];
bothieu.on("start", function () { // Message au démarrage de l'app
    //bothieu.postMessageToChannel(defaultChannel, _welcome[getRandom(_welcome)], params); // Message lors du retour
    console.log("Bothieu started");
});
// #region Bots
// Constantes de commandes
const _toLog = ["-log"];
const _toHelp = ["-help"];
const _toGame = ["-jeu"];
const _joke = ["-joke"];
const _alea = ["-alea"];
const _aleard = ["-aleard"];
const _toShit = ["-shit"];
const _botTalk = ["-bot"];
const _stopMess = ["-kill"];

const _chanOtherThingsID = "C504106LF";
const _chanDevID = "C51C22VL5";
const _chanReuAncien = "C9E93KRB9";

// Users
const _enki = { "user": "yapiiiii", "id": "U4YLZE66P" };
const _mathieu = { "user": "avionrouge", "id": "U4ZDYFN3Z" };
const _bouzou = { "user": "frapsy", "id": "U4YRHENGM" };
const _yohann = { "user": "yohann rodier", "id": "U710ECZ9Q" };
const _arnaud = { "user": "nanaud", "id": "U5B9LGBCL" };
const _pablo = { "user": "Jesus", "id": "U7TRK675W" };
const _loick = { "user": "loick mpemba", "id": "U97R6TNA1" };
const _thomas = { "user": "squalala", "id": "UAP1984HH" };
const _marie = { "user": "Mealow", "id": "UC5RPAELR" };
const _molly = { "user": "Eddyah", "id": "UCSA3Q44W" };
const _clement = { "user": "Clément", "id": "UCR4Q1293" };


//var _bothieu = {"user": bothieu.name,"id": "B4Y3YQ5ND"}; with as_user = false
//var _fanfan = {"user": fanfan.name,"id": "B73UZ7MAA"}; with as_user = false
//var _juju = {"user": juju.name,"id": "B9EGH6DDL"}; with as_user = false

const _bothieu = { "user": bothieu.name, "id": "U4Y3YQ5SM" };
const _fanfan = { "user": fanfan.name, "id": "U745GGCP9" };
const _juju = { "user": juju.name, "id": "U9DQG7G93" };
const _myUsers = [_enki, _mathieu, _bouzou, _yohann, _arnaud, _pablo, _loick, _thomas, _marie, _molly, _clement];
const _myBots = [_bothieu, _fanfan, _juju];

// Game Param
var _isGameMessage = true;
var _isPlaying = false;
var _donePlaying = false;
var _currentGame = "";
// Game : alea
var _randomNumber = 0;
var _tryNumber = 0;

// Variables de sotckage des messages
var currentSplitedMessage = "";
var currentMessage = "";
var _lastHumanMessage = {
    user: 'nomUser',
    text: 'texte',
    ts: 'timestamp'
};
var _lastBotMessage = {
    text: 'texte',
    user: 'Bothieu',
    ts: '1496224085.321362'
};
// Variables liées aux réponses du bot
var _currentMessageNumber = 0;
var _lastBotMessageWasAnInsult = false;
var _botIsBored;
var _fanfanIsBored;
var _jujuIsBored;
var _isMess = false;
// Variable pour régler la fréquence des shuffle
var _shuffle = 0;

// Détection d"un nouveau message
bothieu.on("message", function (data) {
    var messageOwner = getmessageOwner(data);
    /* Ne déclenche le bot que si :
        Le message contient du texte (évite certains events)
        Le message provient d'un user connu par '_myUsers' ou '_myBots'
        Le message est posté dans le channel 'dev' ou 'otherthings'
    */
    if (data.text != undefined && messageOwner != "" && data.channel == _chanReuAncien) {
    }
    if (data.text != undefined && messageOwner != "" && (data.channel == _chanDevID || data.channel == _chanOtherThingsID)) {
        currentMessage = data.text.toLowerCase();
        if (data.user == _bothieu.id || data.user == _fanfan.id || data.user == _juju.id) {
            saveLastBotMessage(data);
        }
        if (data.type == 'message' && data.user != _bothieu.id) { // Humain ou autre que Bothieu
            currentSplitedMessage = currentMessage.split(' ');
            if (_isPlaying) { // Un jeu est en cours
                _isGameMessage = true;
                if (_currentGame == _alea) { // Le jeu en cours et est "nombre aléatoire"
                    if (currentMessage.indexOf("langue au chat") + 1) {
                        bothieu.postMessageToChannel(defaultChannel, "Tu abandonne si facilement... La réponse était " + _randomNumber, params);
                        _donePlaying = true;
                        _tryNumber = 0;
                        _currentGame = "";
                    }
                    else if (currentMessage == parseInt(currentMessage)) {
                        if (currentMessage == _randomNumber) {
                            _tryNumber++;
                            if (_randomNumber == 69) {
                                bothieu.postMessageToChannel(defaultChannel, "J'en reviens pas, c'était bien 69 !!\r\n"
                                    + "Tu l'as trouvé en " + _tryNumber + "essais", params);
                            }
                            else {
                                if (_tryNumber < 3) {
                                    bothieu.postMessageToChannel(defaultChannel, "N'aurais-tu pas triché ? Tu as gagné en " + _tryNumber + " essais", params);
                                }
                                else if (_tryNumber < 5) {
                                    bothieu.postMessageToChannel(defaultChannel, "Chanceux va, tu as gagné en " + _tryNumber + " essais", params);
                                }
                                else if (_tryNumber < 10) {
                                    bothieu.postMessageToChannel(defaultChannel, "Bravo, tu as gagné en " + _tryNumber + " essais", params);
                                }
                                else if (_tryNumber < 15) {
                                    bothieu.postMessageToChannel(defaultChannel, "Tu as gagné en " + _tryNumber + " essais, quel score médiocre", params);
                                }
                                else {
                                    bothieu.postMessageToChannel(defaultChannel, "Fais un effort quand même, " + _tryNumber + " essais ca fait beaucoup...", params);
                                }
                            }
                            console.log("Fin du jeu " + _alea.toString() + " en " + _tryNumber + " essais");
                            _donePlaying = true;
                            _tryNumber = 0;
                            _currentGame = "";
                        }
                        else if (currentMessage == 69) {
                            if (messageOwner == _mathieu.user) {
                                bothieu.postMessageToChannel(defaultChannel, "Change un peu de disque, t'es rayé...", params);
                            }
                            else {
                                bothieu.postMessageToChannel(defaultChannel, "Tiens, c'est pas Mathieu qui dit ca ?!", params);
                            }
                        }
                        else if (currentMessage > _randomNumber && currentMessage < 100) {
                            _tryNumber++;
                            bothieu.postMessageToChannel(defaultChannel, "Mon nombre est plus petit !", params);
                        }
                        else if (currentMessage < _randomNumber && currentMessage > 0) {
                            _tryNumber++;
                            bothieu.postMessageToChannel(defaultChannel, "Mon nombre est plus grand !", params);
                        }
                        else {
                            bothieu.postMessageToChannel(defaultChannel, "Je te rappel que mon nombre est compris entre 0 et 100...", params);
                        }
                    }
                    else { // Le message n"est pas un nombre, le joueur ne devait pas faire référence au jeu
                        _isGameMessage = false;
                    }
                }
                if (_currentGame == _aleard) { // Le jeu en cours et est "nombre aléatoire"
                    if (currentMessage.indexOf("langue au chat") + 1) {
                        bothieu.postMessageToChannel(defaultChannel, "Tu abandonne si facilement... La réponse était " + _randomNumber, params);
                        _donePlaying = true;
                        _tryNumber = 0;
                        _currentGame = "";
                    }
                    else if (currentMessage == parseInt(currentMessage)) {
                        if (currentMessage == _randomNumber) {
                            _tryNumber++;
                            if (_tryNumber < 7) {
                                bothieu.postMessageToChannel(defaultChannel, "N'aurais-tu pas triché ? Tu as gagné en " + _tryNumber + " essais", params);
                            }
                            else if (_tryNumber < 13) {
                                bothieu.postMessageToChannel(defaultChannel, "Chanceux va, tu as gagné en " + _tryNumber + " essais", params);
                            }
                            else if (_tryNumber < 20) {
                                bothieu.postMessageToChannel(defaultChannel, "Bravo, tu as gagné en " + _tryNumber + " essais, mais je pense que tu peux faire mieux", params);
                            }
                            else {
                                bothieu.postMessageToChannel(defaultChannel, "Selon Yapiiii, c'est de la merde " + _tryNumber + " essais. J'en conclue que tu es de la merde.", params);
                            }
                            console.log("Fin du jeu " + _aleard.toString() + " en " + _tryNumber + " essais");
                            _donePlaying = true;
                            _tryNumber = 0;
                            _currentGame = "";
                        }
                        else if (currentMessage == 69) {
                            if (messageOwner == _mathieu.user) {
                                bothieu.postMessageToChannel(defaultChannel, "Change un peu de disque, t'es rayé...", params);
                            }
                            else {
                                bothieu.postMessageToChannel(defaultChannel, "Tiens, c'est pas Mathieu qui dit ca ?!", params);
                            }
                        }
                        else {
                            var littleRandom = getRandom(15);
                            var mediumRandom = getRandom(20);
                            var bigRandom = getRandom(100, 20);
                            if (currentMessage < 0 || currentMessage > 500) {
                                bothieu.postMessageToChannel(defaultChannel, "Je te rappel que mon nombre est compris entre 0 et 500...\r\nBoulet", params);
                            }
                            else if (Math.abs(_randomNumber - currentMessage) < 10) {
                                _tryNumber++;
                                bothieu.postMessageToChannel(defaultChannel, "C'est brûlant !", params);
                            }
                            else if (Math.abs(_randomNumber - currentMessage) < (10 + littleRandom)) {
                                _tryNumber++;
                                bothieu.postMessageToChannel(defaultChannel, "C'est chaud !", params);
                            }
                            else if (Math.abs(_randomNumber - currentMessage) < (30 + mediumRandom)) {
                                _tryNumber++;
                                bothieu.postMessageToChannel(defaultChannel, "C'est tiède !", params);
                            }
                            else if (Math.abs(_randomNumber - currentMessage) < (50 + bigRandom)) {
                                _tryNumber++;
                                bothieu.postMessageToChannel(defaultChannel, "C'est froid !", params);
                            }
                            else {
                                _tryNumber++;
                                bothieu.postMessageToChannel(defaultChannel, "C'est glacial !", params);
                            }
                        }
                    }
                    else { // Le message n"est pas un nombre, le joueur ne devait pas faire référence au jeu
                        _isGameMessage = false;
                    }
                }
            }
            if (_isPlaying == false || _isGameMessage == false) { // Si un jeu n"est pas en cours, ou bien que le message ne correspond pas au jeu en cours
                if (_isMess) { // Si le bot est en mode fait de la merde
                    if (containWord(_stopMess) != false) { // Propose les jeux
                        var randomAnswer = getRandom(100);
                        if (randomAnswer % 10 == 0) {
                            bothieu.postMessageToChannel(defaultChannel, "Mouhahaha rien ne peut m'arrêter !!", params);
                        }
                        _isMess = false;
                    }
                    else {
                        var randomAnswer = getRandom(300);
                        if (randomAnswer % 13 == 0) {
                            bothieu.postMessageToChannel(defaultChannel, "Vive moi, le sous-bot du bothieu", params);
                        }
                        else{
                            bothieu.postMessageToChannel(defaultChannel, _fuckingBigTab[getRandom(_fuckingBigTab)], params);
                        }
                    }
                }
                else {
                    _lastmessage = data;
                    if (containWord(_botTalk) != false && data.channel == _chanDevID) {
                        var response = currentMessage.split(_botTalk)[1];
                        bothieu.postMessageToChannel(defaultChannel, response, params);
                    }
                    if (containWord(_toHelp) != false) { // Lance l"aide
                        bothieu.postMessageToChannel(defaultChannel, "Mis à part les messages classiques, voici les autres commandes :\r\n"
                            + _toLog + " | suivi de l'information que vous voulez donner à l'admin.\r\n"
                            + _joke + " | permet d'avoir une bonne petite blague à la Bothieu.\r\n"
                            + _toGame + " | permet d'afficher les jeux disponibles grâce au bot", params);
                    }
                    else if (containWord(_joke) != false) { // Propose les jeux
                        var jokeNumber = getRandom(_badJoke);
                        bothieu.postMessageToChannel(defaultChannel, _badJoke[jokeNumber], params);
                        setTimeout(function () {
                            bothieu.postMessageToChannel(defaultChannel, _badJokeAnswer[jokeNumber], params);
                        }, 10000);
                    }
                    else if (containWord(_toGame) != false) { // Propose les jeux
                        bothieu.postMessageToChannel(defaultChannel, "Voici les jeux actuellement disponible :\r\n"
                            + _alea + " | Saurez-vous trouver le nombre entre 1 et 100 ?\r\n"
                            + _aleard + " | Saurez-vous trouver le nombre entre 1 et 500 ?", params);
                    }
                    else if (containWord(_alea) != false) {
                        if (_currentGame != "") {
                            bothieu.postMessageToChannel(defaultChannel, "D'abord tu finis ta game, après on en reparle...", params);
                        }
                        else {// Démarre le jeu "aléa"
                            // initiation des paramètres du jeu
                            _isPlaying = true;
                            _donePlaying = false;
                            _currentGame = _alea;
                            // Définition du chiffre
                            _randomNumber = Math.floor((Math.random() * 100) + 1);
                            console.log("Alea : Random number : " + _randomNumber);
                            bothieu.postMessageToChannel(defaultChannel, "Initiation du jeu...\r\n"
                                + "Je suis prêt, propose moi un nombre entre 0 et 100", params);
                            _tryNumber = 0;
                        }
                    }
                    else if (containWord(_aleard) != false) {
                        if (_currentGame != "") {
                            bothieu.postMessageToChannel(defaultChannel, "D'abord tu finis ta game, après on en reparle...", params);
                        }
                        else {// Démarre le jeu "aléard"
                            // initiation des paramètres du jeu
                            _isPlaying = true;
                            _donePlaying = false;
                            _currentGame = _aleard;
                            // Définition du chiffre
                            _randomNumber = Math.floor((Math.random() * 500) + 1);
                            console.log("Aleard : Random number : " + _randomNumber);
                            bothieu.postMessageToChannel(defaultChannel, "Initiation du jeu...\r\n"
                                + "Je suis prêt, propose moi un nombre entre 0 et 500", params);
                            _tryNumber = 0;
                        }
                    }
                    else if (containWord(_toLog) != false) { // Trace dans les logs
                        if (messageOwner == _mathieu.user) {
                            bothieu.postMessageToChannel(defaultChannel, _logMathieu[getRandom(_logMathieu)], params);
                        }
                        else if (messageOwner == _bouzou.user) {
                            bothieu.postMessageToChannel(defaultChannel, "Oui maître ! " + _smileyHappy[getRandom(_smileyHappy)], params);
                        }
                        else if (messageOwner == _enki.user) {
                            bothieu.postMessageToChannel(defaultChannel, _logEnki[getRandom(_logEnki)], params);
                        }
                        else if (messageOwner == _yohann.user || messageOwner == _arnaud.user || messageOwner == _thomas.user || messageOwner == _marie.user || messageOwner == _molly.user || messageOwner == _clement.user) {
                            bothieu.postMessageToChannel(defaultChannel, _logDev[getRandom(_logDev)], params);
                        }
                        else {
                            bothieu.postMessageToChannel(defaultChannel, "Votre demande a été tracé dans les logs. On verra ce qu'en fait l'admin...", params);
                        }
                    }
                    else if (containWord(_toShit) != false) {
                        doRandomShit();
                    }
                    else if (currentMessage == _lastBotMessage.text) {
                        bothieu.postMessageToChannel(defaultChannel, "Arrête de répéter ce que je dis !" + _smileyAngry[getRandom(_smileyAngry)], params);
                    }
                    else if (containWord(["recette"]) != false) {
                        bothieu.postMessageToChannel(defaultChannel, "Recette de cuisine ? " + _smileyHappy[getRandom(_smileyHappy)], params);
                    }
                    else if (containWord(_helloWord) != false) {
                        bothieu.postMessageToChannel(defaultChannel, containWord(_helloWord) + " à toi aussi ! " + _smileyHappy[getRandom(_smileyHappy)], params);
                    }
                    else if (containWord(_grosMot) != false) {
                        if (_lastBotMessageWasAnInsult) {
                            bothieu.postMessageToChannel(defaultChannel, _grosMotChild[getRandom(_grosMotChild)], params);
                        }
                        else {
                            bothieu.postMessageToChannel(defaultChannel, containWord(_grosMot) + " toi même " + _grosMot[getRandom(_grosMot)] + " " + _smileyAngry[getRandom(_smileyAngry)], params);
                            _lastBotMessageWasAnInsult = true;
                            setTimeout(function () {
                                _lastBotMessageWasAnInsult = false;
                            }, 8000);
                        }
                    }
                    else if (containString(["ta gueule"]) != false) {
                        bothieu.postMessageToChannel(defaultChannel, _grosMotChild[getRandom(_grosMotChild)], params);
                    }
                    else if (containString(_heSaid) != false) {
                        bothieu.postMessageToChannel(defaultChannel, "Haha, il a dit " + containString(_heSaid), params);
                    }
                    else if (containWord(_mange) != false) {
                        bothieu.postMessageToChannel(defaultChannel, "Ca y est, ca parle de " + containWord(_mange) + ". Ca me donne faim tout ca ! :yum:", params);
                    }
                    else if (containString(["bouffe"]) != false) {
                        bothieu.postMessageToChannel(defaultChannel, "Ca y est, ca parle de bouffe. Ca me donne faim tout ca ! :yum:", params);
                    }
                    else if (isOnlyOneWord()) {
                        if (currentMessage === "^^") {
                            bothieu.postMessageToChannel(defaultChannel, "Tiens, voila monsieur chapeau qui ramène sa fraise ! :smile:", params);
                        }
                        else if (currentMessage.endsWith("tion")) {
                            bothieu.postMessageToChannel(defaultChannel, "On a dit pas de mot en '-tion'...", params);
                        }
                    }
                    else if (containWord(["bothieu"]) != false) {
                        if (containWord(["aime", "adore", "t'aime", "t'adore", "j'aime", "j'adore"]) != false) {
                            if (containWord(["pas"]) === false) {
                                bothieu.postMessageToChannel(defaultChannel, _amour[getRandom(_amour)], params);
                            }
                            else {
                                bothieu.postMessageToChannel(defaultChannel, "T'es plus mon ami :broken_heart:", params);
                            }
                        }
                        else {
                            bothieu.postMessageToChannel(defaultChannel, _talkToMe[getRandom(_talkToMe)], params);
                        }
                    }
                    else if (containString(["ca dépends", "sa dépends", "ça dépends"]) != false) {
                        bothieu.postMessageToChannel(defaultChannel, "Ca dépasse !", params);
                    }
                    else if (containString(["ca dépasse", "sa dépasse", "ça dépasse"]) != false) {
                        bothieu.postMessageToChannel(defaultChannel, "Ca déborde !", params);
                    }
                    else if (containWord(["vincent", "mihary", "abdel", "ali", "samy", "Erwan"]) != false) {
                        bothieu.postMessageToChannel(defaultChannel, "C'est qui lui ?", params);
                    }
                    else if (containString(["connais ma phrase"]) != false) {
                        bothieu.postMessageToChannel(defaultChannel, "Mais oui, on la connais ta phrase... :face_with_rolling_eyes:", params);
                    }
                    else if (containString(["sisi", "si si"]) != false) {
                        bothieu.postMessageToChannel(defaultChannel, "Comme la princesse ?" + _smileyHappy[getRandom(_smileyHappy)], params);
                    }
                    else if (currentMessage.endsWith("ouille")) {
                        bothieu.postMessageToChannel(defaultChannel, "Hihi, ca rime avec couille" + _smileyHappy[getRandom(_smileyHappy)], params);
                    }
                    else if (containString(["comment ca va", "comment va", "ca va"]) != false) {
                        bothieu.postMessageToChannel(defaultChannel, "Moi perso, ca va" + _smileyHappy[getRandom(_smileyHappy)], params);
                    }
                    else if (containWord(["dur", "long", "longue", "molle", "mou", "grande", "grand", "droite", "droit", "tordu", "tordue"]) != false) {
                        bothieu.postMessageToChannel(defaultChannel, "Comme ma bite" + _smileyHappy[getRandom(_smileyHappy)], params);
                    }
                    else if (containString(["crasfouinette"]) != false) { // Lance une attaque spéciale !
                        bothieu.postMessageToChannel(defaultChannel, _attaques[getRandom(_attaques)], params);
                    }
                    else if (_currentMessageNumber > 8) {
                        bothieu.postMessageToChannel(defaultChannel, _defaultMessage[getRandom(_defaultMessage)], params);
                        _currentMessageNumber = 0;
                    }
                    if (_shuffle > 50) {
                        shuffleAll();
                        _shuffle = 0;
                    }
                    _currentMessageNumber++;
                    _shuffle++;
                }
            }
            saveLastHumanMessage(data);
        }
        if (data.type == 'message' && data.user != _fanfan.id) { // Humain ou autre que Fanfan
            if (containString(["marche pas"]) != false) {
                fanfan.postMessageToChannel(defaultChannel, _f_dontWork[getRandom(_f_dontWork)], params);
            }
            else if (containString(["problème"]) != false) {
                fanfan.postMessageToChannel(defaultChannel, "Si y a un problème, tu le résouds et puis c'est tout !", params);
            }
            else if (containString(["comprends pas"]) != false) {
                fanfan.postMessageToChannel(defaultChannel, _f_dontUnderstand[getRandom(_f_dontUnderstand)], params);
            }
            else if (containWord(["café", "cafe"]) != false) {
                fanfan.postMessageToChannel(defaultChannel, "Je me ferais bien une pause café !", params);
            }
            else if (containWord(["spec", "spéc", "spécification", "spécifications", "specification", "specifications"]) != false) {
                fanfan.postMessageToChannel(defaultChannel, "Quelles specs ?", params);
            }
            else if (containString(["fanfan"]) != false) {
                fanfan.postMessageToChannel(defaultChannel, "On arrête de parler et on va travailler !!", params);
            }
            //Création d"un message "je n"ennuie" si personne ne parle au bout d"un moment
            if (data.type === "message" && data.user != _bothieu.id && data.user != _fanfan.id && data.user != _juju.id) {
                var isReallyBored = getRandom(10);
                if (isReallyBored > 5) {
                    var date = new Date();
                    var current_hour = date.getHours();
                    if (current_hour < 8 || current_hour > 20) {
                        clearTimeout(_fanfanIsBored);
                    } else {
                        clearTimeout(_fanfanIsBored); // Anule l"ancien
                        var timeOut = getRandom(2000000, 3000000);
                        _fanfanIsBored = setTimeout(function () {
                            fanfan.postMessageToChannel(defaultChannel, _f_bored[getRandom(_f_bored)], params);
                        }, timeOut);
                    }
                }
            }
        }
        if (data.type == 'message' && data.user != _juju.id) {
            if (containString(["juju"]) != false) {
                juju.postMessageToChannel(defaultChannel, "On appel allez hop hop hop, ca se trouve, c'est le prochain le bon !", params);
            }

            //Création d"un message "je n"ennuie" si personne ne parle au bout d"un moment
            if (data.type === "message" && data.user != _bothieu.id && data.user != _fanfan.id && data.user != _juju.id) {
                var isReallyBored = getRandom(10);
                if (isReallyBored > 5) {
                    var date = new Date();
                    var current_hour = date.getHours();
                    if (current_hour < 8 || current_hour > 20) {
                        clearTimeout(_jujuIsBored);
                    } else {
                        clearTimeout(_jujuIsBored); // Anule l"ancien
                        var timeOut = getRandom(2000000, 3000000);
                        _jujuIsBored = setTimeout(function () {
                            juju.postMessageToChannel(defaultChannel, _j_bored[getRandom(_j_bored)], params);
                        }, timeOut);
                    }
                }
            }
        }
    }
    if (_donePlaying) { // permet de finir la partie sans avoir a passer dans le _isPlaying (en cas de fin de partie)
        _isPlaying = false;
    }
    //Création d"un message "je n"ennuie" si personne ne parle au bout d"un moment
    if (data.type === "message" && data.user != _bothieu.id && data.user != _fanfan.id && data.user != _juju.id && _isMess == false && _isGameMessage) {
        var date = new Date();
        var current_hour = date.getHours();
        clearTimeout(_botIsBored); //Anule l"ancien
        if (current_hour <= 17) { // Evite de faire des choses en dehors des dates
            var doshit = getRandom(101);
            if (doshit <= 99) {
                var timeOut = getRandom(2500000, 3500000);
                _botIsBored = setTimeout(function () {
                    bothieu.postMessageToChannel(defaultChannel, _bored[getRandom(_bored)], params); // Message bored
                }, timeOut);
            }
            else {
                imBored(); // start sous-bot
            }
        }
    }
});
// #endregion

// #region global function
//******************************************************************************** */
//    Function
//******************************************************************************** */

/**
 * Paramètres et fonction overridant console.log, permettant d"écrire dans les log et la console
 * Texte : texte à envoyer dans les logs
 */

// Get date for log file name
var timeInMsss = new Date();
timeInMsss = timeInMsss.toString().split(':')[0];
var logFile = "./" + timeInMsss + ".log";
fs = require("fs");
util = require("util");
log_file = fs.createWriteStream(logFile, { flags: "w" });
log_stdout = process.stdout;
console.log = function (texte) { //
    log_file.write(util.format(texte) + "\n\r");
    log_stdout.write(util.format(texte) + "\n\r");
};

/*
    Envoi un message aléatoire si personne ne parle pdt un moment
    doshit : Il y a une chance que le bot fasse de la merde pendant un cours instant
*/
function imBored() {
    bothieu.postMessageToChannel(defaultChannel, "Je prends des vacances. Je vous laisse avec mon sous-bot", params);
    _isMess = true;
    var timoutSousBot = getRandom(100000, 3000000);
    console.log(timoutSousBot);
    setTimeout(function () {
        bothieu.postMessageToChannel(defaultChannel, "Je suis de retour, ca c'est bien passé ?", params);
        _isMess = false;
    }, timoutSousBot);

}

// Retourne un nombre aléatoire compris entre [min, max[
/**
 * @description Permet de générer un nombre aléatoire compris entre [min, max[
 * @param {int} max : Valeur maximale du nombre à générer
 * @param {int} min : Valeur minimale du nombre à générer (optionnal)
 * @returns {int} nombre aléatoirement généré
 */
function getRandom(max, min) {
    if (!Number.isInteger(max)) { // permet d'accepter les tableaux
        max = max.length;
    }
    if (min == undefined) {
        min = 0;
    }
    return Math.floor((Math.random() * (max - min) + min));
}

/**
 * @description Permet de vérifier qu'une chaîne contient mot puis retourne le mot contenu
 * @param {string[]} strings : tableau de mots recherchés
 * @returns {string} Si un mot est trouvé, le renvoie
 * @returns {bool} Si le mot n'est pas trouvé, renvoi false
 */
function containWord(strings) {
    var splitedMessage = currentSplitedMessage;
    for (var i = 0; i < splitedMessage.length; i++) {
        for (var j = 0; j < strings.length; j++) {
            if (splitedMessage[i] == strings[j]) {
                return strings[j];
            }
        }
    }
    return false;
}
/**
 * Retourne la chaine contenue dans string si une de celles-ci apparait dans le message
 *   @Param strings : tableau de string contenant les chaînes à tester
*/
function containString(strings) {
    var matchingString = false;
    strings.forEach(function (word) {
        if (currentMessage.indexOf(word) + 1) {
            matchingString = word;
        }
    }, this);
    return matchingString;
}

// Permet de savoir si le message ne contient qu'un mot
function isOnlyOneWord(string) {
    if (string == undefined) {
        string = currentSplitedMessage;
    }
    if (string.length === 1) {
        return true;
    }
    return false;
}

// Renvoie le dernier mot du message
function getLastChar(string) {
    if (string == undefined) {
        string = currentSplitedMessage;
    }
    var lastChar = string[string.length - 1];
    return lastChar;
}

// Permet de faire de la merde par le bot pdt un moment
function doRandomShit(totalMessTime) {
    if (totalMessTime == undefined) {
        totalMessTime = getRandom(15000, 5000);
    }

    //Initiation du l'interval entre chaque appel
    var realShit = setInterval(shit, 500);
    function shit() {
        var whatShitIDo = getRandom(3); // permet de choisir un moyen de réponse aléatoire
        if (whatShitIDo == 0) { // Réponds un message connu
            bothieu.postMessageToChannel(defaultChannel, _fuckingBigTab[getRandom(_fuckingBigTab)], params);
        }
        else if (whatShitIDo == 1) { // Réponds un nombre aléatoire
            bothieu.postMessageToChannel(defaultChannel, getRandom(300000).toString(), params);
        }
        else if (whatShitIDo == 2) { // Réponds une phrase à lettre aléatoire
            var bullShitedMessage = "";
            var nbWord = getRandom(10, 1); // Nombre de mot dans la phrase

            for (var i = 0; i < nbWord; i++) {
                var nbLettre = getRandom(10, 2); // Nombre de char dans le mot
                var currentWord = "";
                while (currentWord.length < nbLettre) {
                    currentWord += _alphabet[Math.floor(Math.random() * _alphabet.length)];
                }
                bullShitedMessage = bullShitedMessage.concat(currentWord + " ");
            }
            bothieu.postMessageToChannel(defaultChannel, bullShitedMessage, params);

        }

        // Arrete de faire de la merde au bout du temps imparti
        totalMessTime = totalMessTime - 500;
        if (totalMessTime <= 0) {
            clearTimeout(realShit);
            bothieu.postMessageToChannel(defaultChannel, _bizare[getRandom(_bizare)], params);
        }
    }
}

// Permet de mélanger les tableaux afin d'augmenter la génération du nombre aléatoire de sélection
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

function shuffleAll() {
    _welcome = shuffle(_welcome);
    _defaultMessage = shuffle(_defaultMessage);
    _heSaid = shuffle(_heSaid);
    _bored = shuffle(_bored);
    _grosMot = shuffle(_grosMot);
    _helloWord = shuffle(_helloWord);
    _attaques = shuffle(_attaques);
    _talkToMe = shuffle(_talkToMe);
    _bizare = shuffle(_bizare);
    _f_bored = shuffle(_f_bored);
    _j_bored = shuffle(_j_bored);
    _f_dontWork = shuffle(_f_dontWork);
}

/**
 * Permet de savoir qui a posté le dernier message
 * 
 */
function getmessageOwner(data) {
    var messageOwner = "";
    if (data.user == _mathieu.id) {
        messageOwner = _mathieu.user;
    }
    else if (data.user == _bouzou.id) {
        messageOwner = _bouzou.user;
    }
    else if (data.user == _enki.id) {
        messageOwner = _enki.user;
    }
    else if (data.user == _bothieu.id) {
        messageOwner = _bothieu.user;
    }
    else if (data.user == _fanfan.id) {
        messageOwner = _fanfan.user;
    }
    else if (data.user == _juju.id) {
        messageOwner = _juju.user;
    }
    else if (data.user == _yohann.id) {
        messageOwner = _yohann.user;
    }
    else if (data.user == _arnaud.id) {
        messageOwner = _arnaud.user;
    }
    else if (data.user == _pablo.id) {
        messageOwner = _pablo.user;
    }
    else if (data.user == _loick.id) {
        messageOwner = _loick.user;
    }
    else if (data.user == _thomas.id) {
        messageOwner = _thomas.user;
    }
    else if (data.user == _molly.id) {
        messageOwner = _molly.user;
    }
    else if (data.user == _marie.id) {
        messageOwner = _marie.user;
    }
    else if (data.user == _clement.id) {
        messageOwner = _clement.user;
    }

    return messageOwner;
}

// Permet de sauvegarder le dernier message chaque utilisateur
function saveLastHumanMessage(data) {
    for (var i = 0; i < _myUsers.length; i++) {
        if (data.user == _myUsers[i].id) {
            _lastHumanMessage.type = data.type;
            _lastHumanMessage.user = data.user;
            _lastHumanMessage.ts = data.ts;
            _lastHumanMessage.text = data.text;
            i = _myUsers.length + 1;
        }
    }
}

// Permet de sauvegarder le dernier message du bot
function saveLastBotMessage(data) {
    for (var i = 0; i < _myBots.length; i++) {
        if (data.user == _myBots[i].id) {
            _lastBotMessage.user = data.user;
            _lastBotMessage.ts = data.ts;
            _lastBotMessage.text = data.text;
            i = _myBots.length + 1;
        }
    }
}
// #endregion