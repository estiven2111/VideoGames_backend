//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require('./src/app.js');      //4 se importa server desde app.js
const { conn } = require('./src/db.js');
const {getGenre} = require("./src/controller/Genres")
const PORT = process.env.PORT || 3007

// Syncing all the models at once.
conn.sync({ force: true }).then(() => {
  
  server.listen(PORT, () => {
  //  getGenre();
    console.log('%s listening at ',PORT); // eslint-disable-line no-console
  });
});

//.findOrCreate
