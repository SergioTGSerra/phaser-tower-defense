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
        
        // Quando o hp do zombie baixa para zero o zombie é desativado
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
        // Coloca o parametro t no inicio do caminho
        this.follower.t = 0;
        this.hp = 125+(kills*6);
        
        // Adquire o valor de x e y do ponto t
        path.getPoint(this.follower.t, this.follower.vec);
        
        // Fornece o valor de x e y para o zombie recebido no get anterior
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
        
        // Move o ponto t pelo caminho, 0 é o inicio e 0 o fim
        this.follower.t += ZOMBIE_SPEED * delta;

        // Adquire as novas coordenadas x e y no vec
        path.getPoint(this.follower.t, this.follower.vec);
        
        // Atualiza o x e y do zombie para o novos x e y obtidos
        this.setPosition(this.follower.vec.x, this.follower.vec.y);

        // Se o zombie chegar ao fim do caminho, remove-o
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
        // Coloca o parametro t no inicio do caminho
        this.follower.t = 0;
        this.hp = 600+(kills*10);
        
        // Adquire o valor de x e y do ponto t
        path.getPoint(this.follower.t, this.follower.vec);
        
        // Fornece o valor de x e y para o zombie recebido no get anterior
        this.setPosition(this.follower.vec.x, this.follower.vec.y);            
    },
    receiveDamage: function(damage) {
        this.hp -= damage;           
        
        // Quando o hp do zombieSaco baixa para zero o zombieSaco é desativado
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

        // Move o ponto t pelo caminho, 0 é o inicio e 0 o fim
        this.follower.t += ZOMBIESACO_SPEED * delta;

        // Adquire as novas coordenadas x e y no vec
        path.getPoint(this.follower.t, this.follower.vec);
        
        //Atualiza o x e y do zombie para o novos x e y obtidos
        this.setPosition(this.follower.vec.x, this.follower.vec.y);

        // Se o zombieSaco chegar ao fim do caminho, remove-o
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
       // Coloca o parametro t no inicio do caminho
       this.follower.t = 0;
       this.hp = 15000+(kills*25);
       
       // Adquire o valor de x e y do ponto t
       path.getPoint(this.follower.t, this.follower.vec);
       
       // Fornece o valor de x e y para o zombie recebido no get anterior
       this.setPosition(this.follower.vec.x, this.follower.vec.y);            
   },
   receiveDamage: function(damage) {
       this.hp -= damage;           
       
       // Quando o hp do zombieGrande baixa para zero o zombieSaco é desativado
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

       // Move o ponto t pelo caminho, 0 é o inicio e 0 o fim
       this.follower.t += ZOMBIEGRANDE_SPEED * delta;

        // Adquire as novas coordenadas x e y no vec
       path.getPoint(this.follower.t, this.follower.vec);
       
       //Atualiza o x e y do zombie para o novos x e y obtidos
       this.setPosition(this.follower.vec.x, this.follower.vec.y);

        // Se o zombieGrande chegar ao fim do caminho, remove-o
       if (this.follower.t >= 1)
       {
           this.setActive(false);
           this.setVisible(false);
           life -= 10;
           lifeText.setText("Life: " + life);
       }
   }
});