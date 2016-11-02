(function()
{
    return function()
    {
        if (!this._is_form)
            return;
        
        this.on_create = function()
        {
            // Declare Reference
            var obj = null;
            
            if (Form == this.constructor) {
                this.set_name("Event_sub");
                this.set_classname("Event_sub");
                this.set_titletext("New Form");
                this._setFormPosition(0,0,672,555);
            }

            
            // Object(Dataset, ExcelExportObject) Initialize

            
            // UI Components Initialize
            obj = new Div("div_canvas", "absolute", "16", "40", "642", "482", null, null, this);
            obj.set_taborder("0");
            obj.set_text("Div00");
            obj.style.set_background("URL('Images::tile.png') repeat");
            obj.style.set_border("1px solid gray");
            this.addChild(obj.name, obj);

            obj = new Static("Static00", "absolute", "553", "14", "60", "20", null, null, this);
            obj.set_taborder("1");
            obj.set_text("score :");
            obj.style.set_font("bold 12 Dotum");
            this.addChild(obj.name, obj);

            obj = new Static("st_score", "absolute", "611", "14", "40", "20", null, null, this);
            obj.set_taborder("2");
            obj.style.set_align("right middle");
            obj.style.set_font("bold 12 Dotum");
            this.addChild(obj.name, obj);

            obj = new Static("Static01", "absolute", "19", "14", "39", "20", null, null, this);
            obj.set_taborder("3");
            obj.set_text("fps :");
            obj.style.set_font("bold 12 Dotum");
            this.addChild(obj.name, obj);

            obj = new Static("st_fps", "absolute", "55", "14", "40", "20", null, null, this);
            obj.set_taborder("4");
            obj.style.set_align("right middle");
            obj.style.set_font("bold 12 Dotum");
            this.addChild(obj.name, obj);

            obj = new Static("Static02", "absolute", "143", "526", "395", "20", null, null, this);
            obj.set_taborder("5");
            obj.set_text("Control snake with arrow keys, WASD, or HJKL (vim keys)");
            this.addChild(obj.name, obj);

            obj = new Static("st_message", "absolute", "59", "254", "559", "52", null, null, this);
            obj.set_taborder("6");
            obj.style.set_align("center middle");
            obj.style.set_font("bold 24 Dotum");
            this.addChild(obj.name, obj);


            
            // Layout Functions
            //-- Default Layout
            obj = new Layout("default", "", 672, 555, this,
            	//-- Layout function
            	function(p) {
            		p.set_classname("Event_sub");
            		p.set_titletext("New Form");

            	}
            );
            this.addLayout(obj.name, obj);


            
            // BindItem Information

            
            // Remove Reference
            obj = null;
        };
        

        
        // User Script
        this.registerScript("Event_sub.xfdl", function() {
        /*
         * requestAnimationFrame 함수와 Form 의 timer 이용하여 fps 기능을 적용한 게임 예제.
         *
         * JDStraughan.com(http://jdstraughan.com/2013/03/05/html5-snake-with-source-code-walkthrough/) 의
         * [HTML5 Snake source code walkthrough] 를 변경한 것으로 HTML5의 canvas 를 이용한 Snake Game을 
         * nexacro 컴포넌트를 이용하여 드로잉한 예제이다.
        */

        /*
        MIT License - http://opensource.org/licenses/MIT

        Copyright (c) 2013 Jason D. Straughan

        Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

        The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

        THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
        */

        var canvasComp = this.div_canvas;
        var scoreComp = this.st_score;
        var fpsComp = this.st_fps;
        var msgComp = this.st_message;

        var canvasWidth = canvasComp.getOffsetWidth() - 2; // 2 -> border
        var canvasHeight = canvasComp.getOffsetHeight() - 2; // 2 -> border

        var game, snake, food;

        game = {
          
        	score: 0,
        	fps: 8,
        	over: false,
        	pause: false,
        	message: null,

        	start: function() {
        		game.over = false;
        		game.message = null;
        		game.score = 0;
        		game.fps = 8;
        		snake.init();
        		food.set();
        	},

        	stop: function() {
        		game.over = true;
        		game.message = 'GAME OVER - PRESS SPACEBAR';
        	},

        	drawBox: function(comp,x,y,size) {
        		comp.move(x - (size / 2), y - (size / 2));
        	},

        	drawScore: function() {
        		scoreComp.set_text(game.score);
        		fpsComp.set_text(game.fps);
        	},

        	drawMessage: function() {
        		msgComp.set_text(game.message);
        	},

        	resetCanvas: function() {	
        		var comps = canvasComp.components;
        		var len = comps.length;
        		for (var i=0; i<len; i++)
        		{
        			comps[i].set_visible(false);
        		}
        	}
          
        };

        snake = {
          
        	size: canvasWidth / 40,	
        	x: null,
        	y: null,
        	headColor: 'orange',
        	bodyColor: 'skyblue',
        	direction: 'left',
        	sections: [],
        	XComps:[],

        	init: function() {
        		snake.sections = [];
        		snake.direction = 'left';
        		snake.x = canvasWidth / 2 + snake.size / 2;
        		snake.y = canvasHeight / 2 + snake.size / 2;
        		for (var i = snake.x + (5 * snake.size); i >= snake.x; i -= snake.size) {
        			snake.sections.push(i + ',' + snake.y); 
        		}
        	},

        	move: function() {
        		switch (snake.direction) {
        		  case 'up':
        			snake.y -= snake.size;
        			break;
        		  case 'down':
        			snake.y += snake.size;
        			break;
        		  case 'left':
        			snake.x -= snake.size;
        			break;
        		  case 'right':
        			snake.x += snake.size;
        			break;
        		}
        		snake.checkCollision();
        		snake.checkGrowth();
        		snake.sections.push(snake.x + ',' + snake.y);
        	},

        	draw: function() {
        		var comps = this.XComps;
        		var comp;
        		var len = snake.sections.length;
        		var seq = 0;
        		for (var i = 0; i < len; i++) {
        			comp = comps[i];
        			if ( !comp )
        			{
        				comp = new Static();
        				comp.init("snake"+i, "absolute", 0, 0, snake.size, snake.size);
        				comp.style.set_bordertype("round 8 8");
        				canvasComp.addChild(comp.name, comp);
        				comp.show();
        				
        				this.XComps.push(comp);
        				
        				seq++;
        			}
        			comp.set_visible(true);
        			comp.style.set_background(snake.bodyColor);
        			snake.drawSection(comp, snake.sections[i].split(','));
        		}
        		comp.style.set_background(snake.headColor);
        	},

        	drawSection: function(comp,section) {
        		game.drawBox(comp, parseInt(section[0]), parseInt(section[1]), snake.size);
        	},

        	checkCollision: function() {
        		if (snake.isCollision(snake.x, snake.y) === true) {
        		  game.stop();
        		}
        	},

        	isCollision: function(x,y) {
        		if (x < snake.size / 2 ||
        			x > canvasWidth ||
        			y < snake.size / 2 ||
        			y > canvasHeight ||
        			snake.sections.indexOf(x + ',' + y) >= 0) {
        		  return true;
        		}
        	},

        	checkGrowth: function() {
        		if (snake.x == food.x && snake.y == food.y) {
        			game.score++;
        			if (game.score % 5 == 0 && game.fps < 60) {
        				game.fps++;
        			}
        			food.set();
        			
        		} else {
        			snake.sections.shift();
        		}
        	}
          
        };

        food = {
          
        	size: null,
        	x: null,
        	y: null,
        	color: 'red',
        	XComp: null,

        	'set': function() {
        		food.size = snake.size;
        		food.x = (Math.ceil(Math.random() * 10) * snake.size * 4) - snake.size / 2;
        		food.y = (Math.ceil(Math.random() * 10) * snake.size * 3) - snake.size / 2;
        	},

        	draw: function() {
        		var comp = this.XComp;
        		if ( !comp )
        		{
        			comp = new Static();
        			comp.init("food", "absolute", 0, 0, snake.size, snake.size);
        			comp.style.set_background(food.color);
        			comp.style.set_bordertype("round 8 8");
        			canvasComp.addChild(comp.name, comp);		
        			comp.show();
        			comp.bringToFront();

        			this.XComp = comp;
        		}
        		comp.set_visible(true);
        		game.drawBox(comp, food.x, food.y, food.size);
        	}
          
        };

        this.inverseDirection = {
          'up': 'down',
          'left': 'right',
          'right': 'left',
          'down': 'up'
        };

        this.keys = {
        	up: [38, 75, 87],
        	down: [40, 74, 83],
        	left: [37, 65, 72],
        	right: [39, 68, 76],
        	start_game: [13, 32]
        };

        this.getKey = function(value)
        {
        	var keys = this.keys;
        	for (var key in keys)
        	{
        		if (keys[key] instanceof Array && keys[key].indexOf(value) >= 0)
        		{
        			return key;
        		}
        	}
        	return null;
        }

        this.loop = function()
        {
        	if (game.over == false) 
        	{
        		game.resetCanvas();
        		game.drawScore();
        		snake.move();
        		food.draw();
        		snake.draw();
        		game.drawMessage();
        	}

        	// this 는 requestAnimationFrame 호출 시 두번째 인자로 주어진 scope이다.
        	// (본 예제에서는 Form )
        	this.setTimer(1, 1000 / game.fps);
        }

        this.requestAnimationFrameId = null;

        this.Event_sub_onload = function(obj,e)
        {	
        	this.requestAnimationFrameId = Eco.XComp.Event.requestAnimationFrame(this.loop, this);
        }

        this.Event_sub_onkeydown = function(obj,e)
        {
            var lastKey = this.getKey(e.keycode);
            if (['up', 'down', 'left', 'right'].indexOf(lastKey) >= 0
                && lastKey != this.inverseDirection[snake.direction]) {
        		snake.direction = lastKey;
            } else if (['start_game'].indexOf(lastKey) >= 0 ) {		
        		if ( game.over )
        		{
        			game.start();
        		}
        		else
        		{
        			if ( game.pause )
        			{
        				this.setTimer(1, 1000 / game.fps);
        			}
        			else
        			{			
        				Eco.XComp.Event.cancelAnimationFrame(this.requestAnimationFrameId);
        				this.killTimer(1);
        			}
        			game.pause = !game.pause;
        		}
            }
        }

        this.Event_sub_ontimer = function(obj,e)
        {
        	if ( e.timerid === 1 )
        	{
        		this.killTimer(1);
        		this.requestAnimationFrameId = Eco.XComp.Event.requestAnimationFrame(this.loop, this);
        	}	
        }
        });


        
        // Regist UI Components Event
        this.on_initEvent = function()
        {
            this.addEventHandler("onload", this.Event_sub_onload, this);
            this.addEventHandler("onkeydown", this.Event_sub_onkeydown, this);
            this.addEventHandler("ontimer", this.Event_sub_ontimer, this);

        };

        this.loadIncludeScript("Event_sub.xfdl");

       
    };
}
)();
