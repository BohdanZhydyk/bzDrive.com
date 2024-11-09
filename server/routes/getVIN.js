const { MongoClient, ObjectId } = require('mongodb')
const { bzDB } = require('./bzDB')
const axios = require('axios')
const { AutoDevApiKey, vinDecoderApiKey, vinDecoderSecretKey } = require('./../safe/safe')


exports.getVIN = (req, res)=>{

  const VIN = req?.body?.object?.vin
  let cars = []

  const query = {"car.vin":VIN}

    bzDB( { req, res, col:'bzDocuments', act:"FIND", query }, (carData)=>{

      if(carData?.result?.length > 0){
        const car = carData?.result[0]?.car
        cars.push({
          msg:`bzDriveDB`,
          carData: {brand:car?.brand, model:car?.model, prod:car?.prod, engine:car?.engine, numbers:car?.numbers, color:car?.color}
        })
      }

      if(cars?.length > 0){
        res.send({ ...carData, result: cars })
        return
      }

      // auto.dev FREE = 5,000 API calls/mo ========================================================================================
      axios.get( `https://auto.dev/api/vin/${VIN}?apikey=${AutoDevApiKey}` ).then((AutoDevRes)=>{
        
        const RES = AutoDevRes?.data

        if(!RES?.status && RES?.status !== "NOT FOUND"){

          const brand = RES?.make?.name
          const model = RES?.model?.name
          const prod = RES?.years ? RES?.years[0]?.year : false
          const size = RES?.engine?.size ? `${RES.engine.size}L` : ``
          const code = RES?.engine?.manufacturerEngineCode ? `_${RES.engine.manufacturerEngineCode}` : ``
          const hp = RES?.engine?.horsepower ? `_${parseInt((RES.engine.horsepower * 0.74).toFixed(2))}kW` : ``
          const drive = ()=>{
            switch(RES?.drivenWheels){
              case "four wheel drive": return "4WD"
              case "all wheel drive": return "AWD"
              case "front wheel drive": return "FWD"
              case "rear wheel drive": return "RWD"
              default: return RES?.drivenWheels
            }
          }
          const engine = `${size}${code}${hp}${drive() ? `_${drive()}` : ``}`
          const carData = { brand, model, prod, engine }
          
          cars.push( {msg:`auto.dev`, carData} )
          
        }

        if(cars?.length > 0){
          res.send({ ...carData, result: cars })
          return
        } 

        // vindecoder.eu   FREE = 20 API calls/mo ========================================================================================
        axios.get( `https://api.vindecoder.eu/3.2/${vinDecoderApiKey}/${controlSumSHA1()}/decode/${VIN}.json` ).then((vinDecoderRes)=>{
          
          const RES = vinDecoderRes?.data

          const count = RES?.balance?.["API Decode"]
          const brand = RES?.decode?.find(item => item.label === 'Make')?.value
          const model = RES?.decode?.find(item => item.label === 'Model')?.value
          const prod = RES?.decode?.find(item => item.label === 'Model Year')?.value
          const engine = RES?.decode?.find(item => item.label === 'Emission Standard')?.value

          const carData = { count, brand, model, prod, engine }

          cars.push( {msg:`vindecoder.eu ${count}`, carData} )

          res.send({ ...carData, result: cars })

        })

        function controlSumSHA1() {

          let msg = `${VIN}|decode|${vinDecoderApiKey}|${vinDecoderSecretKey}`

          function rotate_left(n, s) {
            var t4 = (n << s) | (n >>> (32 - s));
            return t4;
          }
        
          function cvt_hex(val) {
            var str = "";
            var i;
            var v;
        
            for (i = 7; i >= 0; i--) {
              v = (val >>> (i * 4)) & 0x0f;
              str += v.toString(16);
            }
            return str;
          }
        
          function Utf8Encode(string) {
            string = string.replace(/\r\n/g, "\n");
            var utftext = "";
        
            for (var n = 0; n < string.length; n++) {
              var c = string.charCodeAt(n);
        
              if (c < 128) {
                utftext += String.fromCharCode(c);
              } else if ((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
              } else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
              }
            }
            return utftext;
          }
        
          var blockstart;
          var i, j;
          var W = new Array(80);
          var H0 = 0x67452301;
          var H1 = 0xEFCDAB89;
          var H2 = 0x98BADCFE;
          var H3 = 0x10325476;
          var H4 = 0xC3D2E1F0;
          var A, B, C, D, E;
          var temp;
          msg = Utf8Encode(msg);
          var msg_len = msg.length;
          var word_array = new Array();
        
          for (i = 0; i < msg_len - 3; i += 4) {
            j = msg.charCodeAt(i) << 24 | msg.charCodeAt(i + 1) << 16 |
              msg.charCodeAt(i + 2) << 8 | msg.charCodeAt(i + 3);
            word_array.push(j);
          }
        
          switch (msg_len % 4) {
            case 0:
              i = 0x080000000;
              break;
        
            case 1:
              i = msg.charCodeAt(msg_len - 1) << 24 | 0x0800000;
              break;
        
            case 2:
              i = msg.charCodeAt(msg_len - 2) << 24 | msg.charCodeAt(msg_len - 1) << 16 | 0x08000;
              break;
        
            case 3:
              i = msg.charCodeAt(msg_len - 3) << 24 | msg.charCodeAt(msg_len - 2) << 16 | msg.charCodeAt(msg_len - 1) << 8 | 0x80;
              break;
          }
        
          word_array.push(i);
        
          while ((word_array.length % 16) != 14) word_array.push(0);
          word_array.push(msg_len >>> 29);
          word_array.push((msg_len << 3) & 0x0ffffffff);
        
          for (blockstart = 0; blockstart < word_array.length; blockstart += 16) {
            for (i = 0; i < 16; i++) W[i] = word_array[blockstart + i];
            for (i = 16; i <= 79; i++) W[i] = rotate_left(W[i - 3] ^ W[i - 8] ^ W[i - 14] ^ W[i - 16], 1);
        
            A = H0;
            B = H1;
            C = H2;
            D = H3;
            E = H4;
        
            for (i = 0; i <= 19; i++) {
              temp = (rotate_left(A, 5) + ((B & C) | (~B & D)) + E + W[i] + 0x5A827999) & 0x0ffffffff;
              E = D;
              D = C;
              C = rotate_left(B, 30);
              B = A;
              A = temp;
            }
        
            for (i = 20; i <= 39; i++) {
              temp = (rotate_left(A, 5) + (B ^ C ^ D) + E + W[i] + 0x6ED9EBA1) & 0x0ffffffff;
              E = D;
              D = C;
              C = rotate_left(B, 30);
              B = A;
              A = temp;
            }
        
            for (i = 40; i <= 59; i++) {
              temp = (rotate_left(A, 5) + ((B & C) | (B & D) | (C & D)) + E + W[i] + 0x8F1BBCDC) & 0x0ffffffff;
              E = D;
              D = C;
              C = rotate_left(B, 30);
              B = A;
              A = temp;
            }
        
            for (i = 60; i <= 79; i++) {
              temp = (rotate_left(A, 5) + (B ^ C ^ D) + E + W[i] + 0xCA62C1D6) & 0x0ffffffff;
              E = D;
              D = C;
              C = rotate_left(B, 30);
              B = A;
              A = temp;
            }
        
            H0 = (H0 + A) & 0x0ffffffff;
            H1 = (H1 + B) & 0x0ffffffff;
            H2 = (H2 + C) & 0x0ffffffff;
            H3 = (H3 + D) & 0x0ffffffff;
            H4 = (H4 + E) & 0x0ffffffff;
          }
          var temp = cvt_hex(H0) + cvt_hex(H1) + cvt_hex(H2) + cvt_hex(H3) + cvt_hex(H4);
        
          return temp.toLowerCase().substring(0, 10);
        }

      })

    })

  return

}