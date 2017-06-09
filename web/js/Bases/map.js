function gameMap(){
    // 静态物体存放中心(障碍物等)
    this.staticItems = [];
    // 游戏洞定义（下凹陷阱）
    this.holes = [];
    // 游戏边界定义
    this.sides = [];
    //游戏基本地形
    this.base = new flatbase();
}
gameMap.prototype.changeBaseSides = function(sides) {
    for(var i = 0;i < (sides.length-1)/2;i++){
        var temp = sides[i];
        sides[i] = sides[sides.length-i-1];
        sides[sides.length-i-1] = temp;
    }
    for(var index_sides in sides){
        sides[index_sides].x = parseInt(sides[index_sides].x);
        sides[index_sides].y = parseInt(sides[index_sides].y);
        this.base.side_points.push(sides[index_sides]);
    }
    this.base.side_points.push(sides[0]);
};
gameMap.prototype.pushStaticItems = function(type,items){
    for(var item_index in items){
        var item;
        switch(type){
            case 'traps':
                if(items[item_index].shape.type=="polygon"){
                    item = new crystal_stone("normal",items[item_index].shape.points);
                    this.holes.push(item);
                    this.base.pushHole(items[item_index].shape);
                }
            break;
            case 'blocks':
                if(items[item_index].shape.type=="polygon"){
                    item = new normal_Stone("normal",items[item_index].shape.points);
                }
                this.staticItems.push(item);
            break;
        }
    }
    
}
gameMap.prototype.draw = function() {
    console.log(this.staticItems);
    for(var index_items in this.staticItems){
        this.staticItems[index_items].draw();
    }
    this.base.draw();
};