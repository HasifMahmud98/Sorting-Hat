var currentStatus = 1;
var sorting = false;

$(".js-sort").on("click", function () {
	if (sorting) return;
	sorting = true;
	var houses = ["hufflepuff", "gryffindor", "ravenclaw", "slytherin"];
	var item = members[nextMember][3];
	if (item === null) {
		while (true) {
			item = houses[Math.floor(Math.random() * houses.length)];
			if (
				houseMemberCount[item] + 1 <=
				Math.round((members.length / houses.length) * 1.0)
			) {
				saveMemberHouse(item);
				break;
			}
		}
	}

	var dots = 1;
	$(".js-sort").removeClass("bg-transparent");
	$(".js-sort").addClass(houses[dots % 4]);
	$(".js-sort p").fadeOut(1000);
	var loadingInterval;
	setTimeout(() => {
		$(".js-sort").addClass("loading");
		$(".js-sort p").text("Thinking");
		$(".js-sort p").fadeIn(1000);
		setTimeout(() => {
			loadingInterval = setInterval(() => {
				if (dots > 0) {
					$(".js-sort").removeClass(houses[(dots - 1) % 4]);
				} else {
					$(".js-sort").removeClass(houses[3]);
				}
				$(".js-sort").addClass(houses[dots % 4]);
				if (dots % 3 === 0) {
					$(".js-sort p").text("Thinking");
				}
				$(".js-sort p").append(".");
				dots++;
			}, 500);
		}, 1000);
	}, 1000);
	setTimeout(function () {
		$(".status-1 div.sorting-hat").addClass("animate");
		$(".status-1 div.sorting-hat__answer").text(item + "!");
	}, 800);
	setTimeout(function () {
		$(".avatar__mouth").addClass("animate");
	}, 1200);
	setTimeout(function () {
		currentStatus = 2;
		$(".status-1").fadeOut(1000);
		setTimeout(() => {
			sorting = false;
			clearInterval(loadingInterval);
			$(".js-sort p").fadeOut(1000);
			setTimeout(function () {
				$(".js-sort").removeClass("loading");
				$(".js-sort p").html(
					'Sort <strong class="next-member"></strong>!'
				);
				$(".js-sort p").fadeIn(1000);
			}, 1000);
			$(".js-sort").addClass("bg-transparent");
			if (dots > 0) {
				$(".js-sort").removeClass(houses[(dots - 1) % 4]);
			} else {
				$(".js-sort").removeClass(houses[3]);
			}

			$(".status-2").fadeIn(1000);
			$(".status-2 div.comment").html("");
			setTimeout(() => {
				$(".status-2 div.sorting-hat").addClass("animate");
				typeWriter(members[nextMember][2].split(" "), 0);

				setTimeout(() => {
					currentStatus = 3;
					$(".main-content__wrapper").addClass(item);
					$(".house-name").text(
						item.charAt(0).toUpperCase() + item.slice(1)
					);
					$(".status-2").fadeOut(1000);
					$(".status-2 div.sorting-hat").removeClass("animate");
					setTimeout(() => {
						$(".status-3").fadeIn(1000);
						$("." + item + "-logo").fadeIn(1000);
						$("." + item + "-traits").fadeIn(1000);
					}, 1000);
					setTimeout(() => {
						$(".status-3").fadeIn(1000);
					}, 1000);
				}, members[nextMember][2].replaceAll(" ", "").length * 100 - 500);
			}, 1000);
		}, 1000);
	}, members[nextMember][4]);
});

$(document).on("keydown", function (e) {
	if (currentStatus == 3) {
		currentStatus = 1;
		if (e.keyCode === 13) {
			$(".status-3").fadeOut(1000);
			$(".house-logos").fadeOut(1000);
			$(".house-traits").fadeOut(1000);
			setTimeout(() => {
				$(".status-1").fadeIn(1000);
				$(".main-content__wrapper")
					.removeClass()
					.addClass("main-content__wrapper");
				$(".status-1 div.sorting-hat,.avatar__mouth").removeClass(
					"animate"
				);
				setNextMember();
			}, 1000);
		}
	}
});

function typeWriter(words, cursor) {
	if (cursor < words.length) {
		$(".status-2 div.comment").html(
			$(".status-2 div.comment").html() +
				(cursor > 0 ? " " : "") +
				words[cursor]
		);

		if (cursor + 1 < words.length) {
			setTimeout(() => {
				typeWriter(words, cursor + 1);
			}, words[cursor + 1].length * 100);
		}
	}
}

var bgMusicID = "hp";
var bgMusicInstance = null;
// function loadSound() {
// 	createjs.Sound.registerSound("hp.ogg", bgMusicID);
// }
// function playSound() {
// 	if (bgMusicInstance === null) {
// 		bgMusicInstance = createjs.Sound.play(bgMusicID, {
// 			loop: -1,
// 			volume: 0.02,
// 		});
// 	}
// }
