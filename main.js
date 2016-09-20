var delay = 300;
var minmove = 255;
var disk1 = new Array(null,null,null,null,null,null,null,null);
var disk2 = new Array(null,null,null,null,null,null,null,null);
var disk3 = new Array(null,null,null,null,null,null,null,null);
var disks = new Array(disk1,disk2,disk3);
var offsetleft = 30;
var offsettop = 30;
var offsettower = 20;
var offsethoriz = 30;
var basetop = 0;
var diskheight = 0;
var midhoriztower = 0;
var indexTo=1;
var indexFr=1;
var movectr=0;
var prevIndex=0;
var zindex = 0;
var currTower=1;
var prevTower=1;
var arrFr = new Array(255);
var arrTo = new Array(255);
var idx = 0;
var pos = 0;

function init(){
	if (document.getElementById){
		var diskno = document.hanoi.diskno;
		diskno.options.selectedIndex = 0;
		drawTowers();
		drawDisks(parseInt(diskno.options[diskno.options.selectedIndex].text)); 
	}
}

function initVars(){
	for (var i=0;i<disk1.length;i++){
		disk1[i]=null;
		disk2[i]=null;
		disk3[i]=null;
	}
	indexTo = 1;
	indexFr = 1;
	movectr = 0;
	zindex = 0;
	idx = 0;
	pos = 0;
}

function drawTowers(){
	var title=document.getElementById("title");
	var tower1=document.getElementById("tower1");
	var tower2=document.getElementById("tower2");
	var tower3=document.getElementById("tower3");
	var settings=document.getElementById("settings");
	var titlewidth = parseInt(title.style.width);
	var titleheight = parseInt(title.style.height); 
	var towerwidth = parseInt(tower1.style.width);
	var towerheight = parseInt(tower1.style.height);
	var settingswidth = parseInt(settings.style.width);
	midhoriztower = parseInt(document.getElementById("horiztower1").style.width)/2;
	diskheight = parseInt(document.getElementById("disk1").style.height);

	title.style.left=offsetleft+(1.5*towerwidth)+offsettower-(titlewidth/2)+"px";
	title.style.top=offsettop+"px";
	tower1.style.left=offsetleft+"px";
	tower1.style.top=offsettop+titleheight+offsethoriz+"px";
	tower2.style.left=offsetleft+towerwidth+offsettower+"px";
	tower2.style.top=offsettop+titleheight+offsethoriz+"px";
	tower3.style.left=offsetleft+(towerwidth+offsettower)*2+"px";
	tower3.style.top=offsettop+titleheight+offsethoriz+"px";
	settings.style.left=offsetleft+(1.5*towerwidth)+offsettower-(settingswidth/2)+"px";
	settings.style.top=parseInt(tower1.style.top)+towerheight+offsethoriz+"px";
}

function drawDisks(disknum){
	var tower1=document.getElementById("tower1");
	var disktop = parseInt(tower1.style.top)+parseInt(document.getElementById("horiztower1").style.top);
	var lefttower1 = parseInt(tower1.style.left);
	var disk;
	var f=document.hanoi;
	basetop = disktop;
	for (var i=disk1.length;i>=1;i--){
		disk = document.getElementById("disk"+i);
		disk.style.zIndex=++zindex; 
		if (i<=disknum){
			disk.style.left=lefttower1+midhoriztower-parseInt(disk.style.width)/2+"px";
			disk.style.top=disktop-diskheight-1+"px";
			disktop = parseInt(disk.style.top);
			disks[0][i-1]=disk;
		} 
		else {
			disk.style.left="-250px";
			disk.style.top="-250px";
			disks[0][i-1]=null;
		}
	} 
	minmove=f.diskno.options[f.diskno.options.selectedIndex].value;
}


function pushDisk(disk,index){
	var diskWidth = parseInt(disk.style.width);
	var towerLeft = parseInt(document.getElementById("tower"+index).style.left);
	var topDisk = disks[index-1][0];
	if (topDisk!=null){
		topDiskWidth = parseInt(topDisk.style.width);
		topDiskTop = parseInt(topDisk.style.top);
		disk.style.left=towerLeft+midhoriztower-diskWidth/2+"px";
		disk.style.top=topDiskTop-diskheight-1+"px";
	}
	else {
		disk.style.left=towerLeft+midhoriztower-diskWidth/2+"px";
		disk.style.top=basetop-diskheight-1+"px";
	} 
}

function getNewTop(index,disk){
	if (disk==null){ //pop disk
		for (var i=0;i<disk1.length-1;i++){
			disks[index-1][i]=disks[index-1][i+1];
		}
		disks[index-1][disk1.length-1]=null;
	}
	else { //push disk
		for (var i=disk1.length-1;i>=1;i--){
			disks[index-1][i]=disks[index-1][i-1];
		}
		disks[index-1][0]=disk;
	}
}

function solve(btn){
	if (btn.value=="Solve"){
		btn.value="Stop";
		initVars();
		disknum = parseInt(document.hanoi.diskno.options[document.hanoi.diskno.options.selectedIndex].text);
		drawDisks(disknum);
		getMoves(0, 2, 1, disknum); 
		t=window.setTimeout("moveDisk()",delay);
	}
	else {
		if (t) {
			window.clearTimeout(t);
			btn.value="Solve";
		}
	}
}

function moveDisk(){
	disk=disks[arrFr[pos]][0];
	pushDisk(disk,arrTo[pos]+1);
	getNewTop(arrFr[pos]+1,null);
	getNewTop(arrTo[pos]+1,disk);
	movectr++;
	pos++;
	if (movectr<minmove)
		t=window.setTimeout("moveDisk()",delay);
	else {
		document.hanoi.btnSolve.value="Solve";
	}
}

function getMoves(from,to,empty,numDisk){
	if (numDisk > 1) {
		getMoves(from, empty, to, numDisk - 1);
		arrFr[idx] = from;
		arrTo[idx++] = to;
		getMoves(empty, to, from, numDisk - 1);
	}
	else {
		arrFr[idx] = from;
		arrTo[idx++] = to;
	}
}

function newGame(obj){
	window.clearTimeout(t);
	document.hanoi.btnSolve.value="Solve";
	initVars();
	drawDisks(parseInt(obj.options[obj.options.selectedIndex].text));
}