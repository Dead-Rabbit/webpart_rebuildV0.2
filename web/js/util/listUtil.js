function getLowsAndHeights(points){
	var lowX=points[0].x,
	heightX=points[0].x,
	lowY=points[0].y,
	heightY=points[0].y;
	for(var index_poin in points){
		if(points[index_poin].x>heightX) heightX=points[index_poin].x;
		if(points[index_poin].x<lowX) lowX = points[index_poin].x;
		if(points[index_poin].y>heightY) heightY = points[index_poin].y;
		if(points[index_poin].y<lowY) lowY = points[index_poin].y;
	}
	return {
		lowX:lowX,
		heightX:heightX,
		lowY:lowY,
		heightY:heightY
	}
}