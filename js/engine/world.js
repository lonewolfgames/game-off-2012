var b2Vec2 = Box2D.Common.Math.b2Vec2,
    b2BodyDef = Box2D.Dynamics.b2BodyDef,
    b2Body = Box2D.Dynamics.b2Body,
    b2FixtureDef = Box2D.Dynamics.b2FixtureDef,
    b2Fixture = Box2D.Dynamics.b2Fixture,
    b2World = Box2D.Dynamics.b2World,
    b2MassData = Box2D.Collision.Shapes.b2MassData,
    b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape,
    b2CircleShape = Box2D.Collision.Shapes.b2CircleShape,
    b2ContactListener = Box2D.Dynamics.b2ContactListener,
    b2DebugDraw = Box2D.Dynamics.b2DebugDraw;

build =  function(def){
    if(def.name == "Player"){
        return new Player(def.id, def.x, def.y, def.angle, def.radius, def.img); 
    }
    else if(def.halfWidth){
        return new Box(def.id, def.x, def.y, def.angle, def.halfWidth, def.halfHeight, def.img);
    }
    else if(def.radius){
        return new Circle(def.id, def.x, def.y, def.angle, def.radius, def.img);
    }
    else if(def.points){
        return new PointBased(def.id, def.x, def.y, def.angle, def.points, def.img);
    }
    else{
        return null;
    }
}

var World = Class.extend({
    init: function(scale, gravity, sleep){
        this.scale = scale;
        this.gravity = gravity;
        this.sleep = sleep;
        this.world = new b2World(this.gravity, this.sleep);
        this.bodies = [];
        this.bodiesState = null;

        this.listener = new b2ContactListener;
        this.world.SetContactListener(this.listener);
    },
    
    update: function(velocityStep, positionStep){
        if(!velocityStep) velocityStep = 10;
        if(!positionStep) positionStep = 10;
        this.world.Step(
            1/time.delta,
            velocityStep,
            positionStep
        );
        this.world.ClearForces();
        this.bodiesState = this.getState();  
        
        for(var id in this.bodiesState){
            var entity = this.bodies[id];
            if(entity) entity.update(this.bodiesState[id], this.scale);
        }
    },
    
    draw: function(){
        for(var id in this.bodies){
            var entity = this.bodies[id];
            if(entity) entity.draw();
        }
    },
    
    remove: function(id){
        this.bodies[id] = undefined;
        this.world.DestroyBody(id);
    },
    
    getState: function(){
        var state = {};
        for( var b = this.world.GetBodyList(); b; b = b.m_next ){
            if(b.IsActive() && typeof b.GetUserData() !== "undefinded" && b.GetUserData() != null){
                state[b.GetUserData().id] = b;
            }
        }
        return state;
    },
    
    getBodyByName: function(name){
        var body = null;
        for( var b = this.world.GetBodyList(); b; b = b.m_next ){
            if(b.IsActive() && typeof b.GetUserData() !== "undefinded" && b.GetUserData() != null){
                if(b.GetUserData().name == name){
                    body = b;
                }
            }
        }
        return body;
    },
    
    addBodies: function(bodies){
        var worldBodies = this.world.GetBodyCount()-1;
        var bodyDef = new b2BodyDef;
        
        for(var i=0; i<bodies.length; i++){
            entity = bodies[i];
            entity.id = worldBodies+i;
            
            if(entity.type == "dynamic"){
                bodyDef.type = b2Body.b2_dynamicBody; 
            }
            else{
                bodyDef.type = b2Body.b2_staticBody;
            }
            
            var fixDef = new b2FixtureDef;
                fixDef.density = entity.d;
                fixDef.friction = entity.f;
                fixDef.restitution = entity.r;
            
            if(entity.points){
                var points = [];
                for (var j = 0; j < entity.points.length; j++) {
                    var vec = new b2Vec2();
                    vec.Set(entity.points[j].x/this.scale*renderer.scale, entity.points[j].y/this.scale*renderer.scale);
                    points[j] = vec;
                }
                fixDef.shape = new b2PolygonShape;
                fixDef.shape.SetAsArray(points, points.length);
            }
            else if(entity.radius){
                fixDef.shape = new b2CircleShape(entity.radius/this.scale*renderer.scale);
            }
            else{
                fixDef.shape = new b2PolygonShape;
                fixDef.shape.SetAsBox(entity.halfWidth/this.scale*renderer.scale, entity.halfHeight/this.scale*renderer.scale);
            }
            bodyDef.position.x = entity.x/this.scale*renderer.scale;
            bodyDef.position.y = entity.y/this.scale*renderer.scale;
            bodyDef.angle = entity.angle*(Math.PI/180);
            bodyDef.userData = {id: worldBodies+i, name: entity.name};
            this.world.CreateBody(bodyDef).CreateFixture(fixDef);
            this.bodies[worldBodies+i] = build(entity);
        }
    },
    
    drawHelper: function(alpha){
        var debugDraw = new b2DebugDraw();
            debugDraw.SetSprite(ctx);
            debugDraw.SetDrawScale(this.scale);
            debugDraw.SetFillAlpha(alpha);
            debugDraw.SetFlags(b2DebugDraw.e_shapeBit | b2DebugDraw.e_jointBit);
            debugDraw.SetSprite
        this.world.SetDebugDraw(debugDraw);
        this.world.m_debugDraw.m_sprite.graphics.clear = function(){return false;}
    },
    
    simpleGround: function(x,y){
        var fixDef = new b2FixtureDef;
            fixDef.density = 1.0;
            fixDef.friction = 0.75;
            fixDef.restitution = 0.15;
            
        var bodyDef = new b2BodyDef;
            bodyDef.type = b2Body.b2_staticBody;
            bodyDef.position.x = x/this.scale;
            bodyDef.position.y = y/this.scale;
            
        fixDef.shape = new b2PolygonShape;
        fixDef.shape.SetAsBox(960/this.scale*scale, 10/this.scale*scale);
        this.world.CreateBody(bodyDef).CreateFixture(fixDef);
    }
});