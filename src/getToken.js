import request from "request"

var options = {
	method: "POST",
	url: "https://dev-4xvtpqba5ze8jbkg.us.auth0.com/oauth/token",
	headers: { "content-type": "application/json" },
	body: '{"client_id":"x2G9RPllVtTjbrJlHTJrinaqrHcH8IQO","client_secret":"aJT_2l2mNMiIkWz4fNtqUu_UWVlHyqfgKboefUVoghvCTNz76VS_ypBXoHPZjcx1","audience":"https://dev-4xvtpqba5ze8jbkg.us.auth0.com/api/v2/","grant_type":"client_credentials"}',
}

request(options, function (error, response, body) {
	if (error) throw new Error(error)

	console.log(body)
})
// localStorage.setItem("token", body)
