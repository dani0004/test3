window.onload=init;

function init(){

	console.log("start init");

	var webworksreadyFired = false;
	document.addEventListener('webworksready', function(e) {
		if (webworksreadyFired) return;
			webworksreadyFired = true;
		console.log("after webworks ready");
		
		console.log("before bb init");


		bb.init({
		//operations before DOM is ready	
			onscreenready : function(element, id, params) {
                                     
					var ppp=element.getElementById("divTitle");
					ppp.setAttribute("data-bb-caption",params.title);
					
					if(id=="screen2"){
					}
					
					///webworker threads
								//set up web worker threads
								alert("before creating worker");
	//instantiate worker js object							
	//var worker1=new Worker("js/task2.js");
	//alert("after creating worker");
	//add a listener associated with the message action
	/*worker1.addEventListener('message',function(e){
		alert("worker thread returned");
		alert(e.data);
		//var newImage="images/image"+e.data[0].img+".png";
		//var newImage,newLink;
		//alert(newImage);
		//var newLink=e.data.llink;
		//alert(newLink);
		
		var mmm=element.getElementsByClassName("griditem");
		
		var pp=mmm.length;
		alert(ppp);
		var i=0;
		//loop to populate screen elements
		for(i=0;i<pp;i++){
			alert("in loop");
			 newImage="images/image"+e.data[0].img+".png";
			 alert(newImage);
			 newLink=e.data[0].llink;
			 alert(newLink);
		mmm[i].setAttribute("data-bb-img",newImage);
		mmm[i].setAttribute("onclick","showDetails('"+newLink+"')");
		}
		
	},false);
	alert("after creating listener");
	//post the message to the worker thread
	worker1.postMessage();
	alert("after posting message");	*/			
					//end webworker threads
					
                            }, 
	//operations after DOM is ready						
		ondomready: function(element, id, params) {
		
			}
		
	});


		console.log("after bb init");

		bb.pushScreen('screen2.html','screen2',{title:"Ottawa Attractions"});	

	//do something special	
		},false);

                          
                      



}
function setListeners(selector,handler){
	console.log("in setting listeners");
	var i=0;
	var links1=document.querySelectorAll(selector);
	
	var numlinks=links1.length;
	console.log("# links length is:"+numlinks);
	
	for( i=0;i<numlinks; i++){
		links1[i].addEventListener("click", handler, false);	
	}
}

function showDetails(ev){

	console.log("in show details");
	console.log(ev);

	if(ev=="farmhouse"){

		bb.pushScreen('screen3.html','screen3',{title:"The Experimental Farm"});

	}
	if(ev=="riverside"){

		bb.pushScreen('screen4.html','screen4',{title:"Remic Rapids"});

	}
	if(ev=="remicRapids"){

		bb.pushScreen('screen5.html','screen5',{title:"Remic Rapids"});

	}
	
}

function showMap(){
	bb.pushScreen('screen6.html','screen6',{title:"Remic Rapids Map"});
}

function hide(){
	
	context = document.getElementById('#screen2ctx');
	alert("after getting context");
	selectedItem  = context.menu.selected;
	alert("after getting selected item");
	selectedItem.style.display="none";
}

function addTab(a){
	
	if(a=="farm"){
		
	bb.pushScreen('screen2.html','screen2',{title:"Ottawa Attractions"});
	
		}
	if(a=="history"){
		
	bb.pushScreen('screen8.html','screen8',{title:"Historical Places of Interest in Ottawa"});
	
		}
}

function addNew(a){
	
	
	bb.pushScreen('screen7.html','screen7',{title:"Add Attraction"});//}
	
}



