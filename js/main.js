window.onload=init;

var showHistory=1;
var currentImgList;

var descArray=["The Experimental Farm is popular amongst adults and children.  It was established in 1857 as an agricultural research facility and houses an old observatory.",
"Remic Rapids in Westboro on the shores of the Ottawa river is a popular haunt.  what makes it more interesting are the stone sculptures built every year by stone artists from around the world for everyone to enjoy.",
"The Moodie Trails at Stony Swamp are in the National Capital Greenbelt.  There are about six marked trails in this area with ski trails maintained in winter.  A number of wild birds deer and other small wildlife are found in abundance in this area."];

function init(){

	console.log("start init");
 /* ******webworks ready event******/
	var webworksreadyFired = false;
	document.addEventListener('webworksready', function(e) {
		if (webworksreadyFired) return;
			webworksreadyFired = true;
		console.log("after webworks ready");
		
		console.log("before bb init");

 /* ******EVENT LISTENERS SYSTEM EVENTS******/
blackberry.event.addEventListener('onExit',onExit) ;
blackberry.event.addEventListener("pause", onPause);
blackberry.event.addEventListener("resume", onResume);
blackberry.event.addEventListener("windowstatechanged", onWindowStateChange);
blackberry.event.addEventListener("swipedown", onSwipedown);
//window.addEventListener('oncontextmenu', onContextMenu);
 /* ******END EVENT LISTENERS******/
  /* ******BB INIT*****/
		bb.init({
		//operations before DOM is ready	
			onscreenready : function(element, id, params) {
                                  
					var ppp=element.getElementById("divTitle");
					ppp.setAttribute("data-bb-caption",params.title);
					
					if(id=="screen2"){
						
						var tab1 = element.getElementById('tab1');
						var tab2 = element.getElementById('tab2');
    					var actionBar = element.getElementById('abar');
			
						if(showHistory==1){
							//alert("in screen222");
							
							ppp=element.getElementById("grid2");
							ppp.style.visibility="hidden";
							ppp.style.display="none";
							p=element.getElementById("grid1");
							p.style.visibility="visible";
							p.style.display="block";
							
						}
						else{
							
							ppp=element.getElementById("grid1");
							ppp.style.visibility="hidden";
							ppp.style.display="none";
							p=element.getElementById("grid2");
							p.style.visibility="visible";
							p.style.display="block";
							//var actionBar1 = element.getElementById('abar');
							//actionBar1.setSelectedTab(tab2);
							}
					}
					if(id=="screen3"){
						//alert(JSON.stringify(params));
						var ppp=element.getElementById("gimage");
						ppp.setAttribute("data-bb-img",params.image);
						var pp=element.getElementById("description");
						pp.innerHTML=(params.desc);
						var p4=element.getElementById("imgList1");
						var p5=element.getElementById("imgList2");
						var item;
						
						if(params.caption!=null){
							
						 item = element.createElement('div');
						 item.setAttribute('data-bb-type','item');
						 item.setAttribute('data-bb-title',params.caption);
						 item.innerHTML = 'my description';
						 alert("creating item");
						 item.setAttribute('data-bb-img',params.capImg);
						 //item.onclick = function() {alert('clicked');
						 //};
						
   //}
						}
						
						if(params.idd=="imgList1"){
							
							currentImgList="imgList1";
							p5.style.visibility="hidden";
							p5.style.display="none";
							
							p4.style.visibility="visible";
							p4.style.display="block";
							
							// p4.append(item);
							
						}
						if(params.idd=="imgList2"){
							currentImgList="imgList1";
							p4.style.visibility="hidden";
							p4.style.display="none";
							
							p5.style.visibility="visible";
							p5.style.display="block";
							
							//p5.append(item);
						}
						
					}
					
					
					///webworker threads
								//set up web worker threads
								//alert("before creating worker");
	//instantiate worker js object							
	var worker1=new Worker("js/task2.js");
	
	//add a listener associated with the message action
	worker1.addEventListener('message',function(e){
		
					
		var mmm=element.getElementsByClassName("griditem");
		
		var pp=mmm.length;
		
		var i=0;
		//loop to populate screen elements
		for(i=0;i<pp;i++){
			
			 newImage="images/image"+e.data[i].img+".png";
			 
			 newLink=e.data[i].llink;
			
		mmm[i].setAttribute("data-bb-img",newImage);
		mmm[i].setAttribute("onclick","showDetails('"+newLink+","+newImage+"')");
		}
		
	},false);
	
	//post the message to the worker thread
	worker1.postMessage();
				
					//end webworker threads
					
	
                            }, 
	//operations after DOM is ready						
		ondomready: function(element, id, params) {
		
			}
		
	});


		//console.log("after bb init");

		bb.pushScreen('screen2.html','screen2',{title:"Ottawa Attractions"});	

	//do something special	
		},false);


}
/* The function called before 
* showing the detailed screen screen3
* @param ev - a concatenated string with type (header( and image link
*/
function showDetails(ev){
	//alert("in showdetails");
	//console.log("in show details");
	//console.log(ev);
	//alert(ev);
	var mm=ev.split(',');
	//alert(mm[0]);
	//alert(mm[1]);
	
	

	if(mm[0]=="farmhouse"){

		bb.pushScreen('screen3.html','screen3',{title:"The Experimental Farm",image:mm[1], desc:descArray[0],idd:"imgList1"});

	}
	if(mm[0]=="riverside"){

		bb.pushScreen('screen3.html','screen3',{title:"Remic Rapids",image:mm[1],desc:descArray[1],idd:"imgList2"});

	}
	if(mm[0]=="remicRapids"){

		bb.pushScreen('screen3.html','screen3',{title:"Remic Rapids",image:mm[1],desc:descArray[1],idd:"imgList2"});

	}
	if(mm[0]=="moodieTrails"){

		bb.pushScreen('screen3.html','screen3',{title:"Moodie Trails",image:mm[1],desc:descArray[2],idd:"imgList2"});

	}
	
}
/* The click event handler for the context item 
* showing the associated map screen6
* a generic map is shown
*/
function showMap(){
	bb.pushScreen('screen6.html','screen6',{title:"Remic Rapids Map"});
}
/* The click event handler for the context item 
* will hide the selected item
* needs some work
*/
function hideItem(){
	//alert("start hide");
	var context = document.getElementById('screen2ctx');
	
	var selectedItem  = context.menu.selected.selected;
	
	selectedItem.style.display="none";
}
/* given the context
* get the context object
* then get the DOM object
* call a web worker thread to match the image
* to the link
*/
function showContext(){
	
	var selectedItem,
          context = document.getElementById('screen2ctx');
	
	//instantiate worker js object							
	var worker2=new Worker("js/task3.js");
	
	//add a listener associated with the message action
	worker2.addEventListener('message',function(e){

		var mm="images/image"+e.data[0].img+".png";
		var m=e.data[0].llink;
		showDetails(m+","+mm);
		
		});	  
 
      // context.menu.selected is the DOM element that was selected in the press-and-hold
      selectedItem  = context.menu.selected.selected;
	  
      if (selectedItem) {
		  
          var p=selectedItem.getAttribute("data-bb-img");
			
		  //call a web worker thread here
		  worker2.postMessage(p);
      }
}
/* The click event handler when a tab on the 
* action bar is clicked on screen2
* @param - the type of tab details to show
*/
function addTab(a){
	
	
	
	if(a=="farm"){
	showHistory=1;	
	bb.pushScreen('screen2.html','screen2',{title:"Ottawa Attractions"});
	
		}
	if(a=="history"){
	showHistory=0;	
	bb.pushScreen('screen2.html','screen2',{title:"Historical Places of Interest in Ottawa"});
	
		}
}
/* The click event handler for the action bar item add 
* shows a screen with input for 
* caption and browse the system to select an image
* @param - the image item group
*/
function addNew(a){
	
	
	bb.pushScreen('screen7.html','screen7',{title:"Add Attraction"});//}
	
}
/* The click event handler for add attraction button
* in screen7 
* adds a new item in the image list
* @param - the image item group
*/
function addAttraction(){
	
	alert("start addAttraction");
	
	var inp=document.getElementById("inputCap");
	var inp2=document.getElementById("attrimg");
	
	caption=(inp.value);
	capImg=(inp2.value);
	bb.popScreen('screen3.html','screen3');
	
	bb.pushScreen('screen3.html','screen3',{caption:inp.value,capImg:inp2.value,idd:currentImgList,image:images/image8.png});
}
/************SYSTEM EVENT LISTENERS***************/
/**********BATTERY LEVEL CHANGE*************************/
 /* levels change from 0 to 100 ***/
function notifyOnBatteryLevelChange(callBackFunction) {
   blackberry.system.event.deviceBatteryLevelChange(callBackFunction);
 }

 notifyOnBatteryLevelChange(showBatteryLevel);
 
 function showBatteryLevel(level) { //This is just the callback function to be able to access the battery level. If you want it to alert you at a different interval, you just change this specific callback function to alert you at a different interval. 
   alert("Battery Level: " + level);
 }
 /**********BATTERY STATE CHANGE*************************/
 /* states are unknown=0,full=1,charging=2,unplugged=3 ***/
function notifyOnBatteryStateChange(callBackFunction) {
   blackberry.system.event.deviceBatteryStateChange(callBackFunction);
 }

 notifyStateChange(showBatteryState);
 
 function showBatteryState(state) { //This is just the callback function to be able to access the battery level. If you want it to alert you at a different interval, you just change this specific callback function to alert you at a different interval. 
   alert("Battery State: " + state);
 }
 /**********HARDWARE BACK KEY*************************/
 /* s***/
function trapForBackKey() {
    blackberry.system.event.onHardwareKey(blackberry.system.event.KEY_BACK, handleBack);
  }

  function handleBack() {
    alert("handle back button");
  }
  /**********application pause*************************/

function onPause() {
  alert("The app is about to be paused.");
}

//blackberry.event.addEventListener("pause", onPause);
 /**********application resume*************************/

function onResume() {
  alert("The app is resumed.");
}

//blackberry.event.addEventListener("resume", onResume);

 /**********application swipedown*************************/

function onSwipedown() {
  alert("swipe down occurred.");
}

//blackberry.event.addEventListener("swipedown", onSwipedown);

/**********application exit*************************/

function onExit() {
  alert("app is exiting");
}

//blackberry.event.addEventListener("onExit", onExit);


 /**********application Window state change*************************/

function onWindowStateChange(state) {
  alert("Window state was changed to: " + state);
}

//blackberry.event.addEventListener("windowstatechanged", onWindowStateChange);
/**********device motion*************************/
window.addEventListener("devicemotion", function(event) {

		var ax = "Acceleration X value- " + event.accelerationIncludingGravity.x;
		var ay = "Acceleration Y value- " + event.accelerationIncludingGravity.y;
		var az = "Acceleration Z value- " + event.accelerationIncludingGravity.z;

		alert(ax+"\n"+ay+"\n"+az);

}, true);

/************END SYSTEM EVENT LISTENERS **********/



