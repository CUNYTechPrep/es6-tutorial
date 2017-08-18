'use strict';

var _mortgage = require('./mortgage2');

var _mortgage2 = _interopRequireDefault(_mortgage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

document.getElementById('calcBtn').addEventListener('click', function () {
    var principal = document.getElementById("principal").value;
    var years = document.getElementById("years").value;
    var rate = document.getElementById("rate").value;
    var mortgage = new _mortgage2.default(principal, years, rate);
    document.getElementById("monthlyPayment").innerHTML = mortgage.monthlyPayment.toFixed(2);
    document.getElementById("monthlyRate").innerHTML = (rate / 12).toFixed(2);
    var html = "";
    mortgage.amortization.forEach(function (year, index) {
        return html += '\n        <tr>\n            <td>' + (index + 1) + '</td>\n            <td class="currency">' + Math.round(year.principalY) + '</td>\n            <td class="stretch">\n                <div class="flex">\n                    <div class="bar principal"\n                         style="flex:' + year.principalY + ';-webkit-flex:' + year.principalY + '">\n                    </div>\n                    <div class="bar interest"\n                         style="flex:' + year.interestY + ';-webkit-flex:' + year.interestY + '">\n                    </div>\n                </div>\n            </td>\n            <td class="currency left">' + Math.round(year.interestY) + '</td>\n            <td class="currency">' + Math.round(year.balance) + '</td>\n        </tr>\n    ';
    });
    document.getElementById("amortization").innerHTML = html;
});
