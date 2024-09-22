import request from "request";
var options = { method: 'POST',
  url: 'https://dev-inajzmrpodbvxcy4.us.auth0.com/oauth/token',
  headers: { 'content-type': 'application/json' },
  body: '{"client_id":"AO0I9GQof24JgXk66XToxLXeg7KgSX27","client_secret":"61K6GqL0N9_uv5Kioo0MPo9qC0k3iOYyxpRvzWwg1md0mD-P6WlwmLeQUM6KtWSs","audience":"https://dev-inajzmrpodbvxcy4.us.auth0.com/api/v2/","grant_type":"client_credentials"}' };

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});