
kaboom({
  global: true,
  fullscreen: true,
  scale: 2,
  debug: true,
  clearColor: [0,0,0,1]
})

//Variável global
const MOVE_SPEED = 120
const ENEMY_SPEED = 30

//rota padrão
loadRoot('https://i.imgur.com/');

//carregando as sprite:
loadSprite('wall-steel', 'EkleLlt.png')
loadSprite('brick-red', 'C46n8aY.png');
loadSprite('door', 'Ou9w4gH.png');
loadSprite('kaboom', 'o9WizfI.png');
loadSprite('background', 'qIXIczt.png');
loadSprite('wall-gold', 'VtTXsgH.png');
loadSprite('brick-wood', 'U751RRV.png');

loadSprite('bomberman','T0xbHb8.png', {
  sliceX: 7,
  sliceY: 4,
  anims: {
    //stopped
    idleLeft: {from: 21, to: 21},
    idleRight: {from: 7, to: 7},
    idleUp: {from: 0, to: 0},
    idleDown: {from: 14, to: 14},

    //move
    moveLeft: {from: 22, to: 27},
    moveRight: {from: 8, to: 13},
    moveUp: {from: 1, to: 6},
    moveDown: {from: 15, to: 20},

  }
})

//bomba e explosão
loadSprite('bomber','etY46bP.png', {
  sliceX: 3,
  anims: {
    move: {from: 0, to: 2}
  }
})

loadSprite('explosion', 'baBxoqs.png', {sliceX: 5, sliceY: 5})

//sprite inimigos
loadSprite('baloon', 'z59lNU0.png', {sliceX: 3})
loadSprite('ghost', '6YV0Zas.png', {sliceX: 3})
loadSprite('slime', 'c1Vj0j1.png', {sliceX: 3})

//cenário do jogo
scene('game', () => {
  layers(['background', 'object', 'ui'], 'object');

  const maps = [
    [
      '      aaaaaaaaaaaaaaa',
      '      a             a',
      '      a             a',
      '      a             a',
      '      a       }     a',
      '      a             a',
      '      a             a',
      '      a     &       a',
      '      a             a',
      '      a             a',
      '      a       *     a',
      '      a             a',
      '      a             a',
      '      a             a',
      '      aaaaaaaaaaaaaaa'
    ]
  ]
  const leveConfig = {
    width: 26,
    height: 24,
    a: [sprite('wall-steel'), 'wall-steel', solid(), 'wall'],
    z: [sprite('brick-red'), 'wall-brick', solid(), 'wall'],
    d: [sprite('brick-red'), 'wall-brick-dool', solid(), 'wall'],
    b: [sprite('wall-gold'), 'wall-gold', solid(), 'wall'],
    w: [sprite('brick-wood'), 'wall-brick', solid(), 'wall'],
    p: [sprite('brick-wood'), 'wall-brick-dool', solid(), 'wall'],
    t: [sprite('door'), 'door', 'wall'],
    '}': [sprite('ghost'), 'ghost', 'dangerous', {dir: -1, time: 0}],
    '&': [sprite('slime'), 'slime', 'dangerous', {dir: -1, time: 0}],
    '*': [sprite('baloon'), 'baloon', 'dangerous', {dir: -1, time: 0}],
  }

  const gameLeve = addLevel(maps[0], leveConfig)

  add([sprite('background'), layer('background'),pos(175, 25), scale(0.90, 0.80)])

  const player = add([
    sprite('bomberman', {
      animeSpeed: 0.1,
      frame: 14
    }),
    pos(159, 190),
    { dir: vec2(1,0)}
  ])

  //Action player
  player.action(() => {
    player.pushOutAll()
  })

  //direções do bomberman
  keyDown('left', () => {
    player.move(-MOVE_SPEED, 0);
    player.dir = vec2(-1, 0);
  })

  keyDown('right', () => {
    player.move(MOVE_SPEED, 0);
    player.dir = vec2(1, 0);
  })

  keyDown('up', () => {
    player.move(0,-MOVE_SPEED);
    player.dir = vec2(0, -1);
  })

  keyDown('down', () => {
    player.move(0, MOVE_SPEED);
    player.dir = vec2(0, 1);
  })

  //direções com movimentos
  keyPress('left', () => {
    player.play('moveLeft')
  })

  keyPress('right', () => {
    player.play('moveRight')
  })
  keyPress('up', () => {
    player.play('moveUp')
  })
  keyPress('down', () => {
    player.play('moveDown')
  })

  keyPress('space', () => {
    spawnBomber(player.pos.add(player.dir.scale(0)))
  })

  //Animation stopped
  keyRelease('left', () => {
    player.play('idleLeft')
  })
  keyRelease('right', () => {
    player.play('idleRight')
  })
  keyRelease('up', () => {
    player.play('idleUp')
  })
  keyRelease('down', () => {
    player.play('idleDown')
  })

  //Actions Enemys
  action('baloon', (baloon) => {
    //enpurra tudo que for solido
    baloon.pushOutAll();
    baloon.move(baloon.dir * ENEMY_SPEED, 0);
    baloon.time -= dt();
    if(baloon.time <= 0){
      baloon.dir = -baloon.dir
      baloon.time = rand(5)
    }
  })

  action('slime', (slime) => {
    //enpurra tudo que for solido
    slime.pushOutAll();
    slime.move(slime.dir * ENEMY_SPEED, 0);
    slime.time -= dt();
    if(slime.time <= 0){
      slime.dir = -slime.dir
      slime.time = rand(5)
    }
  })

  action('ghost', (ghost) => {
    //enpurra tudo que for solido
    ghost.pushOutAll();
    ghost.move(0, ghost.dir * ENEMY_SPEED);
    ghost.time -= dt();
    if(ghost.time <= 0){
      ghost.dir = -ghost.dir
      ghost.time = rand(5)
    }
  })

  //Functions bomber
  function spawnBomber(positionPlayer) {
    const bomber = add([sprite('bomber'), ('move'), pos(positionPlayer), scale(1), 'bomber']);
    bomber.pushOutAll();
    bomber.play('move');

    wait(2, () => {
      destroy(bomber);

      bomber.dir = vec2(-2, 0)
      spawnKaboom(bomber.pos.add(bomber.dir.scale(20)), 10) // explosion left
      bomber.dir = vec2(-1, 0)
      spawnKaboom(bomber.pos.add(bomber.dir.scale(20)), 11) // explosion left

      bomber.dir = vec2(0, -1)
      spawnKaboom(bomber.pos.add(bomber.dir.scale(20)), 7) // explosion up
      bomber.dir = vec2(0, -2)
      spawnKaboom(bomber.pos.add(bomber.dir.scale(20)), 2) // explosion up

      bomber.dir = vec2(1, 0)
      spawnKaboom(bomber.pos.add(bomber.dir.scale(20)), 13) // explosion right
      bomber.dir = vec2(2, 0)
      spawnKaboom(bomber.pos.add(bomber.dir.scale(20)), 14) // explosion right

      bomber.dir = vec2(1,0)
      spawnKaboom(bomber.pos.add(bomber.dir.scale(0)), 12) // explosion center

      bomber.dir = vec2(0, 1)
      spawnKaboom(bomber.pos.add(bomber.dir.scale(20)), 17) // explosion down
      bomber.dir = vec2(0, 2)
      spawnKaboom(bomber.pos.add(bomber.dir.scale(20)), 22) // explosion down
    })
  }

  function spawnKaboom(positionBomber, frame) {
    const explosion = add([
      sprite('explosion', {
        animeSpeed: 0.1,
        frame: frame
      }),
      pos(positionBomber),
      scale(1.5),
      'kaboom'
    ])

    explosion.pushOutAll();
    wait(0.3, () => {
      destroy(explosion);
    })
  }

  //Collisions
  player.collides('door', (door) => {
    go('game', {
      level: (level + 1) % maps.length +5,
      score: scoreLabel.value
    })
  })

  collides('kaboom', 'dangerous', (kaboom, objects) => {
    camShake(4);
    wait(1, () => {
      destroy(kaboom)
    })
    destroy(objects);
  })

})

//chamada do cenário do jogo;
go('game');