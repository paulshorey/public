/*
 * DEPENDENCIES - WATCH FOR:
 *
 * VARIABLES:
 * axios
 * grecaptcha
 *
 * DOM ELEMENTS:
 * $('#submitSubscribeForm')
 * $('#submitContactForm')
 */


/*
 * Contact data
 */
// let updateContactData = function (key, value) {
//   contactData[key] = value
//   if (key === "email") {
//     Array.from(document.querySelectorAll("form")).forEach((form) => {
//       form["email"].value = value
//     })
//   }
// }
let contactData = {
  email: "only_this_is_required@whateveHTMLr.com",
  name: "",
  text: "",
  updates_product: ""
}
let putUrl = "https://subscribe-and-contact-form.p.rapidapi.com/v1/contacts"
let putHeaders = {
  "content-type": "application/json",
  "x-rapidapi-host": "subscribe-and-contact-form.p.rapidapi.com",
  "x-rapidapi-key": "024726ac3bmsh58ecf30df1dcaa9p187c38jsnae3868b21908",
  "useQueryString": true
}
// let putUrl = 'http://142.93.251.57/v1/contacts'
// let putHeaders = { "content-type": "application/json", };
let putContactData = function (captcha_response = "any_string") {
  return new Promise(function (resolve) {
    // request
    axios({
      method: "put",
      url: putUrl,
      headers: putHeaders,
      data: {
        contact: contactData,
        captcha_response: captcha_response
      }
    })
      .then((results) => {
        // parse data from object
        if (results.data && "data" in results.data) {
          resolve(results.data.data)
        } else {
          console.warn('server response did not have "data" key')
          resolve(results.data)
        }
      })
      .catch((error) => {
        // parse error message from object
        let data = error.response ? error.response.data : { error: "" }
        data.error = data.error || error.message ? error.message : error
        console.log("axios error", data)
        resolve(data)
      })
  })
}

/*
 * Submit subscribe form
 */
let subscribeForm = document.getElementById("submitSubscribeForm")
subscribeForm.addEventListener("submit", function (e) {
  console.log("submitSubscribeForm", contactData)
  e.preventDefault()
  if (!contactData.email) {
    subscribeForm.querySelector(".response").innerHTML = `
                  <p class="error">Please enter your email address.</p>
               `
    return
  }
  grecaptcha.ready(function () {
    grecaptcha.execute("6LfSN-MUAAAAAOxMUojSlBxkicjSeX1YLW8ds8C1", { action: "submit" }).then(function (token) {
      console.log("captcha_response", token)
      putContactData(token).then(function (data) {
        if (data.error) {
          subscribeForm.querySelector(".response").innerHTML = `
                           <p class="error">${data.error || "Could not send. Something went wrong."}</p>
                        `
        } else {
          subscribeForm.querySelector(".response").innerHTML = `
                           <p class="success">Email saved.</p>
                        `
        }
        contactForm.querySelector(".response").innerHTML = ``
      })
    })
  })
})
/*
 * Submit contact form
 */
let contactForm = document.getElementById("submitContactForm")
contactForm.addEventListener("submit", function (e) {
  e.preventDefault()
  if (!contactData.email) {
    contactForm.querySelector(".response").innerHTML = `
                  <p class="error">Please enter your email address.</p>
               `
    return
  } else if (!contactData.text) {
    contactForm.querySelector(".response").innerHTML = `
                  <p class="error">Please enter a message.</p>
               `
    return
  } else if (!contactData.name) {
    contactForm.querySelector(".response").innerHTML = `
                  <p class="error">Please enter your name.</p>
               `
    return
  }
  grecaptcha.ready(function () {
    grecaptcha.execute("6LfSN-MUAAAAAOxMUojSlBxkicjSeX1YLW8ds8C1", { action: "submit" }).then(function (token) {
      console.log("captcha_response", token)
      putContactData(token).then(function (data) {
        if (data.error) {
          contactForm.querySelector(".response").innerHTML = `
                           <p class="error">${data.error || "Could not send. Something went wrong."}</p>
                        `
        } else {
          contactForm.querySelector(".response").innerHTML = `
                           <p class="success">Message sent. Thank you. We'll get back to you soon.</p>
                        `
        }
        subscribeForm.querySelector(".response").innerHTML = ``
      })
    })
  })
})