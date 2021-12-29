
kaboom({
  global: true,
  fullscreen: true,
  scale: 2,
  debug: true,
  clearColor: [0,0,0,1]
})

//rota padrão
loadRoot('https://i.imgur.com/');

//carregando as sprite:
loadSprite('wall-steel', 'EkleLlt.png')
loadSprite('brick-red', 'C46n8aY.png');
loadSprite('door', 'Ou9w4gH.png');
loadSprite('kaboom', 'o9WizfI.png');
loadSprite('bg', 'qIXIczt.png');
loadSprite('wall-gold', 'VtTXsgH.png');
loadSprite('brick-wood', 'U751RRV.png');

//cenário do jogo
scene('game', () => {
  layers(['background', 'object', 'ui'], 'object');

  const maps = [
    [
      'aaaaaaaaaaaaaaa',
      'a             a',
      'a             a',
      'a             a',
      'a             a',
      'a             a',
      'a             a',
      'a             a',
      'a             a',
      'a             a',
      'a             a',
      'a             a',
      'a             a',
      'a             a',
      'aaaaaaaaaaaaaaa'
    ]
  ]
  const leveConfig = {
    width: 26,
    height: 26,
    a: [sprite('wall-steel'), 'wall-steel', solid(), 'wall'],
    z: [sprite('brick-red'), 'wall-brick', solid(), 'wall'],
    d: [sprite('brick-red'), 'wall-brick-dool', solid(), 'wall'],
    b: [sprite('wall-gold'), 'wall-gold', solid(), 'wall'],
    w: [sprite('brick-wood'), 'wall-brick', solid(), 'wall'],
    p: [sprite('brick-wood'), 'wall-brick-dool', solid(), 'wall'],
    t: [sprite('door'), 'door', 'wall'],
  }

  const gameLeve = addLevel(maps[0], leveConfig)
})

//chamada do cenário do jogo;
go('game');