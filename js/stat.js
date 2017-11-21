'use strict';
window.renderStatistics = function () {
  var canvas = document.querySelector('canvas');
  var names = ['Вы', 'Алексей', 'Пётр', 'Николай'];
  var times = [3979, 4532, 4117, 3456];
  var ctx = canvas.getContext('2d');
  var histoHeight = 150;
  var histoWidth = 40;
  var histoInterval = 50;
  var histoStart = 200;
  var corellate = [];
  var winnerIndex;

  var drawCloud = function () {
    ctx.fillStyle = 'rgba(84, 231, 91, .5)';
    // слева, сверху, вправо(ширина), вниз(высота)
    ctx.fillRect(160, 10, 400, 200);

    ctx.fillStyle = 'rgb(255, 255, 255)';
    ctx.fillRect(150, 0, 400, 200);
  };

  var writeText = function () {
    ctx.fillStyle = '#000';
    ctx.font = '16px PT Mono';
    ctx.fillText('Ура, Вы победили!', 275, 30);
    ctx.fillText('Список результатов:', 265, 50);
  };

  var setHistoHeight = function () {
    for (var i = 0; i < times.length; i++) {
      corellate[i] = Math.floor(times[i] / 100 * 2);
    }
    return corellate;
  };

  var findWinner = function () {
    for (var i = 1; i < times.length; i++) {
      if (times[0] > times[i]) {
        winnerIndex = i;
      }
    }
  };

  var findYourResult = function () {
    for (var i = 0; i < names.length - 1; i++) {
      if (names[i] === 'Вы') {
        var swap = names[winnerIndex];
        names[winnerIndex] = names[i];
        names[i] = swap;
      }
    }
  };

  var drawHisto = function () {
    for (var i = 0; i < times.length; i++) {
      findYourResult();
      ctx.fillStyle = '#000';
      ctx.font = '16px PT Mono';
      ctx.fillText(names[i], histoStart, 170);

      if (i !== winnerIndex) {
        ctx.fillStyle = 'rgba(0, 0, 255, ' + Math.random() * 1 + ')';
        ctx.fillRect(histoStart, corellate[i], histoWidth, histoHeight - corellate[i]);
        histoStart += (histoWidth + histoInterval);
      } else {
        ctx.fillStyle = 'rgb(255, 0, 0)';
        ctx.fillRect(histoStart, corellate[i], histoWidth, histoHeight - corellate[i]);
      }
    }
  };

  setHistoHeight();
  drawCloud();
  findWinner();
  writeText();
  drawHisto();
};
