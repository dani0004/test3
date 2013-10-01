/*Javascript executed by worker1 thread */
/*
*this thread finds the correct data elements to display
* on screen 3 given a particular image
*/
var ii=0,aaa,aa,rnum,p,px,pa,paa;

self.addEventListener('message',function(e){
	p=e.data;
	 px=p.split('.');
		  
		   pa=px[0].lastIndexOf('e');
		  
		  paa=px[0].substring(++pa);
		 // var nn=parseInt(paa);
		  
		  switch(paa){
	case "1":
	aa="remicRapids";
	break;
	case "2":
	aa="remicRapids";
	break;
	case "3":
	aa="remicRapids"
	break;
	case "4":
	aa="remicRapids";
	break;
	case "5":
	aa="farmhouse";
	break;
	case "6":
	aa="moodieTrails"
	break;
	case "7":
	aa="farmhouse";
	break;
	case "8":
	aa="farmhouse";
	break;
	case "9":
	aa="farmhouse"
	break;
	case "10":
	aa="farmhouse";
	break;
	case "11":
	aa="moodieTrails";
	break;
	case "12":
	aa="moodieTrails"
	break;
	case "13":
	aa="moodieTrails";
	break;
	
	
}
aaa=new Array();
aaa.push({"img":paa,"llink":aa});

//self.postMessage(aaa);
self.postMessage(aaa);

self.close();
},false);



