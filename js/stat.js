'use strict';
window.renderStatistics = function (ctx, names, times) {
  var drawCloud = function (color, left, top, width, height) {
    ctx.fillStyle = color;
    ctx.fillRect(left, top, width, height);
  };

  var writeText = function (text, left, top, fontAndSize, color) {
    ctx.fillStyle = color;
    ctx.font = fontAndSize;
    ctx.fillText(text, left, top);
  };

  var color = 'rgba(84, 231, 91, 0.5)';
  var textColor = '#000';
  var textFontAndSize = '16px PT Mono';
  var textContent = 'Ура, Вы победили!';

  var getMaxValue = function (array) {
    var max = array[0];
    for (var j = 1; j < array.length; j++) {
      if (max < array[j]) {
        max = array[j];
      }
    }
    return max;
  };

  var drawHisto = function () {
    var maxHeight = 150;
    var maxTime = getMaxValue(times);
    var histoWidth = 40;
    var histoInterval = 50;
    var histoStart = 200;
    var histoHeight;
    var step = Math.floor(maxHeight / (maxTime / 1000));

    for (var i = 0; i < times.length; i++) {
      times[i] = Math.floor(times[i]);
      histoHeight = (times[i] / 1000) * step;
      writeText(names[i], histoStart, 240, textFontAndSize, textColor);
      if (names[i] !== 'Вы') {
        ctx.fillStyle = 'rgba(0, 0, 255, ' + Math.random() * 1 + ')';
      } else {
        ctx.fillStyle = 'rgb(255, 0, 0)';
      }
      ctx.fillRect(histoStart, 70 - (histoHeight - maxHeight), histoWidth, histoHeight);
      writeText(times[i], histoStart, 65 - (histoHeight - maxHeight), textFontAndSize, textColor);
      histoStart += (histoWidth + histoInterval);
    }
  };

  drawCloud(color, 160, 10, 400, 250);
  color = 'rgb(255, 255, 255)';
  drawCloud(color, 150, 0, 400, 250);
  writeText(textContent, 275, 30, textFontAndSize, textColor);
  textContent = 'Список результатов:';
  writeText(textContent, 265, 50, textFontAndSize, textColor);
  drawHisto();
};
