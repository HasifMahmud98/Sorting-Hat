window.localStorage.removeItem("members");
window.localStorage.removeItem("houseSorted");
window.localStorage.removeItem("houseMemberCount");

var nextMember = -1;
var members = window.localStorage.getItem("members");
var houseSorted = window.localStorage.getItem("houseSorted");
var houseMemberCount = window.localStorage.getItem("houseMemberCount");
if (!members) {
	members = [];
	members.push([
		"Prantik",
		"male",
		"some comment about prantik",
		"Ravenclaw",
		3500,
	]);
	members.push([
		"Hasif",
		"male",
		"some comment about Hasif",
		"Gryffindor",
		3500,
	]);
	members.push(["Tasin", "male", "some comment about Tasin", null, 3500]);
	members.push([
		"Shihab",
		"male",
		"some comment about Shihab",
		"Gryffindor",
		3500,
	]);
	members.push(["Mahin", "male", "some comment about Mahin", null, 3500]);
	members.push([
		"Ridmi",
		"female",
		"some comment about Ridmi",
		"Slytherin",
		3500,
	]);
} else members = JSON.parse(members);

if (!houseSorted) {
	houseSorted = [];
	members.forEach(() => {
		houseSorted.push(false);
	});
} else houseSorted = JSON.parse(houseSorted);

if (!houseMemberCount) {
	houseMemberCount = {
		gryffindor: 0,
		slytherin: 0,
		hufflepuff: 0,
		ravenclaw: 0,
	};
	members.forEach((member) => {
		if (member[3]) {
			houseMemberCount[member[3].toLowerCase()]++;
		}
	});
} else houseMemberCount = JSON.parse(houseMemberCount);

window.localStorage.setItem("members", JSON.stringify(members));
window.localStorage.setItem("houseSorted", JSON.stringify(houseSorted));
window.localStorage.setItem(
	"houseMemberCount",
	JSON.stringify(houseMemberCount)
);

function setNextMember() {
	while (true) {
		if (nextMember + 1 < houseSorted.length) {
			nextMember++;
			if (!houseSorted[nextMember]) {
				houseSorted[nextMember] = true;
				window.localStorage.setItem(
					"houseSorted",
					JSON.stringify(houseSorted)
				);
				break;
			}
		} else return;
	}
	$(".next-member").text(members[nextMember][0]);
	if (members[nextMember][1] === "female") {
		$(".avatar__hair").addClass("female");
		$(".avatar__hair").removeClass("male");
	} else {
		$(".avatar__hair").addClass("male");
		$(".avatar__hair").removeClass("female");
	}
}

setNextMember();

function saveMemberHouse(house) {
	members[nextMember][3] = house;
	window.localStorage.setItem("members", JSON.stringify(members));

	houseMemberCount[house.toLowerCase()]++;
	window.localStorage.setItem(
		"houseMemberCount",
		JSON.stringify(houseMemberCount)
	);
}
