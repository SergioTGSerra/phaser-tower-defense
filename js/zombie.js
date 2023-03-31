var Zombie = new Phaser.Class({

    Extends: Phaser.GameObjects.Image,

    initialize:

    function Planta (scene)
    {
        Phaser.GameObjects.Image.call(this, scene, 0, 0, 'zombie');

        this.follower = { t: 0, vec: new Phaser.Math.Vector2() };
    },
    
    
    receiveDamage: function(damage) {
        this.hp -= damage;           
        
        // if hp drops below 0 we deactivate this zombie
        if(this.hp <= 0) {
            this.setActive(false);
            this.setVisible(false); 
            gold += 10;
            goldText.setText('Gold: '+ gold);    
            kills += 1;
            killCounter.setText("Kills: " + kills)
            deathSound.play();
        }
    },
    startOnPath: function ()
    {   
        // set the t parameter at the start of the path
        this.follower.t = 0;
        this.hp = 125+(kills*6);
        
        // get x and y of the given t point
        path.getPoint(this.follower.t, this.follower.vec);
        
        // set the x and y of our zombie to the received from the previous step
        this.setPosition(this.follower.vec.x, this.follower.vec.y);            
    },
    update: function (time, delta)
    {
        //Se ocorrer GameOver ou GameWin os inimigos deixam de se mover
        if(gameOver){
            
            return;
        }
        if(gameWin){
           
            return;
        }
        
        // move the t point along the path, 0 is the start and 0 is the end
        this.follower.t += ZOMBIE_SPEED * delta;

        // get the new x and y coordinates in vec
        path.getPoint(this.follower.t, this.follower.vec);
        
        // update zombie x and y to the newly obtained x and y
        this.setPosition(this.follower.vec.x, this.follower.vec.y);

        // if we have reached the end of the path, remove the zombie
        if (this.follower.t >= 1)
        {
            this.setActive(false);
            this.setVisible(false);
            life -= 2;
            lifeText.setText("Life: " + life);
            // removeEnemy = enemies.children.entries;
            // removeEnemy.shift();
        }
    }

});


var ZombieSaco = new Phaser.Class({


    Extends: Phaser.GameObjects.Image,

    initialize:

    function ZombieSaco (scene)
    {
        Phaser.GameObjects.Image.call(this, scene, 0, 0, 'zombieSaco');

        this.follower = { t: 0, vec: new Phaser.Math.Vector2() };
        
       
    },

    startOnPath: function ()
    {   
        // set the t parameter at the start of the path
        this.follower.t = 0;
        this.hp = 600+(kills*10);
        
        // get x and y of the given t point
        path.getPoint(this.follower.t, this.follower.vec);
        
        // set the x and y of our zombieSaco to the received from the previous step
        this.setPosition(this.follower.vec.x, this.follower.vec.y);            
    },
    receiveDamage: function(damage) {
        this.hp -= damage;           
        
        // if hp drops below 0 we deactivate this zombieSaco
        if(this.hp <= 0) {
            this.setActive(false);
            this.setVisible(false); 
            gold += 20;
            goldText.setText('Gold: '+ gold);    
            kills += 1;
            killCounter.setText("Kills: " + kills)
            deathSound.play();
        }
    },
    update: function (time, delta)
    {
        //Se ocorrer GameOver ou GameWin os inimigos deixam de se mover
        if(gameOver){
            
            return;
        }
        if(gameWin){
           
            return;
        }

        // move the t point along the path, 0 is the start and 0 is the end
        this.follower.t += ZOMBIESACO_SPEED * delta;

        // get the new x and y coordinates in vec
        path.getPoint(this.follower.t, this.follower.vec);
        
        // update zombieSaco x and y to the newly obtained x and y
        this.setPosition(this.follower.vec.x, this.follower.vec.y);

        // if we have reached the end of the path, remove the zombieSaco
        if (this.follower.t >= 1)
        {
            this.setActive(false);
            this.setVisible(false);
            life -= 5;
            lifeText.setText("Life: " + life);
            // removeRobert = roberts.children.entries;
            // removeRobert.shift();
        }
    }

});

var ZombieGrande = new Phaser.Class({



    Extends: Phaser.GameObjects.Image,
    initialize:
    function ZombieGrande (scene)
   {
       Phaser.GameObjects.Image.call(this, scene, 0, 0, 'zombieGrande');
        this.follower = { t: 0, vec: new Phaser.Math.Vector2() };
        
   },
    startOnPath: function ()
   {   
       // set the t parameter at the start of the path
       this.follower.t = 0;
       this.hp = 15000+(kills*25);
       
       // get x and y of the given t point
       path.getPoint(this.follower.t, this.follower.vec);
       
       // set the x and y of our zombieSaco to the received from the previous step
       this.setPosition(this.follower.vec.x, this.follower.vec.y);            
   },
   receiveDamage: function(damage) {
       this.hp -= damage;           
       
       // if hp drops below 0 we deactivate this zombieSaco
       if(this.hp <= 0) {
           this.setActive(false);
           this.setVisible(false); 
           gold += 50;
           goldText.setText('Gold: '+ gold);    
       }
   },
   update: function (time, delta)
   {

        //Se ocorrer GameOver ou GameWin os inimigos deixam de se mover
       if(gameOver){
           
           return;
       }
       if(gameWin){
           
        return;
       }

       // move the t point along the path, 0 is the start and 0 is the end
       this.follower.t += ZOMBIEGRANDE_SPEED * delta;
        // get the new x and y coordinates in vec
       path.getPoint(this.follower.t, this.follower.vec);
       
       // update zombieSaco x and y to the newly obtained x and y
       this.setPosition(this.follower.vec.x, this.follower.vec.y);
        // if we have reached the end of the path, remove the zombieGrande
       if (this.follower.t >= 1)
       {
           this.setActive(false);
           this.setVisible(false);
           life -= 10;
           lifeText.setText("Life: " + life);
       }
   }
});