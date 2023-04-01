var Bullet = new Phaser.Class({

        Extends: Phaser.GameObjects.Image,

        initialize:

        //inclinação da bullet, a velocidade e a duração
        function Bullet (scene)
        {      
            Phaser.GameObjects.Image.call(this, scene, 0, 0, 'bullet');

            this.incX = 0;
            this.incY = 0;
            this.lifespan = 0;

            this.speed = Phaser.Math.GetSpeed(700, 1);
        },

        fire: function (x, y, angle)
        {
            this.setActive(true);
            this.setVisible(true);
            // As Bulltes são disparadas do meio do ecrã para o x/y dado
            this.setPosition(x, y);
            
        //  Não é ncessário rodar as bullets porque estas são redondas
        //    this.setRotation(angle);

            this.dx = Math.cos(angle);
            this.dy = Math.sin(angle);

            this.lifespan = 550;
            bulletSound.play();
        },

        update: function (time, delta)
        {
            this.lifespan -= delta;

            this.x += this.dx * (this.speed * delta);
            this.y += this.dy * (this.speed * delta);

            if (this.lifespan <= 0)
            {
                this.setActive(false);
                this.setVisible(false);
            }
        }

    });

var Arrow = new Phaser.Class({

        Extends: Phaser.GameObjects.Image,

        initialize:

        function Arrow (scene)
        {      
            Phaser.GameObjects.Image.call(this, scene, 0, 0, 'arrow');

            this.incX = 0;
            this.incY = 0;
            this.lifespan = 0;

            this.speed = Phaser.Math.GetSpeed(100, 1);
        },

        

        fire: function (x, y, angle)
        {
            this.setActive(true);
            this.setVisible(true);
            // As Bulltes são disparadas do meio do ecrã para o x/y dado
            this.setPosition(x, y);
            
          
            //  Não é ncessário rodar as bullets porque estas são redondas
            //    this.setRotation(angle);

            this.dx = Math.cos(angle);
            this.dy = Math.sin(angle);

            this.lifespan = 6000;
            arrowSound.play();
        },

        update: function (time, delta)
        {
            this.lifespan -= delta;

            this.x += this.dx * (this.speed * delta);
            this.y += this.dy * (this.speed * delta);

            if (this.lifespan <= 0)
            {
                this.setActive(false);
                this.setVisible(false);
            }
        }

    });

var FastBullet = new Phaser.Class({

        Extends: Phaser.GameObjects.Image,

        initialize:

        function FastBullet (scene)
        {      
            Phaser.GameObjects.Image.call(this, scene, 0, 0, 'bullet');

            this.incX = 0;
            this.incY = 0;
            this.lifespan = 0;

            this.speed = Phaser.Math.GetSpeed(900, 1);
        },

        

        fire: function (x, y, angle)
        {
            this.setActive(true);
            this.setVisible(true);
            // As Bulltes são disparadas do meio do ecrã para o x/y dado
            this.setPosition(x, y);
            
            // Não é ncessário rodar as bullets porque estas são redondas
            // this.setRotation(angle);

            this.dx = Math.cos(angle);
            this.dy = Math.sin(angle);

            this.lifespan = 500;
            fastBulletSound.play();
        },

        update: function (time, delta)
        {
            this.lifespan -= delta;

            this.x += this.dx * (this.speed * delta);
            this.y += this.dy * (this.speed * delta);

            if (this.lifespan <= 0)
            {
                this.setActive(false);
                this.setVisible(false);
            }
        }

    });