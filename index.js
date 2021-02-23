var dir = "left";
var pad = "30px";
var leftcounter = -1;
var rightcounter = -1;
var counter = 0;
var colorblend = "#0500a3";
var leftcurpro = "music";
var rightcurpro = "playlist";
var curhover;
var lastscroll = 100;
var justboot = 1;
var max = 3;
var runani = 0;
var font = "basic-sans, sans-serif";
var gradani = 0;
var indivcol1 = document.getElementsByClassName("leftindiv");
var indivcoll = document.getElementsByClassName("leftindiv");
var musictimeout1;
var musictimeout2;
var musictimeout3;
var musictimeout4;
var musictimeout5;
var indivcol2 = document.getElementsByClassName("rightindiv");
var spotifyApi = new SpotifyWebApi();

var client_id = "35748c46209741f1a25ea9b20e86098c"; // Your client id
var client_secret = "946b5bab9fd048fbb568b32276d60f28"; // Your secret
var redirect_uri = "http://localhost:8888/callback"; // Your redirect uri
localStorage = window.localStorage;
var access_token = localStorage.getItem("access_token");
spotifyApi.setAccessToken(localStorage.getItem("access_token"));
var element = document.getElementById("main");
var selection=0;
var selectionoptions=6;
//var appoptions=[1,2,3]
var playlistop = {};
var podcastop = {};
var prevsong = "none";
var prevsonguri = "none";
var songlength = 0;
var timeout = 0;
var timeout2 = 0;
var timeout3 = 0;
var timeout4 = 0;
var i = 1;
var i2 = 1;
var podname=[];
var playlistname=[];
var focused;
var curchoice=0;
var lastscrollcounter = 0;
var idclicked;
var previcon='null';
var selecid;
var playlisttimeout1;
var prevleft;
var prevtop;
var curdir="left";
var clickables = {music:[3,7,8,9], playlist:[1,2,3,4,5,6,],playlistmenu:[7,8,9], podcast:[1,2,3],music2:[]};
begin();
function begin() {

	curhover = "right";
	curchoice = 1;
	selection=0
	document.getElementById("error").style["position"] = "absolute";
	document.getElementById("error").style.width = "576px";
	document.getElementById("error").style.left = "700px";
	document.getElementById("error").style.top = "170px";
	document.getElementById("error").style["font-size"] = "60px";
	document.getElementById("error").style["font-family"] = font;
	document.getElementById("error").style["color"] = "white";
	document.getElementById("error").style["text-align"] = "left";
	document.getElementById("error").style["overflow"] = "hidden";
	document.getElementById("error").style["text-shadow"] = "0px 0px 5px black";

	if (navigator.platform != "Win32") {
		document.getElementById("main").style["background"] =
			"linear-gradient(-90deg, #071961, #000000,#000000 )";
		document.getElementById("main").style["background-size"] = "200% 100%";
		document.getElementById("main").style["animation"] =
			"flylogo 4s ease infinite";
		document.getElementById("logo").style.transition = ".5s";
		document.getElementById("logo").style.transform = "translate(-50px,000px) ";
		document.getElementById("logo").style.opacity = "1";
		document.getElementById("main").transition = ".5s";
		setTimeout(function () {
			document.getElementById("logo").style.opacity = "0";
			document.getElementById("logo").style.transform = "translate(-100px,000px) ";
		}, 3500);
		setTimeout(function () {
			click("left", indivcol1);
			click("right", indivcol2);
		}, 4000);
	} else {
		click("left", indivcol1);
		click("right", indivcol2);
	}
}
function hovert(dir) {
	if (dir == "left") {
		curhover = "left";
	} else if (dir == "right") {
		curhover = "right";
	}
}
var stylemusic=false;
function inclick(dir, id) {

	if (dir == "left") {
		//playlistclick(dir, id);
		if (leftcurpro == "playlist") {
			playlistclick(dir, id);
		}else if (leftcurpro == "podcast") {
			podcastclick(dir, id);
		}else if (leftcurpro == "playlistmenu") {
			playlistmenuclick(dir, id);
		}else if (leftcurpro == "music") {
			stylemusic=true
			var dir7="left"
			}
	} else if (dir == "right") {
		//playlistclick(dir, id);
		if (rightcurpro == "playlist") {
			playlistclick(dir, id);
		}else if (rightcurpro == "podcast") {
			podcastclick(dir, id);
		}else if (rightcurpro == "playlistmenu") {
			playlistmenuclick(dir, id);
		}else if (leftcurpro == "music") {
			stylemusic=true
			var dir7="right"
			}
	}

}//click selector system
var vart1=0
function click(dir, indivcoll) {

	if (lastscroll <= 0) {
		if (dir == "left") {
			if (leftcounter == rightcounter + 1) {
				leftcounter = leftcounter - 1;
			} else if (rightcounter == max && leftcounter == 0) {
				leftcounter = max;
			}
			counter = leftcounter;
		} else {
			if (rightcounter == leftcounter + 1) {
				rightcounter = rightcounter - 1;
			} else if (leftcounter == max && rightcounter == 0) {
				rightcounter = max;
			}
			counter = rightcounter;
		}
		if (counter != 0) {
			counter = counter - 1;
		} else {
			counter = max;
		}
	} else if (lastscroll >= 0) {
		if (dir == "left") {
			if (leftcounter == rightcounter - 1) {
				leftcounter = leftcounter + 1;
			} else if (rightcounter == 0 && leftcounter == max) {
				leftcounter = 0;
			}
			counter = leftcounter;
		} else {
			if (rightcounter == leftcounter - 1) {
				rightcounter = rightcounter + 1;
			} else if (leftcounter == 0 && rightcounter == max) {
				rightcounter = 0;
			}
			counter = rightcounter;
		}
		if (counter != max) {
			counter = counter + 1;
		} else {
			counter = 0;
		}
	}
	if (lastscroll >= 0) {
		exitdown(dir);
	} else if (lastscroll <= 0) {
		exitup(dir);
	}

	if (counter == 0) {
		openmusic(dir, indivcoll);
	} else if (counter == 1) {
		openplaylist(dir, indivcoll);
		} else if (counter == 2) {
		openpodcast(dir, indivcoll);

	} else if (counter == 3) {
		if (dir=="left"){
			if (rightcurpro=="music"){
				openmusicwide(dir, indivcoll);
			}else{
				vart1=1
			}
		}else{
			if (leftcurpro=="music"){
				//console.log("E")
				openmusicwide(dir, indivcoll);
			}else{
				vart1=1

			}
		}
	}



	if (lastscroll >= 0) {
		enterdown(dir);
	} else if (lastscroll <= 0) {
		enterup(dir);
	}
	//console.log(counter);
	//console.log(lastscroll);
	if (dir == "left") {
		leftcounter = counter;
	} else {
		rightcounter = counter;
	}
	if (vart1==1){
		vart1=0
		click(dir, indivcoll)
	}
}//scroll selector system
var selectionselection=0;
var oldspot;
//var countup=0;
var cagain=true;
var dtimeout;
var etimeout;
var dtimeout2
var etimeout2
var swipeallow=false;
$(document).on('keyup', function(gfg) {
	if (curchoice!=2){
		if (gfg.keyCode == 65) {
			console.log('a key was released')
			setTimeout(function(){ cagain=true; console.log("YUg") }, 3000);

		}
		if (gfg.keyCode == 66) {
			console.log('b key was released')
			setTimeout(function(){ cagain=true; console.log("YUE") }, 3000);

		}
		if (gfg.keyCode == 67) {
			console.log('c key was released')

			swipeallow=false
			if(cagain ==true){
				console.log(cagain)
				if (curhover =="right"){
					if (curchoice==2){
						playsong();
					}else{
						inclick('right',selection)
					}
				}
				cagain=false
			}else{
				console.log(cagain)
			}
		}else if (gfg.keyCode == 68) {
			//d
			console.log('d key was released')
			dtimeout2 =setTimeout(function(){
				//console.log(selecclickables+" "+selection)
				if (rightcurpro=="playlist"){

					document.getElementById("in".concat("right", selecclickables[selection])).style['transition'] = ".4s";
					document.getElementById("in".concat("right", selecclickables[selection])).style['box-sizing'] = "";
					document.getElementById("in".concat("right", selecclickables[selection])).style["border"] = "";
					document.getElementById("in".concat("right", selecclickables[selection])).style["box-shadow"] = "0px 0px 20px 10px rgba(0, 0, 0, 0.3)";
				}else{
					document.getElementById("in".concat("right", selecclickables[selection])).style['transition'] = ".4s";
					document.getElementById("in".concat("right", selecclickables[selection])).style['box-sizing'] = "";
					document.getElementById("in".concat("right", selecclickables[selection])).style["border"] = "";
					document.getElementById("in".concat("right", selecclickables[selection])).style["box-shadow"] = "";
				}

			},4000)
		} else if (gfg.keyCode == 69) {
			//e
			console.log('e key was released')
			etimeout2 =setTimeout(function(){
				if (rightcurpro=="playlist"){

					document.getElementById("in".concat("right", selecclickables[selection])).style['transition'] = ".4s";
					document.getElementById("in".concat("right", selecclickables[selection])).style['box-sizing'] = "";
					document.getElementById("in".concat("right", selecclickables[selection])).style["border"] = "";
					document.getElementById("in".concat("right", selecclickables[selection])).style["box-shadow"] = "0px 0px 20px 10px rgba(0, 0, 0, 0.3)";
					document.getElementById("in".concat("right", selecclickables[selection])).style["background-size"] = "100%";
				}else{
					document.getElementById("in".concat("right", selecclickables[selection])).style['transition'] = ".4s";
					document.getElementById("in".concat("right", selecclickables[selection])).style['box-sizing'] = "";
					document.getElementById("in".concat("right", selecclickables[selection])).style["border"] = "";
					document.getElementById("in".concat("right", selecclickables[selection])).style["box-shadow"] = "";
					document.getElementById("in".concat("right", selecclickables[selection])).style["background-size"] = "100%";
				}
			},4000)
		}
	}else if (curchoice==2){
		if (gfg.keyCode == 68) {
			//d
			console.log('d key was released')
			dtimeout =setTimeout(function(){
				document.getElementById("in".concat("left", "7")).style["transition"]=".75s";
				document.getElementById("in".concat("left", "7")).style.width=0+"px";
				document.getElementById("in".concat("left", "7")).style["opacity"]="0";
				oldspot =0;
			},4000)
		} else if (gfg.keyCode == 69) {
			//e
			console.log('e key was released')
			etimeout =setTimeout(function(){
				document.getElementById("in".concat("left", "7")).style["transition"]=".75s";
				document.getElementById("in".concat("left", "7")).style.width=0+"px";
				document.getElementById("in".concat("left", "7")).style["opacity"]="0";
				oldspot =0;
			},4000)
		}
	}
})
$(document).on('keydown', function(gfg) {
	if (gfg.keyCode == 67) {
		//c
		//console.log('c key was pressed')
		swipeallow=true
		//cagain=true

		}else if (gfg.keyCode == 68) {
		//d
		//console.log('d key was pressed')

		clearTimeout(etimeout);
		clearTimeout(dtimeout);
		clearTimeout(etimeout2);
		clearTimeout(dtimeout2);
		} else if (gfg.keyCode == 69) {
			//e
			//console.log('e key was pressed')
			clearTimeout(etimeout);
			clearTimeout(dtimeout);
			clearTimeout(etimeout2);
		clearTimeout(dtimeout2);

		}
})

var prevshad;
var nextpagecounter=0;
var errorcheck=false;
var selecclickables;
function zoom(event) {
	if (curchoice==1){
		//lastscroll = event.deltaY;
	}

if (curhover == "right") {
		if (curchoice ==1){
			if (rightcurpro =="music2"){
				curchoice=2
				curdir="right"
			}else{
				curpro=rightcurpro
				curdir="right"
			}
		}else if (curchoice ==0){
			if (lastscroll != 0) {
				lastscrollcounter=6;
				if (lastscrollcounter >= 5) {
					if (runani == 0) {
						lastscrollcounter = 0;
						let indivcoll = document.getElementsByClassName("rightindiv");
						click("right", indivcoll);
						curhover = "right";
						curchoice = 1;
						selection=0
					}
				} else {
					if (runani == 0) {
						document.getElementById("rightdiv").style.transition;
						("1s");
						document.getElementById("rightdiv").style.transform =
							" translate(0," + lastscroll * 0.1 * (lastscrollcounter + 1) + "px)";

						setTimeout(() => {
							document.getElementById("rightdiv").style.transform = " translate(0,0px)";
							lastscrollcounter = 0;
						}, 500);
					}
				}
			}
		}
	}
	if (curchoice==2){
		console.log("WL:R")
		distance = 860
		document.getElementById("in".concat("left", "7")).style["transition"]=".1s";
		document.getElementById("in".concat("left", "7")).style["opacity"]=".5";
		//console.log(lastscroll)
		if (lastscroll !=0){
			if (lastscroll <0){
					//curscrollnum= curscrollnum+1
				//console.log(oldspot)
				if (parseInt(document.getElementById("in".concat("left", "7")).style.width, 10) !=0){
					//console.log(document.getElementById("in".concat("left", "7")).style.width)
					if(oldspot < (distance-20)){
					document.getElementById("in".concat("left", "7")).style.width=oldspot+15+"px";
					document.getElementById("main2").style["transition-timing-function"] ="ease-out";
					document.getElementById("main2").style["background-position"] =
						oldspot/distance*100+"% center ";
				}else{

					oldspot =parseInt(document.getElementById("in".concat("left", "7")).style.width, 10);
					document.getElementById("in".concat("left", "7")).style.width=oldspot+"px";
					//oldspot=distance
				}
				}else{
					document.getElementById("in".concat("left", "7")).style["transition"]=".75s";
					//console.log("UGH"+document.getElementById("in".concat("left", "7")).style.width+oldspot)
					oldspot =parseInt(document.getElementById("in".concat("left", "3")).style.width, 10);
					document.getElementById("in".concat("left", "7")).style.width=oldspot+"px";
					//oldspot =parseInt(document.getElementById("in".concat("left", "3")).style.width, 10);
					//oldspot=distance
				}

				oldspot =parseInt(document.getElementById("in".concat("left", "7")).style.width, 10);
			}else if (lastscroll >0){

				oldpicspot = oldspot/distance*100
				if(oldspot > 20){
					//console.log("WLKER")
					document.getElementById("main2").style["background-position"] =
						oldspot/distance*100+"% center ";
					document.getElementById("in".concat("left", "7")).style.width=oldspot-15+"px";

					//console.log(document.getElementById("in".concat("left", "3")).style.width)

				}else{
					document.getElementById("in".concat("left", "7")).style.width="20px"
					oldspot=20
				}
				oldspot =parseInt(document.getElementById("in".concat("left", "7")).style.width, 10);
			}
		}
	}else if (curchoice ==1){
		if (rightcurpro =="music"){
			selecclickables = clickables.music
			} else if (rightcurpro =="playlist"){
				selecclickables = clickables.playlist
				}else if (rightcurpro =="playlistmenu"){
					selecclickables = clickables.playlistmenu
					} else if (rightcurpro =="podcast"){
						selecclickables = clickables.podcast
						}else if (rightcurpro =="music2"){
						selecclickables = clickables.music2
						}
		//console.log(selecclickables)
		selectionoptions = selecclickables.length

		//console.log(selecclickables)
		if (lastscroll != 0) {
			if (lastscroll > 0){
				if (selectionselection !=0){
					selectionselection=0
					if (selection == 0){
						//console.log(leftcurpro)
						if (rightcurpro =="playlist"){

								console.log("WLG")


							//console.log("CURMAX2"+curmaxplaylist)
							wrongs = [-1,6]
							if(wrongs.includes(curmaxplaylist)!=true){
								nextpagecounter=0
								if (blocker2==false){
									curmaxplaylist=5
									insideloop2(6,"right",totalplaylist)
									setTimeout(function(){
										exitloop(6,"right",0)
									},200)

								}
							}
						}
						selection=selectionoptions-1



					}else{
						selection--
					}
				}else{
					selectionselection ++
				}
				if (selection <= selectionoptions){
					//console.log(selection)
					//console.log(selectionoptions-1)
					if (rightcurpro =="playlist"){
							prevshad = "rgba(0, 0, 0, 0.3) 0px 0px 20px 10px";
					}else{
						prevshad = "white 0px 0px 0pt 0pt";
					}
					//console.log(selecclickables[selection+1] +"SELE")
					if (selection == selectionoptions-1){
						//if (selecclickables[selection])
						document.getElementById("in".concat("right", selecclickables[0])).style["border"] = "0px";
						//console.log(prevshad)
						document.getElementById("in".concat("right", selecclickables[0])).style["box-shadow"] = prevshad;
					}else{
						document.getElementById("in".concat("right", selecclickables[selection+1])).style["border"] = "0px";
						//console.log(prevshad)
						document.getElementById("in".concat("right", selecclickables[selection+1])).style["box-shadow"] = prevshad;


					}


					document.getElementById("in".concat("right", selecclickables[selection])).style['transition'] = ".4s";
					document.getElementById("in".concat("right", selecclickables[selection])).style['box-sizing'] = "border-box";
					document.getElementById("in".concat("right", selecclickables[selection])).style["border"] = "5px solid rgba(0, 0, 0, 1)";
					//console.log("ye")
					document.getElementById("in".concat("right", selecclickables[selection])).style["box-shadow"] = "0 0 0pt 2pt white";
				}

			}else if (lastscroll < 0){
				//console.log(lastscroll)
				if (selectionselection !=0){
					selectionselection=0
					if (selection == selectionoptions-1){

						if (rightcurpro =="playlist"){
							prevshad = "rgba(0, 0, 0, 0.3) 0px 0px 20px 10px";
							//console.log(selectionoptions-1)
							//console.log(selection)
							if(selection == (selectionoptions-1)){
								console.log("WLR")
								//console.log("CURMAX!"+curmaxplaylist)
								if(curmaxplaylist!=12){
									nextpagecounter=0
									curmaxplaylist=6
									insideloop(1,"right",7)
									setTimeout(function(){
										//prevmaxplaylist=curmaxplaylist+6;
										var i=1
										var i22=1
										exitloop2(1,"right",totalplaylist)
									},400)
								}
							}
						}
						selection=0
					}else{
						selection++
					}
				}else{
					selectionselection++
				}
				if (selection <= selectionoptions){
					//console.log(selection)
					//console.log(selectionoptions)
					//console.log(selection)
					if (selection == 0){
						document.getElementById("in".concat("right", selecclickables[selectionoptions-1])).style["border"] = "0px";
						//console.log(selecclickables[selection-1])
						document.getElementById("in".concat("right", selecclickables[selectionoptions-1])).style["box-shadow"] = prevshad;
					}else{
						document.getElementById("in".concat("right", selecclickables[selection-1])).style["border"] = "0px";
						//console.log(selecclickables[selection-1])
						document.getElementById("in".concat("right", selecclickables[selection-1])).style["box-shadow"] = prevshad;
					}

					if (rightcurpro =="playlist"){
						prevshad = "rgba(0, 0, 0, 0.3) 0px 0px 20px 10px";

					}else{
						prevshad = "white 0px 0px 0pt 0pt"
						console.log(rightcurpro)
					}
					document.getElementById("in".concat("right", selecclickables[selection])).style['transition'] = ".4s";
					document.getElementById("in".concat("right", selecclickables[selection])).style['box-sizing'] = "border-box";
					document.getElementById("in".concat("right", selecclickables[selection])).style["border"] = "5px solid rgba(0, 0, 0, 1)";
					//console.log("otherye")
					document.getElementById("in".concat("right", selecclickables[selection])).style["box-shadow"] = "0 0 0pt 2pt white";

				}
			}
		}
	}
	document.getElementById("right"+"div").style["opacity"] = "1";
	document.getElementById("right"+"div").style["opacity"] = "1";
}//registers scrolling also gets buttons
function getnewtoken() {
	var buffer = window.btoa(client_id + ":" + client_secret);
	var scope =
			"user-read-private user-read-email user-read-playback-state user-modify-playback-state user-read-currently-playing playlist-read-collaborative playlist-modify-public";
	var data;
	$.ajax({
		dataType: "json",
		url: "https://accounts.spotify.com/api/token",
		type: "POST",
		headers: {
			Authorization: "Basic " + buffer
		},
		scope: scope,
		data: {
			client_id: client_id,
			client_secret: client_secret,
			grant_type: "refresh_token",
			refresh_token:
			"AQBgaQNO0cNxMOPsl03qHfnnQS6w7R_6ixZyoIYOHymjiBycr4KFkXZmKxa9AS3aw3Bmjy_MvrjsKzNdXbEVfsnyHxKMjJ55jQK3FU57yWbrxkGHodKlYcOSTXKpdliri-I"
		},

		success: function (data) {
			//console.log("Succ ", data["access_token"]);

			localStorage.setItem("access_token", data["access_token"]);
			//console.log(localStorage.getItem("access_token"))
			//console.log(getCookie("access_token"))
		},
		fail: function (data) {
			console.log("FAIL ", data);
		},
		complete: function (data) {
			console.log("COMPLETE!! ", data.statusText);
			if (data.statusText=="error"){
				console.log("NOOOO")
				errorcheck=true
				showerror()

			}else{
				console.log("FIXED")
				errorcheck=false
				localStorage.setItem("access_token", data.responseJSON.access_token);
			spotifyApi.setAccessToken(localStorage.getItem("access_token"));
			//console.log("COMPLETE ", data);''
			}

		}
	});
}
function getcurplay() {
	if (leftcurpro == "music") {
		musiccallback("left");
		//console.log("l")
		musictimeout5 = setTimeout(function () {
			getcurplay();
		}, 750);
	} else if (rightcurpro == "music") {
		musiccallback("right");
		//console.log("r")
		musictimeout5 = setTimeout(function () {
			getcurplay();
		}, 750);
	}
}
function getcurplaylist() {
	i22=1
	i11=[]
	if (leftcurpro == "playlist") {
		var dir3 = "left";
	} else if (rightcurpro == "playlist") {
		var dir3 = "right";
	}
	var options2 = { limit: "24" };
	spotifyApi.getUserPlaylists({ limit: "24" }).then(
		function (data) {
			//console.log('User Now Play',data),


			playliststylee(data, dir3);
		},
		function (err) {
			console.error(err);
			getnewtoken();
			getcurplaylist();
		}
	);
}
function getcurpodcast() {
	i22=0
	i11=[]
	if (leftcurpro == "podcast") {
		var dir3 = "left";
		//console.log("podcast");
	} else if (rightcurpro == "podcast") {
		var dir3 = "right";
		//console.log("podcast");
	}
	spotifyApi.getMySavedShows().then(
		function (data) {
			//console.log(data);

			podcaststylee(data, dir3);
		},
		function (err) {
			console.error(err);
			getnewtoken();
		}
	);
}
function musiccallback(dir3) {
	var options = { additional_types: "episode" };
	//var options ={"deviceIds":deviceIds,"context_uri":context_uri,}

	spotifyApi.getMyCurrentPlayingTrack(options).then(
		function (data) {
			//console.log('User Now Play',data),
			stylee(data, dir3);
		},
		function (err) {
			console.error("ERR"+ err);
			getnewtoken();
		}
	);
}
var datafile;
var status;
var justreconnected=false;
function showerror(){
		if(errorcheck==true){
			document.getElementById("left").style.transition = "1s";
			document.getElementById("right").style.transition = "1s";
			document.getElementById("main").style.transition = "1s";
			document.getElementById("main2").style.transition = "1s";
		document.getElementById("left").style.opacity = "0";
		document.getElementById("right").style.opacity = "0";
			document.getElementById("main").style["background"] =
				"linear-gradient(-90deg, #700000, #000000,#000000 )";
			document.getElementById("main2").style["opacity"] =
						"0";
			document.getElementById("main").style["background-size"] = "200% 100%";
			document.getElementById("main").style["animation"] =
				"flylogo 12s ease infinite";
			document.getElementById("logo").style.transition = ".5s";
			document.getElementById("logo").style.transform = "translate(-50px,000px) ";
			document.getElementById("logo").style.opacity = "1";

			document.getElementById("main").transition = ".5s";

			document.getElementById("error").style.transition = ".5s";
			document.getElementById("error").style.transform = "translate(-50px,000px) ";
			document.getElementById("error").style.opacity = "1";
			document.getElementById("error").innerHTML = "No Internet";
			justreconnected=true
			errorcheck=false
		}
}
function stylee(data44, dir3) {
	if(errorcheck==true){
		console.log("ye")
		}else{
			if(justreconnected==true){
				document.getElementById("logo").style.opacity = "0";
				document.getElementById("logo").style.transform = "translate(-100px,000px) ";
				document.getElementById("left").style.opacity = "1";
				document.getElementById("right").style.opacity = "1";
				document.getElementById("error").innerHTML = "";
				document.getElementById("main").style["animation"] =
				"";
				document.getElementById("main").style["background"] =
				"";
				document.getElementById("main2").style["opacity"] =
						".5";
				justreconnected=false
			}

			//console.log("----------------INT--------------------")
	datafile = data44
	//console.log(data44)
	if (data44 == "") {
		//console.log("item1")
		console.log("Nothing playing currently");
		//document.getElementById("in".concat(dir3, "5")).style.width = "0px";
		document.getElementById("in".concat(dir3, "3")).style.width = "0px";
		document.getElementById("in".concat(dir3, "4")).innerHTML =
			"Currently, no music is playing."; //°
		document.getElementById("in".concat(dir3, "1")).style['transition-duration'] = "1s,1s";
		document.getElementById("in".concat(dir3, "1")).style['transition-delay'] = "0s,0s";
		document.getElementById("in".concat(dir3, "1")).style["transition-property"] = "all,background-image";
		document.getElementById("in".concat(dir3, "2")).innerHTML = "";
		document.getElementById("in".concat(dir3, "1")).style["background-image"] =
			"url(https://i.imgur.com/Dj7MXfv.png)";
		document.getElementById("main2").style["opacity"] =
			"0";
		//document.getElementById("main2").style["background-position"] =
		//"~ 80%";
		document.getElementById("main2").style["background-size"] =
			"150%";
		prevsong = "none";
	}
	//console.log(data44)
	//console.log(data44.progress_ms)
	if(dir=="left"){
		if (rightcurpro=="music2"){
			spot = (data44.progress_ms / data44.item.duration_ms) * 840+ 20;
			spot2 = ((data44.progress_ms / data44.item.duration_ms) *100);
		}else{
			spot = (data44.progress_ms / data44.item.duration_ms) * 560+ 20;
			spot2 = ((data44.progress_ms / data44.item.duration_ms) *100);
		}
	}else{
		if (leftcurpro=="music2"){
			spot = (data44.progress_ms / data44.item.duration_ms) * 840+ 20;
			spot2 = ((data44.progress_ms / data44.item.duration_ms) *100);
		}else{
			spot = (data44.progress_ms / data44.item.duration_ms) * 560+ 20;
			spot2 = ((data44.progress_ms / data44.item.duration_ms) *100);
		}
	}

	//console.log(spot2)

	if (dir3 == "left"){
		//console.log("item2 G")
		if (leftcurpro=="music"){
			//console.log("item3 G")
			if (curchoice !=2){
				//console.log("item3.5 G")
				if(document.getElementById("in".concat(dir3, "7")).style.width != '0px'){
					console.log('item 3.55')
					document.getElementById("in".concat(dir3, "7")).style.width = "0px";
					document.getElementById("main2").style["opacity"] =
						".5";
				}
				document.getElementById("in".concat(dir3, "3")).style.width = spot + "px";
				document.getElementById("main2").style["background-position"] =
					spot2+"% center ";

			}else{
				//console.log("item4")
				document.getElementById("in".concat(dir3, "3")).style.width = spot + "px";
			}
		}else{

			console.log("attempted to make music bar")

		}
	}else if (dir3 == "right"){
		//console.log("item5")
		if (rightcurpro=="music"){
			//console.log("item6")
			if (curchoice !=2){
				//console.log("item7")
				if(document.getElementById("in".concat(dir3, "7")).style.width != '0px'){
					console.log('item 3.55')
					document.getElementById("in".concat(dir3, "7")).style.width = "0px";
					document.getElementById("main2").style["opacity"] =
						".5";
				}
				document.getElementById("in".concat(dir3, "3")).style.width = spot + "px";
				document.getElementById("main2").style["background-position"] =
					spot2+"% center ";

			}else{
				//console.log("item8")
				document.getElementById("in".concat(dir3, "7")).style.width = spot + "px";
			}
		}else{
			//console.log("item9")
			console.log("attempted to make music bar")
		}
	}



	if (prevsong == "none") {
		//console.log("item10")
		document.getElementById("in".concat(dir3, "1")).style.transition = "1s";
		document.getElementById("in".concat(dir3, "1")).style['transition-duration'] = "1s,0s";
		document.getElementById("in".concat(dir3, "1")).style['transition-delay'] = "0s,0s";
		document.getElementById("in".concat(dir3, "1")).style["transition-property"] = "all,background-image";
		document.getElementById("in".concat(dir3, "2")).style.transition = ".5s";
		document.getElementById("in".concat(dir3, "3")).style.transition = ".75s";
		document.getElementById("in".concat(dir3, "3")).style["transition-timing-function"] = "linear";

		document.getElementById("in".concat(dir3, "4")).style.transition = ".5s";
		document.getElementById("in".concat(dir3, "5")).style.transition = ".75s";
		document.getElementById("main2").style.transition = ".75s";
		document.getElementById("main2").style["transition-timing-function"] ="linear";
		document.getElementById("in".concat(dir3, "7")).style.transition = ".75s";

	} else if (prevsong != data44.item.name) {
		//console.log("item11")
		//console.log( data44.item.name)
		//prevsong = data.item.name;

		//document.getElementById("leftdiv").style["border-radius"] = "100px";
		document.getElementById("in".concat(dir3, "1")).style.transform =
			" scale(1.5,1.5)";
		document.getElementById("in".concat(dir3, "1")).style.opacity = "0";
		document.getElementById("main2").style.opacity = "0";
	}

	if ((prevsong != "none")&&(timeout ==0)) {
		//console.log("item12 G")
		timeout = 500;
		timeout2 = 400;
		timeout3 = 50;
		timeout4 = 500;
	}

	if (prevsong != data44.item.name) {
		//console.log("item13")
		prevsong = data44.item.name;
		prevsonguri = data44.item.uri;
		musictimeout1 = setTimeout(function () {

			//if (prevsong != data44.item.name) {
			//console.log("item14")
			document.getElementById("in".concat(dir3, "4")).style.opacity = "0";
			document.getElementById("in".concat(dir3, "2")).style.opacity = "0";
			//}
			musictimeout2 = setTimeout(function () {
				//console.log("item15")
				//if (prevsong != data44.item.name) {
				//console.log("item16")
				//document.getElementById("in".concat(dir3, "5")).style.width = "576px";
				document.getElementById("in".concat(dir3, "5")).style.border =
					"2px solid white";

				//}
				musictimeout3 = setTimeout(function () {
					//console.log("item17")
					//if (prevsong != data44.item.name) {
					//console.log("item18")
					var string = data44.item.name;

					//var length = 28;
					//var trimmedString =
					//string.length > length ? string.substring(0, length - 3) + "..." : string;

					document.getElementById("in".concat(dir3, "4")).style['text-overflow'] = "ellipsis";
					document.getElementById("in".concat(dir3, "4")).style['display'] = "-webkit-box";
					document.getElementById("in".concat(dir3, "4")).style['-webkit-box-orient'] = "vertical";
					document.getElementById("in".concat(dir3, "4")).style['-webkit-line-clamp'] = 4;
					document.getElementById("in".concat(dir3, "4")).style['overflow'] = "hidden";
					document.getElementById("in".concat(dir3, "4")).innerHTML = data44.item.name; //°
					if (data44.currently_playing_type == "track") {
						//console.log("item19")
						//console.log(data44.item.is_local)
						if (data44.item.is_local != true) {
							//console.log("item20")
							document.getElementById("in".concat(dir3, "1")).style[
								"background-image"
							] = "url(" + data44.item.album.images[0].url + ")";
							document.getElementById("main2").style["background-image"] =
								"url(" + data44.item.album.images[0].url + ")";

						} else {
							//console.log("item21")
							document.getElementById("in".concat(dir3, "1")).style[
								"background-image"
							] = "url(https://i.imgur.com/Dj7MXfv.png)";
							document.getElementById("main2").style["background-image"] =
								"";

						}
					} else {
						//console.log("item22")
						document.getElementById("in".concat(dir3, "1")).style[
							"background-image"
						] = "url(" + data44.item.images[0].url + ")";
						document.getElementById("main2").style["background-image"] =
							"url(" + data44.item.images[0].url + ")";
					}

					if (data44.currently_playing_type == "track") {
						//console.log("item23")
						var string = data44.item.artists[0].name + " - " + data44.item.album.name;
					} else {
						//console.log("item24")
						var string = data44.item.show.name;
					}
					//var length = 45;
					//var trimmedString =
					//string.length > length ? string.substring(0, length - 3) + "..." : string;
					//console.log("item25")
					document.getElementById("in".concat(dir3, "2")).innerHTML = string;
					document.getElementById("in".concat(dir3, "2")).style['text-overflow'] = "ellipsis";
					document.getElementById("in".concat(dir3, "2")).style['display'] = "-webkit-box";
					document.getElementById("in".concat(dir3, "2")).style['-webkit-box-orient'] = "vertical";
					document.getElementById("in".concat(dir3, "2")).style['-webkit-line-clamp'] = 2;
					document.getElementById("in".concat(dir3, "2")).style['overflow'] = "hidden";
					//buck
					//document.getElementById("in".concat(dir3, "6")).style["background-image"] =
					//"url(" + data.item.album.images[0].url + ")";
					//}

					//console.log(spot)

					musictimeout4 = setTimeout(function () {
						//console.log("item26")
						//if (prevsong != data44.item.name) {
						//console.log("item27")

						//console.log("HERE",prevsonguri)
						document.getElementById("in".concat(dir3, "1")).style.transform =
							" scale(1,1)";
						document.getElementById("in".concat(dir3, "1")).style.opacity = "1";

						document.getElementById("in".concat(dir3, "4")).style.opacity = "1";
						document.getElementById("in".concat(dir3, "2")).style.opacity = "1";
						document.getElementById("main2").style.opacity = ".5";
						//}
					}, timeout4);
				}, timeout3);
			}, timeout2);
		}, timeout);
	}
		}
}
var i11=[];
var i22=1;
var bigimage=[];
var totalplaylist;
var curmaxplaylist=0;
function playliststylee(data, dir3) {
	totalplaylist=data;
	while (i <= 6) {
		curmaxplaylist++;
		document.getElementById("in".concat(dir3, i)).style["background-position"] =
			"center";
		document.getElementById("in".concat(dir3, i)).style["z-index"] = "2";
		//bigimage[i-1] = new Image();
		//bigimage[i-1].src=data.items[i-1].images[0].url;
		//console.log(bigimage[i-1]);
		//i11[i]=[i]
		if (typeof bigimage[i-1] == 'undefined'){
			document.getElementById("in".concat(dir3, i)).style["display"] = "none";
			bigimage[i-1] = new Image();
			bigimage[i-1].src=data.items[i-1].images[0].url;
			i11[i]=[i]
			//console.log("HE"+i3)
		}else{
			document.getElementById("in".concat(dir3, i)).style["background-image"] = "url("+bigimage[i-1].src+")";
		}
		$(bigimage[i-1]).on('load',function(){
			$("#in".concat(dir3, i11[i22])).css("background-image","url("+$(this).attr("src")+")").fadeIn(i11[i22]*700);
			i22++
		});
		//console.log(data.items)
		//console.log(curmaxplaylist)
		//document.getElementById("in".concat(dir3, i)).style["background-image"] =
			//"url(" + data.items[i-1].images[0].url + ")";
		playlistname[i] = data.items[i-1].name;
		playlistop[i] = data.items[i-1].id;
		i++;
	}
}
var bigimagepod=[];
function podcaststylee(data, dir4) {
	i2=1;
	var i=0
	var i3=0;
	var favpodcastlist = [
		"SuperMegaCast",
		"The Tiny Meat Gang Podcast",
		"My Brother, My Brother And Me"
	];
	while (i <= data.items.length - 1) {
		//console.log(i)
		if (favpodcastlist.indexOf(data.items[i].show.name) >= 0) {
			//console.log(i)
			spotifyApi.getShowEpisodes(data.items[i].show.id).then(
				function (data3) {
					spotifyApi.getEpisode(data3.items[0].id).then(
						function (data2) {
							document.getElementById("in".concat(dir4, i2+i3)).style["padding-left"] = "120px";
							document.getElementById("in".concat(dir4, i2+i3)).style["padding-top"] = "7px";
							document.getElementById("in".concat(dir4, i2+i3)).style["padding-right"] = "10px";
							document.getElementById("in".concat(dir4, i2+i3)).style["line-height"] = "50px";
							document.getElementById("in".concat(dir4, i2+i3)).style['text-overflow'] = "ellipsis";
							document.getElementById("in".concat(dir4, i2+i3)).style['display'] = "-webkit-box";
							document.getElementById("in".concat(dir4, i2+i3)).style['-webkit-box-orient'] = "vertical";
							document.getElementById("in".concat(dir4, i2+i3)).style['-webkit-line-clamp'] = 2;
							document.getElementById("in".concat(dir4, i2+i3)).style['overflow'] = "hidden";
							document.getElementById("in".concat(dir4, i2+i3)).style['box-sizing'] = "border-box";
							document.getElementById("in".concat(dir4, i2+i3)).style["z-index"] = "0";
							podcastop[i3] = data2.uri;
							var someDate = new Date(data2.release_date);
							const today = new Date()
							const isToday = (someDate) => {
								const today = new Date()
								return someDate.getDate() >= today.getDate()-3 &&
									someDate.getMonth() == today.getMonth() &&
									someDate.getFullYear() == today.getFullYear()
							}
							if (isToday(someDate) == true){
								document.getElementById("in".concat(dir4, i2+i3+3)).style.opacity = "1";
								document.getElementById("in".concat(dir4, i2+i3+3)).style["z-index"] = "3";
								document.getElementById("in".concat(dir4, i2+i3+3)).style['box-shadow'] = "0px 0px 20px 10px rgba(0, 0, 0, 0.8)";
							}
							//console.log(i2+i3-3)
							document.getElementById("in".concat(dir4, i2+i3)).innerHTML = String(data2.name);
							document.getElementById("in".concat(dir4, i2+i3-3)).style['transition-duration'] = "1s,0s,0s,0s";
							document.getElementById("in".concat(dir4, i2+i3-3)).style["transition-property"] = "all,background-image,display,opacity";
							document.getElementById("in".concat(dir4, i2+i3-3)).style["background-image"] = "url("+data2.images[0].url+")";
							i22++
							i3++
						},
						function (err) {
							getnewtoken();
						}
					);
				},
				function (err) {
					getnewtoken();
					podcaststylee();
				}
			);

			document.getElementById("in".concat(dir4, i2)).style["background-position"] =
				"center";
			document.getElementById("in".concat(dir4, i2+3)).style["font-size"] = "50px";
			document.getElementById("in".concat(dir4, i2+3)).style["font-family"] = font;
			document.getElementById("in".concat(dir4, i2+3)).style["color"] = "white";
			document.getElementById("in".concat(dir4, i2+3)).style["text-align"] = "left";
			i2++;
		}
		i++;
	}
}
//let scale = 1;
const el = document.querySelector("div");
el.onwheel = zoom;
function disableScroll() {
	document.body.style.overflow = "hidden";
	document.querySelector("html").scrollTop = window.scrollY;
}
disableScroll();
function playsong(){
	//console.log(datafile)
	//console.log(datafile.context.uri)
	//console.log(oldspot)
	var dirat =datafile.item.duration_ms;
	document.getElementById("in".concat("left", "7")).style.width=0+"px";
	var dirat =datafile.item.duration_ms;
	var oldspotms = parseInt(((oldspot-15)/860)*dirat)
	if (oldspot == 20){
		oldspotms=0;
	}
	//console.log(oldspotms)
	spotifyApi.getMyDevices().then(function (data, data2) {
		let i = 0;
		//console.log("ye")
		while (i < data.devices.length) {
			//console.log(data.devices)
			if (data.devices[i].is_active == true) {
				var deviceIds = [data.devices[i].id];
				//console.log(datafile)
				if(typeof datafile.context == 'undefined') {
					var context_uri= datafile.context.uri;
				}
				else {
					var context_uri= datafile.item.uri;
				}

				//console.log(context_uri)
				var options3 = { deviceIds: deviceIds, uris: context_uri };
				spotifyApi.seek(oldspotms, options3).then(function (data) {
					//console.log("ye3")
					//console.log(data);
				},
																									function (err) {
					console.error(err);
					getnewtoken();
				}
																								 );
			}
			i++;
		}
		i = 0;
	});
}
window.onkeydown = function (gfg) {
	if (gfg.keyCode === 65) {
		//console.log("A key is pressed");
		if (swipeallow==true) {
			lastscroll = -10;
			curchoice = 0;
			cagain==false
			zoom()

		}


		//selection=0
	}else if (gfg.keyCode === 66) {
		//keysPressed[event.key] = true;

		if (swipeallow==true) {
			lastscroll = 10;
			curchoice = 0;
			cagain==false
			zoom()

		}


		//selection=0
	}else if (gfg.keyCode === 67) {
		console.log("Cc key is pressed");
		cagain==true


	}else if (gfg.keyCode === 68) {
		//console.log("D key is pressed");
		lastscroll = -10;
		curchoice = 1;
		zoom()
	}else if (gfg.keyCode === 69) {
		//console.log("E key is pressed");
		lastscroll = 10;
		curchoice = 1;
		zoom()
	}else if (gfg.keyCode === 70) {
		console.log("F key is pressed");
		curhover = "right";
		curchoice = 0;
	}else if (gfg.keyCode === 71) {
		console.log("G key is pressed");
		curhover = "";
		curchoice = 0;
	}else{
		curhover = "right";
		curchoice = 1;
		selection=0
	}


};

function clear(dir, indivcoll) {
	if (dir == "left") {
		if (leftcurpro == "music") {
			clearTimeout(musictimeout1);
			clearTimeout(musictimeout4);
			clearTimeout(musictimeout3);
			clearTimeout(musictimeout2);
			clearTimeout(musictimeout5);
			clearTimeout(etimeout);
			clearTimeout(dtimeout);
			//console.log("music canceled");
		}
	} else if (dir == "right") {
		if (rightcurpro == "music") {
			clearTimeout(musictimeout1);
			clearTimeout(musictimeout4);
			clearTimeout(musictimeout3);
			clearTimeout(musictimeout2);
			clearTimeout(musictimeout5);
			clearTimeout(etimeout);
			clearTimeout(dtimeout);
			//console.log("music canceled");
		}
	}

	for (var i = 0, len = indivcoll.length; i < len; i++) {
		indivcoll[i].style["display"] = "visible";
		indivcoll[i].style["width"] = "0px";
		indivcoll[i].style["height"] = "0px";
		indivcoll[i].style["left"] = "initial";
		indivcoll[i].style["right"] = "initial";
		indivcoll[i].style["border-radius"] = "initial";
		indivcoll[i].style["background-image"] = "";
		indivcoll[i].style["padding"] = "0px";
		indivcoll[i].style["transition"] = "0s";
		indivcoll[i].style["filter"] = "blur(00px)";
		indivcoll[i].style.border = "0px solid white";
		indivcoll[i].style["line-height"] = "100%";
		indivcoll[i].style["padding"] = "0px";
		indivcoll[i].style['display'] = "";
		indivcoll[i].style['-webkit-box-orient'] = "";
		indivcoll[i].style['-webkit-line-clamp'] = "";
		indivcoll[i].style['overflow'] = "";
		indivcoll[i].style['box-sizing'] = "content-box";
		indivcoll[i].style["transition-timing-function"] ="ease";
		indivcoll[i].style["transform"] ="";
		indivcoll[i].style['box-shadow'] = "";
		indivcoll[i].style['opacity'] = "1";
		indivcoll[i].innerHTML = "";
		indivcoll[i].style['transition-duration'] = "";
		indivcoll[i].style['transition-delay'] = "";
		indivcoll[i].style["transition-property"] = "";
		indivcoll[i].style["z-index"] = "0";
		indivcoll[i].style["text-shadow"] = "";
	}
	//document.getElementsByClassName("leftindiv").style.width = "0";
	//document.getElementsByClassName("leftindiv").style.height = "0";
}
function exitdown(dir) {

	runani = 1;
	if (dir == "left") {
		document.getElementById("right").style["z-index"] = "0";
		document.getElementById("left").style["z-index"] = "1";
		//let leftcurpro = "music";
	} else {
		document.getElementById("left").style["z-index"] = "0";
		document.getElementById("right").style["z-index"] = "1";
		//let rightcurpro = "music";
	}


	document.getElementById(dir.concat("div")).style.transition = ".5s";
	//document.getElementById("leftdiv").style["border-radius"] = "100px";
	document.getElementById(dir.concat("div")).style.transform =
		"translate(0px,600px) scale(1.5,1.5)";

	document.getElementById(dir.concat("div")).style.opacity = "0";
	//document.getElementById(dir).style["background-positon"] = "100% -100%";
	//document.getElementById(dir).style["background-repeat"] = no-repeat;
	//document.getElementById(dir).style["animation-fill-mode"] = "forwards";
	if (justboot >= 3) {
		if (gradani == 0) {
			gradani = 1;
			document.getElementById("main").style["background"] =
				"linear-gradient(0deg, #071961, #000000,#000000 )";
			document.getElementById("main").style["background-size"] = "100% 200%";
			document.getElementById("main").style["animation"] =
				"flydown 1.5s ease infinite";
		}
	} else {
		document.getElementById("main").style["background"] =
			"linear-gradient(0deg, #000000,#000000,#000000 )";
		justboot = justboot + 1;
	}
	//document.getElementById(dir).style["background-positon"] = "50% 10px";

	//document.getElementById(dir.concat("div")).style[
	//"background-color"
	//] = colorblend;
}
function exitup(dir) {
	runani = 1;
	if (dir == "left") {
		document.getElementById("right").style["z-index"] = "0";
		document.getElementById("left").style["z-index"] = "1";
		//let leftcurpro = "music";
	} else {
		document.getElementById("left").style["z-index"] = "0";
		document.getElementById("right").style["z-index"] = "1";
		//let rightcurpro = "music";
	}
	document.getElementById(dir.concat("div")).style.transition = ".5s";
	//document.getElementById("leftdiv").style["border-radius"] = "100px";
	document.getElementById(dir.concat("div")).style.transform =
		"translate(0px,-400px) scale(0.5,0.5)";
	document.getElementById(dir.concat("div")).style.opacity = "0";
	if (gradani == 0) {
		gradani = 1;
		document.getElementById(dir.concat("div")).style["background-color"] = "";
		document.getElementById("main").style["background"] =
			"linear-gradient(180deg, #071961, #000000,#000000 )";
		document.getElementById("main").style["background-size"] = "100% 200%";
		document.getElementById("main").style["animation"] =
			"flyup 1.5s ease infinite";
	}
}
function enterdown(dir) {
	setTimeout(function () {
		document.getElementById(dir.concat("div")).style.transition = "0s";

		document.getElementById(dir.concat("div")).style.transform =
			"translate(0px,-400px) scale(0.5,0.5)";
		//document.getElementById(dir).style.transition = "0s";
		//document.getElementById(dir).style.backgroundColor = colorblend;
		setTimeout(function () {
			document.getElementById(dir.concat("div")).style.transition = ".5s";
			//document.getElementById(dir).style.transition = ".5s";
			document.getElementById(dir.concat("div")).style.opacity = "1";
			document.getElementById(dir.concat("div")).style.transform = "scale(1,1)";
			//document.getElementById(dir).style["background"] = "black";
			//document.getElementById(dir).style["background-size"] = "100% 100%";
			//document.getElementById(dir).style["animation"] = "";
			//document.getElementById(dir).style["background"] = "";
		}, 20);
	}, 220);
	setTimeout(function () {
		document.getElementById("main").style.transition = "3s";
		document.getElementById("main").style["animation"] = "";
		document.getElementById("main").style["background"] =	"linear-gradient(180deg, #000000,#000000 )";

		//document.getElementById(dir).style["background-positon"] = "50% 1200px";
		gradani = 0;
		runani = 0;
	}, 550);
}
function enterup(dir) {
	setTimeout(function () {
		document.getElementById(dir.concat("div")).style.transition = "0s";
		document.getElementById(dir.concat("div")).style.transform =
			"scale(1.5,1.5) translate(00px,400px)";

		//document.getElementById(dir).style.transition = "0s";
		//document.getElementById(dir).style.backgroundColor = colorblend;
		setTimeout(function () {
			document.getElementById(dir.concat("div")).style.transition = ".5s";
			//document.getElementById(dir).style.transition = ".5s";

			document.getElementById(dir.concat("div")).style.transform = "scale(1,1)";
			document.getElementById(dir.concat("div")).style.opacity = "1";
			//document.getElementById(dir).style["background"] =
			//"black";
		}, 20);
	}, 220);
	setTimeout(function () {
		document.getElementById("main").style.transition = "3s";
		document.getElementById("main").style["animation"] = "";
		document.getElementById("main").style["background"] =
			"linear-gradient(180deg, #000000,#000000 ";
		gradani = 0;
		runani = 0;
		//document.getElementById(dir).style["background-positon"] = "50% 1200px";
	}, 550);
}
function openmusic(dir, indivcoll) {
	if (dir == "left") {
		document.getElementById("right").style["z-index"] = "0";
		document.getElementById("left").style["z-index"] = "1";
	} else {
		document.getElementById("left").style["z-index"] = "0";
		document.getElementById("right").style["z-index"] = "1";
	}
	setTimeout(function () {
		clear(dir, indivcoll);
		if (dir == "left") {
			leftcurpro = "music";
		} else {
			rightcurpro = "music";
		}
		if (leftcurpro != "music"){
			if (rightcurpro !="music"){
				document.getElementById("main2").style["opacity"]= "0";
				console.log("music")
			}
		}
		prevsong = "none";
		timeout = 0;
		timeout2 = 0;
		timeout3 = 0;
		timeout4 = 0;
		getcurplay();
		document.getElementById(dir.concat("div")).style["background-color"] = "";
		////document.getElementById(dir.concat("div")).style.backgroundColor = "black";

		//document.getElementById("in".concat(dir, "6")).style.position = "absolute";
		//document.getElementById("in".concat(dir, "6")).style.width = "640px";
		//document.getElementById("in".concat(dir, "6")).style.height = "400px";
		//document.getElementById("in".concat(dir, "6")).style.left = "0px";
		//document.getElementById("in".concat(dir, "6")).style.top = "0px";
		//document.getElementById("in".concat(dir, "6")).style["border-radius"] =
		//"50px";
		//document.getElementById("main2").style["filter"] =
		//"brightness(0.6)";
		//document.getElementById("main2").style["opacity"] =
		//".5";
		document.getElementById("left").style["filter"] =
			"brightness(1)";
		document.getElementById("left").style["opacity"] =
			"1";
		document.getElementById("main2").style["background-size"] =
			"130%";

		document.getElementById("main2").style["background-position"] =
			"0% center ";
		document.getElementById("in".concat(dir, "1")).style["background-image"] =
			"url(https://i.imgur.com/Dj7MXfv.png)";
		document.getElementById("in".concat(dir, "4")).innerHTML =
			"Currently, no music is playing."; //°
		drawmusic(dir,indivcoll)

		var access_token = localStorage.getItem("access_token");
		if (access_token != "") {
		} else {
			getnewtoken();
		}
	}, 220);

	//background: radial-gradient(#e66465, #9198e5);
}
function drawmusic(dir,indivcoll){
	document.getElementById("in".concat(dir, "1")).style["transition"] = "1s";
	document.getElementById("in".concat(dir, "1")).style["transition-delay"] = "0s";
	document.getElementById("in".concat(dir, "2")).style["transition"] = "1s";
	document.getElementById("in".concat(dir, "2")).style["transition-delay"] = "0s";
	document.getElementById("in".concat(dir, "4")).style["transition"] = "1s";
	document.getElementById("in".concat(dir, "4")).style["transition-delay"] = "0s";
	document.getElementById("in".concat(dir, "3")).style["transition"] = "1s";
	document.getElementById("in".concat(dir, "3")).style["transition-delay"] = ".2s";
	document.getElementById("in".concat(dir, "5")).style["transition"] = "1s";
	document.getElementById("in".concat(dir, "5")).style["transition-delay"] = ".2s";
	document.getElementById("in".concat(dir, "6")).style["transition"] = "1s";
	document.getElementById("in".concat(dir, "6")).style["transition-delay"] = ".2s";

	document.getElementById("in".concat(dir, "1")).style.position = "absolute";
		document.getElementById("in".concat(dir, "1")).style.width = "250px";
		document.getElementById("in".concat(dir, "1")).style.height = "250px";
		//document.getElementById("inleft1").style.backgroundColor = "yellow";
		document.getElementById("in".concat(dir, "1")).style.left = "30px";
		document.getElementById("in".concat(dir, "1")).style.top = "50px";
		document.getElementById("in".concat(dir, "1")).style["border-radius"] =
			"20px";
		document.getElementById("in".concat(dir, "1")).style["background-size"] =
			"cover";

		document.getElementById("in".concat(dir, "1")).style["box-shadow"] = "0 0 30pt 0pt black";
		document.getElementById("in".concat(dir, "2")).style.position = "absolute";
		document.getElementById("in".concat(dir, "2")).style.width = "310px";
		document.getElementById("in".concat(dir, "2")).style.height = "2em";
		//document.getElementById("inleft2").style.backgroundColor = "yellow";
		document.getElementById("in".concat(dir, "5")).style.width = "576px";
		document.getElementById("in".concat(dir, "2")).style.left = "300px";
		document.getElementById("in".concat(dir, "2")).style.top = "250px";
		document.getElementById("in".concat(dir, "2")).style["font-size"] = "30px";
		document.getElementById("in".concat(dir, "2")).style["font-family"] = font;
		document.getElementById("in".concat(dir, "2")).style["color"] = "white";
		document.getElementById("in".concat(dir, "2")).style["text-align"] = "left";
		document.getElementById("in".concat(dir, "2")).style["overflow"] = "hidden";
		document.getElementById("in".concat(dir, "2")).style["text-shadow"] = "0px 0px 5px black";
		//document.getElementById("in".concat(dir, "2")).innerHTML = "Joji - Nectar";

		document.getElementById("in".concat(dir, "3")).style.position = "absolute";
		//document.getElementById("in".concat(dir, "3")).style.width = "580px";
		document.getElementById("in".concat(dir, "3")).style.height = "28px";
		document.getElementById("in".concat(dir, "3")).style.backgroundColor =
			"white";
		document.getElementById("in".concat(dir, "3")).style.opacity = ".7";
		document.getElementById("in".concat(dir, "3")).style.left = "30px";
		document.getElementById("in".concat(dir, "3")).style.top = "320px";
		document.getElementById("in".concat(dir, "3")).style["border-radius"] =
			"20px";


		document.getElementById("in".concat(dir, "7")).style.position = "absolute";
		//document.getElementById("in".concat(dir,"7")).style.width = "580px";
		document.getElementById("in".concat(dir, "7")).style.height = "28px";
		document.getElementById("in".concat(dir, "7")).style.backgroundColor =
			"white";
		document.getElementById("in".concat(dir, "7")).style.left = "30px";
		document.getElementById("in".concat(dir, "7")).style.top = "320px";
		document.getElementById("in".concat(dir, "7")).style["border-radius"] =
			"20px";
		document.getElementById("in".concat(dir, "7")).style["opacity"] =
			".5";


		document.getElementById("in".concat(dir, "4")).style.position = "absolute";
		document.getElementById("in".concat(dir, "4")).style.width = "310px";
		document.getElementById("in".concat(dir, "4")).style.height = "4em";
		//document.getElementById("inleft4").style.backgroundColor = "white";
		document.getElementById("in".concat(dir, "4")).style.left = "300px";
		document.getElementById("in".concat(dir, "4")).style.top = "50px";
		document.getElementById("in".concat(dir, "4")).style["font-size"] = "50px";
		document.getElementById("in".concat(dir, "4")).style["font-family"] = font;
		document.getElementById("in".concat(dir, "4")).style["color"] = "white";
		document.getElementById("in".concat(dir, "4")).style["text-align"] = "left";
		document.getElementById("in".concat(dir, "4")).style["overflow"] = "hidden";

		document.getElementById("in".concat(dir, "4")).style["text-shadow"] = "0px 0px 5px black";
		document.getElementById("in".concat(dir, "4")).style["line-height"] = "50px";
		//document.getElementById("inleft4").style["z-index"] = "-1";
		document.getElementById("in".concat(dir, "5")).style.position = "absolute";
		document.getElementById("in".concat(dir, "5")).style.height = "24px";
		//document.getElementById("in".concat(dir, "5")).style.backgroundColor = "yellow";
		document.getElementById("in".concat(dir, "5")).style.left = "30px";
		document.getElementById("in".concat(dir, "5")).style.top = "320px";
		document.getElementById("in".concat(dir, "5")).style["border-radius"] =
			"20px";



	document.getElementById("in".concat("right", "1")).style["background-repeat"] =
		"no-repeat";
	document.getElementById("in".concat("right", "2")).style["background-repeat"] =
		"no-repeat";
	document.getElementById("in".concat("right", "3")).style["background-repeat"] =
		"no-repeat";
	document.getElementById("in".concat("right", "4")).style["background-repeat"] =
		"no-repeat";
	document.getElementById("in".concat("right", "5")).style["background-repeat"] =
		"no-repeat";
	document.getElementById("in".concat("right", "6")).style["background-repeat"] =
		"no-repeat";

}
function openmusicwide(dir2, indivcoll) {
	console.log("wide")
	if (dir == "left") {
		document.getElementById("right").style["z-index"] = "0";
		document.getElementById("left").style["z-index"] = "1";
	} else {
		document.getElementById("left").style["z-index"] = "0";
		document.getElementById("right").style["z-index"] = "1";
	}
	setTimeout(function () {
		clear(dir2, indivcoll);
		if (dir2 == "left") {
			leftcurpro = "music2";
			document.getElementById("right").style["transition"] = "1s";
			document.getElementById("right").style["left"] = "0px";
		} else {
			rightcurpro = "music2";

		}

		//getcurplay();
		if (dir2=="left"){
			var dir="right"
		}else{
			var dir="left"
		}
		//document.getElementById(dir.concat("div")).style["background-color"] = "";
		////document.getElementById(dir.concat("div")).style.backgroundColor = "black";

		//document.getElementById("in".concat(dir, "6")).style.position = "absolute";
		//document.getElementById("in".concat(dir, "6")).style.width = "640px";
		//document.getElementById("in".concat(dir, "6")).style.height = "400px";
		//document.getElementById("in".concat(dir, "6")).style.left = "0px";
		//document.getElementById("in".concat(dir, "6")).style.top = "0px";
		//document.getElementById("in".concat(dir, "6")).style["border-radius"] =
		//"50px";
		//document.getElementById("main2").style["filter"] =
		//"brightness(0.6)";
		//document.getElementById("main2").style["opacity"] =
		//".5";
		//document.getElementById("left").style["filter"] =
			//"brightness(1)";
		//document.getElementById("left").style["opacity"] =
			//"1";
		//document.getElementById("main2").style["background-size"] =
			//"130%";

		//document.getElementById("main2").style["background-position"] =
			//"0% center ";
		document.getElementById("in".concat(dir, "1")).style.transition = "1s";
		document.getElementById("main2").style.transition = "1s";
		document.getElementById(dir+"div").style['overflow'] = "visible";
		document.getElementById(dir).style['overflow'] = "visible";
		document.getElementById("in".concat(dir, "1")).style["transition-delay"] =
			".75s";
		document.getElementById("in".concat(dir, "1")).style.position = "absolute";
		document.getElementById("in".concat(dir, "1")).style.width = "300px";
		document.getElementById("in".concat(dir, "1")).style.height = "300px";
		//document.getElementById("inleft1").style.backgroundColor = "yellow";
		document.getElementById("in".concat(dir, "1")).style.left = "50px";
		document.getElementById("in".concat(dir, "1")).style.top = "50px";
		document.getElementById("in".concat(dir, "1")).style["border-radius"] =
			"40px";

		document.getElementById("in".concat(dir, "2")).style.position = "absolute";
		document.getElementById("in".concat(dir, "2")).style.width = "900px";
		document.getElementById("in".concat(dir, "2")).style.height = "1em";
		//document.getElementById("inleft2").style.backgroundColor = "yellow";
		document.getElementById("in".concat(dir, "2")).style.left = "370px";
		document.getElementById("in".concat(dir, "2")).style.top = "270px";
		document.getElementById("in".concat(dir, "2")).style["font-size"] = "40px";
		document.getElementById("in".concat(dir, "2")).style["font-family"] = font;
		document.getElementById("in".concat(dir, "2")).style["color"] = "white";
		document.getElementById("in".concat(dir, "2")).style["text-align"] = "left";
		document.getElementById("in".concat(dir, "2")).style["overflow"] = "hidden";
		document.getElementById("in".concat(dir, "2")).style["text-shadow"] = "0px 0px 5px black";
		//document.getElementById("in".concat(dir, "2")).innerHTML = "Joji - Nectar";
		document.getElementById("in".concat(dir, "2")).style["transition-delay"] =
			".5s";
		document.getElementById("in".concat(dir, "3")).style.position = "absolute";
		//document.getElementById("in".concat(dir, "3")).style.width = "580px";
		document.getElementById("in".concat(dir, "3")).style.height = "28px";
		document.getElementById("in".concat(dir, "3")).style.backgroundColor =
			"white";
		document.getElementById("in".concat(dir, "3")).style.opacity = ".7";
		document.getElementById("in".concat(dir, "3")).style.left = "370px";
		document.getElementById("in".concat(dir, "3")).style.top = "320px";
		document.getElementById("in".concat(dir, "3")).style["border-radius"] =
			"20px";


		document.getElementById("in".concat(dir, "7")).style.position = "absolute";
		//document.getElementById("in".concat(dir,"7")).style.width = "580px";
		document.getElementById("in".concat(dir, "7")).style.height = "28px";

		document.getElementById("in".concat(dir, "7")).style.backgroundColor =
			"white";
		document.getElementById("in".concat(dir, "7")).style.left = "370px";
		document.getElementById("in".concat(dir, "7")).style.top = "320px";
		document.getElementById("in".concat(dir, "7")).style["border-radius"] =
			"20px";
		document.getElementById("in".concat(dir, "7")).style["opacity"] =
			".5";


		document.getElementById("in".concat(dir, "4")).style.position = "absolute";
		document.getElementById("in".concat(dir, "4")).style.width = "850px";
		document.getElementById("in".concat(dir, "4")).style.height = "3em";
		//document.getElementById("inleft4").style.backgroundColor = "white";
		document.getElementById("in".concat(dir, "4")).style.left = "370px";
		document.getElementById("in".concat(dir, "4")).style.top = "30px";
		document.getElementById("in".concat(dir, "4")).style["font-size"] = "60px";
		document.getElementById("in".concat(dir, "4")).style["font-family"] = font;
		document.getElementById("in".concat(dir, "4")).style["color"] = "white";
		document.getElementById("in".concat(dir, "4")).style["text-align"] = "left";
		document.getElementById("in".concat(dir, "4")).style["overflow"] = "hidden";
		//document.getElementById("in".concat(dir, "4")).innerHTML =
			//"Currently, no music is playing222222222222 ."; //°
		document.getElementById("in".concat(dir, "4")).style["transition-delay"] =
			".5s";
		document.getElementById("in".concat(dir, "4")).style["text-shadow"] = "0px 0px 5px black";
		document.getElementById("in".concat(dir, "4")).style["line-height"] = "90px";
		//document.getElementById("inleft4").style["z-index"] = "-1";
		document.getElementById("in".concat(dir, "5")).style.position = "absolute";
		//document.getElementById("in".concat(dir, "5")).style.backgroundColor = "yellow";
		document.getElementById("in".concat(dir, "5")).style.width = "856px";
		document.getElementById("in".concat(dir, "5")).style.left = "370px";
		document.getElementById("in".concat(dir, "5")).style.top = "320px";
		document.getElementById("in".concat(dir, "5")).style["border-radius"] =
			"20px";
		document.getElementById("in".concat(dir, "5")).style["transition"] =
			".75s";
		document.getElementById("in".concat(dir, "5")).style["transition-timing-function"] =
			"linear";
		//document.getElementById("inleft4").style["z-index"] = "-1";
		//document.getElementById("in".concat(dir, "8")).style.position = "absolute";
		//document.getElementById("in".concat(dir, "8")).style.width = "50px";
		//document.getElementById("in".concat(dir, "8")).style.height = "24px";
		//document.getElementById("in".concat(dir, "8")).style.backgroundColor = "yellow";
		//document.getElementById("in".concat(dir, "8")).style.left = "556px";
		//document.getElementById("in".concat(dir, "8")).style.top = "320px";
		//document.getElementById("in".concat(dir, "8")).style.border ="2px solid white";
		//document.getElementById("in".concat(dir, "8")).style["border-radius"] =
		//"20px";
		//document.getElementById("in".concat(dir, "8")).style["background-image"] =
		//"url(https://i.imgur.com/mqmIdP2.png)";
		//document.getElementById("in".concat(dir, "8")).style["background-size"] =
		//"cover";

		var access_token = localStorage.getItem("access_token");
		if (access_token != "") {
		} else {
			getnewtoken();
		}
	}, 220);

	//background: radial-gradient(#e66465, #9198e5);
}
function openplaylist(dir, indivcoll) {

	//document.getElementById(dir.concat("div")).style["background-color"] = "";
	////document.getElementById(dir.concat("div")).style.backgroundColor = "black";
	if (dir == "left") {
		document.getElementById("right").style["z-index"] = "0";
		document.getElementById("left").style["z-index"] = "1";
	} else {
		document.getElementById("left").style["z-index"] = "0";
		document.getElementById("right").style["z-index"] = "1";
	}

	setTimeout(function () {
		clear(dir, indivcoll);
		if (inwork !=1){
			inwork=1
			if (dir == "left") {
			if(leftcurpro=="music2"){
				document.getElementById("right").style["transition"] = "0";
				document.getElementById("right").style["left"] = "648px";
				drawmusic("right",indivcol2)
				console.log("ye1")
			}else if(rightcurpro=="music2"){

				rightcurpro==""
				leftcurpro = "playlist";
				click("right", indivcol2);
				console.log("ye2")
			}
			leftcurpro = "playlist";

		} else if (dir=="right"){
			if(rightcurpro=="music2"){

				drawmusic("left",indivcol1)
				console.log("ye3")
			}else if(leftcurpro=="music2"){
				document.getElementById("right").style["transition"] = "0";
				document.getElementById("right").style["left"] = "648px";
				rightcurpro = "playlist";
				leftcurpro==""
				click("left", indivcol1);
				console.log("ye4")
			}
			rightcurpro = "playlist";

		}
			setTimeout(function () {
			inwork=0
			},600)
		}else{
			if (dir == "left") {

			leftcurpro = "playlist";

		} else if (dir=="right"){

			rightcurpro = "playlist";

		}
		}


		if (leftcurpro != "music"){
			if (rightcurpro !="music"){
				document.getElementById("main2").style["opacity"]= "0";
				console.log("music")
			}
		}
		i = 1;
		getcurplaylist();
		//playlistcallback();
		document.getElementById(dir.concat("div")).style["background-color"] = "";
		////document.getElementById(dir.concat("div")).style.backgroundColor = "black";

		document.getElementById("in".concat(dir, "1")).style.position = "absolute";
		document.getElementById("in".concat(dir, "1")).style.width = "150px";
		document.getElementById("in".concat(dir, "1")).style.height = "150px";
		//document.getElementById("inleft1").style.backgroundColor = "yellow";
		document.getElementById("in".concat(dir, "1")).style.left = "65px";
		document.getElementById("in".concat(dir, "1")).style.top = "35px";
		document.getElementById("in".concat(dir, "1")).style["border-radius"] =
			"20px";
		//document.getElementById("in".concat(dir, "1")).style["background-image"] =
		//"url(https://upload.wikimedia.org/wikipedia/en/thumb/1/1b/Joji_-_Nectar.png/220px-Joji_-_Nectar.png)";
		document.getElementById("in".concat(dir, "1")).style["background-size"] =
			"cover";
		document.getElementById("in".concat(dir, "1")).style['box-shadow'] = "0px 0px 20px 10px rgba(0, 0, 0, 0.3)";
		document.getElementById("in".concat(dir, "2")).style['box-shadow'] = "0px 0px 20px 10px rgba(0, 0, 0, 0.3)";
		document.getElementById("in".concat(dir, "3")).style['box-shadow'] = "0px 0px 20px 10px rgba(0, 0, 0, 0.3)";
		document.getElementById("in".concat(dir, "4")).style['box-shadow'] = "0px 0px 20px 10px rgba(0, 0, 0, 0.3)";
		document.getElementById("in".concat(dir, "5")).style['box-shadow'] = "0px 0px 20px 10px rgba(0, 0, 0, 0.3)";
		document.getElementById("in".concat(dir, "6")).style['box-shadow'] = "0px 0px 20px 10px rgba(0, 0, 0, 0.3)";
		document.getElementById("in".concat(dir, "2")).style.position = "absolute";
		document.getElementById("in".concat(dir, "2")).style.width = "150px";
		document.getElementById("in".concat(dir, "2")).style.height = "150px";
		document.getElementById("in".concat(dir, "2")).style.left = "245px";
		document.getElementById("in".concat(dir, "2")).style.top = "35px";
		document.getElementById("in".concat(dir, "2")).style["border-radius"] =
			"20px";
		//document.getElementById("in".concat(dir, "2")).style["background-image"] =
		//"url(https://upload.wikimedia.org/wikipedia/en/thumb/1/1b/Joji_-_Nectar.png/220px-Joji_-_Nectar.png)";
		document.getElementById("in".concat(dir, "2")).style["background-size"] =
			"cover";

		document.getElementById("in".concat(dir, "3")).style.position = "absolute";
		document.getElementById("in".concat(dir, "3")).style.width = "150px";
		document.getElementById("in".concat(dir, "3")).style.height = "150px";
		//document.getElementById("inleft1").style.backgroundColor = "yellow";
		document.getElementById("in".concat(dir, "3")).style.left = "425px";
		document.getElementById("in".concat(dir, "3")).style.top = "35px";
		document.getElementById("in".concat(dir, "3")).style["border-radius"] =
			"20px";
		//document.getElementById("in".concat(dir, "3")).style["background-image"] =
		//"url(https://upload.wikimedia.org/wikipedia/en/thumb/1/1b/Joji_-_Nectar.png/220px-Joji_-_Nectar.png)";
		document.getElementById("in".concat(dir, "3")).style["background-size"] =
			"cover";

		document.getElementById("in".concat(dir, "4")).style.position = "absolute";
		document.getElementById("in".concat(dir, "4")).style.width = "150px";
		document.getElementById("in".concat(dir, "4")).style.height = "150px";
		//document.getElementById("inleft1").style.backgroundColor = "yellow";
		document.getElementById("in".concat(dir, "4")).style.left = "65px";
		document.getElementById("in".concat(dir, "4")).style.top = "215px";
		document.getElementById("in".concat(dir, "4")).style["border-radius"] =
			"20px";
		//document.getElementById("in".concat(dir, "4")).style["background-image"] =
		//"url(https://upload.wikimedia.org/wikipedia/en/thumb/1/1b/Joji_-_Nectar.png/220px-Joji_-_Nectar.png)";
		document.getElementById("in".concat(dir, "4")).style["background-size"] =
			"cover";

		document.getElementById("in".concat(dir, "5")).style.position = "absolute";
		document.getElementById("in".concat(dir, "5")).style.width = "150px";
		document.getElementById("in".concat(dir, "5")).style.height = "150px";
		//document.getElementById("inleft1").style.backgroundColor = "yellow";
		document.getElementById("in".concat(dir, "5")).style.left = "245px";
		document.getElementById("in".concat(dir, "5")).style.top = "215px";
		document.getElementById("in".concat(dir, "5")).style["border-radius"] =
			"20px";
		//document.getElementById("in".concat(dir, "5")).style["background-image"] =
		//"url(https://upload.wikimedia.org/wikipedia/en/thumb/1/1b/Joji_-_Nectar.png/220px-Joji_-_Nectar.png)";
		document.getElementById("in".concat(dir, "5")).style["background-size"] =
			"cover";

		document.getElementById("in".concat(dir, "6")).style.position = "absolute";
		document.getElementById("in".concat(dir, "6")).style.width = "150px";
		document.getElementById("in".concat(dir, "6")).style.height = "150px";
		//document.getElementById("inleft1").style.backgroundColor = "yellow";
		document.getElementById("in".concat(dir, "6")).style.left = "425px";
		document.getElementById("in".concat(dir, "6")).style.top = "215px";
		document.getElementById("in".concat(dir, "6")).style["border-radius"] =
			"20px";
		//document.getElementById("in".concat(dir, "6")).style["background-image"] =
		//"url(https://upload.wikimedia.org/wikipedia/en/thumb/1/1b/Joji_-_Nectar.png/220px-Joji_-_Nectar.png)";
		document.getElementById("in".concat(dir, "6")).style["background-size"] =
			"cover";

		document.getElementById("in".concat(dir, "7")).style.position = "absolute";
		document.getElementById("in".concat(dir, "7")).style.width = "95px";
		document.getElementById("in".concat(dir, "7")).style.height = "95px";
		document.getElementById("in".concat(dir, "7")).style.backgroundColor =
			"rgba(255, 255, 255, 0.5)";
		document.getElementById("in".concat(dir, "7")).style.left = "377px";
		document.getElementById("in".concat(dir, "7")).style.top = "50px";
		document.getElementById("in".concat(dir, "7")).style["border-radius"] =
			"20px";
		document.getElementById("in".concat(dir, "7")).style["font-size"] = "30px";
		document.getElementById("in".concat(dir, "7")).style["font-family"] = font;
		document.getElementById("in".concat(dir, "7")).style["background-image"] =
			"url(https://i.imgur.com/X9H2Vhw.png)";
		document.getElementById("in".concat(dir, "7")).style["background-size"] =
			"cover";
		document.getElementById("in".concat(dir, "7")).style["opacity"] = "0";

		document.getElementById("in".concat(dir, "8")).style.position = "absolute";
		document.getElementById("in".concat(dir, "8")).style.width = "95px";
		document.getElementById("in".concat(dir, "8")).style.height = "95px";
		document.getElementById("in".concat(dir, "8")).style.backgroundColor =
			"rgba(255, 255, 255, 0.5)";
		document.getElementById("in".concat(dir, "8")).style.left = "377px";
		document.getElementById("in".concat(dir, "8")).style.top = "155px";
		document.getElementById("in".concat(dir, "8")).style["border-radius"] =
			"20px";
		document.getElementById("in".concat(dir, "8")).style["background-image"] =
			"url(https://i.imgur.com/2eHprva.png)";
		document.getElementById("in".concat(dir, "8")).style["background-size"] =
			"cover";
		document.getElementById("in".concat(dir, "8")).style["opacity"] = "0";

		document.getElementById("in".concat(dir, "9")).style.position = "absolute";
		document.getElementById("in".concat(dir, "9")).style.left = "157px";
		document.getElementById("in".concat(dir, "9")).style.top = "40px";
		document.getElementById("in".concat(dir, "9")).style.width ="325px";
		document.getElementById("in".concat(dir, "9")).style.height ="220px";
		document.getElementById("in".concat(dir, "9")).style.backgroundColor =
			"red";
		document.getElementById("in".concat(dir, "9")).style["border-radius"] =
			"25px";

		document.getElementById("in".concat(dir, "9")).style["opacity"] = "0";

		document.getElementById("in".concat(dir, "7")).style.transform =
			"scale(0,0) ";
		document.getElementById("in".concat(dir, "8")).style.transform =
			"scale(0,0) ";
		document.getElementById("in".concat(dir, "9")).style.transform =
			"scale(0,0) ";
	}, 220);
	//background: radial-gradient(#e66465, #9198e5);
}

var lenge=0;
var inwork=0
function openpodcast(dir, indivcoll) {
	if (dir == "left") {
		document.getElementById("right").style["z-index"] = "0";
		document.getElementById("left").style["z-index"] = "1";
	} else {
		document.getElementById("left").style["z-index"] = "0";
		document.getElementById("right").style["z-index"] = "1";
	}
	document.getElementById(dir.concat("div")).style["background-color"] = "";
	////document.getElementById(dir.concat("div")).style.backgroundColor = "black";
	setTimeout(function () {
		clear(dir, indivcoll);
		if (inwork !=1){
			inwork=1
			if (dir == "left") {
			if(leftcurpro=="music2"){
				document.getElementById("right").style["transition"] = "0";
				document.getElementById("right").style["left"] = "648px";
				drawmusic("right",indivcol2)
				console.log("ye1")
			}else if(rightcurpro=="music2"){

				rightcurpro==""
				leftcurpro = "podcast";
				click("right", indivcol2);
				console.log("ye2")
			}
			leftcurpro = "podcast";

		} else if (dir=="right"){
			if(rightcurpro=="music2"){

				drawmusic("left",indivcol1)
				console.log("ye3")
			}else if(leftcurpro=="music2"){
				document.getElementById("right").style["transition"] = "0";
				document.getElementById("right").style["left"] = "648px";
				rightcurpro = "podcast";
				leftcurpro==""
				click("left", indivcol1);
				console.log("ye4")
			}
			rightcurpro = "podcast";

		}
			setTimeout(function () {
			inwork=0
			},600)
		}else{
			if (dir == "left") {

			leftcurpro = "podcast";

		} else if (dir=="right"){

			rightcurpro = "podcast";

		}
		}
		if (leftcurpro != "music"){
			if (rightcurpro !="music"){
				document.getElementById("main2").style["opacity"]= "0";
				console.log("music")
			}
		}
		//console.log("podcastrun");
		i = 1;

		getcurpodcast();
		//podcastcallback();
		////document.getElementById(dir.concat("div")).style.backgroundColor = "black";

		document.getElementById("in".concat(dir, "1")).style.position = "absolute";
		document.getElementById("in".concat(dir, "1")).style.width = "100px";
		document.getElementById("in".concat(dir, "1")).style.height = "100px";
		//document.getElementById("inleft1").style.backgroundColor = "yellow";
		document.getElementById("in".concat(dir, "1")).style.left = "40px";
		document.getElementById("in".concat(dir, "1")).style.top = "25px";
		document.getElementById("in".concat(dir, "1")).style["border-radius"] =
			"15px";
		//document.getElementById("in".concat(dir, "1")).style["background-image"] =
		//"url(https://upload.wikimedia.org/wikipedia/en/thumb/1/1b/Joji_-_Nectar.png/220px-Joji_-_Nectar.png)";
		document.getElementById("in".concat(dir, "1")).style["background-size"] =
			"cover";


		document.getElementById("in".concat(dir, "2")).style.position = "absolute";
		document.getElementById("in".concat(dir, "2")).style.width = "100px";
		document.getElementById("in".concat(dir, "2")).style.height = "100px";
		//document.getElementById("inleft1").style.backgroundColor = "yellow";
		document.getElementById("in".concat(dir, "2")).style.left = "40px";
		document.getElementById("in".concat(dir, "2")).style.top = "150px";
		document.getElementById("in".concat(dir, "2")).style["border-radius"] =
			"15px";
		//document.getElementById("in".concat(dir, "2")).style["background-image"] =
		//"url(https://upload.wikimedia.org/wikipedia/en/thumb/1/1b/Joji_-_Nectar.png/220px-Joji_-_Nectar.png)";
		document.getElementById("in".concat(dir, "2")).style["background-size"] =
			"cover";

		document.getElementById("in".concat(dir, "3")).style.position = "absolute";
		document.getElementById("in".concat(dir, "3")).style.width = "100px";
		document.getElementById("in".concat(dir, "3")).style.height = "100px";
		//document.getElementById("inleft1").style.backgroundColor = "yellow";
		document.getElementById("in".concat(dir, "3")).style.left = "40px";
		document.getElementById("in".concat(dir, "3")).style.top = "275px";
		document.getElementById("in".concat(dir, "3")).style["border-radius"] =
			"15px";
		//document.getElementById("in".concat(dir, "3")).style["background-image"] =
		//"url(https://upload.wikimedia.org/wikipedia/en/thumb/1/1b/Joji_-_Nectar.png/220px-Joji_-_Nectar.png)";
		document.getElementById("in".concat(dir, "3")).style["background-size"] =
			"cover";


		document.getElementById("in".concat(dir, "4")).style.position = "absolute";
		document.getElementById("in".concat(dir, "4")).style.width = "570px";
		document.getElementById("in".concat(dir, "4")).style.height = "110px";
		//document.getElementById("inleft1").style.backgroundColor = "yellow";
		document.getElementById("in".concat(dir, "4")).style.left = "35px";
		document.getElementById("in".concat(dir, "4")).style.top = "20px";
		document.getElementById("in".concat(dir, "4")).style["border-radius"] =
			"18px";

		document.getElementById("in".concat(dir, "4")).style["background-size"] =
			"cover";
		document.getElementById("in".concat(dir, "4")).style.background =
			"linear-gradient(240deg, rgba(0, 0, 0, .1) 45%, rgba(0, 0, 0, 1) 100%)";
		//document.getElementById("in".concat(dir, "4")).style["filter"] =
		//"blur(10px)";
		document.getElementById("in".concat(dir, "5")).style.position = "absolute";
		document.getElementById("in".concat(dir, "5")).style.width = "570px";
		document.getElementById("in".concat(dir, "5")).style.height = "110px";
		//document.getElementById("inleft1").style.backgroundColor = "yellow";
		document.getElementById("in".concat(dir, "5")).style.left = "35px";
		document.getElementById("in".concat(dir, "5")).style.top = "145px";
		document.getElementById("in".concat(dir, "5")).style["border-radius"] =
			"18px";

		document.getElementById("in".concat(dir, "5")).style["background-size"] =
			"cover";
		document.getElementById("in".concat(dir, "5")).style.background =
			"linear-gradient(270deg, rgba(0, 0, 0, .1) 40%, rgba(0, 0, 0, 1) 100%)";
		//document.getElementById("in".concat(dir, "5")).style["filter"] =
		//"blur(10px)";
		document.getElementById("in".concat(dir, "6")).style.position = "absolute";
		document.getElementById("in".concat(dir, "6")).style.width = "570px";
		document.getElementById("in".concat(dir, "6")).style.height = "110px";
		//document.getElementById("inleft1").style.backgroundColor = "yellow";
		document.getElementById("in".concat(dir, "6")).style.left = "35px";
		document.getElementById("in".concat(dir, "6")).style.top = "270px";

		document.getElementById("in".concat(dir, "6")).style["border-radius"] =
			"18px";

		document.getElementById("in".concat(dir, "6")).style["background-size"] =
			"cover";
		document.getElementById("in".concat(dir, "6")).style.background =
			"linear-gradient(300deg, rgba(0, 0, 0, .1) 45%, rgba(0, 0, 0, 1) 100%)";

		document.getElementById("in".concat(dir, "7")).style.width = "20px";
		document.getElementById("in".concat(dir, "7")).style.height = "20px";
		document.getElementById("in".concat(dir, "7")).style['border-radius'] = "10px";
		document.getElementById("in".concat(dir, "7")).style.position = "absolute";
		document.getElementById("in".concat(dir, "7")).style.left = "125px";
		document.getElementById("in".concat(dir, "7")).style.top = "20px";
		document.getElementById("in".concat(dir, "7")).style.backgroundColor = "red";
		document.getElementById("in".concat(dir, "7")).style.opacity = "0";

		document.getElementById("in".concat(dir, "8")).style.width = "20px";
		document.getElementById("in".concat(dir, "8")).style.height = "20px";
		document.getElementById("in".concat(dir, "8")).style['border-radius'] = "10px";
		document.getElementById("in".concat(dir, "8")).style.position = "absolute";
		document.getElementById("in".concat(dir, "8")).style.left = "125px";
		document.getElementById("in".concat(dir, "8")).style.top = "145px";
		document.getElementById("in".concat(dir, "8")).style.backgroundColor = "red";
		document.getElementById("in".concat(dir, "8")).style.opacity = "0";

		document.getElementById("in".concat(dir, "9")).style.width = "20px";
		document.getElementById("in".concat(dir, "9")).style.height = "20px";
		document.getElementById("in".concat(dir, "9")).style['border-radius'] = "10px";
		document.getElementById("in".concat(dir, "9")).style.position = "absolute";
		document.getElementById("in".concat(dir, "9")).style.left = "125px";
		document.getElementById("in".concat(dir, "9")).style.top = "270px";
		document.getElementById("in".concat(dir, "9")).style.backgroundColor = "red";
		document.getElementById("in".concat(dir, "9")).style.opacity = "0";
		//document.getElementById("in".concat(dir, "6")).style["filter"] =
		//"blur(10px)";

		}, 220);
	//background: radial-gradient(#e66465, #9198e5);
}
function openac(dir, indivcoll) {
	////document.getElementById(dir.concat("div")).style.backgroundColor = "black";
	if (dir == "left") {
		document.getElementById("right").style["z-index"] = "0";
		document.getElementById("left").style["z-index"] = "1";
	} else {
		document.getElementById("left").style["z-index"] = "0";
		document.getElementById("right").style["z-index"] = "1";
	}

	setTimeout(function () {
		clear(dir, indivcoll);
		if (dir == "left") {
			leftcurpro = "ac";
		} else {
			rightcurpro = "ac";
		}
		if (leftcurpro != "music"){
			if (rightcurpro !="music"){
				document.getElementById("main2").style["opacity"]= "0";
				console.log("ac")
			}
		}
		//console.log("acrun");
		//document.getElementById("inleft1").style["background-color"] = "black";
		document.getElementById("in".concat(dir, "1")).style["width"] = "200px";
		document.getElementById("in".concat(dir, "1")).style["height"] = "200px";
		document.getElementById("in".concat(dir, "1")).style["left"] = "350px";
		document.getElementById("in".concat(dir, "1")).style["top"] = "50px";
		document.getElementById("in".concat(dir, "1")).style["font-size"] = "150px";
		document.getElementById("in".concat(dir, "1")).style["font-family"] = font;
		document.getElementById("in".concat(dir, "1")).style["color"] = "white";
		document.getElementById("in".concat(dir, "1")).style["text-align"] = "center";
		document.getElementById("in".concat(dir, "1")).style["padding"] = "50px";
		document.getElementById("in".concat(dir, "1")).style["border-radius"] =
			"10px";
		document.getElementById("in".concat(dir, "1")).innerHTML = "69"; //°
		document.getElementById("in".concat(dir, "1")).style["background"] =
			"radial-gradient(circle, rgba(9,9,121,1) 0%, rgba(0,212,255,0) 70%)";

		document.getElementById("in".concat(dir, "2")).style.position = "absolute";
		document.getElementById("in".concat(dir, "2")).style.width = "300px";
		document.getElementById("in".concat(dir, "2")).style.height = "100px";
		document.getElementById("in".concat(dir, "2")).style["background"] =
			"linear-gradient(29deg, rgba(54,50,111,1) 0%, rgba(6,4,70,0.7063200280112045) 68%, rgba(9,9,121,0) 100%)";
		document.getElementById("in".concat(dir, "2")).style.left = "30px";
		document.getElementById("in".concat(dir, "2")).style.top = "80px";
		document.getElementById("in".concat(dir, "2")).style["border-radius"] =
			"20px";

		document.getElementById("in".concat(dir, "3")).style.position = "absolute";
		document.getElementById("in".concat(dir, "3")).style.width = "300px";
		document.getElementById("in".concat(dir, "3")).style.height = "100px";
		document.getElementById("in".concat(dir, "3")).style["background"] =
			"linear-gradient(120deg, rgba(54,50,111,1) 0%, rgba(6,4,70,0.7063200280112045) 68%, rgba(9,9,121,0) 100%)";
		document.getElementById("in".concat(dir, "3")).style.left = "30px";
		document.getElementById("in".concat(dir, "3")).style.top = "220px";
		document.getElementById("in".concat(dir, "3")).style["border-radius"] =
			"20px";
	}, 220);
}
function playlistclick(dir, id) {
	if (id >= 0 && id <= 6) {
		idclicked = id+1;
		id=id+1
		var i2=1;
		//if (id==0){
		//id=6
		//}

		insideloop(i2,dir,id)
		//console.log(id)
		document.getElementById("in".concat(dir, id)).style["z-index"] = "2";
		if (id !=2){
			selecid=2

		}else{
			selecid=1
		}

		setTimeout(function () {
			document.getElementById("in".concat(dir, selecid)).style['transition'] = "0s";
			if (document.getElementById("in".concat(dir, selecid)).style['background-image'] != ""){
				previcon =document.getElementById("in".concat(dir, selecid)).style['background-image'];
			}


			document.getElementById("in".concat(dir, selecid)).style['background-image'] = "";
			document.getElementById("in".concat(dir, selecid)).style['width'] = "440px";
			document.getElementById("in".concat(dir, selecid)).style['height'] = "80px";
			document.getElementById("in".concat(dir, selecid)).style['left'] = "100px";
			document.getElementById("in".concat(dir, selecid)).style['top'] = "0px";
			document.getElementById("in".concat(dir, selecid)).style["font-size"] = "40px";
			document.getElementById("in".concat(dir, selecid)).style["font-family"] = font;
			document.getElementById("in".concat(dir, selecid)).style["color"] = "white";
			document.getElementById("in".concat(dir, selecid)).style["text-align"] = "center";
			document.getElementById("in".concat(dir, selecid)).style["overflow"] = "hidden";
			document.getElementById("in".concat(dir, selecid)).style['text-overflow'] = "ellipsis";
			document.getElementById("in".concat(dir, selecid)).style['display'] = "-webkit-box";
			document.getElementById("in".concat(dir, selecid)).style['-webkit-box-orient'] = "vertical";
			document.getElementById("in".concat(dir, selecid)).style['-webkit-line-clamp'] = 2;
			document.getElementById("in".concat(dir, selecid)).style['overflow'] = "hidden";
			document.getElementById("in".concat(dir, selecid)).style['z-index'] = "0";
			document.getElementById("in".concat(dir, selecid)).style["border"] = "0px";
			document.getElementById("in".concat(dir, selecid)).style["box-shadow"] = "0 0 0pt 0pt";
			setTimeout(function () {

				document.getElementById("in".concat(dir, selecid)).style['transition-duration'] = "1s,1.5s,1.3s";
				document.getElementById("in".concat(dir, selecid)).style['transition-delay'] = "0s,0s,0s";
				document.getElementById("in".concat(dir, selecid)).style["transition-property"] = "top,opacity,transform";
				document.getElementById("in".concat(dir, selecid)).style.transform = "scale(1,1) ";
				document.getElementById("in".concat(dir, selecid)).style.opacity = "1";
				//document.getElementById("in".concat(dir, "2")).style['left'] = "100px";
				document.getElementById("in".concat(dir, selecid)).style['top'] = "280px";

				document.getElementById("in".concat(dir, selecid)).innerHTML = playlistname[id];
			}, 400);
			document.getElementById("in".concat(dir, "7")).style.transform = "scale(1,1) ";
			document.getElementById("in".concat(dir, "7")).style['box-sizing'] = "border-box";
			document.getElementById("in".concat(dir, "7")).style["border"] = "5px solid rgba(0, 0, 0, .3)";
			//console.log("ye")

			document.getElementById("in".concat(dir, "7")).style["box-shadow"] = "0 0 0pt 2pt white";

			document.getElementById("in".concat(dir, "8")).style.transform = "scale(1,1) ";
			document.getElementById("in".concat(dir, "9")).style.transform = "scale(1,1) ";
			document.getElementById("in".concat(dir, "9")).style['background-image'] = document.getElementById("in".concat(dir, id)).style['background-image'];
			document.getElementById("in".concat(dir, "9")).style["background-size"] = "100000%";
			document.getElementById("in".concat(dir, "9")).style["background-position"] = "center";
			document.getElementById("in".concat(dir, id)).style['background-image']
			if (document.getElementById("in".concat(dir, id)).style.left!= "167px"){
				prevleft =	document.getElementById("in".concat(dir, id)).style.left
				prevtop =	document.getElementById("in".concat(dir, id)).style.top
			}

			//console.log(prevleft)
			document.getElementById("in".concat(dir, id)).style.transition = ".7s";

			document.getElementById("in".concat(dir, id)).style.width = "200px";
			document.getElementById("in".concat(dir, id)).style.height = "200px";
			document.getElementById("in".concat(dir, id)).style["border"] = "0px";
			document.getElementById("in".concat(dir, id)).style['box-shadow'] = "0px 0px 20px 10px rgba(0, 0, 0, 0.3)";
			document.getElementById("in".concat(dir, id)).style.left = "167px";
			document.getElementById("in".concat(dir, id)).style.top = "50px";
			document.getElementById("in".concat(dir, "7")).style["z-index"] = "2";
			document.getElementById("in".concat(dir, "8")).style["z-index"] = "2";

			setTimeout(function () {
				document.getElementById("in".concat(dir, "8")).style["transition"] = "1s";
				document.getElementById("in".concat(dir, "7")).style["transition"] = "1s";
				document.getElementById("in".concat(dir, "9")).style["transition"] = "1s";
				document.getElementById("in".concat(dir, "7")).style.opacity = "1";
				document.getElementById("in".concat(dir, "8")).style.opacity = "1";
				document.getElementById("in".concat(dir, "9")).style["opacity"] = "1";
			}, 200);
		}, 500);
		if (dir =="left"){
			selection=0
			leftcurpro="playlistmenu"

		}else{
			selection=0
			rightcurpro="playlistmenu"

		}

	}

}
function playlistmenuclick(dir, id) {
	//console.log(id)
	//if (id== 0){
	//id = 3
	//}
	id=id+1
	id=id+6
	//console.log('test')
	if (id >6){
		//console.log('starting')
		//console.log(selecid)
		document.getElementById("in".concat(dir, "7")).style.opacity = "0";
		document.getElementById("in".concat(dir, "8")).style.opacity = "0";
		document.getElementById("in".concat(dir, "9")).style.opacity = "0";
		document.getElementById("in".concat(dir, id)).style["border"] = "0px";
		document.getElementById("in".concat(dir, id)).style["box-shadow"] = "0 0 0pt 0pt";

		//console.log(prevleft)

		document.getElementById("in".concat(dir, idclicked)).style.width = "150px";
		document.getElementById("in".concat(dir, idclicked)).style.height = "150px";
		document.getElementById("in".concat(dir, idclicked)).style.left = prevleft;
		document.getElementById("in".concat(dir, idclicked)).style.top = prevtop;
		document.getElementById("in".concat(dir, idclicked)).style["border"] = "0px";
		document.getElementById("in".concat(dir, idclicked)).style["box-shadow"] = "0 0 0pt 0pt";

		setTimeout(function () {
			document.getElementById("in".concat(dir, "8")).style["transition"] = "0s";
			document.getElementById("in".concat(dir, "7")).style["transition"] = "0s";

			//console.log("ye")

			document.getElementById("in".concat("right", selecclickables[selection])).style["box-shadow"] = "0 0 0pt 2pt white";
			document.getElementById("in".concat(dir, "9")).style["transition"] = "0s";
			document.getElementById("in".concat(dir, "7")).style.transform =
				"scale(0,0) ";
			document.getElementById("in".concat(dir, "8")).style.transform =
				"scale(0,0) ";
			document.getElementById("in".concat(dir, "9")).style.transform =
				"scale(0,0) ";
		}, 1000);
		i2=6;

		document.getElementById("in".concat(dir, selecid)).style['transition'] = ".5s";
		document.getElementById("in".concat(dir, selecid)).style.opacity = "0";






		setTimeout(function () {
			document.getElementById("in".concat(dir, selecid)).style['display'] = "";
			document.getElementById("in".concat(dir, selecid)).style['transition'] = "0s";
			document.getElementById("in".concat(dir, selecid)).style['background-image'] = previcon;
			document.getElementById("in".concat(dir, selecid)).style['width'] = "150px";
			document.getElementById("in".concat(dir, selecid)).style['height'] = "150px";
			document.getElementById("in".concat(dir, selecid)).innerHTML = "";
			document.getElementById("in".concat(dir, selecid)).style.transform =
				"scale(.8,.8) ";

			if (selecid==2){
				document.getElementById("in".concat(dir, "2")).style.left = "245px";
				document.getElementById("in".concat(dir, "2")).style.top = "35px";
			}else{
				document.getElementById("in".concat(dir, "1")).style.left = "65px";
				document.getElementById("in".concat(dir, "1")).style.top = "35px";
			}
			var i5=0
			while (i5 < 6){
				i5++
				if (i5 !=idclicked){
					console.log(i5)
					document.getElementById("in".concat(dir, i5)).style.transform =
						"scale(.8,.8) ";
					document.getElementById("in".concat(dir, i5)).style['transition-duration'] = "0s";
				}



			}
			exitloop(i2,dir,id)
		}, 500);





		if (id == 7) {
			spotifyApi.getUserPlaylists().then(
				function (data) {
					//console.log('User Now Play',data),
					console.log(playlistop);
					var data55 = playlistop[idclicked];
					var context_uri;

					curplaylist = spotifyApi.getPlaylist(data55).then(function (data) {
						console.log(data.uri);
						context_uri = data.uri;
						spotifyApi.getMyDevices().then(function (data, data2) {
							console.log(data);
							//console.log(data.devices[1].is_active)
							let i = 0;

							while (i < data.devices.length) {
								if (data.devices[i].is_active == true) {
									console.log(data.devices[i].id);
									var deviceIds = [data.devices[i].id];
									var options = { deviceIds: deviceIds};
									spotifyApi.setShuffle(true, options).then(
										function (data) {
											var options = { deviceIds: deviceIds, context_uri: context_uri };
											//spotifyApi.transferMyPlayback(deviceIds).then(function (data) {
											spotifyApi.play(options).then(function (data, data2) {
												console.log(data);
												//console.log(data2)
												//});
												//console.log(data);
											});
										})

								}
								i++;
							}
							i = 0;
						});
					});

					//playliststylee(data, dir3);
				},
				function (err) {
					console.error(err);
					getnewtoken();
				}
			);
		}
		if (id == 8) {

			//getnewtoken();
			spotifyApi.getUserPlaylists().then(function (data) {
				//console.log('User Now Play',data),
				console.log(playlistop);
				var data55 = playlistop[idclicked];
				var context_uri;
				curplaylist = spotifyApi.getPlaylist(data55).then(function (data) {
					console.log(data.uri);
					context_uri = [data.id];
					var prevsongurijson = [prevsonguri];
					console.log(prevsonguri);
					spotifyApi
						.addTracksToPlaylist(context_uri, prevsongurijson)
						.then(function (data) {
						console.log(data);
					});
				});
			});
		}
		if (dir =="left"){
			selection=0
			leftcurpro="playlist"

		}else{
			selection=0
			rightcurpro="playlist"

		}
	}

}
function exitloop(i2,dir,id) {
	var wait=0;
	if (i2 !=id){

		document.getElementById("in".concat(dir, i2)).style.transform ="scale(1,1) ";
		document.getElementById("in".concat(dir, i2)).style['transition-duration'] = ".7s,.7s";
		document.getElementById("in".concat(dir, i2)).style['transition-delay'] = "0s,0s";
		document.getElementById("in".concat(dir, i2)).style["transition-property"] = "transform,opacity";
		document.getElementById("in".concat(dir, i2)).style.opacity = "1";
		wait=200;
	}
	i2--
	if (i2 >0){
		setTimeout(function () {
			console.log("the thing")
			exitloop(i2,dir,id)
		}, wait);
	}
}
var blocker=false;
var blocker2=true;
function exitloop2(i2,dir,data) {
	var wait=200
	var i =i2
	var dir3=dir
	//console.log(curmaxplaylist)
	if(typeof data.items[curmaxplaylist] != 'undefined'){
		document.getElementById("in".concat("right", i2)).style["background-position"] =
			"center";
		document.getElementById("in".concat("right", i2)).style["z-index"] = "2";
		if (typeof bigimage[curmaxplaylist] == 'undefined'){
			//document.getElementById("in".concat(dir3, i2)).style["display"] = "none";
			bigimage[curmaxplaylist] = new Image();
			bigimage[curmaxplaylist].src=data.items[curmaxplaylist].images[0].url;
			i11[i2]=[i2]
		}else{
			//curmaxplaylist
			console.log("HEY"+curmaxplaylist)
			console.log("HEY2 "+i2)
			document.getElementById("in".concat("right", i2)).style["background-image"] = "url("+$(this).attr("src")+")";
			document.getElementById("in".concat("right", i2)).style.transform ="scale(1,1) ";
			document.getElementById("in".concat("right", i2)).style['transition-duration'] = ".7s,.4s,0s";
			document.getElementById("in".concat("right", i2)).style['transition-delay'] = "0s,0s,0s";
			document.getElementById("in".concat("right", i2)).style["transition-property"] = "transform,opacity,background-image";
			document.getElementById("in".concat("right", i2)).style.opacity = "1";
			document.getElementById("in".concat("right", i2)).style["background-image"] = "url("+bigimage[curmaxplaylist].src+")";
			playlistname[i2] = data.items[curmaxplaylist].name;
			playlistop[i2] = data.items[curmaxplaylist].id;
		}
		$(bigimage[curmaxplaylist]).on('load',function(){
			//console.log(i11)
			//$("#in".concat(dir3, i11[i22])).css("background-image","url("+$(this).attr("src")+")");
			document.getElementById("in".concat("right", i2-1)).style["background-image"] = "url("+$(this).attr("src")+")";
			document.getElementById("in".concat("right", i2-1)).style.transform ="scale(1,1) ";
			document.getElementById("in".concat("right", i2-1)).style['transition-duration'] = ".7s,.4s";
			document.getElementById("in".concat("right", i2-1)).style['transition-delay'] = "0s,0s";
			document.getElementById("in".concat("right", i2-1)).style["transition-property"] = "transform,opacity";
			document.getElementById("in".concat("right", i2-1)).style.opacity = "1";
			i22++
		});

		playlistname[i2] = data.items[curmaxplaylist].name;
		playlistop[i2] = data.items[curmaxplaylist].id;
		curmaxplaylist++;
	}else{
		document.getElementById("in".concat("right", i2)).style["background-image"] = "";
		curmaxplaylist++;
		playlistname[i2] = "";
		playlistop[i2] = "";
		blocker=true;
	}

	i2++

	if (i2 <=6){
		setTimeout(function () {

			exitloop2(i2,dir,data)

		}, wait);
	}else{
		blocker2=false
		console.log("BLOCKER")
	}




}
function insideloop(i2,dir,id) {
	var wait=0;
	if (i2 !=id){

		document.getElementById("in".concat(dir, i2)).style.transform =
			"scale(0,0) ";
		document.getElementById("in".concat(dir, i2)).style['transition-duration'] = "2s,.7s";
		document.getElementById("in".concat(dir, i2)).style["transition-property"] = "transform,opacity";
		document.getElementById("in".concat(dir, i2)).style.opacity = "0";
		wait=200


	}

	i2++
	if (i2 <=6){
		setTimeout(function () {

			insideloop(i2,dir,id)

		}, wait);
	}else{



	}



}
function insideloop2(i2,dir,data) {



	//console.log(i2)
	var wait=200
	var i =i2
	var dir3=dir
	//console.log(curmaxplaylist)
	if(typeof data.items[curmaxplaylist] != 'undefined'){
		document.getElementById("in".concat("right", i2)).style["background-position"] =
			"center";
		document.getElementById("in".concat("right", i2)).style["z-index"] = "2";

		document.getElementById("in".concat("right", i2)).style.transform ="scale(0,0) ";
		document.getElementById("in".concat("right", i2)).style['transition-duration'] = ".7s,.4s,0s";
		document.getElementById("in".concat("right", i2)).style['transition-delay'] = "0s,0s,.7s";
		document.getElementById("in".concat("right", i2)).style["transition-property"] = "transform,opacity,background-image";
		document.getElementById("in".concat("right", i2)).style.opacity = "0";
		document.getElementById("in".concat("right", i2)).style["background-image"] = "url("+bigimage[curmaxplaylist].src+")";
		playlistname[i2] = data.items[curmaxplaylist].name;
		playlistop[i2] = data.items[curmaxplaylist].id;
		curmaxplaylist--;
	}else{
		document.getElementById("in".concat("right", i2)).style["background-image"] = "";
		document.getElementById("in".concat("right", i2)).style["border"] = "5px solid rgba(0, 0, 0, .0)";
		document.getElementById("in".concat("right", i2)).style["box-shadow"] = "0 0 0pt 0pt white";
		curmaxplaylist--;
		playlistname[i2] = "";
		playlistop[i2] = "";
		console.log(":ye")
		blocker2=true;

	}



	i2--
	if (i2 >0){
		setTimeout(function () {
			//console.log("CURMAX"+curmaxplaylist)

			insideloop2(i2,dir,data)

		}, wait);
	}else{
		blocker=false
		console.log("BLOCKER")
	}
}
function podcastclick(dir, id) {
	//console.log("red")
	id=id+1
	//if (id===0){
	//id = 3
	//}
	//console.log(podcastop[id]);
	if (id >= 0 && id <= 3) {
		idclicked = id;
		document.getElementById("in".concat(dir, idclicked)).style.opacity = "1";
		document.getElementById("in".concat(dir, idclicked)).style["transition-timing-function"] =
			"ease-out";
		document.getElementById("in".concat(dir, idclicked)).style.transition =
			".5s";
		document.getElementById("in".concat(dir, idclicked)).style.transform =
			"scale(1.5,1.5) ";
		var vart = document.getElementById("in".concat(dir, idclicked+6)).style["opacity"];
		if (vart == "1"){
			document.getElementById("in".concat(dir, idclicked+6)).style["transition-delay"] = "0s"
			document.getElementById("in".concat(dir, idclicked+6)).style["transition"] = ".9"
			document.getElementById("in".concat(dir, idclicked+6)).style["opacity"] = "0"


		}

		setTimeout(function () {
			document.getElementById("in".concat(dir, idclicked)).style["transition-timing-function"] =
				"ease-in";
			document.getElementById("in".concat(dir, idclicked)).style.transform =
				"scale(1,1) ";
			if (vart == "1"){
				document.getElementById("in".concat(dir, idclicked+6)).style["transition-delay"] = ".5s"
				document.getElementById("in".concat(dir, idclicked+6)).style["opacity"] = "1"
			}
		},500)
		spotifyApi.getMyDevices().then(function (data, data2) {
			let i = 0;

			while (i < data.devices.length) {
				if (data.devices[i].is_active == true) {
					var deviceIds = [data.devices[i].id];
					var context_uri= [podcastop[id-1]];
					//console.log(context_uri)
					var options2 = { deviceIds: deviceIds, uris: context_uri };
					spotifyApi.play(options2).then(function (data) {
						//console.log(data);
					});
				}
				i++;
			}
			i = 0;
		});

	}

}
