// application qui obtient des profils de l'api randomuser.me et qui implémente une fonctionnalité de recherche

let users = [];

const adress = 'https://randomuser.me/api/?results=20';

//fonction qui récupère les profils de l'api les met dans un tableau  et l'envoie à displayUsers
const getAdress = async (url) => {
	try {
		const res = await fetch(url);
		const resToJson = await res.json();
		users = resToJson.results;
		displayUsers(users);
	} catch (err) {
		console.log(err);
	}
};

//fonction qui affiche chaque profil (prénom, nom, image)
displayUsers = (users) => {
	document.getElementById("users").innerHTML = users.map((user) =>`<li>${user.name.first} ${user.name.last} <img src="${user.picture.medium}"/>` ).join("");
}
		

//fonction qui filtre dans le tableau users la value de l'input. Si input ==="" retourne le tableau initial sinon le tableau des filtrés
filterUsers = (e) => {
	let search = e.target.value;
	if (search !== '') {
		const filtered = users.filter((user) => {
			return (
				user.name.last.includes(search) ||
				user.name.first.includes(search)
			);
		});

		displayUsers(filtered);
	} else {
		displayUsers(users);
	}
};

getAdress(adress);

//gestionnaire d'evenement qui gère l'input
document.querySelector('#search').addEventListener('input', filterUsers);
