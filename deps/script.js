; (function () {
  const userCardTemplate = document.querySelector("[user-template]");
  const userCardContainer = document.querySelector("[user-cards-container]");
  const searchInput = document.querySelector("[user-search]");
  const temp = document.getElementById("temp");
  const contentWrapper = document.getElementById("content");

  let users = []

  function search(value) {
    userCardContainer.innerHTML = '';
    users.forEach(user => {
      if (value) {
        if (user.name.toLowerCase().includes(value.toLowerCase())) {
          userCardContainer.append(user.element);
        }
      } else {
        userCardContainer.append(user.element);
      }
    })
  }

  searchInput.addEventListener("input", e => {
    search(e.target.value);
  })

  fetch("info.json")
    .then(res => res.json())
    .then(data => {
      users = data.map(user => {
        let phoneNumber = user.phone;

// Create a link to open the WhatsApp chat with the phone number
let link = `https://api.whatsapp.com/send?phone=${phoneNumber}`;
// Add the WhatsApp logo image to the link
let logo = '<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/whatsapp/whatsapp-original.svg" alt="WhatsApp logo" width="50" height="50">';
let whatsappLink = `<a class="wa-link" href="${link}">${phoneNumber}</a>`;
        const card = userCardTemplate.content.cloneNode(true).children[0];
        let isImageAvailable = user.image == null || user.image == "null" || user.image == "";
        card.querySelector("[user-image]").src = isImageAvailable ? 'images/johndoe.png' : "images/" + user.image;
        card.querySelector("[user-name]").textContent = user.name;
        // card.querySelector("[user-username]").textContent = user.gh_username;
        card.querySelector("[user-url]").href = "https://github.com/" + user.gh_username;
        card.querySelector("[user-place]").textContent = user.place;
        card.querySelector("[user-address]").textContent = user.address;
        card.querySelector("[user-phone]").innerHTML += whatsappLink;
        card.querySelector("[user-blood]").textContent = user.blood;
        card.querySelector("[user-id]").textContent = user.id;
        card.querySelector("[user-country]").textContent = user.country;
        card.querySelector("[user-id]").href = "/edit.html?id=user.id"
        userCardContainer.append(card);
        return {
          name: user.name,
          element: card
        }
      })
      onPageLoad()
    })

  function addDownloadEventListener() {
    document.querySelectorAll('.profile-download')
      .forEach(el => el.addEventListener("click", function () {
        let card = this.parentElement.cloneNode(true)
        // card.children.item(6).remove();

        let logos = document.createElement("div");
        logos.className = "logos"
        let pLogo = document.createElement("img");
        pLogo.className = "pLogo"
        pLogo.src = "deps/gcc.jpg"
        // let hfLogo = document.createElement("img");
        // hfLogo.className = "hfLogo"
        // hfLogo.src = "deps/gcc1.jpg"

        logos.appendChild(pLogo)
        // logos.appendChild(hfLogo)

        let footer = document.createElement("div");
        footer.className = "footer";
        let p = document.createElement("p");
        p.textContent = "Theruvu GCC"
        footer.appendChild(p);

        let cardWrapper = document.createElement("div");
        cardWrapper.className = "parent-card"
        cardWrapper.appendChild(logos)
        cardWrapper.appendChild(card)
        cardWrapper.appendChild(footer)
        temp.appendChild(cardWrapper)

        html2canvas(cardWrapper).then(function (canvas) {
          var anchorTag = document.createElement("a");
          document.body.appendChild(anchorTag);
          anchorTag.download = "profile.png";
          anchorTag.href = canvas.toDataURL();
          anchorTag.target = '_blank';
          anchorTag.click();
        });

        cardWrapper.remove();
      }));
  }

  function loadSearchFromUrl() {
    // Fetch query string from url
    const params = new Proxy(new URLSearchParams(window.location.search), {
      get: (searchParams, prop) => searchParams.get(prop),
    });
    let value = params.search;
    searchInput.value = value;
    search(value);
  }

  function onPageLoad() {
    addDownloadEventListener();
    loadSearchFromUrl();
    document.getElementById('contri').innerText = users.length + ' MEMBERS'
    contentWrapper.style.visibility = "visible"
  }

  let downBtn = document.getElementById("btn-down")
  let upBtn = document.getElementById("btn-up")
  let rootElement = document.documentElement

  function scrollToBottom() {
    var scrollTotal = rootElement.scrollHeight - rootElement.clientHeight
    rootElement.scrollTo({
      top: scrollTotal,
      behavior: "smooth"
    })
  }

  function scrollToTop() {
    rootElement.scrollTo({
      top: 0,
      behavior: "smooth"
    })
  }

  function handleScroll() {
    var scrollTotal = rootElement.scrollHeight - rootElement.clientHeight
    if ((rootElement.scrollTop / scrollTotal) > 0.01 && (rootElement.scrollTop / scrollTotal) < 0.99) {
      downBtn.classList.add("btn-show")
      upBtn.classList.add("btn-show")
    } else {
      downBtn.classList.remove("btn-show")
      upBtn.classList.remove("btn-show")
    }
  }
  
  downBtn.addEventListener("click", scrollToBottom)
  upBtn.addEventListener("click", scrollToTop)
  document.addEventListener("scroll", handleScroll)

}());
