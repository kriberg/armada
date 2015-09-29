require('./vendor')();
require('./css/armada.css');
require('./js/http-auth-interceptor.js');
require('expose?FiltersNumbers!./js/filters/numbers.js');
require('expose?FiltersEveImage!./js/filters/eve-image.js');
require('./js/armada.js')();
require('./js/controllers/login.js')();
require('./js/controllers/navbar.js')();
require('./js/controllers/dashboard.js')();
require('./js/controllers/tour.js')();
require('./js/controllers/evemail.js')();
require('./js/controllers/apikeys.js')();
require('./js/controllers/character/list.js')();
require('./js/controllers/character/details.js')();
require('./js/controllers/character/skills.js')();
require('./js/controllers/character/economy/transactions.js')();
require('./js/controllers/character/economy/balance.js')();
require('./js/controllers/character/sheet.js')();
require('./js/controllers/assets/browsing/list.js')();
require('./js/controllers/assets/browsing/locations/list.js')();
require('./js/controllers/assets/browsing/locations/details.js')();
require('./js/controllers/assets/browsing/inventory/list.js')();
require('./js/controllers/assets/searching/searching.js')();
require('./js/services/stationspinner.js')();
require('./js/services/settings.js')();
require('./js/services/colorize.js')();
require('./js/directives/character-box.js')();
require('./js/directives/character-box-extended.js')();
require('./js/directives/eve-status.js')();
require('./js/directives/active-link.js')();
require('./js/directives/api-key.js')();
require('./js/directives/mail-display.js')();
require('./js/directives/eve-skill.js')();
require('./js/directives/eve-type.js')();
require('./js/directives/armada-id-selector.js')();
