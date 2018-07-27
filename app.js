var restify = require('restify');

var builder = require('botbuilder');

 

// Setup Restify Server

var server = restify.createServer();

               server.listen(process.env.port || process.env.PORT || 3978, function () {

               console.log('%s listening to %s', server.name, server.url);

});

 

var connector = new builder.ChatConnector({

               appId: process.env.MicrosoftAppId,

               appPassword: process.env.MicrosoftAppPassword

});

var json = require('./record.json');

console.log(json);

server.post('/api/messages', connector.listen());

 

var bot = new builder.UniversalBot(connector, function (session){

               bot.on('conversationUpdate', function(message) {

                              // Send a hello message when bot is added

                              session.send("Hi there!");

               });

              

               session.message.text = session.message.text.toLowerCase();

               /*bot.dialog('greetings', [

                              // Step 1

                              function (session) {

                                             builder.Prompts.text(session, 'Hi! What is your name?');

                              },

                              // Step 2

                              function (session, results) {

                                             session.endDialog(`Hello ${results.response}!`);

                              }

               ]);*/

               session.userData.about = {

                              "Profile": {

                                             "Name": "Kartikeya Fatwani",

                                             "Age": 23                                                                        

                              },

                              "Job": {

                                             "Company": "Allstate",

                                             "StartDate": "Aug 9th, 2017",

                                             "NTID": "kfatw",

                                             "Title": "Developer",

                                             "Manager": "Mr. Subhobroto Ghosh",

                                             "Leaves": 7

                              }

               }

               session.save();

    bot.set('persistUserData', true);

               //session.send("Hi %s! how can I help you?", session.userData.about.Profile.Name);

               var userName = session.userData.about.Profile.Name;

               var userAge = session.userData.about.Profile.Age;

              

               for (var key in json) {

                 //console.log("key = %s",key);

                 

                 if (json.hasOwnProperty(key)) {

                              var val = json[key];

                              console.log(val);

                              console.log("----------");

                 }

               }

 

               var flag= false;

               if ((session.message.text).includes('manager')){

                              session.send('Your manager is %s.', session.userData.about.Job.Manager);

                              flag= true;

               } else if ((session.message.text).includes('ntid') || (session.message.text).includes('name')){

                              session.send('Your name is %s and NTID is %s.',session.userData.about.Profile.Name, session.userData.about.Job.NTID);

                              flag= true;

               } else if ((session.message.text).includes('leaves') || (session.message.text).includes('leave')){

                              session.send('You have any %s left. Come to office on time, everyday.', session.userData.about.Job.Leaves);

                              flag= true;

               } else if ((session.message.text).includes('hi') || (session.message.text).includes('hello') || (session.message.text).includes('hey')){

                              session.send('Hi There! May I know your NTID, so that I can help you better?');

                              flag= true;

               } else if ((session.message.text).includes('2000') ){

                              for (var key in json) {

                                //console.log("key = %s",key);

                                if(key==session.message.text){

                                               var val = json[key];

                                }

                                if (json.hasOwnProperty(key)) {

                                             var val = json[key];

                                             console.log(val);

                                             console.log("----------");

                                }

                              }

                              flag= true;

               }

               if (session.message.attachments && session.message.attachments.length > 0) {

                              flag= true;

                              var attachment = session.message.attachments[0];

                              session.send({

                                             text: "You sent:",

                                             attachments: [

                                                            {

                                                                           contentType: attachment.contentType,

                                                                           contentUrl: attachment.contentUrl,

                                                                           name: attachment.name

                                                            }

                                             ]

                              });

               } 

               if (!flag){

                              //session.send('I didn\'t understand your question. Could you please repharse that?');

               }

});