(window.webpackJsonp=window.webpackJsonp||[]).push([[14],{"Cuy+":function(e,t,a){"use strict";a.r(t);var n=a("q1tI"),r=a.n(n),o=a("r8ck"),i=a("GIND");var s=function(e){var t,a;function n(){return e.apply(this,arguments)||this}return a=e,(t=n).prototype=Object.create(a.prototype),t.prototype.constructor=t,t.__proto__=a,n.prototype.render=function(){return r.a.createElement(o.a,{location:this.props.location,meta_title:"Contact us"},r.a.createElement(i.a,{location:this.props.location,open_contact:!0}))},n}(r.a.Component);t.default=s},GIND:function(e,t,a){"use strict";a("VRzm"),a("Btvt");var n=a("o0o1"),r=a.n(n),o=(a("ls82"),a("q1tI")),i=a.n(o),s=a("Wbzz"),l=a("Rnav"),c=a("P+Yw"),u=a("IP2g"),m=a("4Bjl"),p=a("uB96"),d=a("vOnD"),h=d.a.div.withConfig({displayName:"AboutUsstyled__ImageDivStyled",componentId:"sc-185qyya-0"})(["position:relative;width:100%;height:100%;img{width:100%;}&.ImageWithZoom{div{width:100%;height:100%;background-position:center;}}"]),g=d.a.div.withConfig({displayName:"AboutUsstyled__CarouselStyled",componentId:"sc-185qyya-1"})(["margin:1.25rem 0.5rem 1.75rem -0.25rem;.carousel{position:relative;li.carousel__slide{border-radius:2px;overflow:hidden;margin-right:0.5vw;margin-left:0.5vw;}img.carousel__image{padding:0 1%;}.arrows{position:absolute;height:calc(100% - 4rem);width:calc(100% + 2rem);left:-1rem;top:0;pointer-events:none;.arrow{pointer-events:all;position:absolute;border-radius:1.25rem;width:2.5rem;height:2.5rem;top:45%;font-size:2.5rem;line-height:2.6rem;color:white;background:linear-gradient(45deg,var(--color-link),hsl(205,100%,56%),var(--color-link));box-shadow:-1px 2px 3px white;border:none;outline:none;&:hover{background:var(--color-link);}svg{position:relative;top:-0.1rem;}&.arrow-right{right:0;svg{right:-0.075rem;}}&.arrow-left{svg{left:-0.075rem;}}&[disabled]{opacity:0.25;cursor:default;}}}.links{margin-top:0.25rem;position:relative;.link{font-size:0.9rem;border:none;color:var(--color-accent-dark);background:none;padding:0;margin:0 0.75rem 0 0;cursor:pointer;text-decoration:underline;&.link-right{position:absolute;right:0;}&[disabled]{opacity:0;visibility:hidden;}}}}"]),f=a("mZMQ"),v=function(e){var t=e.src,a=e.alt,n=void 0===a?"":a;return i.a.createElement(h,{className:"ImageWithZoom"},i.a.createElement(f.e,{alt:n,src:t}))},w=a("hmtA"),b=a.n(w),E=function(){return i.a.createElement(g,null,"object"==typeof window&&i.a.createElement(f.c,{visibleSlides:Math.round(window.innerWidth/300),totalSlides:7,step:Math.round(window.innerWidth/300),naturalSlideWidth:600,naturalSlideHeight:600},i.a.createElement(f.g,{className:b.a.slider},i.a.createElement(f.f,{index:5},i.a.createElement(v,{src:"/photos/aboutus.jpg"})),i.a.createElement(f.f,{index:0},i.a.createElement(v,{src:"/photos/desk-paul.jpg"})),i.a.createElement(f.f,{index:1},i.a.createElement(v,{src:"/photos/desk-samira.jpg"})),i.a.createElement(f.f,{index:2},i.a.createElement(v,{src:"/photos/city-samira-paul.jpg"})),i.a.createElement(f.f,{index:4},i.a.createElement(v,{src:"/photos/aboutus-utah-road.jpg"})),i.a.createElement(f.f,{index:3},i.a.createElement(v,{src:"/photos/about-paul-rocks.jpg"}))),i.a.createElement("div",{className:"arrows"},i.a.createElement(f.a,{className:"arrow arrow-left"},i.a.createElement(u.a,{icon:p.b,className:""})),i.a.createElement(f.b,{className:"arrow arrow-right"},i.a.createElement(u.a,{icon:p.c,className:""})))))},y=a("M4T4"),k=a("5gr6");function N(e,t,a,n,r,o,i){try{var s=e[o](i),l=s.value}catch(c){return void a(c)}s.done?t(l):Promise.resolve(l).then(n,r)}function S(e){return function(){var t=this,a=arguments;return new Promise((function(n,r){var o=e.apply(t,a);function i(e){N(o,n,r,i,s,"next",e)}function s(e){N(o,n,r,i,s,"throw",e)}i(void 0)}))}}var _=function(e){var t,a;function n(t){var a;return(a=e.call(this,t)||this).componentDidMount=S(r.a.mark((function e(){return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:a.props.open_contact&&setTimeout((function(){a.setState({popupActive:!0})}),1e3);case 1:case"end":return e.stop()}}),e)}))),a.componentDidUpdate=function(){var e=S(r.a.mark((function e(t){return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:a.props.open_contact&&a.props.open_contact!==t.open_contact&&a.setState({popupActive:!0});case 1:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),a.state={popupActive:!1},a}return a=e,(t=n).prototype=Object.create(a.prototype),t.prototype.constructor=t,t.__proto__=a,n.prototype.render=function(){var e=this;return i.a.createElement(i.a.Fragment,null,i.a.createElement(l.a,{location:this.props.location,standalone:!0}),i.a.createElement(c.a,{className:"content"},i.a.createElement("div",{className:"before"},i.a.createElement("div",{className:"titleWithButton"},i.a.createElement("h2",null,"About us:"),i.a.createElement(c.b,{className:"ContactUsButton clickable",onClick:function(){e.setState({popupActive:!0})}},"Message us ",i.a.createElement(u.a,{icon:m.h,className:""}))),i.a.createElement("p",null,"We are a husband and wife team based in Kansas City, MO (USA) 👨🏼‍💻 👩🏽‍💼  Combining our talents we created the most reliable English language"," ",i.a.createElement(s.a,{to:"/word?str=best",className:"link"},"thesaurus")," ","for automated applications. Our thesaurus is culturally sensitive, modern and quirky. It is the backbone of our domain suggestion engine."," "),i.a.createElement("p",null,"Paul built some advanced admin tools to automate content editing. Samira used these tools to edit countless words and phrases. This made it possible for us to rearrange words and generate new phrases without accidentally creating awkward or offensive phrases. We're now utilizing this technology to generate domain name suggestions which otherwise only a human would have thought of."),i.a.createElement(E,null)),i.a.createElement("p",null,i.a.createElement("b",null,"Paul Shorey")," (",i.a.createElement("a",{className:"link",href:"https://paulshorey.com",target:"_blank"},"paulshorey.com"),") has been making websites and apps for 12 years. Finally getting pretty good at it. :) JavaScript, UI design, front-end, back-end, systems and databases. Paul has a BFA in fine art, but has embraced software development as his medium of choice. Programming is creative, and very powerful. It's also fun. When not coding, he enjoys building light fixtures, growing micro-greens, and doing adventure sports like"," ",i.a.createElement("span",{className:"nowrap"},"hang-gliding"),"."),i.a.createElement("p",null,i.a.createElement("b",null,"Samira Ali")," holds a Bachelor in Sociology. She speaks Swahili and Mandarin, can read/write Arabic, and is currently learning French and Spanish. Samira’s previous roles have ranged from social media coordinator, graphic designer, researcher, and an electronic health records consultant. She has been a part of several non-profits around Kansas City and has also spearheaded her own initiatives. Samira is passionate about human centered design. She believes applications should be built with diversity of culture, brains and bodies in mind."),i.a.createElement("p",null,i.a.createElement("span",{onClick:function(){e.setState({popupActive:!0})}},i.a.createElement("span",{className:"link"},"Lets schedule a time to meet")," ",i.a.createElement("span",{className:"link"},i.a.createElement(u.a,{icon:p.h,className:""})))),i.a.createElement("div",{className:"before"},i.a.createElement("div",{className:"titleWithButton"},i.a.createElement("h2",null,"This is all a work in progress...")),i.a.createElement("p",null,"We are actively editing our thesaurus every day. Paul is busy improving the algorithms and inventing more nifty tools.")),i.a.createElement("div",{className:"after"},i.a.createElement("p",null,i.a.createElement("b",null,"We're looking forward to working with mentors, partners, and data science interns.")),i.a.createElement("p",null,i.a.createElement("a",{className:"link",href:"https://nlpthesaurus.com",target:"_blank"},"NLP.Domains")," ","-- We are now finishing the"," ",i.a.createElement("a",{className:"link",href:"https://nlp.studio#documentation",target:"_blank"},"domain suggestions API")," ","for registrars, and making an app for consumers."),i.a.createElement("p",null,i.a.createElement("a",{className:"link",href:"https://nlpthesaurus.com",target:"_blank"},"NLP",i.a.createElement(k.d,null),"Thesaurus",i.a.createElement(k.d,null),".com")," ","-- Planning to publish our thesaurus content as an API - for AI and text analysis applications"),i.a.createElement("p",null,i.a.createElement("a",{className:"link",href:"https://nlp.studio",target:"_blank"},"NLP.Studio")," ","-- Also coming soon, more text-analysis and web APIs. We'll publish each one as soon as it is tested and proven the most reliable in the industry.",i.a.createElement("ul",null,i.a.createElement("li",null,"Our chunking/word-breaking algorithm is already in use in our domain suggestions - it lets us parse strings of characters with no spaces into separate words, reliably every time."),i.a.createElement("li",null,"Our sentiment analysis is currently very accurate for individual words and very short phrases - better than big AI companies. However, to reliably support longer texts it will need much more development."),i.a.createElement("li",null,"Content extraction from large documents, saved to a database"),i.a.createElement("li",null,"Entity extraction - to detect dates, links, and locations from a text"),i.a.createElement("li",null,"Bot and web crawler prevention"),i.a.createElement("li",null,"More domain tools, like WHOIS, site usage, expiring domains search")))),i.a.createElement("div",{className:"after"},i.a.createElement("p",null,i.a.createElement("b",null,"Let’s work together! ")," After wrapping up our current APIs, our plans are to gather new experiences and ideas, while meeting new partners and building relationships. If you are doing something interesting, we’d love to hear about it and meet."),i.a.createElement("p",null,i.a.createElement("b",null,"Please message us"),", just say hello. Please give us your first impression of the site, suggestions, or thesaurus. Try out our product. It's still a work in progress, so please reach out if anything in particular stands out. Thank you for your visit and support! Hope to meet you soon.")),i.a.createElement("div",{className:"after"},i.a.createElement(c.b,{className:"ContactUsButton clickable",onClick:function(){e.setState({popupActive:!0})}},"Message us ",i.a.createElement(u.a,{icon:m.h,className:""}))),i.a.createElement("p",null," "),i.a.createElement("p",null," "),i.a.createElement("p",null," ")),i.a.createElement(y.a,{show:!!this.state.popupActive,onClose:function(){e.setState({popupActive:!1})}}))},n}(i.a.Component);t.a=_}}]);
//# sourceMappingURL=component---src-pages-contact-js-ff55e8c82dfe5ec109a8.js.map