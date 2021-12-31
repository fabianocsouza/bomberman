
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

loadSprite('bomber','etY46bP.png', {
  sliceX: 3,
  anims: {
    move: {from: 0, to: 2}
  }
})

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
    '&': [sprite('slime'), 'slime', 'dangerous', {tdir: -1, ime: 0}],
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

})

//chamada do cenário do jogo;
go('game');